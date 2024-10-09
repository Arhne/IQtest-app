import {
  Text,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/twrnc-config";
import { router, useLocalSearchParams } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomWarning from "@/components/CustomWarning";
import { SubCategoryConfig } from "@/data/data-config";
import { SubCategories } from "@/data/enum";

const TestInstructions = () => {
  const { subCategory } = useLocalSearchParams();

  const Icon = SubCategoryConfig[subCategory as SubCategories].interactionicon!;

  return (
    <ThemedView style={tw`flex-1 w-full`}>
      <SafeAreaView style={tw`flex-1`}>
        <LinearGradient
          style={tw`flex-1 px-3`}
          colors={["#D568EF", "#FFF", "#FFF"]}
        >
          {/* Top bar with back button */}
          <Pressable
            onPress={() => router.back()}
            style={tw`p-2`}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
          </Pressable>

          {/* Main Content */}
          <View style={tw`bg-primary flex-1 p-5 mt-36 rounded-xl relative`}> 
            {/* Top Positioned Icon */}
            <View style={tw`absolute top-[-38] z-10`}>
              <Icon width={220} height={210} />
            </View>

            {/* Scrollable Content */}
            <ScrollView
              contentContainerStyle={tw`mt-10 gap-6 pb-28`} 
              style={tw`flex-1`}
              showsVerticalScrollIndicator ={false}
            >
              <Text style={tw`font-semibold text-2xl`}>
                {SubCategoryConfig[subCategory as SubCategories].title}
              </Text>
              <View style={tw`gap-2`}>
                <Text style={tw`text-base`}>Objective</Text>
                <Text style={tw`leading-5`}>
                  {SubCategoryConfig[subCategory as SubCategories].objective}
                </Text>
              </View>

              {/* Warning and Begin Test Button */}
              <CustomWarning warning="There is no time limit in this test. Please complete the questions as accurately as you can. At the end, you will be able to view detailed results of your progress." />
              
              {/* Add some spacing before the button  */}
              <View style={tw`mt-4`}>
                <CustomButton
                  title="Begin test"
                  containerStyles="bg-secondary-DEFAULT w-full"
                  textStyles="text-primary"
                  handlePress={() =>
                    router.push({
                      pathname: "/(cat)/test",
                      params: { subCategory },
                    })
                  }
                />
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default TestInstructions;
