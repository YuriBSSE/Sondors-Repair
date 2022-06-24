import { TextStyle } from 'react-native';

import { TextAlignmnets } from 'styles/Typography';

/**
 * This function returns the text alignment to use for Text components based on props.
 * @param center
 * @param left
 * @param right
 */
const getTextAlign = (
    centered?: boolean,
    left?: boolean,
    right?: boolean
): TextStyle['textAlign'] | undefined => {
    if (left) return TextAlignmnets.LEFT;
    if (right) return TextAlignmnets.RIGHT;
    if (centered) return TextAlignmnets.CENTER;

    return TextAlignmnets.AUTO;
}

export default getTextAlign;
