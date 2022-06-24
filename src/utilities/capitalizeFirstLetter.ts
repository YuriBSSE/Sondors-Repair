function capitalizeFirstLetter(input: string): string {
    const firstLetter = input.slice(0, 1).toLocaleUpperCase();
    const restOfWord = input.slice(1);
    return firstLetter + restOfWord;
};

export default capitalizeFirstLetter;
