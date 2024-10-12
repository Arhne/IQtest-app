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
import { SubCategories } from "@/data/enum";
import { Assessment } from "@/data/categories";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
  handleAnswerQuestion,
} from "@/utils/helper-functions";
import { SubCategoryConfig } from "@/data/data-config";
import LinearProgressBar from "@/components/LinearProgress";
import { setAnswer } from "@/redux/question-reducer";
import { useAppDispatch, useAppSelector } from "@/redux";

const TestInstructions = () => {
  const [isIqTest, setIsIqTest] = useState("true");
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;

  // Selectors to get data from the Redux store
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const answer = useAppSelector((state) => state.questions.answer);

  // Use the last answered question number as initial state
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number | null>(
    null
  );

  // Memoized questions for the current subcategory
  const questionsData = useMemo(() => {
    const attemptedQuestions =
      recentData?.[subCategory]?.questionsAnswered.map(
        (ques) => ques.questionNo
      ) ?? [];

    const filteredQuestions = Assessment.reduce((acc, item) => {
      if (
        item.subcategoryId === subCategory &&
        !attemptedQuestions.includes(item.questionNo)
      ) {
        acc.push(item);
      }
      return acc;
    }, [] as typeof Assessment);

    // Sort the filtered questions by questionNo
    return filteredQuestions.sort((a, b) => a.questionNo - b.questionNo);
  }, [subCategory, recentData, Assessment]);

  const handleNextQuestion = () => {
    const currentIndex = questionsData.findIndex(
      (question) => question.questionNo === currentQuestionNo
    );
    if (currentIndex >= 0 && currentIndex < questionsData.length - 1) {
      setCurrentQuestionNo(questionsData[currentIndex + 1].questionNo);
      dispatch(setAnswer(undefined)); // Reset the selected answer
    } else {
      router.push({ pathname: "/(cat)/result", params: { subCategory } });
    }
  };

  const handleNext = () => {
    handleAnswerQuestion(
      currentQuestion!.questionNo,
      answer?.answer ?? "",
      answer?.points ?? 0,
      subCategory,
      recentData,
      progressData,
      dispatch
    )
      .then(() => {
        handleNextQuestion();
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  const Icon = SubCategoryConfig[subCategory as SubCategories].interactionicon!;

  const currentQuestion = useMemo(() => {
    return questionsData.find(
      (question) => question.questionNo === currentQuestionNo
    );
  }, [currentQuestionNo, questionsData]);

  const progressPercent = useMemo(() => {
    if (Object.keys(progressData).length === 0) return 0;
    return calcPercentage(
      progressData[subCategory]?.answered ?? 0,
      progressData[subCategory]?.total ?? 0
    );
  }, [progressData]);

  console.log("WENENENENEMIGHTY", currentQuestion);

  useEffect(() => {
    if (questionsData.length > 0) {
      setCurrentQuestionNo(questionsData[0].questionNo);
    }
  }, [questionsData]);

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient style={tw`flex-1 px-3`} colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw`flex-1`}>
            <Pressable
              onPress={() => {
                router.back();
              }}
              style={tw`justify-start flex-col p-2`}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View style={tw`flex-1 bg-primary rounded-xl p-5 h-60 top-24 mb-8`}>
              {isIqTest && (
                <View style={tw`absolute left-[25%] top-[-33] z-10`}>
                  <Icon width={220} height={175} />
                </View>
              )}

              <View>
                <View style={tw`mt-6 gap-3`}>
                  <LinearProgressBar progress={progressPercent} />

                  {!isIqTest && (
                    <View style={tw`mx-auto`}>
                      {/* <MaterialIcons
                        name="pie-chart"
                        size={80}
                        color="#6C63FF"
                      /> */}
                      <Icon width={220} height={210} />
                    </View>
                  )}

                  <Text style={tw`font-semibold text-2xl text-center`}>
                    {SubCategoryConfig[subCategory].title}
                  </Text>

                  <View style={tw`gap-4`}>
                    <Text style={tw`text-lg text-center`}>
                      Question {currentQuestionNo}
                    </Text>

                    {isIqTest ? (
                      <View style={tw`bg-[#FEF5CB80] rounded-xl p-10`}>
                        <Text style={tw`text-2xl font-semibold text-center`}>
                          {currentQuestion?.question}
                        </Text>
                      </View>
                    ) : (
                      <Text style={tw`text-base text-center`}>
                        {currentQuestion?.question}
                      </Text>
                    )}

                    <ScrollView
                      contentContainerStyle={tw`mt-3 pb-28 mb-5`}
                      // style={tw`flex-1`}
                      showsVerticalScrollIndicator={false}
                    >
                      <FlatList
                        data={currentQuestion?.options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <Pressable
                            onPress={() =>
                              dispatch(
                                setAnswer({
                                  questionNo: currentQuestion!.questionNo,
                                  answer: item.option,
                                  points: +item.points,
                                })
                              )
                            }
                          >
                            <View
                              style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]
                              ${
                                answer?.answer === item.option
                                  ? "bg-purple-200 border-purple-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <Text>
                                {item.optionlabel}. {item.option}
                              </Text>
                              <MaterialIcons
                                name={
                                  answer?.answer === item.option
                                    ? "check-circle"
                                    : "radio-button-unchecked"
                                }
                                size={24}
                                color={
                                  answer?.answer === item.option
                                    ? "purple"
                                    : "#E3E1E9"
                                }
                              />
                            </View>
                          </Pressable>
                        )}
                        ListEmptyComponent={<Text>No options available</Text>}
                        scrollEnabled={false}
                      />
                    </ScrollView>
                  </View>
                  <CustomButton
                    title="Next"
                    containerStyles="bg-secondary-DEFAULT w-full mt-1"
                    textStyles="text-primary"
                    handlePress={handleNext}
                    disabled={!answer}
                  />
                </View>
              </View>
            </View>

            <View style={tw`p-4`}>
              <Text style={tw`text-secondary-DEFAULT text-right`}>
                {currentQuestionNo} of{" "}
                {getTotalQuestionsForSubCategory(subCategory)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
