export const replaceInArray = (arr, key, valueToMatch, props) => {
  const item = arr.find(p => p[key] === valueToMatch);
  const itemIndex = arr.indexOf(item);
  return [
    ...arr.slice(0, itemIndex),
    { ...item, ...props},
    ...arr.slice(itemIndex + 1, arr.length)
  ];
};
