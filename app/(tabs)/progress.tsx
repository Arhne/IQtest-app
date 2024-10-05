import {
  Pressable,
  Dimensions,
  FlatList,
  Text,
  ScrollView,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { icons, images } from "@/constants";
import CustomWarning from "@/components/CustomWarning";
import { router } from "expo-router";
// import  { BackIcon }  from '@/constants';

const interactions = [
  {
    id: "test",
    interactionicon: <icons.TestIcon />,
    heading: "start test",
    subtitle: "Take a test",
    progress: "50%",
  },
  {
    id: "result",
    interactionicon: <icons.ResultIcon />,
    heading: "Result",
    subtitle: "Go into details",
    progress: "50%",
  },
  {
    id: "knowledge",
    interactionicon: <icons.KnowledgeIcon />,
    heading: "Knowledge hub",
    subtitle: "Generator",
    progress: "50%",
  },
  {
    id: "apps",
    interactionicon: <icons.AppIcon />,
    heading: "more apps",
    subtitle: "Other test apps",
    progress: "50%",
  },
];
export default function ProgressScreen() {
  const col = 2;
  const screenPadding = 20;
  const gap = 12;
  const screenWidth = Dimensions.get("screen").width - screenPadding * 2;
  const itemWidth = (screenWidth - (col - 1) * gap) / col;
  console.log(itemWidth);
  return (
    <ThemedView style={tw`flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <View style={tw`flex-row items-center mb-5`}>
          <Pressable
            onPress={() => router.back()}
            style={tw`justify-start mr-30`}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>

          <Text style={tw`text-xl font-semibold`}>Test Progress</Text>
        </View>

        <View style={tw`gap-5 flex-1`}>
          <CustomWarning
            warning="Before you can access your comprehensive test result, please ensure that you have successfully completed a specific test."
            textColor="text-secondary-DEFAULT"
          />

          <View>
            <ThemedText style={tw`text-base font-semibold w-70`}>
              Test Progress
            </ThemedText>
            <ScrollView showsHorizontalScrollIndicator={false}>
              <View style={tw`gap-3 flex-row flex-wrap`}>
                {interactions.map((interaction) => {
                  return (
                    <View
                      key={interaction.id}
                      style={[
                        tw`p-3 bg-gray-DEFAULT rounded-xl`,
                        { width: itemWidth },
                      ]}
                    >
                      <View style={tw`max-w-[93px] w-full h-[88px]`}>
                        {interaction.interactionicon}
                      </View>

                      <Text style={tw`mb-2 text-base capitalize font-semibold`}>
                        {interaction.heading}
                      </Text>
                      <View
                        style={tw`flex-row items-center justify-between mt-3`}
                      >
                        <Text style={tw`text-[#727272]`}>Completed</Text>
                        <Text
                          style={tw`leading-[16.94px] text-secondary-DEFAULT`}
                        >
                          {interaction.subtitle} progress goes here
                        </Text>
                      </View>
                      <View style={tw`mt-3`}>
                        <Text>progress line</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
