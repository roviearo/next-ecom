export const filterFormikErrors = <T extends Object>(
  errors: T,
  touched: { [key: string]: boolean },
  values: T
) => {
  const touchedKey = Object.entries(touched).map(([key, value]) => {
    if (value) return key;
  });

  const finalErrors: string[] = [];

  Object.entries(errors).map(([key, value]) => {
    if (touchedKey.includes(key) && value) finalErrors.push(value);
  });

  return finalErrors;
};
