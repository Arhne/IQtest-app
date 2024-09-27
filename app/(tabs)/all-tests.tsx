import {
  Image,
  Dimensions,
  FlatList,
  Text,
  ScrollView,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import { categoryList } from "@/data/categories";
import { useState } from "react";
import { router } from "expo-router";

interface Category{
  id: number;
  title: string; 
}

const recents = [
  {
    id: "General IQ",
    interactionicon: <icons.TestIcon />,
    heading: "start test",
    subtitle: "25",
    progress: "50%",
  },
  {
    id: "result",
    interactionicon: <icons.ResultIcon />,
    heading: "Result",
    subtitle: "25",
    progress: "50%",
  },
  {
    id: "knowledge",
    interactionicon: <icons.KnowledgeIcon />,
    heading: "Knowledge hub",
    subtitle: "25",
    progress: "50%",
  },
]
const subcategories = [
  {
    id: "General IQ",
    interactionicon: <icons.TestIcon />,
    heading: "General IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2
  },
  {
    id: "Spatial IQ",
    interactionicon: <icons.ResultIcon />,
    heading: "Spatial IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2
  },
  {
    id: "Analytical IQ",
    interactionicon: <icons.KnowledgeIcon />,
    heading: "Analytical IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2
  },
  {
    id: "Memory IQ",
    interactionicon: <icons.AppIcon />,
    heading: "Memory IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "Qualitative IQ",
    interactionicon: <icons.AppIcon />,
    heading: "Qualitative IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "Quantitative IQ",
    interactionicon: <icons.AppIcon />,
    heading: "Quantitative IQ",
    subtitle: "25",
    progress: "50%",
    categoryId: 2,
  },
  {
    id: "Depression",
    interactionicon: <icons.AppIcon />,
    heading: "Depression",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Bipolar Disorder",
    interactionicon: <icons.AppIcon />,
    heading: "Bipolar Disorder",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "ADHD Test",
    interactionicon: <icons.AppIcon />,
    heading: "ADHD Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Schizophrenia",
    interactionicon: <icons.AppIcon />,
    heading: "Schizophrenia",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Anxiety Test",
    interactionicon: <icons.AppIcon />,
    heading: "Anxiety Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Bulimia Test",
    interactionicon: <icons.AppIcon />,
    heading: "Bulimia Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "PTSD Test",
    interactionicon: <icons.AppIcon />,
    heading: "PTSD Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Internal Disorder Test",
    interactionicon: <icons.AppIcon />,
    heading: "Internal Disorder Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 4,
  },
  {
    id: "Enneagram",
    interactionicon: <icons.AppIcon />,
    heading: "Enneagram",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
  {
    id: "16 Personalities",
    interactionicon: <icons.AppIcon />,
    heading: "16 Personalities",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
  {
    id: "Introvert and Extrovert",
    interactionicon: <icons.AppIcon />,
    heading: "Introvert and Extrovert",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
  {
    id: "Persona Bubble",
    interactionicon: <icons.AppIcon />,
    heading: "Persona Bubble",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
  {
    id: "Emotions vs Logic",
    interactionicon: <icons.AppIcon />,
    heading: "Emotions vs Logic",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
  {
    id: "EQ Test",
    interactionicon: <icons.AppIcon />,
    heading: "EQ Test",
    subtitle: "25",
    progress: "50%",
    categoryId: 3,
  },
];
export default function AllTest() {

  const [selectedCategory, setSelectedCategory] = useState("1");
  return (
    
      
        <ThemedView style={tw`w-full px-5 pt-3 justify-center`}>
          <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={tw`h-full flex-1`}>
        
          <View style={tw`gap-5 flex-1`}>
            <ThemedText style={tw`text-4xl font-medium w-70`}>
              All test categories
            </ThemedText>

            <View style={tw`gap-5`}>
              <ThemedText>Recents</ThemedText>

              <FlatList
                data={recents}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={[tw`mr-5 bg-gray-DEFAULT rounded-xl flex-1`, {                     
                      padding: 12,
                      width: 164,
                      // alignItems: "center",
                      // justifyContent: "center",
                    }]}
                  >
                    <View  style={tw`max-w-[93px] w-full h-[88px]`}>
                     
                      {item.interactionicon}
                    </View>
                    <View style={tw``}>
                      <Text
                        style={tw`text-[16px]/[19.36px] font-semibold capitalize`}
                      >
                        {item.heading}
                      </Text>
                      <View  style={tw`flex-row items-center justify-between mt-3`}>
                        <Text style={tw`leading-[16.94px] text-[#727272]`}>
                          completed
                        </Text>
                        <Text
                          style={tw`leading-[16.94px] text-secondary-DEFAULT`}
                        >
                          {item.progress}
                        </Text>
                      </View>
                      <View style={tw`mt-3`}>
                        <Text>progress line</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
              <FlatList
                data={categoryList}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: {item: Category}) => (
                  <View style={tw`mr-6`}>
                  <CustomGradientButton
                    title={item.title}
                    handlePress={()=>setSelectedCategory(item.id.toString())}
                    paddingStyle="px-3 border border-solid border-[#E3E1E9]"
                    color={selectedCategory === item.id.toString() ? ["#8D0CCA", "#D568EF"] : ["transparent", "transparent"]}
                    textStyle={selectedCategory === item.id.toString() ? "text-primary" : "text-gray-400"}
                  />
                  </View>
                )}
              />
              <View style={tw`gap-5`}>
                <ThemedText>Subcategories</ThemedText>
                <FlatList
                  data={subcategories}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View style={tw`mb-5`}>
                    <CustomCard
                      icon={item.interactionicon}
                      title={item.id}
                      otherStyles="bg-gray-DEFAULT"
                      pricedesc={`${item.subtitle}/50 completed`}
                      textoricon={item.interactionicon}
                    />
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
          
          </SafeAreaView>
          </ScrollView>
        </ThemedView>
      
   
  );
}
