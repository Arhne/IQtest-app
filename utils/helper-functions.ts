import { Assessment } from "@/data/categories";
import { SubCategoryConfig } from "@/data/data-config";
import { Categories, SubCategories } from "@/data/enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction, useState } from "react";

export const sortDataByCategory = (
  data: IQuestions[],
  category?: Categories
) => {
  const uniqueSubCategories = new Set<SubCategories>();

  return data.reduce((acc, subCat) => {
    // If there's a category, filter by it, otherwise include all subcategories
    if (
      (!category || subCat.categoryId === category) &&
      !uniqueSubCategories.has(subCat.subcategoryId)
    ) {
      uniqueSubCategories.add(subCat.subcategoryId); // Track seen subcategories
      acc.push({
        title: SubCategoryConfig[subCat.subcategoryId as SubCategories].title,
      });
    }
    return acc;
  }, [] as { title: string }[]);
};

// Save answered questions and last subcategory
export const saveProgress = async (
  progress: Record<SubCategories, SubCategoryProgress>,
  recent: SubCategories[]
) => {
  try {
    await AsyncStorage.setItem(
      "progressBySubCategory",
      JSON.stringify(progress)
    );
    await AsyncStorage.setItem("recentSubCategories", JSON.stringify(recent));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

// Load progress (answered questions and last subcategory)
export const loadProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem("progressBySubCategory");
    const recent = await AsyncStorage.getItem("recentSubCategories");

    return {
      progress: progress ? JSON.parse(progress) : {},
      recent: recent ? JSON.parse(recent) : [],
    };
  } catch (error) {
    console.error("Error loading progress:", error);
    return { progress: {}, recent: [] };
  }
};
const getTotalQuestionsForSubCategory = (subCategoryId: SubCategories) => {
  return Assessment.filter((q) => q.subcategoryId === subCategoryId).length;
};


export const handleAnswerQuestion = (
  subCategoryId: SubCategories,
  recentSubCategories: SubCategories[],
  setRecentSubCategories: Dispatch<SetStateAction<SubCategories[]>>,
  progressBySubCategory: Record<SubCategories, SubCategoryProgress>,
  setProgressBySubCategory: Dispatch<
    SetStateAction<Record<SubCategories, SubCategoryProgress>>
  >
) => {
  const currentProgress = progressBySubCategory[subCategoryId] || {
    answered: 0,
    total: 0,
  };
  const updatedProgress = {
    answered: currentProgress.answered + 1,
    total:
      currentProgress.total > 0
        ? currentProgress.total
        : getTotalQuestionsForSubCategory(subCategoryId),
  };

  // Update the progress for this subcategory
  setProgressBySubCategory({
    ...progressBySubCategory,
    [subCategoryId]: updatedProgress,
  });

  // Update recent subcategories
  if (!recentSubCategories.includes(subCategoryId)) {
    setRecentSubCategories([subCategoryId, ...recentSubCategories]);
  }

  // Save progress to storage
  saveProgress(progressBySubCategory, recentSubCategories);
};
