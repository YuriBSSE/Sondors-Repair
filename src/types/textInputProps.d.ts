import { ReactNode } from 'react'
import { TextStyle, StyleProp, GestureResponderEvent } from 'react-native'

type TextInputColorProps = {
    primary?: boolean;
    disabled?: boolean;
    error?: boolean;
}

type TextInputFontSizeProps = {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    xxl?: boolean;

    
}

interface TextInputProps
    extends TextInputColorProps,
        TextInputFontSizeProps {
            value: string;
            style?: StyleProp<TextStyle>;
            multiline?: boolean;
            placeholder?: string | undefined;
            onChangeText?: ((text: string) => void) | undefined;
            secureTextEntry?: boolean;
            value?: string | number | null;
}

export default TextInputProps;