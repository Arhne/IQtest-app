import { useState, useMemo, useEffect } from "react";
import { Text, ScrollView, View, Pressable, FlatList } from "react-native";
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
  const [isIqTest, setIsIqTest] = useState(false);

  const [progressData, setProgressData] =
    useState<Record<SubCategories, SubCategoryProgress>>();
  const [recentData, setRecentData] =
    useState<Record<SubCategories, AnsweredDetails>>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [answer, setAnswer] = useState("");
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
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer(""); // Reset the selected answer
    } else {
      // Optionally, navigate to results or summary
      // router.push("/(cat)/results");
    }
  };

  const Icon = SubCategoryConfig[subCategory as SubCategories].interactionicon!;

  // Render the current question
  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient style={tw`flex-1 px-3`} colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw`flex-1`}>
            <Pressable
              onPress={() => router.back()}
              style={tw`justify-start flex-col p-2`}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            {/* Main Content */}
            <View style={tw`flex-1 bg-primary rounded-xl p-5 top-24 mb-8`}>
              {/* Top Positioned Icon */}
              {isIqTest && (
                <View style={tw`absolute left-[25%] top-[-38] z-10`}>
                  <Icon width={220} height={210} />
                </View>
              )}

              {/* Scrollable content */}
              <ScrollView
                contentContainerStyle={tw`mt-3 gap-6 pb-28 mb-5`}
                style={tw`flex-1`}
                showsVerticalScrollIndicator={false}
              >
                <View style={tw`mt-10`}>
                  <Text style={tw`text-2xl text-center`}>
                    Progress Bar Line
                  </Text>

                  {/* Header image */}
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
                    General IQ
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

                    {/* Options section */}
                    <FlatList
                      data={currentQuestion?.options}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <Pressable onPress={() => setAnswer(item.option)}>
                          <View
                            style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]
                              ${
                                answer === item.option
                                  ? "bg-purple-200 border-purple-500"
                                  : "border-gray-300"
                              }`}
                          >
                            <Text>
                              {item.optionlabel}. {item.option}
                            </Text>
                            <MaterialIcons
                              name={
                                answer === item.option
                                  ? "check-circle"
                                  : "radio-button-unchecked"
                              }
                              size={24}
                              color={
                                answer === item.option ? "purple" : "#E3E1E9"
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
                    handlePress={handleNextQuestion}
                    disabled={!answer}
                  />
                </View>
              </ScrollView>
            </View>

            {/* Footer text positioned at the bottom */}
            <View style={tw`p-4`}>
              <Text style={tw`text-secondary-DEFAULT text-right`}>
                {currentQuestionIndex + 1} of {questionsData.length}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
