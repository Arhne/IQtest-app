import { View, Pressable, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { icons } from "@/constants";
import { Redirect, router } from "expo-router";

const policy = () => {
  return (
    <ThemedView style={tw`w-full flex-1 px-5`}>
      <SafeAreaView style={tw`w-full flex-1`}>
        <Pressable
          onPress={() => router.back()}
          style={tw`mb-3`}
        >
          <icons.BackIcon />
        </Pressable>

        <View style={tw`mb-5`}>
          <ThemedText style={tw`text-4xl mb-5 font-medium`}>
            Terms & Conditions
          </ThemedText>
          <ThemedText style={tw`mb-1 text-[#57575B]`}>Date Modified:</ThemedText>
          <ThemedText style={tw`text-[#848288]`}>15th May, 2023</ThemedText>
        </View>

       
          <ThemedText style={tw`mb-5 font-bold`}>Holon Labs Terms & Conditins Information</ThemedText>
         
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`gap-5`}>
          <View>
            <ThemedText style={tw`mb-1 text-[#6C6C6C]`}>Terms:</ThemedText>
            <ThemedText>
              Lorem ipsum dolor sit amet consectetur. Sed in massa habitasse
              pellentesque a. Id in blandit eget et nulla arcu lobortis donec.
              Velit egestas proin risus nisl faucibus lobortis ullamcorper
              mauris. Enim feugiat amet commodo lectus posuere amet ac placerat.
              Tincidunt tempus posuere in vitae. In morbi tellus mauris et diam
              amet. Justo nisl odio ullamcorper et duis fames pharetra pretium.
              Tellus risus nullam et dictum elit. A porttitor tortor mi egestas
              et.
            </ThemedText>
          </View>
          <View>
            <ThemedText style={tw`mb-1 text-[#6C6C6C]`}>Conditions:</ThemedText>
            <ThemedText>
              Lorem ipsum dolor sit amet consectetur. Sed in massa habitasse
              pellentesque a. Id in blandit eget et nulla arcu lobortis donec.
              Velit egestas proin risus nisl faucibus lobortis ullamcorper
              mauris. Enim feugiat amet commodo lectus posuere amet ac placerat.
              Tincidunt tempus posuere in vitae. In morbi tellus mauris et diam
              amet. Justo nisl odio ullamcorper et duis fames pharetra pretium.
              Tellus risus nullam et dictum elit. A porttitor tortor mi egestas
              et.
            </ThemedText>
          </View>

          <View>
            <ThemedText style={tw`mb-1 text-[#6C6C6C]`}>Other Provisions:</ThemedText>
            <ThemedText>
              Lorem ipsum dolor sit amet consectetur. Sed in massa habitasse
              pellentesque a. Id in blandit eget et nulla arcu lobortis donec.
              Velit egestas proin risus nisl faucibus lobortis ullamcorper
              mauris. Enim feugiat amet commodo lectus posuere amet ac placerat.
              Tincidunt tempus posuere in vitae. In morbi tellus mauris et diam
              amet. Justo nisl odio ullamcorper et duis fames pharetra pretium.
              Tellus risus nullam et dictum elit. A porttitor tortor mi egestas
              et.
            </ThemedText>
          </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default policy;
