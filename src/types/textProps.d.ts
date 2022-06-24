import { ReactNode } from 'react'
import { TextStyle, StyleProp, GestureResponderEvent } from 'react-native'

type TextAlignmentProps = {
    centered?: boolean;
    left?: boolean;
    right?: boolean;
}
type TextColorProps = {
    primary?: boolean;
    secondary?: boolean;
    accent?: boolean;
    tertiary?: boolean;
    title?: boolean;
    disabled?: boolean;
    defaultColor?: boolean;
    hyperlink?: boolean;
    error?: boolean;
    placeholder?: boolean;
}

type TextFontSizeProps = {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    xxl?: boolean;
}

type TextFontWeightProps = {
    bold?: boolean;
    heavy?: boolean;
    normal?: boolean;
    xBold?: boolean
}

interface TextProps
    extends TextColorProps,
        TextFontSizeProps,
        TextAlignmentProps,
        TextFontWeightProps {
    children: ReactNode;
    lineHeight?: number;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default TextProps;