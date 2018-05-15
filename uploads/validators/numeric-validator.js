export default function(lowerBound, upperBound) {
  return function(value) {
    if (!value) return undefined;

    const regexString =
      lowerBound && upperBound
        ? `^[0-9]{${lowerBound},${upperBound}}$`
        : `^[0-9]{${lowerBound}}$`;

    const regex = new RegExp(regexString, "g");
    return regex.test(value) ? undefined : "Error";
  };
}
