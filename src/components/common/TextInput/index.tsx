import { useMemo } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import PropTypes from 'prop-types';

import Colors from "styles/Colors";
import TextInputProps from "types/textInputProps";
import getBorderColor from "./getBorderColor";
import getFontSize from "./getFontSize";
import getTextColor from "./getTextColor";

/**
 * This function represents the TextInput component used throughout the app.
 * @param props
 */
const TextInput = ({
    // secure Text type
    secureTextEntry,
    // TextInput colors
    primary,
    // TextInput states
    disabled = false,
    error = false,
    // TextInput styles
    style,
    // TextInput props
    value,
    onChangeText,
    placeholder,
    multiline = false,
    // Font sizes
    sm,
    md,
    lg,
    xl,
    xxl
}: TextInputProps) => {
    const tailwind = useTailwind();
    const styles = StyleSheet.create({
        textInputStyle: {...tailwind('py-3 px-2 rounded-sm font-normal'), borderColor: Colors.inputBorder, borderWidth: 1, height: 44}
    });
    const color = useMemo(
        () => getTextColor(primary, disabled, error),
        [primary, disabled, error]
    );
    const fontSize = useMemo(
        () => getFontSize(sm, md, lg, xl, xxl),
        [sm, md, lg, xl, xxl]
    );
    const borderColor = useMemo(
        () => getBorderColor(primary, disabled, error),
        [primary, disabled, error]
    );
    return (
        <RNTextInput
            autoCompleteType="off"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            value={value} onChangeText={onChangeText}
            placeholder={placeholder}
            selectionColor={Colors.primaryText}
            placeholderTextColor={Colors.placeholderText}
            style={[styles.textInputStyle, { fontSize, color, borderColor, }, style]}
        />
    );
}

export default TextInput;
