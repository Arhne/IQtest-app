import { Pressable, Image, Text, ScrollView, View, Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { CustomButton, CustomGradientButton, CustomIconButton } from "@/components/CustomButton";
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
  getTotalQuestionsForSubCategory,
} from "@/utils/helper-functions";
import { useColorScheme } from "@/hooks/useColorScheme";
import { labelColorMap, SubCategoryConfig } from "@/data/data-config";
import { Assessment } from "@/data/categories";
import { Share } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';

export default function SingleResult() {
  const [isPaid, setIsPaid] = useState(true);
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;
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
  const colorScheme = useColorScheme();
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

  const pieData = useMemo(() => {
    const total = getTotalQuestionsForSubCategory(subCategory);
    const correctAnswers = recentData[subCategory].questionsAnswered.filter(
      (item) => item.points > 0
    ).length;
    const incorrectAnswers = recentData[subCategory].questionsAnswered.filter(
      (item) => item.points === 0
    ).length;

    const dataArray = [
      {
        name: "Correct answers",
        population: correctAnswers,
        color: "#8fbf00",
      },
      {
        name: "Wrong Answer",
        population: incorrectAnswers,
        color: "#dd2e2e",
      },
    ];
    const percentage = (correctAnswers / total) * 100;
    return {
      data: dataArray,
      percentage: Math.round(percentage),
    };
  }, [subCategory]);


  const viewRef = useRef<View>(null);


  const handleShare = async () => {
    try {
      // Capture the view
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
  
      // Share the captured screenshot
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Error sharing the screenshot:', error);
    }
  };
  
  return (
    <ThemedView style={tw`flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        {/* <View style={tw`flex-row mb-5`}>
          <Pressable onPress={() => router.back()} style={tw`justify-start`}>
            <MaterialIcons name="arrow-back-ios" size={24} color={colorScheme === "dark" ? "white" : "black"} />
          </Pressable>
        </View> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[tw`gap-5 flex-1`, { width: '100%', height: '100%' }]}>
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
            <View style={tw`p-6 bg-[#C9FBEB80] gap-5 rounded-xl`} ref={viewRef}>
              {config.categories === Categories.IQ_TEST ? (
                <View>
                  <Text style={tw`text-center text-base`}>
                    Your {config.title.substring(0, config.title.length - 5)} is
                  </Text>

                  <Text style={tw`text-3xl text-center p-4 font-semibold`}>
                    {dataResults?.scoreDisplay}
                  </Text>

                  <Text style={tw`text-center text-base`}>
                    {dataResults?.label}
                  </Text>
                </View>
              ) : config.categories === Categories.MENTAL_TEST ? (
                <View>
                  <Text style={tw`text-3xl text-center p-4 font-semibold`}>
                    {dataResults?.scoreDisplay}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={tw`text-center text-base`}>
                    Your {config.title.substring(0, config.title.length - 5)}{" "}
                    type is:
                  </Text>
                  {config.title === "16 Personalities Test" ? (
                    <View>
                      <Text style={tw`text-center text-base`}>
                        Your are an{" "}
                      </Text>
                      <Text style={tw`text-3xl text-center p-4 font-semibold`}>
                        {dataResults?.scoreDisplay}
                      </Text>
                      <Text style={tw`text-center text-base`}>
                        {dataResults?.label}
                      </Text>
                    </View>
                  ) : config.title === "Enneagram Test" ? (
                    <View>
                      <Text style={tw`text-center text-base`}>
                        Your main type is{" "}
                      </Text>
                      <Text style={tw`text-3xl text-center p-3 font-semibold`}>
                        {dataResults?.scoreDisplay}
                      </Text>
                      <Text style={tw`text-center text-base`}>
                        and side type is{" "}
                      </Text>
                      <Text style={tw`text-3xl text-center p-3 font-semibold`}>
                        {dataResults?.label}
                      </Text>
                    </View>
                  ) : config.title === "Emotions vs Logic Test" ? (
                    <View>
                      <Text style={tw`text-center text-base`}>
                        Out of 100 people, you fall in the
                      </Text>
                      <Text style={tw`text-3xl text-center p-3 font-semibold`}>
                        {dataResults?.scoreDisplay}
                      </Text>
                    </View>
                  ) : config.title === "Persona Bubble Test" ? (
                    <Text style={tw`text-center text-base`}>
                      From 1 - 10, your personal bubble strength is around{" "}
                      <Text style={tw`text-3xl font-semibold`}>
                        {dataResults?.scoreDisplay}
                      </Text>
                    </Text>
                  ) : config.title === "Emotional Intelligence (EQ) Test" ? (
                    <Text style={tw`text-center text-base`}>
                      Your <Text style={tw`text-xl font-semibold`}>EQ</Text>{" "}
                      score is between
                      <Text style={tw`text-3xl font-semibold`}>
                        {dataResults?.scoreDisplay}.
                      </Text>
                      {dataResults?.label}
                    </Text>
                  ) : (
                    <Text style={tw`text-3xl text-center font-semibold`}>
                      {dataResults?.label}
                    </Text>
                  )}
                </View>
              )}
            </View>

            {isPaid ? (
              <View style={tw`gap-5`}>
                <View style={tw`flex-row mt-3 gap-4`}>
                  <icons.StackIcon />
                  <Text
                    style={tw`font-semibold ${
                      colorScheme === "dark" ? "text-[#fff]" : "text-[#000]"
                    }`}
                  >
                    Detailed Result
                  </Text>
                </View>
                <View
                  style={tw`bg-gray-DEFAULT justify-between rounded-xl flex-row gap-4 px-3 py-4`}
                >
                  <View style={tw`gap-3 flex-1`}>
                    <Text style={tw`font-semibold mb-3`}>Your responses</Text>
                    <View style={tw` flex-row w-[100%] justify-center`}>
                      <MultipleChart
                        data={multiplePieData}
                        total={getTotalQuestionsForSubCategory(subCategory)}
                      />
                    </View>
                    {multiplePieData.labels?.map((response, index) => (
                      <View
                        key={index}
                        style={tw`flex-row border border-[#E3E1E9] p-2 rounded-lg items-center justify-between`}
                      >
                        <View style={tw`flex-row items-center`}>
                          <View
                            style={tw`mr-3 h-2 w-5 rounded-sm bg-[${labelColorMap[index]}]`}
                          ></View>
                          <Text style={tw`capitalize`}>{response}</Text>
                        </View>
                        <Text>{multiplePieData.data[index]}</Text>
                      </View>
                    ))}
                  </View>
                  {config.categories === Categories.IQ_TEST && (
                    <View style={tw`gap-3 flex-1`}>
                      <Text style={tw`font-semibold mb-3`}>Answers</Text>
                      <PieChart
                        data={pieData.data}
                        percentage={pieData.percentage}
                      />
                      {pieData.data.map((response, index) => (
                        <View
                          key={index}
                          style={tw`flex-row border border-[#E3E1E9] p-2 rounded-lg items-center justify-between`}
                        >
                          <View style={tw`flex-row items-center`}>
                            <View
                              style={tw`mr-3 h-2 w-5 rounded-sm bg-[${response.color}]`}
                            ></View>
                            <Text style={tw`capitalize`}>{response.name}</Text>
                          </View>
                          <Text>{response.population}</Text>
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
                    handlePress={() =>
                      router.push({
                        pathname: "/(cat)/testSummary",
                        params: { subCategory },
                      })
                    }
                  />
                )}

                <CustomDetailResult
                  noteHeading="🧑‍🏫 Possible career track"
                  noteDesc={
                    Array.isArray(dataResults?.careerTracks)
                      ? dataResults.careerTracks.join(", ")
                      : dataResults?.careerTracks ?? ""
                  }
                  bgcolor="bg-[#FEF5CB]"
                />
                <CustomDetailResult
                  noteHeading="✍️ Mental Strength"
                  noteDesc={
                    Array.isArray(dataResults?.strengths)
                      ? dataResults.strengths.join(", ")
                      : dataResults?.strengths ?? ""
                  }
                  bgcolor="bg-[#F9CCFC80]"
                />
                <CustomDetailResult
                  noteHeading="😞 Mental Weakness"
                  noteDesc={
                    Array.isArray(dataResults?.weaknesses)
                      ? dataResults.weaknesses.join(", ")
                      : dataResults?.weaknesses ?? ""
                  }
                  bgcolor="bg-[#FEF5CB]"
                />
                {dataResults?.celebrities && (
                  <CustomDetailResult
                    noteHeading="😃 Celebrities"
                    noteDesc={
                      Array.isArray(dataResults?.celebrities)
                        ? dataResults.celebrities.join(", ")
                        : dataResults?.celebrities ?? ""
                    }
                    bgcolor="bg-[#C9FBEB80]"
                  />
                )}
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
                  style={tw`bg-[#FEF5CB] w-full flex-row gap-3 rounded-xl p-5`}
                >
                  <icons.WarningIcon />
                  <View style={tw`flex-1 flex-col gap-2`}>
                    <Text
                      style={tw`text-base font-semibold text-secondary-DEFAULT`}
                    >
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
        <View style={tw`flex-row gap-2 items-center justify-center`}>
          <View style={tw` w-[21%]`}>
          <CustomIconButton
          onPress={handleShare}
          iconName="share-social"
          />
          </View>

          <CustomButton
            title="Proceed to next test"
            handlePress={() => router.push("/(tabs)/all-tests")}
            containerStyles="bg-secondary-DEFAULT w-[79%] mt-1"
            textStyles="text-primary"
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
