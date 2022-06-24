import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';

import Text from 'components/common/Text';
import customerDetailsAtom from 'atoms/customerDetailsAtom';
import Colors from 'styles/Colors';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import NewJobImage from 'assets/NewJobImage';
import PickerSelect from 'components/common/PickerSelect';
import bikeModelsAtom from 'atoms/bikeModelsAtom';
import TextInput from 'components/common/TextInput';
import KeyboardDismissView from 'components/common/KeyboardDismissView';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';

type Props = {
    navigation: NavigationProp<ProfileStackParamList, 'EditBike'>;
    route: RouteProp<ProfileStackParamList, 'EditBike'>;
};

const EditBike = ({ navigation, route }: Props) => {
    const { id, model, dateAdded, image } = route.params.bikeDetails;
    const tailwind = useTailwind();
    const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
    const [updatedModel, setUpdatedModel] = useState(model);
    const [updatedDateAdded, setUpdatedDateAdded] = useState(dateAdded);
    const [updatedImage, setUpdatedImage] = useState(image);
    const [bikeModels] = useAtom(bikeModelsAtom);

    function updateCustomerDetails() {
        const newBikes = customerDetails.bikes.map(bike => {
            if (bike.id === id) {
                const updatedBike = {
                    id,
                    model: updatedModel,
                    dateAdded: updatedDateAdded,
                    image: updatedImage
                };

                return updatedBike;
            }
            return bike;
        })
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
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title={route.params.bikeDetails.model} />,
            headerRight: () => <HeaderRight onPress={() => updateCustomerDetails} title="Save" />,
        });
    }, []);

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center h-full')}>
            <KeyboardDismissView>
                <>
                    {image ? (
                        <View style={tailwind('w-full h-64 items-center justify-center')}>
                            <NewJobImage />
                        </View>
                    ) : (
                        <View style={[tailwind('w-full h-48 items-center justify-center'), { backgroundColor: Colors.secondaryBackground }]}>
                            <Text placeholder lg>BIKE IMAGE</Text>
                        </View>
                    )}
                    <View style={tailwind('pt-4 px-5 w-full')}>
                        <TouchableOpacity onPress={() => setUpdatedImage('')}>
                            <Text bold hyperlink left>Upload new image</Text>
                        </TouchableOpacity>
                        <Text left bold tertiary style={tailwind('mt-8')}>Model</Text>
                        <PickerSelect style={tailwind('mt-3')} items={bikeModels} value={updatedModel} onValueChange={(text: string) => setUpdatedModel(text)} placeholder='Bike Model' />
                        <Text left bold tertiary style={tailwind('mt-8')}>Year Purchased</Text>
                        <TextInput style={tailwind('mt-3')} value={dateAdded} onChangeText={(text: string) => setUpdatedDateAdded(text)} placeholder="What month and year was your bike purchased?" />
                    </View>
                </>
            </KeyboardDismissView>
        </SafeAreaView>
    );
}

export default EditBike;
