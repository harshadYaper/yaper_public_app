export const titleize = (string) => {
  return !isEmpty(string)
    ? string[0].toUpperCase() + string.substring(1).toLowerCase()
    : undefined;
};

export const snakeToTitleize = (string) => {
  return !isEmpty(string)
    ? string
        .split("_")
        .map((r) => titleize(r))
        .join(" ")
    : undefined;
};

export const capitalize = (string) => {
  return !isEmpty(string) ? string.toUpperCase() : undefined;
};

export const truncate = (string, length = 50, trunc_string = "...") => {
  return !isEmpty(string)
    ? string.length >= length
      ? string.substring(0, length) + trunc_string
      : string
    : undefined;
};

export const isEmpty = (val) => {
  return val == undefined || val == null || val == "";
};

export const sleep = async (val) => {
  await new Promise((resolve) => setTimeout(resolve, val));
};

export const range = (val) => [...Array(val).keys()];

export const array_generator = (size, val) => range(size).map(() => val);

export const isDigit = (val) => !isNaN(parseInt(val, 10));

// export const getRandomKey = (size = 16) =>
//   [...Array(size)]
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");
