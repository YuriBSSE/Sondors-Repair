import Colors from 'styles/Colors';

/**
 * This function returns the border color to use for TextInput components based on props and theme colors.
 * @param primary
 * @param disabled
 * @param error
 */
const getBorderColor = (
    primary?: boolean,
    disabled?: boolean,
    error?: boolean,
    onFocus?: boolean
): string => {
    if (error) return Colors.errorText;
    if (disabled) return Colors.disabledText;
    if (primary) return Colors.inputBorder;
    if (onFocus) return Colors.primary;

    return Colors.inputBorder;
}

export default getBorderColor;
