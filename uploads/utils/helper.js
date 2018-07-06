export const replaceInArray = (arr, key, valueToMatch, props) => {
  const item = arr.find(p => p[key] === valueToMatch);
  const itemIndex = arr.indexOf(item);

  return arr.map((item, index) => {
    if (index !== itemIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...props
    };
  });
};
