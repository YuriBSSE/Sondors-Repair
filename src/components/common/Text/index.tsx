import React, { ReactElement, useMemo } from 'react';
import { Text as RNText } from 'react-native';

import getColor from './getColor';
import getFontWeight from './getFontWeight';
import getFontSize from './getFontSize';
import getTextAlign from './getTextAlign';
import TextProps from 'types/textProps';

/**
 * This function represents the Text component used throughout the app.
 * @param props
 */
const Text = ({
    // Colors
    primary,
    secondary,
    tertiary,
    title,
    disabled = false,
    hyperlink,
    error = false,
    placeholder,
    // Font sizes
    sm,
    md = true,
    lg,
    xl,
    xxl,
    // Font weights
    bold,
    xBold,
    heavy,
    normal,
    // Text alignments
    left,
    centered = true,
    right,
    // Other
    children,
    lineHeight,
    numberOfLines,
    style,
    onPress
}: TextProps): ReactElement => {
    const color = useMemo(
        () =>
            getColor(primary, secondary, tertiary, title, hyperlink, disabled, error, placeholder),
        [primary, secondary, tertiary, title, hyperlink, disabled, error, placeholder]
    );
    const fontWeight = useMemo(
        () => getFontWeight(bold, heavy, normal, xBold),
        [bold, heavy, normal, xBold]
    );
    const fontSize = useMemo(
        () => getFontSize(sm, md, lg, xl, xxl),
        [sm, md, lg, xl, xxl]
    );
    const textAlign = useMemo(
        () => getTextAlign(centered, left, right),
        [centered, left, right]
    );

    return (
        <RNText
            numberOfLines={numberOfLines}
            style={[
                {
                    color,
                    fontSize,
                    fontWeight,
                    lineHeight,
                    textAlign
                },
                style
            ]}
            onPress={onPress}
        >
            {children}
        </RNText>
    );
}

export default Text;
