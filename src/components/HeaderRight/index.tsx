import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

import Text from 'components/common/Text';

type Props = {
    title?: string;
    onPress?: (event: GestureResponderEvent) => void;
    icon?: any;
}

const HeaderRight = ({ title, onPress, icon }: Props) => {
    const tailwind = useTailwind()
    return (
        <TouchableOpacity onPress={onPress} style={tailwind('pr-5')}>
            <Text heavy hyperlink lg>{icon} {title}</Text>
            
        </TouchableOpacity>
    )
}

export default HeaderRight;
