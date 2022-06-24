import TextProps from 'types/TextProps'

/**
 * This function returns the text color props to use for the Button's text based on props.
 * @param primary
 * @param secondary
 * @param accent
 * @param disabled
 */
const getTextColor = (
    primary?: boolean,
    secondary?: boolean,
    accent?: boolean,
    disabled?: boolean
): Partial<TextProps> => {
    if (disabled) return { disabled: true }
    if (secondary) return { primary: true };
    if (primary) return { secondary: true };
    if (accent) return { accent: true };

    return { defaultColor: true }
}

export default getTextColor
