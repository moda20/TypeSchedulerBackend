export const forceToArray = (input: string) => {
  try {
    const arrayable = JSON.parse(input);
    return Array.isArray(arrayable) ? arrayable : [arrayable];
  } catch (err) {
    return [input];
  }
};
