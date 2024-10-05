import {
  Image,
  Dimensions,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/twrnc-config";
import { router } from "expo-router";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomWarning from "@/components/CustomWarning";

type ISubCategory = {
  id: string;
  interactionicon: any;
  heading: string;
  subtitle: string;
  progress: string;
  categoryId: number;
};
const subcategories = [
  {
    id: "generalIQ",
    interactionicon: icons.Alzheimer,
    heading: "General IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "emotionalIQ",
    interactionicon: icons.Emotions,
    heading: "Emotional IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "logicalIQ",
    interactionicon: icons.Logical,
    heading: "Logical IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "memoryIQ",
    interactionicon: icons.Alzheimer,
    heading: "Memory IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
];

const TestInstructions = () => {
  const [selectedCategory, setSelectedCategory] = useState<ISubCategory>(
    subcategories[3]
  );
  const [selectedOption, setSelectedOption] = useState(false);

  const handleCategorySelect = (category: ISubCategory) => {
    setSelectedCategory(category);
  };

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient style={tw`h-full px-3`} colors={["#8D0CCA", "#D568EF"]}>
          <View style={tw``}>
            <Pressable
              onPress={() => router.back()}
              style={tw`justify-start flex-col p-2`}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View
              style={tw`bg-primary w-full h-[86%] p-5 gap-6 top-28 rounded-xl relative`}
            >
              {selectedCategory.categoryId === 3 ? (
                <View style={tw`absolute flex-1 left-[25%] top-[-38]`}>
                  <selectedCategory.interactionicon width={220} height={210} />
                </View>
              ) : (
                ""
              )}

              <View style={tw`mt-10 flex-col h-full flex-1 justify-between`}>
                <Text style={tw`text-2xl text-center`}>Progress Bar Line</Text>
                <Text style={tw`font-semibold text-2xl text-center`}>
                  General IQ
                </Text>
                <View style={tw`gap-4`}>
                  <Text style={tw`text-base text-center`}>Question 1</Text>
                  <Text style={tw`text-base text-center`}>
                    Which number is the odd one out?
                  </Text>
                  <View style={tw`bg-[#FEF5CB80] rounded-xl p-10`}>
                    <Text style={tw`text-2xl font-semibold text-center`}>
                      263 56 43 786 245 222 98
                    </Text>
                  </View>

                  <ScrollView>
                    <View>
                      {[331, 263, 56, 786, 245].map((item, index) => (
                        <View
                          key={index}
                          style={tw`mb-3 flex-row justify-between items-center p-5 rounded-xl border-2 border-[#D0D5DD]`}
                        >
                          
                            <Text>{item}</Text>
                            <MaterialIcons
                              name={
                                selectedOption
                                  ? "radio-button-checked"
                                  : "radio-button-unchecked"
                              }
                              size={24}
                              color={selectedOption ? "#8D0CCA" : "#E3E1E9"}
                            />
                          
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <CustomButton
                  title="Next"
                  containerStyles="bg-secondary-DEFAULT w-full mt-1"
                  textStyles="text-primary"
                  handlePress={() => router.push("/(cat)/test")}
                />
              </View>

            </View>
            <Text style={tw`text-secondary-DEFAULT`}>1 of 30</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
