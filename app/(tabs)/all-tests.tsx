import { FlatList, Text, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import { CustomButton, CustomGradientButton } from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { Assessment, categoryList } from "@/data/categories";
import { useCallback, useMemo, useState } from "react";
import { router } from "expo-router";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
  sortDataByCategory,
} from "@/utils/helper-functions";
import { CircularProgress } from "@/components/CircularProgress";
import { Categories, SubCategories } from "@/data/enum";
import { SubCategoryConfig } from "@/data/data-config";
import { useAppSelector } from "@/redux";
import LinearProgressBar from "@/components/LinearProgress";

interface Category {
  id: number;
  title: string;
  category?: Categories;
}

export default function AllTest() {
  const [selectedCategory, setSelectedCategory] = useState<
    Categories | undefined
  >();
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const [hasRecentData, hasProgressData] = useMemo(() => {
    return [
      Object.keys(recentData).length > 0,
      Object.keys(progressData).length > 0,
    ];
  }, [recentData, progressData]);

  const subCategories = useMemo(() => {
    const data = sortDataByCategory(Assessment, selectedCategory as Categories);

    return data;
  }, [selectedCategory, Assessment]);

  const getProgressStatus = useCallback(
    (item: SubCategories) => {
      return hasProgressData && recentData[item]
        ? `${recentData[item].questionsAnswered.length ?? 0}/${progressData[item].total}`
        : `0/${getTotalQuestionsForSubCategory(item)}`;
    },
    [progressData, getTotalQuestionsForSubCategory]
  );

  const recents = useMemo(() => {
    if (!hasRecentData) return [];

    return Object.keys(recentData)
      .sort((a, b) => {
        const dateA = new Date(
          recentData[a as SubCategories].dateAnswered
        ).getTime();
        const dateB = new Date(
          recentData[b as SubCategories].dateAnswered
        ).getTime();
        return dateB - dateA;
      })
      .slice(0, 3) as SubCategories[];
  }, [recentData, hasRecentData]);

  const generateProgressData = useCallback(
    (item: SubCategories) => {
      if (progressData[item] && hasProgressData) {
        const answered = recentData[item].questionsAnswered
            ? recentData[item].questionsAnswered.length
            : 0,
          total = progressData[item].total
            ? progressData[item].total
            : getTotalQuestionsForSubCategory(item);
        return calcPercentage(answered, total);
      } else {
        return calcPercentage(0, getTotalQuestionsForSubCategory(item));
      }
    },
    [hasProgressData, progressData, getTotalQuestionsForSubCategory] // dependencies
  );

  const handleSubClick = (item: SubCategories) => {
    const hasProgress =
      progressData[item]?.answered > 0 &&
      recentData[item]?.questionsAnswered.length !== progressData[item]?.total;
    const hasCompleted =
      recentData[item]?.questionsAnswered.length === getTotalQuestionsForSubCategory(item);
    const pathname = hasProgress
      ? "/(cat)/test"
      : hasCompleted
      ? "/(cat)/result"
      : "/(cat)/testInstructions";
    const params = { subCategory: item };

    router.push({ pathname, params });

  };

  console.log("RECENT DATA:", recentData)
  console.log("RECENT DATA ANSWERES:", recentData.emotionalIQ.questionsAnswered)

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
                    const Icon =
                      SubCategoryConfig[item].interactionicon ??
                      (() => <View />);

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
                            style={tw`text-[16px]/[19.36px] font-semibold`}>
                            {SubCategoryConfig[item].title.substring(0, 10) + "..."}
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
                            <LinearProgressBar
                              progress={generateProgressData(item)}
                            />
                          </View>
                        </View>
                      </View>
                    );
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
                            <CircularProgress
                              percentage={generateProgressData(
                                item.subCategory
                              )}
                              radius={30}
                            />
                          }
                        />
                      </View>
                    );
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
