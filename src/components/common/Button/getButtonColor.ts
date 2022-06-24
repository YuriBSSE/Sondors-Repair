import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Colors from 'styles/Colors';

const styles = StyleSheet.create({
    disabledButton: { backgroundColor: Colors.disabledButton },
    secondaryButton: { backgroundColor: Colors.secondaryButton, borderColor: Colors.btnBorder, borderWidth: 1 },
    primaryButton: { backgroundColor: Colors.primaryButton },
    accentButton: {backgroundColor: Colors.accent},
});

/**
 * This function returns the color styles to use for Button components based on props.
 * @param primary
 * @param secondary
 * @param disabled
 * @param accent
 */
const getButtonColor = (
    primary?: boolean,
    secondary?: boolean,
    accent?: boolean,
    disabled?: boolean
): StyleProp<ViewStyle> => {
    if (disabled) return styles.disabledButton;
    if (secondary) return styles.secondaryButton;
    if (accent) return styles.accentButton;

    return styles.primaryButton;
}

export default getButtonColor;
