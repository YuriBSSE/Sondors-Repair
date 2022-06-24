import React, { ReactElement, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn'

import Text from 'components/common/Text'
import getFontSize from 'components/common/Text/getFontSize'
import ButtonProps from 'types/buttonProps'
import getButtonColor from './getButtonColor'
import getTextColor from './getTextColor'
import capitalizeFirstLetter from 'utilities/capitalizeFirstLetter'

/**
 * This function represents the Button component to be used throughout the app.
 * @param props
 */
function Button({
    // container Style
    containerPaddingVoid,
    // Button types
    primary = true,
    secondary,
    accent,
    // Button states
    disabled = false,
    loading,
    // Button styles
    buttonStyle,
    style,
    titleStyle,
    // Button props
    onPress,
    title,
    // Font sizes
    sm,
    md,
    lg,
    xl,
    xxl,
    // Font weights
    normal,
    bold,
    heavy = true
}: ButtonProps): ReactElement {
    const tailwind = useTailwind()
    const styles = StyleSheet.create({
        container: {...tailwind(`${!containerPaddingVoid ? 'py-3.5' : ""} items-center justify-center w-full`)}
    });
    const textColorProps = useMemo(
        () => getTextColor(primary, secondary, disabled, accent),
        [primary, secondary, disabled, accent]
    );
    const fontSize = useMemo(
        () => getFontSize(sm, md, lg, xl, xxl),
        [sm, md, lg, xl, xxl]
    );
    const buttonColorStyle = useMemo(
        () => getButtonColor(primary, secondary, disabled, accent),
        [primary, secondary, disabled, accent]
    );

    return (
        <TouchableOpacity
            disabled={disabled || loading}
            style={[styles.container, style, buttonColorStyle, buttonStyle]}
            onPress={onPress}
        >
            <Text
                bold={bold}
                disabled={disabled}
                heavy={heavy}
                normal={normal}
                style={[titleStyle, { fontSize }]}
                {...textColorProps}
            >
                {capitalizeFirstLetter(title)}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
