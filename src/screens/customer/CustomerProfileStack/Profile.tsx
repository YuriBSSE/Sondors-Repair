import React from 'react';
import { FlatList, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { StackScreenProps } from '@react-navigation/stack';

import Text from 'components/common/Text';
import customerDetailsAtom from 'atoms/customerDetailsAtom';
import Button from 'components/common/Button';
import Colors from 'styles/Colors';
import capitalizeFirstLetters from 'utilities/capitalizeFirstLetters';
import Rating from 'components/Rating'

type Props = StackScreenProps<ProfileStackParamList, 'Profile'>;

const Profile = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);

    function confirmDeleteBike(id: string) {
        function deleteBike() {
            const initialMemo: CustomerBike[] = [];
            const newBikes = customerDetails.bikes.reduce((memo: CustomerBike[], iteratee: CustomerBike): CustomerBike[] => {
                if (iteratee.id !== id) {
                    memo.push(iteratee)
                }

                return memo;
            }, initialMemo);
            setCustomerDetails({ ...customerDetails, bikes: newBikes })
        }

        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this bike?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteBike()
                }
            ]
        );
    }

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center h-full')}>
            <View style={tailwind('flex flex-col w-full px-2')}>
                <View style={tailwind('mt-4')}>
                    <Rating isLabel={false} isCount={false} defaultRating={customerDetails.rating} />
                    <Text tertiary left sm style={tailwind('mt-2 px-3 ml')}>Member since September 2022</Text>
                </View>
                <View style={tailwind('mt-12 px-3')}>
                    <Text tertiary left bold xl>SONDORS</Text>
                    <FlatList
                        style={tailwind('mb-6')}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }: { item: CustomerBike }) => (
                            <TouchableOpacity onLongPress={() => confirmDeleteBike(item.id)} style={[tailwind('flex-row h-24 rounded mt-6'), { borderColor: Colors.secondaryBackground, borderWidth: 1 }]} onPress={() => navigation.navigate('EditBike', { bikeDetails: item })}>
                                <View style={[tailwind('w-7/12 justify-center items-center'), { backgroundColor: Colors.secondaryBackground }]}>
                                    <Text sm>BIKE IMAGE</Text>
                                </View>
                                <View style={tailwind('flex-col px-3 pb-3.5 pt-5 justify-between')}>
                                    <Text left>{capitalizeFirstLetters(item.model)}</Text>
                                    <View>
                                        <Text left tertiary sm>Date Added</Text>
                                        <Text sm>{item.dateAdded}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        data={customerDetails.bikes}
                    />
                    <Button title="Add new" onPress={() => navigation.navigate('NewBike')} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Profile;
