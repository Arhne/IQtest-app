import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { onboarding } from "./onboarding";
import tw from "@/twrnc-config";
import ThreeInOneProgressBar from "@/components/ProgressBar";

const OnboardingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let pageref: any;

  const onClickNext = () => {
    try {
      const nextIndex = currentIndex + 1;
      if (nextIndex < onboarding.length) {
        setCurrentIndex(nextIndex);
        pageref.scrollToIndex({ animated: true, index: nextIndex });
      } else {
        router.replace('/premium');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const skipToPayment = () => {
    try {
      if (currentIndex < onboarding.length) {
        router.replace('/premium');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const progressValues = [
    [100, 0, 0],   
    [100, 100, 0],  
    [100, 100, 100],
  ];

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <View style={tw`w-full h-full p-5`}>

      <ThreeInOneProgressBar 
      progress1={progressValues[currentIndex][0]}
      progress2={progressValues[currentIndex][1]}
      progress3={progressValues[currentIndex][2]} 
      />

        <FlatList
          data={onboarding}
          keyExtractor={(item) => item.id}
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={(ref) => {
            pageref = ref;
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width: Dimensions.get("screen").width * 0.85,
                marginRight: 20,
                padding: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={tw`text-center p-4 text-base font-medium`}>
                {`${item.id} of 3 steps`}
              </Text>
              <Image
                source={item.image}
                style={tw`max-w-[323px] w-full h-[313px]`}
                resizeMode="contain"
              />
              <View style={tw`mt-7`}>
                <Text
                  style={tw`text-[32px]/[39.79px] font-semibold text-center`}
                >
                  {item.title}
                </Text>
                <Text style={tw`leading-[16.94px] text-center p-4`}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />

        <CustomButton
          title="Skip"
          handlePress={() => skipToPayment()}
          containerStyles="hover:border-2 hover:border-solid w-full hover:border-secondary-DEFAULT"
          textStyles="text-secondary-DEFAULT"
        />
        <CustomButton
          title="Next"
          handlePress={() => onClickNext()}
          containerStyles="bg-secondary-DEFAULT w-full mt-1"
          textStyles="text-primary"
        />
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default OnboardingPage;
