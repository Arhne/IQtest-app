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
import Ionicons from "@expo/vector-icons/Ionicons";
import { UnorderedList } from "@/components/CustomWarning";

const paymentPlan = [
  {
    price: "$7.99/week",
    plan: "WEEKLY",
    duration: "3 days free trial",
    description: "then $7.99 per week. Cancel anytime.",
  },
  // {
  //   price: "$10.33/month",
  //   plan: "MONTHLY",
  //   duration: "7 days free trial",
  //   description: "then $10.33 per month. Cancel anytime.",
  // },
  // {
  //   price: "$120.33/month",
  //   plan: "ANNUALLY",
  //   duration: "14 days free trial",
  //   description: "then $120.33 per year. Cancel anytime.",
  // },
];

export default function SingleResult() {
  const [showSubscriptionBills, setShowSubscriptionBills] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const handleShowbills = () => {
    setShowSubscriptionBills((prev) => !prev);
  };

  const handlePayment = () => {
    setShowPaymentMethod((prev) => !prev);
  };

  const listItems = [
    "You’ve already participated in the free trial.",
    "Cancel at anytime in the Subscriptions on the Google Play.",
    "Play Pass will automatically be shared with your family members.",
  ];
  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <View style={tw`flex-1 px-5`}>
          <View style={tw`flex-row mb-5`}>
            <Pressable onPress={() => router.push("/(tabs)/")} style={tw`justify-start`}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={tw`gap-5 flex-1`}>
              <Image
                source={images.pricingPlan}
                style={tw`max-w-[323px] mx-auto w-full h-[313px]`}
                resizeMode="contain"
              />

              <View style={tw`mb-8`}>
                <ThemedText style={tw`text-2xl font-semibold text-center mb-8`}>
                  Get premium questions and additional contents
                </ThemedText>

                <ThemedText style={tw`text-sm font-normal text-center`}>
                  You’ll get access to all our platform. View and explore your
                  test results in details and other features with no ads.
                </ThemedText>
              </View>

              <View style={tw`p-6 gap-5`}>
                <Text style={tw`text-center text-base`}>
                  Starting at $7.99/week
                </Text>
                <CustomButton
                  title="Next"
                  handlePress={() => handleShowbills()}
                  containerStyles="bg-secondary-DEFAULT w-full mt-1"
                  textStyles="text-primary"
                />
                <CustomButton
                  title="Subscribed already?"
                  handlePress={() => {}}
                  containerStyles="hover:border-2 hover:border-solid w-full hover:border-secondary-DEFAULT"
                  textStyles="text-secondary-DEFAULT"
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {showSubscriptionBills && (
          <View
            style={tw`bg-[#16161690] absolute w-full h-full z-10 top-0 left-0 right-0`}
          >
            <View
              style={[
                tw`bg-primary w-full h-[75%] p-5 flex-col gap-5 z-20 top-2/4`,
                { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
              ]}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`font-semibold text-lg`}>Choose your plan</Text>
                <Pressable onPress={() => handleShowbills()}>
                  <Ionicons name="close-sharp" size={24} color="black" />
                </Pressable>
              </View>
              {/* <ScrollView>
                <View style={tw`gap-5`}> */}
              {paymentPlan.map((item) => (
                <Pressable
                  key={item.plan}
                  style={tw`p-5 ${selectedSubscription ? "border-secondary-DEFAULT" : "border-[#E3E1E9]"} rounded-xl border-2`}
                  onPress={()=> setSelectedSubscription((prev)=>!prev)}
                >
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-[#848288] mb-2`}>
                      {item.plan}
                    </Text>
                    <MaterialIcons
                      name={
                        selectedSubscription
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={24}
                      color={selectedSubscription ? "#8D0CCA" : "#E3E1E9"}
                    />
                  </View>
                  <View style={tw`gap-2`}>
                    <Text style={tw`font-semibold text-lg`}>{item.price}</Text>
                    <View
                      style={tw`rounded-2xl w-[130px] py-1 px-2 bg-[#F4FBC9]`}
                    >
                      <Text style={tw` rounded-2xl  text-[#76A400]`}>
                        {item.duration}
                      </Text>
                    </View>
                    <Text>{item.description}</Text>
                  </View>
                </Pressable>
              ))}
              {/* </View>
              </ScrollView> */}
              <CustomButton
                title="Continue to checkout"
                handlePress={() => handlePayment()}
                containerStyles="bg-secondary-DEFAULT w-full mt-1"
                textStyles="text-primary"
              />
            </View>
          </View>
        )}

        {showPaymentMethod && (
          <View
            style={tw`bg-[#16161690] absolute w-full h-full z-30 top-0 left-0 right-0`}
          >
            <View
              style={[
                tw`bg-primary w-full h-[95%] p-5 flex-col gap-6 z-40 top-30`,
                { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
              ]}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Ionicons name="logo-google" size={24} color="black" />
                  <Text style={tw`font-normal text-lg ml-3`}>Play</Text>
                </View>
                <Pressable
                  onPress={() =>
                    // router.push("/(cat)/subscription")
                    handlePayment()
                  }
                >
                  <Ionicons name="close-sharp" size={24} color="black" />
                </Pressable>
              </View>
              {/* <ScrollView>
                <View style={tw`gap-5`}> */}
              <View style={tw`flex-row items-center`}>
                <Image source={images.holon} style={tw`max-w-[50px] mr-5 h-[50px]`} resizeMode="contain"/>
                <View>
                  <Text style={tw`font-semibold text-base mb-2`}>Holon Labs</Text>
                  <Text style={tw`font-medium`}>Weekly subscription</Text>
                </View>
              </View>

              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`font-semibold text-base`}>Starting today</Text>
                <Text style={tw`font-semibold text-base`}>$7.99/week</Text>
              </View>

              <View style={tw`my-4`}>
                <Text style={tw`mb-4`}>See included tax </Text>
                <UnorderedList items={listItems} />
              </View>

              <View style={tw`border-t border-b py-8 border-[#EAE8EE] flex-row items-center`}>
              <Image source={images.holon} style={tw`max-w-[60px] mr-5 h-[50px]`} resizeMode="contain"/>
                <Text style={tw`text-base`}>28******45@upi</Text>
              </View>

              <View style={tw`mb-8`}>
                <Text style={tw`mb-3 font-semibold`}>
                  You’ll be charged $7.99 automatically every week until you
                  cancel.{" "}
                  <Text style={tw`font-normal underline`}>
                    Learn how to cancel
                  </Text>
                </Text>
                <Text>
                  By tapping “Subscribe” you accept the following Google
                  Payments Terms of Service:
                  <Text style={tw`underline`}>
                    {" "}
                    Terms of Service - Buyer (USA). Privacy Notice.
                  </Text>
                </Text>
              </View>
              {/* </View>
              </ScrollView> */}
              <CustomButton
                title="Subscribe"
                handlePress={() => router.replace("/paymentSuccess")}
                containerStyles="bg-[#3C8665] w-full mt-1"
                textStyles="text-primary"
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}
