import { useMemo, useEffect, useState, useCallback } from "react";
import {
  Text,
  ScrollView,
  View,
  Pressable,
  FlatList,
  Alert,
  Image,
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
import { setAnswer } from "@/redux/question-reducer";
import { useAppDispatch, useAppSelector } from "@/redux";
import CustomLoader from "@/components/CustomLoader";

const TestInstructions = () => {
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;
  const isIqTest =
    SubCategoryConfig[subCategory].categories === Categories.IQ_TEST;

  // Selectors to get data from the Redux store
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const answer = useAppSelector((state) => state.questions.answer);
  const [isLoading, setIsLoading] = useState(false);

  const [hasRecentData, hasProgressData] = useMemo(() => {
    return [
      Object.keys(recentData).length > 0,
      Object.keys(progressData).length > 0,
    ];
  }, [recentData, progressData]);
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
      answer?.questionLabel ?? "",
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

  const generateProgressPercent = useCallback(
    (item: SubCategories) => {
      if (recentData[item] && hasRecentData) {
        const answered = recentData[item].questionsAnswered
            ? recentData[item].questionsAnswered.length
            : 0,
          total = getTotalQuestionsForSubCategory(item);
        return calcPercentage(answered, total);
      } else {
        return calcPercentage(0, getTotalQuestionsForSubCategory(item));
      }
    },
    [hasRecentData, recentData, getTotalQuestionsForSubCategory, subCategory] // dependencies
  );

  const [displayText, setDisplayText] = useState(currentQuestion?.question);

  const isMemorable = useMemo(() => {
    return (
      subCategory === SubCategories.MEMORY &&
      displayText === currentQuestion?.question
    );
  }, [subCategory, displayText, currentQuestion?.question]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Check if the subcategory is "MEMORIES"
    if (subCategory === SubCategories.MEMORY) {
      // Show the question for 3 seconds
      setDisplayText(currentQuestion?.question);
      timer = setTimeout(() => {
        setDisplayText("Select the Correct Option");
      }, 4000);
    } else {
      // Otherwise, always show the question
      setDisplayText(currentQuestion?.question);
    }

    // Clean up the timer if the component unmounts or subCategory changes
    return () => clearTimeout(timer);
  }, [currentQuestion?.question, subCategory]);

  useEffect(() => {
    if (questionsData.length > 0) {
      setCurrentQuestionNo(questionsData[0].questionNo);
    }
  }, [questionsData]);

  const isGeneral = subCategory === SubCategories.GENERAL;


  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient
          style={tw`flex-1 px-3 relative`}
          colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw`flex-1`}>
            <Pressable
              onPress={() => {
                router.back();
                dispatch(setAnswer(undefined));
              }}
              style={tw`justify-start flex-col p-2`}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View
              style={tw`flex-1 w-full bg-primary rounded-xl p-5 mb-8 absolute ${
                isIqTest ? "top-28 h-[84%]" : "top-20 h-[88%]"
              }`}>
              {isIqTest && (
                <View style={tw`absolute left-[25%] top-[-30] z-10`}>
                  <Icon width={220} height={160} />
                </View>
              )}

              <FlatList
                data={currentQuestion?.options}
                keyExtractor={(item, index) => item.option}
                ListHeaderComponent={() => (
                  <View style={tw`my-6 gap-3 `}>
                    <LinearProgressBar
                      progress={generateProgressPercent(subCategory)}
                    />
                    {!isIqTest && (
                      <View style={tw`mx-auto`}>
                        <Icon width={220} height={160} />
                      </View>
                    )}
                    <Text style={tw`font-semibold text-2xl text-center`}>
                      {SubCategoryConfig[subCategory].title}
                    </Text>
                    <Text style={tw`text-lg text-center`}>
                      Question {currentQuestionNo}
                    </Text>
                    {isGeneral ? (
                      <Image
                        source={{ uri: displayText }} // Your Cloudinary image URL
                        style={tw`w-full h-48 `} // Make sure to provide a height and width
                        resizeMode="contain" // Optional: to scale the image
                      />
                    ) : (
                      <View style={tw`bg-[#FEF5CB80] rounded-xl p-10 mb-5`}>
                        <Text style={tw`text-2xl font-semibold text-center`}>
                          {displayText}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                renderItem={({ item }) =>
                  !isMemorable ? (
                    <Pressable
                      onPress={() =>
                        dispatch(
                          setAnswer({
                            questionNo: currentQuestion!.questionNo,
                            answer: item.option,
                            points: +item.points,
                            questionLabel: item.optionlabel,
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
                        {isGeneral ? (
                          <View style={tw`flex-row gap-[10px]`}>
                            <Text>{item.optionlabel}</Text>
                            <Image
                              source={{ uri: item.option }}
                              style={tw`w-full h-28`} // Make sure to provide a height and width
                              resizeMode="contain" // Optional: to scale the image
                            />
                          </View>
                        ) : (
                          <Text>
                            {item.optionlabel}.{"  "}
                            {item.option}
                          </Text>
                        )}

                        <MaterialIcons
                          name={
                            answer?.answer === item.option
                              ? "check-circle"
                              : "radio-button-unchecked"
                          }
                          size={24}
                          color={
                            answer?.answer === item.option
                              ? "#8D0CCA"
                              : "#E3E1E9"
                          }
                        />
                      </View>
                    </Pressable>
                  ) : (
                    <View style={tw`justify-center align-center`}></View>
                  )
                }
                ListFooterComponent={() => (
                  <CustomButton
                    title="Next"
                    containerStyles="bg-secondary-DEFAULT w-full mt-1"
                    textStyles="text-primary"
                    handlePress={handleNext}
                    disabled={!answer}
                  />
                )}
                ListEmptyComponent={<Text>No options available</Text>}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={tw`p-4`}>
              <Text style={tw`text-secondary-DEFAULT top-[741px] text-right`}>
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
