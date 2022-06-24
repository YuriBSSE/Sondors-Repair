function truncateText(input: string, charLimit: number): string {
    return input.length > 5 ? `${input.substring(0, charLimit)}...` : input;
}

export default truncateText;
