import { useMemo, useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/twrnc-config";
import { router, useLocalSearchParams } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Categories, SubCategories } from "@/data/enum";
import { Assessment } from "@/data/categories";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
  handleAnswerQuestion,
} from "@/utils/helper-functions";
import { SubCategoryConfig } from "@/data/data-config";
import LinearProgressBar from "@/components/LinearProgress";
import {  useAppSelector } from "@/redux";

const TestSummary = () => {
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;

  const config = SubCategoryConfig[subCategory];

  const recentData = useAppSelector((state) => state.questions.recentData);

  const questionsData = useMemo(() => {
    const attemptedQuestions =
      recentData?.[subCategory]?.questionsAnswered.map(
        (ques) => ques.questionNo
      ) ?? [];

    const filteredQuestions = Assessment.reduce((acc, item) => {
      if (
        item.subcategoryId === subCategory &&
        attemptedQuestions.includes(item.questionNo)
      ) {
        acc.push(item);
      }
      return acc;
    }, [] as typeof Assessment);

    // Sort the filtered questions by questionNo
    return filteredQuestions.sort((a, b) => a.questionNo - b.questionNo);
  }, [subCategory, recentData, Assessment]);

  const [currentQuestionNo, setCurrentQuestionNo] = useState<number | null>(
    null
  );

  const currentQuestion = useMemo(() => {
    return questionsData.find(
      (question) => question.questionNo === currentQuestionNo
    );
  }, [currentQuestionNo, questionsData]);

  const answers = useMemo(() => {
    return recentData[subCategory].questionsAnswered.find(
      (item) => item.questionNo === currentQuestion?.questionNo
    );
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    const currentIndex = questionsData.findIndex(
      (question) => question.questionNo === currentQuestionNo
    );
    if (currentIndex >= 0 && currentIndex < questionsData.length - 1) {
      setCurrentQuestionNo(questionsData[currentIndex + 1].questionNo);
    } else {
      router.push({ pathname: "/(cat)/result", params: { subCategory } });
    }
  };

  const Icon = SubCategoryConfig[subCategory as SubCategories].interactionicon!;

  useEffect(() => {
    if (questionsData.length > 0) {
      setCurrentQuestionNo(questionsData[0].questionNo);
    }
  }, [questionsData]);

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient
          style={tw`flex-1 px-3 relative`}
          colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw`flex-1`}>
            <Pressable
              onPress={() => {router.back()}}
              style={tw`justify-start flex-col p-2`}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View
              style={tw`flex-1 w-full bg-primary rounded-xl p-5 mb-8 absolute
                top-28 h-[84%]
              `}>
              <View style={tw`absolute left-[25%] top-[-30] z-10`}>
                <Icon width={220} height={160} />
              </View>

              <FlatList
                data={currentQuestion?.options}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                  <View style={tw`mt-6 gap-3`}>
                    {/* <LinearProgressBar progress={50} /> */}


                    {/* <View style={tw`mx-auto`}>
                      <Icon width={220} height={160} />
                    </View> */}

                    <Text style={tw`font-semibold text-2xl text-center`}>
                      {config.title}
                    </Text>
                    <Text style={tw`text-lg text-center`}>Question {currentQuestionNo}</Text>

                    <View style={tw`bg-[#FEF5CB80] rounded-xl p-10 mb-5`}>
                      <Text style={tw`text-2xl font-semibold text-center`}>
                        {currentQuestion?.question}
                      </Text>
                    </View>
                  </View>
                )}
                renderItem={({ item }) => {
                  const currentAnswer = answers ?? ({} as QuestionDetails);
                  return (
                    <Pressable onPress={() => {}}>
                      <View
                        style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]
                              ${
                                currentAnswer.answer === item.option &&
                                currentAnswer.points > 0
                                  ? "bg-[#F4FBC9] border-[#8FBF00] "
                                  : currentAnswer.answer === item.option &&
                                    currentAnswer.points === 0
                                  ? " bg-[#FDE3D5] border-[#DD2E2E]"
                                  : currentQuestion?.answer === item.option
                                  ? "bg-[#F4FBC9] border-[#8FBF00]"
                                  : "border-gray-300"
                              }`}>
                        <Text>
                          {item.optionlabel}.{"  "}
                          {item.option}
                        </Text>
                        <MaterialIcons
                          name={
                            currentAnswer.answer === item.option &&
                            currentAnswer.points > 0
                              ? "check-circle"
                              : currentAnswer.answer === item.option &&
                                currentAnswer.points === 0
                              ? "remove-circle-outline"
                              : currentQuestion?.answer === item.option
                              ? "check-circle"
                              : "radio-button-unchecked"
                          }
                          size={24}
                          color={
                            currentAnswer.answer === item.option &&
                            currentAnswer.points > 0
                              ? "#8FBF00"
                              : currentAnswer.answer === item.option &&
                                currentAnswer.points === 0
                              ? "#DD2E2E"
                              : currentQuestion?.answer === item.option
                              ? "#8FBF00"
                              : "#E3E1E9"
                          }
                        />
                      </View>
                    </Pressable>
                  );
                }}
                ListFooterComponent={() => (
                  <CustomButton
                    title="Next"
                    containerStyles="bg-secondary-DEFAULT w-full mt-1"
                    textStyles="text-primary"
                    handlePress={handleNextQuestion}
                    // disabled={!answer}
                  />
                )}
                // ListEmptyComponent={<Text>No options available</Text>}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={tw`p-4`}>
              <Text style={tw`text-secondary-DEFAULT top-[741px] text-right`}>
                1 of 5
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestSummary;
