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
import { Assessment, categoryList } from "@/data/categories";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
  loadProgress,
  sortDataByCategory,
} from "@/utils/helper-functions";
import {CircularProgress} from "@/components/CircularProgress";
import { Categories, SubCategories } from "@/data/enum";
import { SubCategoryConfig } from "@/data/data-config";

interface Category {
  id: number;
  title: string;
  category?: Categories;
}

export default function AllTest() {
  const [selectedCategory, setSelectedCategory] = useState<
    Categories | undefined
  >();

  const [progressData, setProgressData] =
    useState<Record<SubCategories, SubCategoryProgress>>();

  const [recentData, setRecentData] =
    useState<Record<SubCategories, AnsweredDetails>>();

  const fetchData = async () => {
    const { progress, recent } = await loadProgress();
    if (progress && recent) {
      setProgressData(progress);
      setRecentData(recent);
    }
  };

  const subCategories = useMemo(() => {
    const data = sortDataByCategory(Assessment, selectedCategory as Categories);

    return data;
  }, [selectedCategory, Assessment]);

  const getProgressStatus = useCallback(
    (item: SubCategories) => {
      return progressData && progressData[item]
        ? `${progressData[item].answered}/${progressData[item].total}`
        : `0/${getTotalQuestionsForSubCategory(item)}`;
    },
    [progressData, getTotalQuestionsForSubCategory]
  );

  const recents = useMemo(() => {
    if (!recentData) return [];
    return Object.keys(recentData).slice(0, 6) as SubCategories[];
  }, [recentData]);

  const generateProgressData = (item: SubCategories) => {
    if (progressData) {
      return calcPercentage(
        progressData[item].answered,
        progressData[item].total
      );
    } else {
      return calcPercentage(0, getTotalQuestionsForSubCategory(item));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubClick = (item: SubCategories) => {
    const hasProgress = progressData && progressData[item]?.answered > 0;
    const hasCompleted = progressData && progressData[item]?.answered === progressData[item]?.total;
    const pathname = hasProgress ? "/(cat)/test" : hasCompleted ? "/(cat)/result" : "/(cat)/testInstructions";
    const params = { subCategory: item };

    router.push({ pathname , params });
  };

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

              {recents.length === 0 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                  <Text style={tw`text-lg text-gray-600`}>
                    No recent items found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={recents}
                  keyExtractor={(item) => item}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const Icon = SubCategoryConfig[item].interactionicon ?? (() => <View />);

                    return (
                    <View
                      style={[
                        tw`mr-5 bg-gray-DEFAULT rounded-xl flex-1`,
                        {
                          padding: 12,
                          width: 164,
                        },
                      ]}>
                      <View style={tw`max-w-[93px] w-full h-[88px]`}>
                        <Icon />
                      </View>
                      <View style={tw``}>
                        <Text
                          style={tw`text-[16px]/[19.36px] font-semibold capitalize`}>
                          {SubCategoryConfig[item].title}
                        </Text>
                        <View
                          style={tw`flex-row items-center justify-between mt-3`}>
                          <Text style={tw`leading-[16.94px] text-[#727272]`}>
                            completed
                          </Text>
                          <Text
                            style={tw`leading-[16.94px] text-secondary-DEFAULT`}>
                            {`${generateProgressData(item)}%`}
                          </Text>
                        </View>
                        <View style={tw`mt-3`}>
                          <Text>progress line</Text>
                        </View>
                      </View>
                    </View> )
                  }}
                />
              )}

              <FlatList
                data={categoryList}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: { item: Category }) => (
                  <View style={tw`mr-6`}>
                    <CustomGradientButton
                      title={item.title}
                      handlePress={() => setSelectedCategory(item.category)}
                      paddingStyle="px-3 border border-solid border-[#E3E1E9]"
                      color={
                        selectedCategory === item.category
                          ? ["#8D0CCA", "#D568EF"]
                          : ["transparent", "transparent"]
                      }
                      textStyle={
                        selectedCategory === item.category
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    />
                  </View>
                )}
              />
              <View style={tw`gap-5`}>
                <ThemedText>Subcategories</ThemedText>
                <FlatList
                  data={subCategories}
                  keyExtractor={(item) => item.subCategory}
                  scrollEnabled={false}
                  renderItem={({ item }) => {

              return (
                <View style={tw`mb-5`}>
                <CustomCard
                  icon={<item.icon />}
                  title={item.title}
                  titleStyle="w-[180px]"
                  otherStyles="bg-gray-DEFAULT"
                  handleClick={() => handleSubClick(item.subCategory)}
                  pricedesc={getProgressStatus(item.subCategory)}
                  textoricon={
                    <CircularProgress percentage={0} radius={30}/>
                  }
                />
              </View>
              )
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
