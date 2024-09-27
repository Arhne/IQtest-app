import { View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { icons } from "@/constants";
import { Redirect, router } from "expo-router";
import CustomFormInput from "@/components/CustomFormInput";
import CustomCard from "@/components/CustomCard";
import { CustomButton } from "@/components/CustomButton";

const support = () => {
  const [supportTextArea, setSupportTextArea] = useState("");
  const [supportSubject, setSupportSubject] = useState("");

  const handleText = (text: string) => {
    setSupportTextArea(text);
  };
  const handleEmailChange = (text: string) => {
    setSupportSubject(text);
  };
  return (
    <ThemedView style={tw`w-full flex-1 px-5`}>
      <SafeAreaView style={tw`flex-1 w-full`}>
        <Pressable onPress={() => router.back()} style={tw`mb-3`}>
          <icons.BackIcon />
        </Pressable>

        <View style={tw`mb-10`}>
          <ThemedText style={tw`text-4xl mb-1 font-medium`}>Support</ThemedText>
          <ThemedText style={tw`text-[#57575B]`}>
            Send us a message
          </ThemedText>
        </View>
        <View style={tw`flex-1 justify-between`}>
          <View style={tw`gap-6`}>
            <CustomFormInput
              title="Subject"
              value={supportSubject}
              placeholder="Subject of issue"
              handleChangeText={handleEmailChange}
              heightStyle="50"
            />
            <CustomFormInput
              title="How can we help?"
              heightStyle="200"
              value={supportTextArea}
              placeholder="Please write your issue here"
              handleChangeText={handleText}
              multiline={true}
              numberOfLines={5}
            />

            <View>
              <ThemedText>Receive Newsletter</ThemedText>
            </View>
          </View>
          <CustomButton
            title="Submit"
            containerStyles="bg-secondary-DEFAULT w-full mt-1"
            textStyles="text-primary"
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default support;
