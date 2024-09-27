import { View, ScrollView, Pressable, } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { icons, } from "@/constants";
import { Redirect, router } from "expo-router";
import CustomFormInput from '@/components/CustomFormInput';
import CustomCard from '@/components/CustomCard';
import { CustomButton } from '@/components/CustomButton';

const suggestions = () => {

  const [textArea, setTextArea] = useState("");
  const [email, setEmail] = useState("");

  const handleText = (text: string) =>{
    setTextArea(text);
  }
  const handleEmailChange = (text: string) =>{
    setEmail(text);
  }
  return (
    <ThemedView style={tw`w-full flex-1 px-5`}>
      <SafeAreaView style={tw`flex-1 w-full`}>
        <Pressable
          onPress={() => router.back()}
          style={tw`mb-3`}
        >
          <icons.BackIcon />
        </Pressable>


        
        <View style={tw`mb-10`}>
          <ThemedText style={tw`text-4xl mb-1 font-medium`}>
          Make a suggestion
          </ThemedText>
          <ThemedText style={tw`text-[#57575B]`}>Please review your request below</ThemedText>
          
        </View>
        <View style={tw`flex-1 justify-between`}>
        <View style={tw`gap-6`}>
            <CustomFormInput
            heightStyle="200"
            value={textArea}
            placeholder='Write your requests here!'
            handleChangeText={handleText}
            multiline= {true}
            numberOfLines= {5}
            />

           <CustomFormInput
           title='Email'
            value={email}
            placeholder='Enter your email'
            handleChangeText={handleEmailChange}
            heightStyle="50"
           
            />
           

          <View>
            <ThemedText>Receive Newsletter</ThemedText>
          </View>
          </View>
          <CustomButton
          title='Submit'
          containerStyles="bg-secondary-DEFAULT w-full mt-1"
          textStyles="text-primary"
          />
          </View>
        </SafeAreaView>
        </ThemedView>
  )
}

export default suggestions