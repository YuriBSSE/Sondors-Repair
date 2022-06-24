import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { StackScreenProps } from '@react-navigation/stack';

import providersAtom from 'atoms/providersAtom';
import ProviderSearchListItem from 'components/ProviderSearchListItem';
import TextInput from 'components/common/TextInput';
import PickerSelect from 'components/common/PickerSelect';
import Button from 'components/common/Button';
import bikeServicesAtom from 'atoms/bikeServicesAtom';
import providerRatingsAtom from 'atoms/providerRatingsAtom';
import providerDistancesAtom from 'atoms/providerDistancesAtom';
import showProviderSearchFiltersAtom from 'atoms/showProviderSearchFiltersAtom';
import KeyboardDismissView from 'components/common/KeyboardDismissView';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

import { Loader } from 'components/common/Loader';
import Text from 'components/common/Text';

type Props = StackScreenProps<ProviderStackParamList, 'Providers'>;

const Providers = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const db = getFirestore()
    const [bikeServices] = useAtom(bikeServicesAtom);
    const [showProviderSearchFilters, setShowProviderSearchFilters] = useAtom(showProviderSearchFiltersAtom);
    const [providers, setProviders] = useAtom(providersAtom);
    const [providerRatings] = useAtom(providerRatingsAtom);
    const [providerDistances] = useAtom(providerDistancesAtom);
    const [providerRating, setProviderRating] = useState<number | undefined | null>();
    const [bikeService, setBikeService] = useState('');
    const [providerName, setProviderName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [providerDistance, setProviderDistance] = useState('');
    const [loading, setLoading] = useState(false)

    const getAllProvider = async () => {
        setLoading(true)
        const q = query(collection(db, "users"), where("userType", "==", 'provider'));
        await getDocs(q).then((querySnapshot) => {
            const providers: any = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            })
            setProviders(providers)
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(true)
        });
    }

    useEffect(() => {
        getAllProvider()
    }, [])


    const resetFilter = () => {
        if (providerName || providerRating || providerDistance || zipCode || bikeService) {
            setProviderRating(null)
            setBikeService('');
            setProviderName('');
            setZipCode('');
            setProviderDistance('')
            getAllProvider()
            setShowProviderSearchFilters(false)

        }
    }

    const filteredProviders = async () => {
        const usersRef = collection(db, "users")
        const q = query(usersRef, where('name', '==', providerName))
        await getDocs(q).then((querySnapshot) => {
            const providers: any = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            })
            setProviders(providers)
            setLoading(false)
            setShowProviderSearchFilters(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(true)
        });

    }


    const NoProviders = () => {
        const tailwind = useTailwind();
        return (
            <View style={tailwind('flex bg-white items-center justify-center h-full px-8 w-full')}>
                <Text bold numberOfLines={2} xxl>Searching data is not found</Text>
                <Button buttonStyle={tailwind('mt-12')} title="Continue" onPress={resetFilter} />
            </View>
        );
    }

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <KeyboardDismissView>
                <>
                    {showProviderSearchFilters && (
                        <View style={tailwind('px-5 py-2 mt-1 flex-col w-full border border-gray-200')}>
                            <TextInput placeholder='Search by name...' value={providerName} onChangeText={(text: string) => setProviderName(text)} style={tailwind('mt-3')} />
                            <TextInput placeholder='Zip code' value={zipCode} onChangeText={(text: string) => setZipCode(text)} style={tailwind('mt-3')} />
                            <PickerSelect placeholder='Within 5 miles' items={providerDistances} value={providerDistance} onValueChange={(selectedProviderDistance: string) => setProviderDistance(selectedProviderDistance)} style={tailwind('mt-3')} />
                            <PickerSelect placeholder='All ratings' items={providerRatings} value={providerRating} onValueChange={(selectedProviderRating: number) => setProviderRating(selectedProviderRating)} style={tailwind('mt-3')} />
                            <PickerSelect placeholder='All services' items={bikeServices} value={bikeService} onValueChange={(selectedBikeService: string) => setBikeService(selectedBikeService)} style={tailwind('mt-3')} />
                            <View style={tailwind('flex-row justify-between mt-3')}>
                                <Button onPress={resetFilter} secondary title='Reset' style={[tailwind('w-2/5'), { borderRadius: 4 }]} />
                                <Button onPress={filteredProviders} title='Update results' style={[tailwind('w-7/12'), { borderRadius: 4 }]} />
                            </View>
                        </View>
                    )}
                    {!loading ?
                        providers.length > 0 ?
                            <FlatList
                                style={tailwind('w-full')}
                                data={providers}
                                renderItem={
                                    ({ item }) => (
                                        <ProviderSearchListItem key={item.id} provider={item} onPress={() => navigation.navigate('ProviderDetails', { providerDetails: item })} />
                                    )}
                                keyExtractor={item => item.id}
                                ItemSeparatorComponent={() => <View style={tailwind('w-full bg-gray-200 h-px')} />}
                                onScrollBeginDrag={() => setShowProviderSearchFilters(false)}
                            /> :
                            <NoProviders />
                        : <Loader />}
                </>
            </KeyboardDismissView>
        </SafeAreaView>
    );
}

export default Providers;
