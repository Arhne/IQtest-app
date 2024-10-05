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

  const handleCategorySelect = (category: ISubCategory) => {
    setSelectedCategory(category);
  };

  return (
    <ThemedView style={tw`flex-1 w-full h-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient
          style={tw`h-full px-3`}
          colors={["#D568EF", "#FFF", "#FFF"]}
        >
          <View style={tw``}>
            <Pressable
              onPress={() => router.back()}
              style={tw`justify-start flex-col p-2`}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>

            <View
              style={tw`bg-primary w-full h-[80%] p-5 gap-6 top-32 rounded-xl relative`}
            >
              {selectedCategory.categoryId === 2 ? (
                <View style={tw`absolute top-[-38]`}>
                  <selectedCategory.interactionicon width={220} height={210} />
                </View>
              ) : (
                <View style={tw`absolute flex-1 left-[25%] top-[-38]`}>
                  <selectedCategory.interactionicon width={220} height={210} />
                </View>
              )}

              <View style={tw`mt-10 flex-col h-full justify-between`}>
                <Text style={tw`font-semibold text-2xl`}>General IQ</Text>
                <View style={tw`gap-4`}>
                  <Text style={tw`text-base`}>Objective</Text>
                  <Text style={tw`leading-5`}>
                    Spatial reasoning tests is used to assess your capacity to
                    manipulate 2D and 3D objects, spot patterns between shapes,
                    and to visualise movements and change in those shapes. This
                    could include identifying which answer option is a rotation
                    of a given 2D image.
                  </Text>
                </View>
                {}
                <CustomWarning warning="There is no time limit in this test. Please complete the questions as accurately as you can. At the end, you will be able to view detailed results of your progress." />
                <CustomButton
                  title="Begin test"
                  containerStyles="bg-secondary-DEFAULT w-full mt-1"
                  textStyles="text-primary"
                  handlePress={() =>router.push("/(cat)/test")}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
