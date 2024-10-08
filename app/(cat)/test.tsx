import { useState, useMemo, useEffect } from "react";
import { Text, ScrollView, View, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/twrnc-config";
import { router, useLocalSearchParams } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SubCategories } from "@/data/enum";
import { Assessment } from "@/data/categories";
import { loadProgress } from "@/utils/helper-functions";
import { SubCategoryConfig } from "@/data/data-config";

// Example code
const TestInstructions = () => {
  const [progressData, setProgressData] =
    useState<Record<SubCategories, SubCategoryProgress>>();
  const [recentData, setRecentData] =
    useState<Record<SubCategories, AnsweredDetails>>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [answer, setAnswer] = useState("")
  const fetchData = async () => {
    const { progress, recent } = await loadProgress();
    if (progress && recent) {
      setProgressData(progress);
      setRecentData(recent);
    }
  };

  const params = useLocalSearchParams();
  const subCategory = params.subCategory as SubCategories;

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      // Optionally, navigate to a results or summary page when all questions are done
      // router.push("/(cat)/results");
    }
  };

  const Icon = SubCategoryConfig[subCategory as SubCategories].interactionicon!;

  // Render the current question
  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1 `}>
        <LinearGradient style={tw`h-full px-3`} colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw``}>
            <Pressable
              onPress={() => router.back()}
              style={tw`justify-start flex-col p-2`}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <ScrollView
              style={tw`bg-primary w-full h-[100%] overflow-scroll p-5 gap-6 top-28 rounded-xl relative`}>
              <View style={tw`mt-10 flex-col h-full flex-1 justify-between`}>
                <Text style={tw`text-2xl text-center`}>Progress Bar Line</Text>
                <Text style={tw`font-semibold text-2xl text-center`}>
                  General IQ
                </Text>
                <View style={tw`gap-4`}>
                  {/* Display current question */}
                  <Text style={tw`text-base text-center`}>
                    Question {currentQuestionIndex + 1}
                  </Text>
                  <Text style={tw`text-base text-center`}>
                    {currentQuestion?.question}
                  </Text>
                  <View style={tw`bg-[#FEF5CB80] rounded-xl p-10`}>
                    <Text style={tw`text-2xl font-semibold text-center`}>
                      {/* {currentQuestion?.options.join(" ")} Show options */}
                    {currentQuestion?.question}

                    </Text>
                  </View>

                  <ScrollView>
                    <View>
                      {currentQuestion?.options.map((option, index) => (
                        <Pressable
                        key={index}
                        onPress={() => setAnswer(option.option)}
                        >

                        <View                        
                          
                          style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]`}>
                          <Text>{option.option}</Text>
                          <MaterialIcons
                            name="radio-button-unchecked"
                            size={24}
                            color={answer === option.option ? "red" :"#E3E1E9"}
                          />
                        </View>
                        </Pressable>

                      ))}
                    </View>
                  </ScrollView>
                </View>
                {/* Show "Next" button */}
                <CustomButton
                  title="Next"
                  containerStyles="bg-secondary-DEFAULT w-full mt-1"
                  textStyles="text-primary"
                  handlePress={handleNextQuestion}
                  // disabled={currentQuestionIndex >= questionsData.length - 1} // Disable on the last question
                />
              </View>
            </ScrollView>
            <Text style={tw`text-secondary-DEFAULT`}>
              {currentQuestionIndex + 1} of {questionsData.length}
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
