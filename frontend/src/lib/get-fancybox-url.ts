// utils/imageHelper.js

export const getFancyboxUrl = (url: string, fallback: string): string => {
  return url ? url : fallback;
};
