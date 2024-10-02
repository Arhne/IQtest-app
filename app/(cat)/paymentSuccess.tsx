import { Pressable, Image, Text, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const PaymentSuccesful = () => {



  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView style={tw`w-full flex-1`}>
        <View style={tw`flex-1 px-5`}>
          <View style={tw`flex-row mb-5`}>
            <Pressable onPress={() => router.back()} style={tw`justify-start`}>
              <icons.BackIcon />
            </Pressable>
          </View>

          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={tw`gap-7 flex-1 justify-center`}>
              <Image
                source={images.successfulPayment}
                style={tw`max-w-[323px] mx-auto w-full h-[313px]`}
                resizeMode="contain"
              />

              <View style={tw`mb-8`}>
                <ThemedText style={tw`text-2xl font-semibold text-center mb-8`}>
                Thank you!
                </ThemedText>

                <ThemedText style={tw`text-sm font-normal text-center`}>
                Your payment is successfully processed! You’ll receive a confirmation email shortly.
                </ThemedText>
              </View>

                <CustomCard
                  icon={<MaterialCommunityIcons name="printer-outline" size={24} color="#00BCBF" />}
                  title="Get Receipt"
                  otherStyles="bg-[#F8F7F9] mb-8"
                  textoricon ={<MaterialIcons name="arrow-forward-ios" size={24} color="black" />}
                  
                />

                <CustomButton
                  title="Continue"
                  handlePress={() => {router.push("/(tabs)/")}}
                  containerStyles="bg-secondary-DEFAULT w-full mt-1"
                  textStyles="text-primary"
                />
             
            </View>
          {/* </ScrollView> */}
        </View>
        </SafeAreaView>
        </ThemedView>
  )}
  export default PaymentSuccesful