import { View, ScrollView } from "react-native";
import React, { useState } from "react";
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PremiumScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(false)
  return (
    <SafeAreaView>
     <ScrollView  showsVerticalScrollIndicator={false}>
        <ThemedView
          style={[
            tw`w-full p-5 items-center justify-center`,
            { minHeight: "85vh" },
          ]}
        >
           
          <View style={tw`w-full gap-6`}>
            <View style={tw`flex-row justify-end`}>
              <Ionicons
                name="close-outline"
                size={32}
                color="black"
                onPress={() => router.push("/(tabs)")}
              />
            </View>
            <View style={tw`gap-4`}>
              <ThemedText style={tw`text-center text-xl font-intbold`}>
                Choose your plan
              </ThemedText>
              <ThemedText style={tw`text-center`}>
                PRO version gives you access to our HUB and so much more
              </ThemedText>
            </View>
            <View style={tw`border-b w-full border-[#E3E1E9] gap-5`}>
              <CustomCard
                icon={<MaterialIcons name={selectedPlan ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={selectedPlan ? "#8D0CCA" : "black"} />}
                title="9.99/month"
                titleStyle="text-xl"
                pricedesc="Get 7 days of free trial"
                otherStyles="bg-accent-100"
              />
              <CustomCard
              icon={<MaterialIcons name={selectedPlan ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={selectedPlan ? "#8D0CCA" : "black"} />}
                title="89.99/year"
                titleStyle="text-xl"
                pricedesc="Billed annually"
                otherStyles="bg-accent-200 mb-6"
              />
            </View>

            <CustomWarning warning="Overall progress will only be unlocked on the PRO version which shows the overall progress on all tests taken and give a definite conclusion about your personality and cognitive ability. Also you will unlock the locked tests in PRO version." />

            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`border-b-2 border-gray-100`}>
                <Link href="/terms" style={tw`text-gray-100`}>Terms of service</Link>
              </View>
              <View style={tw`border-b-2 border-gray-100`}>
                <Link href="/policy" style={tw`text-gray-100`}>Privacy Policy</Link>
              </View>
            </View>
            <CustomButton
              title="Start Free Trials"
              handlePress={() => {router.replace("/(tabs)/")}}
              containerStyles="bg-secondary-DEFAULT w-full mt-1"
              textStyles="text-primary"
            />
          </View>
        
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PremiumScreen;
