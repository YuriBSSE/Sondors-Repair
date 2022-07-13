import Text from "components/common/Text"
import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import { useTailwind } from 'tailwind-rn';
import TextInput from "components/common/TextInput";
import Button from "components/common/Button";
import { DaysTimePicker } from 'components/CustomDateTimePicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useTheme } from '@react-navigation/native';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useAtom } from 'jotai';
import workingDays from "../../atoms/hours";

type Props = {
    navigation: NavigationProp<OnboardingOneParamList, 'OnboardingOne'>;
};

const initialShop = {
    shopName: '',
    street1: '',
    city: '',
    state: '',
    zipCode: ''
}

const OnboardingOne = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth();
    const db = getFirestore();
    const [shop, setSetShop] = useState(initialShop)
    const [workingDaysHours, setWorkingDaysHours] = useAtom(workingDays)
    const [additional, onChangeAdditional] = useState([1])

    const handleOnChange = (name: string, value: any) => {
        setSetShop({ ...shop, [name]: value })
    }

    const onContinue = async () => {
        if(
            shop.shopName == '' ||
            shop.street1 == '' ||
            shop.city == '' ||
            shop.state == '' ||
            shop.zipCode == ''
        ) return Alert.alert('Please Address From')

        const { currentUser } = auth
        await updateDoc(doc(db, "users", `${currentUser?.uid}`), {
            name: shop.shopName,
            address: {
                street1: shop.street1,
                street2: `${shop.city}, ${shop.state}, ${shop.zipCode}`
            },
            hours: [
                workingDaysHours
            ]
        }).then(() => {
            navigation.navigate('OnboardingTwo')
        })
    }

    const additionalHours = async () => {
        // Alert.alert("ASD")
        const a = [...additional]
        a.push(1)
        onChangeAdditional(a)
    }

    return (
        <SafeAreaView style={{ flex: 1, ...tailwind('bg-white') }}>
            <Text xxl tertiary bold style={{ marginTop: 72 }}>Welcome</Text>
            <Text xl title style={{ ...tailwind('mt-4') }}>Tell us more about your shop</Text>
            <View style={tailwind('mt-6 px-6')}>
                <TextInput
                    style={tailwind('mt-3')} lg placeholder='Shop Name'
                    onChangeText={(text) => handleOnChange('shopName', text)}
                />
                <TextInput
                    style={tailwind('mt-3')} lg placeholder='Street Address'
                    onChangeText={(text) => handleOnChange('street1', text)}
                />
                <View style={{ ...tailwind('mt-3 flex flex-row') }}>
                    <TextInput
                        style={{ flex: 2, marginRight: 8 }}
                        lg placeholder='City'
                        onChangeText={(text) => handleOnChange('city', text)}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: 8 }}
                        lg placeholder='State'
                        onChangeText={(text) => handleOnChange('state', text)}
                    />
                    <TextInput
                        style={{ flex: 1.5 }}
                        lg
                        placeholder='Zip Code'
                        onChangeText={(text) => handleOnChange('zipCode', text)} />
                </View>
            </View>
            <Text left title md bold style={tailwind('mt-8 px-6')}>Hours</Text>
            <ScrollView style={tailwind('px-6')}>
                {
                    additional.map((x, i)=>{
                        return(
                            <DaysTimePicker setWorkingDaysHours={setWorkingDaysHours} DaysTimePickerClasses='mt-3' />
                        )
                    })
                }
                {/* <DaysTimePicker setWorkingDaysHours={setWorkingDaysHours} DaysTimePickerClasses='mt-3' /> */}
                {/* <DaysTimePicker setWorkingDaysHours={setWorkingDaysHours} DaysTimePickerClasses='mt-3' /> */}
                <TouchableOpacity onPress={additionalHours} style={tailwind('mb-3 mt-3')}>
                    <Text left md tertiary title >+ Additional Hours</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={tailwind('p-6 px-6')}>
                {/* <TouchableOpacity onPress={additionalHours} style={tailwind('mb-3 mt-3')}>
                    <Text left md tertiary title >+ Additional Hours</Text>
                </TouchableOpacity> */}
                <Button
                    onPress={onContinue}
                    // onPress={() => navigation.navigate('OnboardingTwo')}
                    style={tailwind('mt-3 rounded')}
                    titleStyle={{ fontWeight: '700' }}
                    lg
                    title='Continue'
                />
            </View>
        </SafeAreaView>
    )
}

export default OnboardingOne