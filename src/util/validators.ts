type LengthConfig = {
  min?: number;
  max?: number;
};
export const length = (config: LengthConfig) => (value: string): boolean => {
  let isValid = true;
  const trimmedValue = value.trim();

  if (config.min) {
    isValid = isValid && trimmedValue.length >= config.min;
  }

  if (config.max) {
    isValid = isValid && trimmedValue.length <= config.max;
  }

  return isValid;
};


export const required = (value: string) => value.trim() !== '';


export const email = (value: string) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );
