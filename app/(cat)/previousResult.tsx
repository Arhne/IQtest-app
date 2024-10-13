import { Pressable, Dimensions, Text, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { useCallback, useMemo, useState } from "react";
import { icons, images } from "@/constants";
import CustomWarning from "@/components/CustomWarning";
import { router } from "expo-router";
import LinearProgressBar from "@/components/LinearProgress";
import { SubCategories } from "@/data/enum";
import { useAppSelector } from "@/redux";
import {
  getTotalQuestionsForSubCategory,
  calcPercentage,
} from "@/utils/helper-functions";
import { SubCategoryConfig } from "@/data/data-config";

const previousresult = [
  {
    id: "test",
    interactionicon: <icons.TestIcon />,
    heading: "start test",
    subtitle: "Take a test",
    progress: "50%",
  },
  {
    id: "result",
    interactionicon: <icons.ResultIcon />,
    heading: "Result",
    subtitle: "Go into details",
    progress: "50%",
  },
  {
    id: "knowledge",
    interactionicon: <icons.KnowledgeIcon />,
    heading: "Knowledge hub",
    subtitle: "Generator",
    progress: "50%",
  },
  {
    id: "apps",
    interactionicon: <icons.AppIcon />,
    heading: "more apps",
    subtitle: "Other test apps",
    progress: "50%",
  },
];
export default function PreviousResult() {
  const [isTestCompleted, SetIsTestCompleted] = useState(true);

  const col = 2;
  const screenPadding = 20;
  const gap = 12;
  const screenWidth = Dimensions.get("screen").width - screenPadding * 2;
  const itemWidth = (screenWidth - (col - 1) * gap) / col;
  console.log(itemWidth);
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

    return Object.keys(recentData).sort((a, b) => {
      const dateA = new Date(
        recentData[a as SubCategories].dateAnswered
      ).getTime();
      const dateB = new Date(
        recentData[b as SubCategories].dateAnswered
      ).getTime();
      return dateB - dateA; // Sort by latest date
    }) as SubCategories[];
  }, [recentData, hasRecentData]);

  const generateProgressPercent = useCallback(
    (item: SubCategories) => {
      if (progressData[item] && hasProgressData) {
        const answered = recentData[item].questionsAnswered
            ? recentData[item].questionsAnswered.length
            : 0,
          total = progressData[item].total
            ? progressData[item].total
            : getTotalQuestionsForSubCategory(item);
        return calcPercentage(answered, total);
      } else {
        return calcPercentage(0, getTotalQuestionsForSubCategory(item));
      }
    },
    [hasProgressData, progressData, getTotalQuestionsForSubCategory] // dependencies
  );

  return (
    <ThemedView style={tw`flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <View style={tw`flex-row items-center mb-5`}>
          <Pressable
            onPress={() => router.back()}
            style={tw`justify-start mr-26`}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>
          <Text style={tw`text-xl font-semibold`}>Previous Result</Text>
        </View>

        {isTestCompleted && (
          <View style={tw`gap-5 flex-1`}>
            <CustomWarning
              warning="Before you can access your comprehensive test result, please ensure that you have successfully completed a specific test."
              textColor="text-secondary-DEFAULT"
            />

            <View>
              <ThemedText style={tw`text-base font-semibold w-70`}>
                Latest Test Results
              </ThemedText>
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={tw`gap-3 flex-row flex-wrap`}>
                  {recents.map((interaction) => {
                    const Icon =
                      SubCategoryConfig[interaction].interactionicon!;
                    if (generateProgressPercent(interaction) === 100) {
                      return (
                        <Pressable
                          key={interaction}
                          style={({ pressed }) => [
                            tw`p-3 bg-gray-DEFAULT rounded-xl`,
                            { width: itemWidth },
                            pressed && tw`opacity-70`,
                          ]}
                          onPress={() =>
                            router.push({
                              pathname: "/result",
                              params: { subCategory: interaction },
                            })
                          }>
                          <View style={tw`max-w-[93px] w-full h-[88px]`}>
                            <Icon />
                          </View>

                          <Text
                            style={tw`mb-2 text-base capitalize font-semibold`}>
                            {SubCategoryConfig[interaction].title}
                          </Text>
                          <View
                            style={tw`flex-row items-center justify-between mt-3`}>
                            <Text style={tw`text-[#727272]`}>Completed</Text>
                            <Text
                              style={tw`leading-[16.94px] text-secondary-DEFAULT`}>
                              {`${generateProgressPercent(interaction)}%`}
                            </Text>
                          </View>
                          <View style={tw`mt-3`}>
                            <LinearProgressBar
                              progress={generateProgressPercent(interaction)}
                            />
                          </View>
                        </Pressable>
                      );
                    }
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}
