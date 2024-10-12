import {
  Image,
  Dimensions,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { router } from "expo-router";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import { CircularProgress } from "@/components/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
} from "@/utils/helper-functions";
import { SubCategories } from "@/data/enum";
import { useAppSelector } from "@/redux";
import { formatDate } from "@/utils/format-date";
import { SubCategoryConfig } from "@/data/data-config";

const interactions = [
  {
    id: "test",
    interactionicon: <icons.TestIcon />,
    heading: "start test",
    subtitle: "Take a test",
    interactionpage: "/all-tests",
  },
  {
    id: "result",
    interactionicon: <icons.ResultIcon />,
    heading: "Result",
    subtitle: "Go into details",
    interactionpage: "/previousResult",
  },
  {
    id: "knowledge",
    interactionicon: <icons.KnowledgeIcon />,
    heading: "Knowledge hub",
    subtitle: "Generator",
    interactionpage: "/previousResults",
  },
  {
    id: "apps",
    interactionicon: <icons.AppIcon />,
    heading: "more apps",
    subtitle: "Other test apps",
    interactionpage: "/previousResults",
  },
];

interface IDetails {
  latestTest: string;
  dateAnswered: string;
  progressPercent: number;
}
export default function HomeScreen() {
  const col = 2;
  const screenPadding = 20;
  const gap = 12;
  const screenWidth = Dimensions.get("screen").width - screenPadding * 2;
  const itemWidth = (screenWidth - (col - 1) * gap) / col;
  const [latestSubDetails, setLatestSubDetails] = useState<IDetails | null>();
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const [hasRecentData, hasProgressData] = useMemo(() => {
    return [
      Object.keys(recentData).length > 0,
      Object.keys(progressData).length > 0,
    ];
  }, [recentData, progressData]);

  const recents = useMemo(() => {
    if (!hasRecentData) return [];

    return Object.keys(recentData)
      .sort((a, b) => {
        const dateA = new Date(
          recentData[a as SubCategories].dateAnswered
        ).getTime();
        const dateB = new Date(
          recentData[b as SubCategories].dateAnswered
        ).getTime();
        return dateB - dateA;
      })
      .slice(0, 1) as SubCategories[];
  }, [recentData, hasRecentData]);

  const setDetails = () => {
    if (hasProgressData && hasRecentData) {
      setLatestSubDetails({
        latestTest: recents[0],
        dateAnswered: recentData[recents[0]].dateAnswered,
        progressPercent: calcPercentage(
          recentData[recents[0]].questionsAnswered.length,
          getTotalQuestionsForSubCategory(recents[0])
        ),
      });
    }
  };

  useEffect(() => {
    setDetails();
  }, [recents]);

  const handleRecentQuestions = () => {
    if (latestSubDetails) {
      router.push({
        pathname: "/(cat)/test",
        params: { subCategory: latestSubDetails?.latestTest },
      });
    } else {
      router.push("/all-tests");
    }
  };

  const lastTestTitle = SubCategoryConfig[
    latestSubDetails?.latestTest as SubCategories
  ]
    ? SubCategoryConfig[latestSubDetails?.latestTest as SubCategories].title
    : "You've no current session";

  return (
    <ThemedView style={tw`w-full px-5 pt-3 justify-center`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={tw`h-full flex-1`}>
          <View style={tw`gap-5 flex-1`}>
            <ThemedText style={tw`text-4xl font-light w-70`}>
              What are you hoping to{" "}
              <Text style={tw`font-semibold`}>learn today?</Text> 📚
            </ThemedText>

            <View>
              <ThemedText>Continue last session</ThemedText>
              <View style={tw`w-full mt-2 h-[180px]`}>
                <ImageBackground
                  source={images.background}
                  style={tw`flex-1 w-full h-full justify-center`}
                  resizeMode="stretch">
                  <View style={tw`flex-row px-5 items-center justify-between`}>
                    <Image
                      source={images.brain}
                      style={tw`w-[134px] h-[133px]`}
                      resizeMode="contain"
                    />

                    <CircularProgress
                      percentage={latestSubDetails?.progressPercent ?? 0}
                      text="Progress"
                    />
                  </View>
                </ImageBackground>
              </View>

              <View
                style={[
                  tw`bg-gray-DEFAULT flex-row items-center py-2 px-4 justify-between`,
                  { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
                ]}>
                <View style={tw`flex-col gap-3`}>
                  <Text style={tw`font-medium`}>{lastTestTitle}</Text>
                  {latestSubDetails && (
                    <Text>
                      Tried on {formatDate(latestSubDetails.dateAnswered)}
                    </Text>
                  )}
                </View>
                <CustomGradientButton
                  title="Start"
                  paddingStyle="px-7"
                  textStyle="text-primary"
                  handlePress={handleRecentQuestions}
                />
              </View>
            </View>
            <CustomCard
              icon={<icons.StackIcon />}
              title="Subscription Plans"
              titleStyle="text-[15px] capitalize"
              otherStyles="bg-gray-DEFAULT"
              textoricon="Go Pro"
              handleClick={() => router.push("/(cat)/subscription")}
              textStyle="bg-[#F4FBC9] text-[#76A400] p-1"
            />

            <View>
              <ThemedText>Interactions</ThemedText>
              <View style={tw`gap-3 flex-row flex-wrap`}>
                {interactions.map((interaction) => {
                  return (
                    <Pressable
                      key={interaction.id}
                      style={({ pressed }) => [
                        tw`p-3 bg-gray-DEFAULT rounded-xl`,
                        pressed && tw`opacity-30`,
                        { width: itemWidth },
                      ]}
                      onPress={() =>
                        router.push(interaction.interactionpage as any)
                      }>
                      <View style={tw`mb-10`}>
                        {interaction.interactionicon}
                      </View>

                      <Text style={tw`mb-2 text-base capitalize font-semibold`}>
                        {interaction.heading}
                      </Text>
                      <Text>{interaction.subtitle}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
