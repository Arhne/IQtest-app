import { View, Alert, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "@/twrnc-config";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomCard from "@/components/CustomCard";
import CustomWarning from "@/components/CustomWarning";
import { CustomButton } from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { icons } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PremiumScreen() {

  const [selectedPlan, setSelectedPlan] = useState(false);

  const handleStartTrialClick = () => {
    if (!selectedPlan) {
      Alert.alert(
        "Plan Required",
        "Please select a plan before starting your free trial."
      );
    } else {
      router.replace("/(cat)/subscription");
    }
  };

  const handleClickAction = () => {
    setSelectedPlan((prev) => !prev);
  };

  return (
    <SafeAreaView>
      <ThemedView style={[tw`p-5 w-full h-full`]}>
        <View style={tw`flex-1 justify-between gap-8`}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <Pressable style={tw`flex-row justify-end`} onPress={() => router.replace("/(tabs)/")}>
            <Ionicons
              name="close-outline"
              size={32}
              color="black"
            />
          </Pressable>
          <View style={tw`gap-4`}>
            <ThemedText style={tw`text-center text-xl font-intbold`}>
              Choose your plan
            </ThemedText>
            <ThemedText style={tw`text-center`}>
              PRO version gives you access to our HUB and so much more
            </ThemedText>
          </View>

          <CustomCard
            icon={
              <MaterialIcons
                name={
                  selectedPlan
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={selectedPlan ? "#8D0CCA" : "#8D0CCA"}
              />
            }
            title="7.99/week"
            titleStyle="text-xl"
            pricedesc="Get 3 days of free trial"
            otherStyles="bg-accent-100"
            handleClick={handleClickAction}
          />
          {/* <CustomCard
              icon={<MaterialIcons name={selectedPlan ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={selectedPlan ? "#8D0CCA" : "black"} />}
                title="89.99/year"
                titleStyle="text-xl"
                pricedesc="Billed annually"
                otherStyles="bg-accent-200 mb-6"
              /> */}

          <View style={tw`border-b border-[#E3E1E9]`} />
          <CustomWarning warning="Overall progress will only be unlocked on the PRO version which shows the overall progress on all tests taken and give a definite conclusion about your personality and cognitive ability. Also you will unlock the locked tests in PRO version." />

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`border-b-2 border-gray-100`}>
              <Link href="/terms" style={tw`text-gray-100`}>
                Terms of service
              </Link>
            </View>
            <View style={tw`border-b-2 border-gray-100`}>
              <Link href="/policy" style={tw`text-gray-100`}>
                Privacy Policy
              </Link>
            </View>
          </View>
          <CustomButton
            title="Start Free Trial"
            handlePress={handleStartTrialClick}
            containerStyles="bg-secondary-DEFAULT w-full mt-1"
            textStyles="text-primary"
          />
          {/* </ScrollView> */}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

