import { Assessment } from "@/data/categories";
import { labelColorMap, SubCategoryConfig } from "@/data/data-config";
import { Categories, SubCategories } from "@/data/enum";
import { updateProgress, updateRecentData } from "@/redux/question-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "@reduxjs/toolkit";
import { SvgProps } from "react-native-svg";

export const calcPercentage = (answer: number, total: number) => {
  return Math.round((answer / total) * 100);
};

export const getTotalQuestionsForSubCategory = (
  subCategoryId: SubCategories
) => {
  return Assessment.filter((q) => q.subcategoryId === subCategoryId).length;
};

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
        icon: SubCategoryConfig[subCat.subcategoryId as SubCategories]
          .interactionicon!,
        subCategory: subCat.subcategoryId,
        objective:
          SubCategoryConfig[subCat.subcategoryId as SubCategories].objective,
      });
    }
    return acc;
  }, [] as { title: string; objective?: string; subCategory: SubCategories; icon: (props: SvgProps) => React.JSX.Element }[]);
};

// Save answered questions and last subcategory, progress is keyed by SubCategories
export const saveProgress = async (
  progress: Record<SubCategories, SubCategoryProgress>,
  recentSubCategories: Record<SubCategories, AnsweredDetails>,
  lastSubCategory: SubCategories
) => {
  try {
    await AsyncStorage.setItem(
      "progressBySubCategory",
      JSON.stringify(progress)
    );
    await AsyncStorage.setItem(
      "recentSubCategories",
      JSON.stringify(recentSubCategories)
    );
    await AsyncStorage.setItem("lastSubCategory", lastSubCategory);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

// Load progress (answered questions and last subcategory)
export const loadProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem("progressBySubCategory");
    const recent = await AsyncStorage.getItem("recentSubCategories");
    const lastQuestion = await AsyncStorage.getItem("lastSubCategory");

    return {
      progress: progress
        ? (JSON.parse(progress) as Record<SubCategories, SubCategoryProgress>)
        : null,
      recent: recent
        ? (JSON.parse(recent) as Record<SubCategories, AnsweredDetails>)
        : null,
      lastQuestion: lastQuestion || null,
    };
  } catch (error) {
    console.error("Error loading progress:", error);
    return { progress: null, recent: null };
  }
};

export const handleAnswerQuestion = async (
  questionNo: number,
  answer: string,
  points: number,
  questionLabel: string,
  subCategoryId: SubCategories,
  recentSubCategories: Record<SubCategories, AnsweredDetails>,
  progressBySubCategory: Record<SubCategories, SubCategoryProgress>,
  dispatch: Dispatch
) => {
  const answerDetails: QuestionDetails = {
    answer,
    points,
    questionNo,
    questionLabel,
  };

  const totalPoints: number = recentSubCategories[subCategoryId]
    ? recentSubCategories[subCategoryId].totalPoints
    : 0;

  const currentProgress = progressBySubCategory[subCategoryId] ?? {
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

  // Dispatch action to update the progress for this subcategory in the Redux store
  dispatch(
    updateProgress({
      subCategoryId,
      updatedProgress,
    })
  );

  const updatedRecentSubCategories = {
    ...recentSubCategories,
    [subCategoryId]: {
      questionsAnswered: [
        answerDetails,
        ...(recentSubCategories[subCategoryId]?.questionsAnswered || []),
      ],
      dateAnswered: new Date().toISOString(),
      totalPoints: totalPoints + answerDetails.points,
    },
  };

  // Dispatch action to update recent subcategories in the Redux store
  dispatch(updateRecentData(updatedRecentSubCategories));

  // Save progress to storage
  await saveProgress(
    progressBySubCategory,
    updatedRecentSubCategories,
    subCategoryId
  );
};

export const getLogicalResultDetails = (
  score: number,
  resultData: ResultDetails[]
): ResultDetails | undefined => {
  return resultData.find((result) => {
    if (typeof result.score === "number") {
      return result.score === score;
    }
    return score >= result.score[0] && score <= result.score[1];
  });
};

export const getColorForLabel = (label: string, index: number) => {
  return labelColorMap[index] || `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
};