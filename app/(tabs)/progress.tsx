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
import CustomWarning from "@/components/CustomWarning";
import { router } from "expo-router";
import { SubCategories } from "@/data/enum";
import {
  calcPercentage,
  getTotalQuestionsForSubCategory,
} from "@/utils/helper-functions";
import { useState, useMemo, useEffect, useCallback } from "react";
import { SubCategoryConfig } from "@/data/data-config";
import LinearProgressBar from "@/components/LinearProgress";
import { useAppSelector } from "@/redux";
// import  { BackIcon }  from '@/constants';

export default function ProgressScreen() {
  const col = 2;
  const screenPadding = 20;
  const gap = 12;
  const screenWidth = Dimensions.get("screen").width - screenPadding * 2;
  const itemWidth = (screenWidth - (col - 1) * gap) / col;
  const progressData = useAppSelector((state) => state.questions.progressData);
  const recentData = useAppSelector((state) => state.questions.recentData);
  const [hasRecentData, hasProgressData] = useMemo(() => {
    return [
      Object.keys(recentData).length > 0,
      Object.keys(progressData).length > 0,
    ];
  }, [recentData, progressData]);

  const recents = useMemo(() => {
    if (!hasRecentData) return [];

    return Object.keys(recentData).sort((a, b) => {
      const dateA = new Date(
        recentData[a as SubCategories].dateAnswered
      ).getTime();
      const dateB = new Date(
        recentData[b as SubCategories].dateAnswered
      ).getTime();
      return dateB - dateA; // Sort by latest date
    }) as SubCategories[];
  }, [recentData, hasRecentData]);

  const generateProgressPercent = useCallback(
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
    const hasProgress = progressData && progressData[item]?.answered > 0;
    const hasCompleted =
      progressData &&
      progressData[item]?.answered === progressData[item]?.total;
    const pathname = hasProgress
      ? "/(cat)/test"
      : hasCompleted
      ? "/(cat)/result"
      : "/(cat)/testInstructions";
    const params = { subCategory: item };

    router.push({ pathname, params });
  };

  return (
    <ThemedView style={tw`flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <View style={tw`flex-row items-center mb-5`}>
          <Pressable
            onPress={() => router.back()}
            style={tw`justify-start mr-24`}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>

          <Text style={tw`text-xl font-semibold`}>Test  Progress</Text>
        </View>

        <View style={tw`gap-5 flex-1`}>
          <CustomWarning
            warning="Before you can access your comprehensive test result, please ensure that you have successfully completed a specific test."
            textColor="text-secondary-DEFAULT"
          />

          <View>
            <ThemedText style={tw`text-base font-semibold mb-2 w-70`}>
              Test Progress
            </ThemedText>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-38`}
            // style={tw`flex-1`}
            >
              <View style={tw`gap-3 flex-row flex-wrap`}>
                {recents.length === 0 ? (
                  <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-lg text-gray-600`}>
                      No recent items found
                    </Text>
                  </View>
                ) : (
                  recents.map((item) => {
                    const Icon = SubCategoryConfig[item].interactionicon!;
                    return (
                      <View
                        key={item}
                        style={[
                          tw`p-3 bg-gray-DEFAULT rounded-xl`,
                          { width: itemWidth },
                        ]}>
                        <View style={tw`max-w-[93px] w-full h-[88px]`}>
                          <Icon />
                        </View>

                        <Text
                          style={tw`mb-2 text-base font-semibold`}>
                          {SubCategoryConfig[item].title}
                        </Text>
                        <View
                          style={tw`flex-row items-center justify-between mt-3`}>
                          <Text style={tw`text-[#727272]`}>Completed</Text>
                          <Text
                            style={tw`leading-[16.94px] text-secondary-DEFAULT`}>
                            {`${generateProgressPercent(item)}%`}
                          </Text>
                        </View>
                        <View style={tw`mt-3`}>
                          <LinearProgressBar
                            progress={generateProgressPercent(item)}
                          />
                        </View>
                      </View>
                    );
                  })
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
