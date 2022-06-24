import { StyleProp, ViewStyle, TextStyle } from 'react-native'

type ButtonTypeProps = {
    primary?: boolean;
    secondary?: boolean;
    accent?: boolean;
    containerPaddingVoid?: boolean 
}

type ButtonStateProps = {
    disabled?: boolean;
    loading?: boolean;
}

type ButtonStyleProps = {
    buttonStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
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
    normal?: boolean;
    heavy?: boolean;
}

interface ButtonProps
    extends ButtonTypeProps,
        ButtonStateProps,
        ButtonStyleProps,
        TextFontWeightProps,
        TextFontSizeProps {
    onPress?: () => void;
    title: string;
}

export default ButtonProps;
