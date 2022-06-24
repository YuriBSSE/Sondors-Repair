import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { Alert, View, FlatList, SafeAreaView, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTailwind } from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';
import isAuthenticatedAtom from 'atoms/isAuthenticatedAtom';
import { useAtom } from 'jotai';

import Text from 'components/common/Text';
import Colors from 'styles/Colors';

type Props = StackScreenProps<SettingsStackParamList, 'Settings'>;

type SettingsListItem = {
    id: string;
    label: string;
    onPress: (event: GestureResponderEvent) => void;
};

const Settings = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth();
    const [isAuthenticated, setIsAuthenticatedAtom] = useAtom(isAuthenticatedAtom);

    const logOut = () => {
        signOut(auth).then(() => {
           setIsAuthenticatedAtom(false)
          }).catch((error) => {
            // An error happened.
          });
    }

    const settingsListData = [
        {
            id: '1',
            label: 'Update password',
            onPress: () => navigation.navigate('UpdatePassword')
        }, {
            id: '2',
            label: 'Log out',
            onPress: () => logOut()
        }
    ];

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <FlatList style={tailwind('w-full mt-4')} data={settingsListData} keyExtractor={(item) => item.id} renderItem={
                    ({ item }: { item: SettingsListItem }) => (
                        <TouchableOpacity style={tailwind('px-5 py-3 border-b border-gray-200 flex-row justify-between items-center')} onPress={item.onPress} >
                            <Text lg left defaultColor={item.label === 'Update password'} error={item.label === 'Log out'}>{item.label}</Text>
                            {item.label === 'Update password' && <Ionicons name="chevron-forward" size={18} color={Colors.tertiaryText} />}
                        </TouchableOpacity>
                    )
                }
                ListFooterComponent={() => (
                    <View style={tailwind('px-5 py-3')}>
                        <Text tertiary left>{`Terms & Conditions`}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default Settings;
