function capitalizeFirstLetters(input: string): string {
    const words = input.split(' ');
    let titleWords: string[] = [];
    words.forEach(word => {
        const firstLetter = word.slice(0, 1).toLocaleUpperCase();
        const restOfWord = word.slice(1);
        titleWords.push(`${firstLetter}${restOfWord}`);
    });

    return titleWords.join(' ');
};

export default capitalizeFirstLetters;
