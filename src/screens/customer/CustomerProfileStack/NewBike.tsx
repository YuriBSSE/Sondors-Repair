import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { StackScreenProps } from '@react-navigation/stack';

import Text from 'components/common/Text';
import customerDetailsAtom from 'atoms/customerDetailsAtom';
import KeyboardDismissView from 'components/common/KeyboardDismissView';
import Colors from 'styles/Colors';
import bikeModelsAtom from 'atoms/bikeModelsAtom';
import PickerSelect from 'components/common/PickerSelect';
import TextInput from 'components/common/TextInput';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';

type Props = StackScreenProps<ProfileStackParamList, 'NewBike'>;

const NewBike = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
    const [updatedModel, setUpdatedModel] = useState('');
    const [updatedDateAdded, setUpdatedDateAdded] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');
    const [bikeModels] = useAtom(bikeModelsAtom);

    function updateCustomerDetails() {
        const newBike = {
            id: String(Number(customerDetails.bikes.slice(-1)[0].id) + 1),
            model: updatedModel,
            dateAdded: updatedDateAdded,
            image: updatedImage
        };
        const newBikes = [...customerDetails.bikes, newBike]; 
        const newCustomerDetails = {
            name: customerDetails.name,
            password: customerDetails.password,
            rating: customerDetails.rating,
            bikes: newBikes
        }; 
        setCustomerDetails(newCustomerDetails);
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title="Add New Bike" />,
            headerRight: () => <HeaderRight onPress={() => updateCustomerDetails()} title="Save" />,
        });
    }, []);

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center h-full')}>
            <KeyboardDismissView>
                <>
                    <View style={[tailwind('w-full h-48 items-center justify-center'), { backgroundColor: Colors.secondaryBackground }]}>
                        <Text placeholder lg>BIKE IMAGE</Text>
                    </View>
                    <View style={tailwind('pt-4 px-5 w-full')}>
                        <TouchableOpacity onPress={() => setUpdatedImage('')}>
                            <Text bold hyperlink left>Upload image</Text>
                        </TouchableOpacity>
                        <Text left bold tertiary style={tailwind('mt-8')}>Model</Text>
                        <PickerSelect style={tailwind('mt-3')} items={bikeModels} value={updatedModel} onValueChange={(text: string) => setUpdatedModel(text)} placeholder='Bike Model' />
                        <Text left bold tertiary style={tailwind('mt-8')}>Year Purchased</Text>
                        <TextInput style={tailwind('mt-3')} value={updatedDateAdded} onChangeText={(text: string) => setUpdatedDateAdded(text)} placeholder="What month and year was your bike purchased?" />
                    </View>
                </>
            </KeyboardDismissView>
        </SafeAreaView>
    );
}

export default NewBike;
