import ISO6391 from 'iso-639-1';

export const getPrevArrayElement = (
  array: Array<any>,
  currentElement: any,
): any | undefined => {
  const index = array.indexOf(currentElement);

  if (index <= 0 || index >= array.length) {
    return undefined;
  }

  return array[index - 1];
};

export const getNextArrayElement = (
  array: Array<any>,
  currentElement: any,
): any | undefined => {
  const index = array.indexOf(currentElement);

  if (index < 0 || index >= array.length - 1) {
    return undefined;
  }

  return array[index + 1];
};

export const groupObjectsByKey = (
  array: Array<any>,
  key: string,
): Array<any> => {
  const groupedArray = array.reduce((resultObject, arrayElement) => {
    resultObject[arrayElement[key]] = resultObject[arrayElement[key]] || [];
    resultObject[arrayElement[key]].push(arrayElement);

    return resultObject;
  }, {});

  return Object.entries(groupedArray);
};

export const getItemFromStorage = (key: string): string => {
  return window.localStorage.getItem(key) || '';
};

export const setItemToStorage = (key: string, item: any): string => {
  window.localStorage.setItem(key, item);
  return getItemFromStorage(key);
};

/**
 * For testing purposes
 * Usage: await sleep(1000);
 * @param m milliseconds
 */
export const sleep = (m: number) => new Promise(r => setTimeout(r, m));

/**
 * Convert language code to ISO 639-1 standard (2 char)
 *
 * @param languageCode
 * @return ISO 639-1 code or empty string on error
 */
export const toISO6391 = (languageCode: string): string => {
  const languageCodeISO6391 = languageCode.toLowerCase().slice(0, 2);
  const isLanguageCodeValid = ISO6391.validate(languageCodeISO6391);

  return isLanguageCodeValid ? languageCodeISO6391 : '';
};
