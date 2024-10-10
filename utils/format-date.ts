import dayjs from 'dayjs';

export const formatDate = (isoString: string, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(isoString).format(format);
};