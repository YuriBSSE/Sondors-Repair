import { TextStyle } from 'react-native';

import { FontWeights } from 'styles/Typography';

/**
 * This function returns the font weight to use for Text components based on props.
 * @param bold
 * @param heavy
 * @param normal
 * @param xBold
 */
const getFontWeight = (
    bold?: boolean,
    heavy?: boolean,
    normal?: boolean,
    xBold?: boolean
): TextStyle['fontWeight'] | undefined => {
    if (bold) return FontWeights.BOLD;
    if (heavy) return FontWeights.HEAVY;
    if (normal) return FontWeights.NORMAL;
    if (xBold) return FontWeights.xBOLD;

    return FontWeights.NORMAL;
}

export default getFontWeight;
