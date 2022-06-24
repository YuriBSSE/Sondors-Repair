import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NavigationProp } from '@react-navigation/native';
import { useAtom } from 'jotai';


import ProviderDetailsView from 'components/ProviderDetailsView';
import providerDetailsAtom from 'atoms/providerDetailsAtom';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';
import { Colors } from 'stream-chat-expo';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Loader } from 'components/common/Loader';


type Props = {
    navigation: NavigationProp<ProviderProfileStackParamList, 'ProviderProfile'>;
}

const ProviderProfile = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth()
    const db = getFirestore()

    const [providerDetails, setProviderDetails] = useAtom(providerDetailsAtom);
    const [loader, setLoader] = useState(false)

    const getProviderDetails = () => {
        setLoader(true)
        const { currentUser } = auth
        const userDocRef = doc(db, "users", `${currentUser?.uid}`);
        getDoc(userDocRef).then((currentUser) => {
            const userData: any = currentUser.data()
            setProviderDetails(userData)
            setLoader(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoader(false)
        })
    }

    useEffect(() => {
        getProviderDetails()
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isRoot onPress={() => navigation.goBack()} title={providerDetails.name} />,
            headerRight: () => <HeaderRight onPress={() => navigation.navigate('EditProviderProfile')} title="Edit" />,
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isRoot onPress={() => navigation.goBack()} title={providerDetails.name} />,
            headerRight: () => <HeaderRight onPress={() => navigation.navigate('EditProviderProfile')} title="Edit" />,
        });
    }, [providerDetails.name]);

    return (
        <SafeAreaView style={{ ...tailwind('flex bg-white items-center justify-center h-full w-full'), borderTopWidth: 1, borderColor: Colors.border }}>
            <View style={tailwind('flex h-full justify-between w-full')}>
                {
                    !loader ?
                        <ProviderDetailsView providerDetails={providerDetails} />
                        :
                        <Loader />
                }
            </View>
        </SafeAreaView>
    );
}

export default ProviderProfile;
