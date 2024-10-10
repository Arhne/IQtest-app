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
  const [isIqTest, setIsIqTest] = useState("");
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;

  // Selectors to get data from the Redux store
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const answer = useAppSelector((state) => state.questions.answer);
  const initialIndexValue =
    progressData[subCategory] && progressData[subCategory].answered
      ? progressData[subCategory].answered
      : 1;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialIndexValue - 1
  );

  // Memoized questions for the current subcategory
  const questionsData = useMemo(() => {
    const attemptedQuestions =
      recentData?.[subCategory]?.questionsAnswered.map(
        (ques) => ques.questionNo
      ) ?? [];

    return Assessment.reduce((acc, item) => {
      if (
        item.subcategoryId === subCategory &&
        !attemptedQuestions.includes(item.questionNo)
      ) {
        acc.push(item);
      }
      return acc;
    }, [] as typeof Assessment);
  }, [subCategory, recentData, Assessment]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      dispatch(setAnswer(undefined)); // Reset the selected answer
    } else {
      router.push({ pathname: "/(cat)/result", params: { subCategory } });
    }
  };

  const handleNext = () => {
    handleAnswerQuestion(
      currentQuestion.questionNo,
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

  // Get the current question from the questionsData array
  const currentQuestion = questionsData[currentQuestionIndex];

  const progressPercent = useMemo(() => {
    if (Object.keys(progressData).length === 0) return 0;
    return calcPercentage(
      progressData[subCategory]?.answered ?? 0,
      progressData[subCategory]?.total ?? 0
    );
  }, [progressData]);

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient style={tw`flex-1 px-3`} colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw`flex-1`}>
            <Pressable
              onPress={() => {
                router.back();
              }}
              style={tw`justify-start flex-col p-2`}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View style={tw`flex-1 bg-primary rounded-xl p-5 top-24 mb-8`}>
              {isIqTest && (
                <View style={tw`absolute left-[25%] top-[-38] z-10`}>
                  <Icon width={220} height={210} />
                </View>
              )}

              <ScrollView
                contentContainerStyle={tw`mt-3 gap-6 pb-28 mb-5`}
                style={tw`flex-1`}
                showsVerticalScrollIndicator={false}>
                <View style={tw`mt-10`}>
                  <LinearProgressBar progress={progressPercent} />

                  {!isIqTest && (
                    <View style={tw`mx-auto`}>
                      <MaterialIcons
                        name="pie-chart"
                        size={80}
                        color="#6C63FF"
                      />
                    </View>
                  )}

                  <Text style={tw`font-semibold text-2xl text-center`}>
                    {SubCategoryConfig[subCategory].title}
                  </Text>

                  <View style={tw`gap-4`}>
                    <Text style={tw`text-base text-center`}>
                      Question {currentQuestionIndex + 1}
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

                    <FlatList
                      data={currentQuestion?.options}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <Pressable
                          onPress={() =>
                            dispatch(
                              setAnswer({
                                questionNo: currentQuestion.questionNo,
                                answer: item.option,
                                points: +item.points,
                              })
                            )
                          }>
                          <View
                            style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]
                              ${
                                answer?.answer === item.option
                                  ? "bg-purple-200 border-purple-500"
                                  : "border-gray-300"
                              }`}>
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
                  </View>
                  <CustomButton
                    title="Next"
                    containerStyles="bg-secondary-DEFAULT w-full mt-1"
                    textStyles="text-primary"
                    handlePress={handleNext}
                    disabled={!answer}
                  />
                </View>
              </ScrollView>
            </View>

            <View style={tw`p-4`}>
              <Text style={tw`text-secondary-DEFAULT text-right`}>
                {currentQuestionIndex + 1} of{" "}
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
