import React, { ReactElement, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAtom } from 'jotai';

import isKeyboardVisibleAtom from "atoms/isKeyboardVisibleAtom";

const KeyboardDismissView = ({ children }: { children: ReactElement }) => {
    const [, setKeyboardVisible] = useAtom(isKeyboardVisibleAtom);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}

export default KeyboardDismissView;
