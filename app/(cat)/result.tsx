import { Pressable, Image, Text, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import CustomWarning, {
  CustomDetailResult,
  UnorderedList,
} from "@/components/CustomWarning";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { MultipleChart, PieChart } from "@/components/CircularProgress";
import { Categories, SubCategories } from "@/data/enum";
import { useAppSelector } from "@/redux";
import {
  getColorForLabel,
  getLogicalResultDetails,
} from "@/utils/helper-functions";
import { labelColorMap, SubCategoryConfig } from "@/data/data-config";
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { Assessment } from "@/data/categories";

const responses = [
  {
    id: "test",
    heading: "very often",
    piont: "4",
    color: "red",
  },
  {
    id: "result",
    heading: "sometimes",
    piont: "3",
    color: "yellow",
  },
  {
    id: "knowledge",
    heading: "often",
    piont: "4",
    color: "black",
  },
  {
    id: "apps",
    heading: "rarely",
    piont: "0",
    color: "gray",
  },
  {
    id: "never",
    heading: "never",
    piont: "1",
    color: "red",
  },
];
export default function SingleResult() {
  const [isPaid, setIsPaid] = useState(true);
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const score = recentData[subCategory].totalPoints;

  const config = SubCategoryConfig[subCategory];
  const notSelfAssesment = config.categories === Categories.IQ_TEST;

  const dataResults = useMemo(() => {
    if (config.resultData) {
      const result = getLogicalResultDetails(score, config.resultData);
      return result;
    }
  }, [subCategory, score, config]);

  const listItems = [
    "Correct answers",
    "Possible career tracks",
    "Mental strengths",
    "Mental weaknesses",
    "More",
  ];

  const multiplePieData: ProgressChartData = useMemo(() => {
    const subCategoryAssessment = Assessment.find(
      (item) => item.subcategoryId === subCategory
    );

    // Function to determine labels based on category
    const getLabels = () => {
      return config.categories === Categories.IQ_TEST
        ? subCategoryAssessment?.options?.map((option) => option.optionlabel) ??
            []
        : subCategoryAssessment?.options?.map((option) => option.option) ?? [];
    };

    // Function to count occurrences of each label
    const countLabelOccurrences = (label: string) => {
      const questions = recentData?.[subCategory]?.questionsAnswered || [];
      return config.categories === Categories.IQ_TEST
        ? questions.filter((question) => question.questionLabel === label)
            .length
        : questions.filter((question) => question.answer === label).length;
    };

    // Process data
    const labels = getLabels();
    const data = labels.map(countLabelOccurrences);
    const colors = labels.map(getColorForLabel);

    return {
      labels,
      data,
      colors,
    };
  }, [recentData, config.categories, subCategory, Assessment]);

  console.log("MULTIPLE DATA", multiplePieData);

  return (
    <ThemedView style={tw`flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <View style={tw`flex-row mb-5`}>
          <Pressable onPress={() => router.back()} style={tw`justify-start`}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`gap-5 flex-1`}>
            <Image
              source={images.done}
              style={tw`max-w-[323px] mx-auto w-full h-[313px]`}
              resizeMode="contain"
            />

            <View style={tw`mb-5`}>
              <ThemedText style={tw`text-base mb-2 font-normal text-center`}>
                You have completed the test
              </ThemedText>
              <ThemedText style={tw`text-2xl font-semibold text-center mb-8`}>
                {config.title}
              </ThemedText>

              <ThemedText style={tw`text-sm font-normal text-center`}>
                Here are your results:
              </ThemedText>
            </View>
            <View style={tw`p-6 bg-[#C9FBEB80] gap-5 rounded-xl`}>
              <Text style={tw`text-center text-base`}>
                Your {config.title} type is
              </Text>
              <Text style={tw`text-3xl text-center font-semibold`}>
                {dataResults?.scoreDisplay
                  ? dataResults.scoreDisplay
                  : dataResults?.label}
              </Text>
              <Text style={tw`text-center text-base`}></Text>
            </View>

            {isPaid ? (
              <View style={tw`gap-5`}>
                <View style={tw`flex-row mt-3 gap-4`}>
                  <icons.StackIcon />
                  <Text style={tw`font-semibold`}>Detailed Result</Text>
                </View>
                <View
                  style={tw`bg-gray-DEFAULT justify-between rounded-xl flex-row px-3 py-4`}>
                  <View style={tw`gap-3 flex-1`}>
                    <Text style={tw`font-semibold mb-3`}>Your responses</Text>
                    <View style={tw` flex-row align-center w-[100%] justify-center`}>
                      <MultipleChart data={multiplePieData} />
                    </View>
                    {multiplePieData.labels?.map((response, index) => (
                      <View
                        key={index}
                        style={tw`flex-row border border-[#E3E1E9] p-2 rounded-lg items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          <View
                            style={tw`mr-3 h-2 w-5 rounded-sm bg-[${labelColorMap[index]}]`}></View>
                          <Text style={tw`capitalize`}>{response}</Text>
                        </View>
                        <Text>{multiplePieData.data[index]}</Text>
                      </View>
                    ))}
                  </View>
                  {config.categories === Categories.IQ_TEST && (
                    <View style={tw`gap-3 flex-1`}>
                      <Text style={tw`font-semibold mb-3`}>Answers</Text>
                      <PieChart />
                      {responses
                        .filter((item, index) => index > 3)
                        .map((response) => (
                          <View
                            key={response.id}
                            style={tw`flex-row border border-[#E3E1E9] p-2 rounded-lg items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                              <View
                                style={tw`mr-3 h-2 w-5 rounded-sm bg-[${response.color}]`}></View>
                              <Text style={tw`capitalize`}>
                                {response.heading}
                              </Text>
                            </View>
                            <Text>{response.piont}</Text>
                          </View>
                        ))}
                    </View>
                  )}
                </View>

                {notSelfAssesment && (
                  <CustomButton
                    title="View correct answers"
                    containerStyles="border-2 border-solid w-full border-secondary-DEFAULT"
                    textStyles="text-secondary-DEFAULT"
                  />
                )}

                <CustomDetailResult
                  noteHeading="🧑‍🏫 Possible career track"
                  noteDesc={
                    Array.isArray(dataResults?.careerTracks)
                      ? dataResults.careerTracks.join(",")
                      : dataResults?.careerTracks ?? ""
                  }
                  bgcolor="bg-[#FEF5CB]"
                />
                <CustomDetailResult
                  noteHeading="😃 Mental Strength"
                  noteDesc={
                    Array.isArray(dataResults?.strengths)
                      ? dataResults.strengths.join(",")
                      : dataResults?.strengths ?? ""
                  }
                  bgcolor="bg-[#F9CCFC80]"
                />
                <CustomDetailResult
                  noteHeading="😞 Mental Weakness"
                  noteDesc={
                    Array.isArray(dataResults?.weaknesses)
                      ? dataResults.weaknesses.join(",")
                      : dataResults?.weaknesses ?? ""
                  }
                  bgcolor="bg-[#FEF5CB]"
                />
                <CustomDetailResult
                  noteHeading="✍️ Solution"
                  noteDesc="hhh"
                  bgcolor="bg-[#C9FBEB80]"
                />
              </View>
            ) : (
              <View style={tw`gap-5`}>
                <CustomCard
                  icon={<icons.StackIcon />}
                  title="Detailed Result"
                  titleStyle="text-[15px] capitalize"
                  otherStyles="bg-gray-DEFAULT"
                  textoricon={<icons.LockKey />}
                  textStyle="bg-[#F4FBC9] text-[#76A400] p-1"
                />
                <View
                  style={tw`bg-[#FEF5CB] w-full flex-row gap-3 rounded-xl p-5`}>
                  <icons.WarningIcon />
                  <View style={tw`flex-1 flex-col gap-2`}>
                    <Text
                      style={tw`text-base font-semibold text-secondary-DEFAULT`}>
                      Detailed Result
                    </Text>
                    <Text style={tw`font-intmedium text-sm text-[#848288]`}>
                      Your detailed result will contain the following
                      information
                    </Text>
                    <UnorderedList items={listItems} />
                  </View>
                </View>
              </View>
            )}
            <View>
              <Text style={tw`mb-5 text-lg font-semibold`}>
                Suggested Tests
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={tw`flex-row gap-2`}>
          <CustomButton
            title="Proceed to next test"
            handlePress={() => router.push("/(tabs)/all-tests")}
            containerStyles="bg-secondary-DEFAULT w-full mt-1"
            textStyles="text-primary"
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
