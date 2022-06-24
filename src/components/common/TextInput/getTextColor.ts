import Colors from 'styles/Colors';

/**
 * This function returns the text color to use for TextInput components based on props and theme colors.
 * @param primary
 * @param disabled
 * @param error
 */
const getTextColor = (
    primary?: boolean,
    disabled?: boolean,
    error?: boolean
): string => {
    if (error) return Colors.errorText;
    if (disabled) return Colors.disabledText;
    if (primary) return Colors.primaryText;

    return Colors.primaryText;
}

export default getTextColor;
