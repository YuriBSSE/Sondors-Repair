import React from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Text from 'components/common/Text';
import Colors from "styles/Colors";

type Props = {
    isModal?: boolean;
    isRoot?: boolean;
    isBack?: boolean;
    title: string;
    onPress?: (event: GestureResponderEvent) => void | undefined;
}

const HeaderLeft = ({ isModal = false, isRoot = false, title, onPress, isBack,pStyleTxt = {} }: Props) => {
    const tailwind = useTailwind()
    return (
        isModal || isRoot ? (
            <View style={tailwind('flex-row justify-between px-6 items-center')}>
                {isBack &&
                    <TouchableOpacity onPress={onPress}>
                        <AntDesign name="arrowleft" size={20} color="black" />
                    </TouchableOpacity>
                }
                <Text style={isBack ? tailwind('px-3') : tailwind(''),pStyleTxt,{fontSize:22}} xBold xl title>{title}</Text>
            </View>
        ) : (
            <TouchableOpacity style={tailwind('flex-row items-center pl-5')} onPress={onPress}>
                <Ionicons name="chevron-back" size={20} color={Colors.primary} />
                <Text bold lg style={{ color: Colors.primary,fontSize:20 }}>{title}</Text>
            </TouchableOpacity>
        )
    )
}

export default HeaderLeft;