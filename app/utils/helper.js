export const titleize = (string, allElem = false) =>
  !isEmpty(string)
    ? allElem
      ? string
          .split(" ")
          .map((s) => s[0].toUpperCase() + s.substring(1).toLowerCase())
          .join(" ")
      : string[0].toUpperCase() + string.substring(1).toLowerCase()
    : undefined;

export const snakeToTitleize = (string) =>
  !isEmpty(string)
    ? string
        .split("_")
        .map((r) => titleize(r))
        .join(" ")
    : undefined;

export const capitalize = (string) =>
  !isEmpty(string) ? string.toUpperCase() : undefined;

export const truncate = (string, length = 50, trunc_string = "...") =>
  !isEmpty(string)
    ? string.length >= length
      ? string.substring(0, length) + trunc_string
      : string
    : undefined;

export const isEmpty = (val) =>
  Object.keys(val).length == 0 ||
  val.length == 0 ||
  val == "" ||
  val == null ||
  val == undefined;

export const sleep = async (val) =>
  new Promise((resolve) => setTimeout(resolve, val));

export const range = (val) => [...Array(val).keys()];

export const array_generator = (size, val) => range(size).map(() => val);

export const isDigit = (val) => !isNaN(parseInt(val, 10));

// export const getRandomKey = (size = 16) =>
//   [...Array(size)]
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");
