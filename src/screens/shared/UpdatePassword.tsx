import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';

import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import customerDetailsAtom from 'atoms/customerDetailsAtom';
import HeaderLeft from 'components/HeaderLeft';
import Colors from 'styles/Colors';

type Props = StackScreenProps<SettingsStackParamList, 'Settings'>;

const UpdatePassword = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isRoot isBack onPress={() => navigation.goBack()} title="Update password" />,
        });
    }, [])

    function updatePassword() {
        setCustomerDetails({ ...customerDetails, password: confirmPassword });
        navigation.goBack();
    }

    return (
        <SafeAreaView  style={{...tailwind('flex bg-white items-center h-full'), borderTopWidth: 1, borderColor: Colors.border}}>
            <View style={tailwind('w-full px-6 pt-9')}>
                <TextInput value={password} placeholder="Current password" onChangeText={(text: string) => setPassword(text)} />
                <TextInput style={tailwind('my-6')} value={confirmPassword} placeholder="New password" onChangeText={(text: string) => setConfirmPassword(text)} />
                <Button style={{borderRadius: 8}} disabled={password.length === 0 || password !== confirmPassword} title="Update" onPress={() => updatePassword()} />
            </View>
        </SafeAreaView>
    );
}

export default UpdatePassword;
