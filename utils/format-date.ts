import dayjs from 'dayjs';

export const formatDate = (isoString: string, format: string = 'DD-MMM-YYYY'): string => {
  return dayjs(isoString).format(format);
};