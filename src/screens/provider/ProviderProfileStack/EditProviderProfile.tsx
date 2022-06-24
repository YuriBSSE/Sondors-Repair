import React, { useEffect, useState } from 'react';
import Accordion from 'components/Accordion';
import { SafeAreaView, View, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NavigationProp } from '@react-navigation/native';
import { useAtom } from 'jotai';

import providerDetailsAtom from 'atoms/providerDetailsAtom';
import providerUpdatedDetailsAtom from "atoms/providerUpdateDetailsAtom"
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';
import Colors from 'styles/Colors';
import HoursEdit from 'components/ProviderEdit/HoursEdit';
import ServicesEdit from 'components/ProviderEdit/ServicesEdit';

import InfoForm from 'components/ProviderEdit/InfoForm'
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";



type Props = {
    navigation: NavigationProp<ProviderProfileStackParamList, 'EditProviderProfile'>;
}

const AccordionListData = [
    {
        id: 1,
        title: 'Shop Details',
        body: <InfoForm />
    },
    {
        id: 2,
        title: 'Hours',
        body: <HoursEdit />
    },
    {
        id: 3,
        title: 'Services',
        body: <ServicesEdit />
    },
]

const EditProviderProfile = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const [providerUpdatedDetails, setProviderUpdatedDetails] = useAtom(providerUpdatedDetailsAtom);
    const [providerDetails, setProviderDetails] = useAtom(providerDetailsAtom);
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isRoot isBack onPress={() => navigation.goBack()} title={'Edit Profile'} />,
            headerRight: () => <HeaderRight onPress={() => updateProviderProfile(providerUpdatedDetails)} title="Save" />,
        });
    }, [providerUpdatedDetails]);


    const handleData = async (data: any) => {
        setLoading(true)
        const { currentUser } = auth
        const userDocRef = doc(db, "users", `${currentUser?.uid}`);
        await updateDoc(doc(db, "users", `${currentUser?.uid}`), data).then(() => {
            Alert.alert('Provider Data Update Successfully!')
            setLoading(false)
        }).then(() => {
            setProviderUpdatedDetails({})
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(false)
        }).finally(() => {
            getDoc(userDocRef).then((currentUser) => {
                const userData: any = currentUser.data()
                setProviderDetails(userData)
            }).then(() => {
                navigation.navigate('ProviderProfile')
            })
        })
    }

    async function updateProviderProfile(data: any) {
        const fields = ['name', 'address', 'services', 'hours']
        const isFiled = fields.some(el => Object.keys(providerUpdatedDetails).includes(el))
        const isEmpty = Object.keys(providerUpdatedDetails).length === 0
        if (isEmpty) return Alert.alert('Data is Already Updated!')
        if (isFiled) {
            handleData(data)
        }
    };

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <View style={{ ...tailwind('w-full h-full'), borderTopWidth: 1, borderColor: Colors.border }}>
                <Accordion loading={loading} list={AccordionListData} />
            </View>
        </SafeAreaView>
    );
}

export default EditProviderProfile;
