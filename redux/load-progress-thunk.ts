import { setIsLoading, setProgressData, setRecentData } from './question-reducer';
import { loadProgress } from '@/utils/helper-functions'; // Import your loadProgress function
import { AppDispatch } from './stores';

// Create a thunk for loading the progress data
export const loadInitialProgress = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true)); // Start loading state
    const { progress, recent } = await loadProgress(); // Load data from storage
    if (progress && recent) {
      dispatch(setProgressData(progress)); // Set progress in Redux state
      dispatch(setRecentData(recent)); // Set recent data in Redux state
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  } finally {
    dispatch(setIsLoading(false)); // Stop loading state
  }
};
