import { ReactNode } from 'react'
import { StyleProp, GestureResponderEvent, TextStyle } from 'react-native'

interface PickerSelectProps {
    items: Item[];
    value: any;
    onValueChange: (value: any, index: number) => void | undefined;
    placeholder: string;
    style?: ViewStyle;
}

export default PickerSelectProps;
