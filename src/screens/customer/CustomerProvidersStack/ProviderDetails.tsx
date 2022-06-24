import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import ProviderDetailsView from 'components/ProviderDetailsView';
import HeaderLeft from 'components/HeaderLeft';

type Props = {
    navigation: NavigationProp<ProviderStackParamList, 'ProviderDetails'>;
    route: RouteProp<ProviderStackParamList, 'ProviderDetails'>;
}

const ProviderDetails = ({ route, navigation }: Props) => {
    const tailwind = useTailwind();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title={route.params.providerDetails.name} />,
        });
    }, []);

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <View style={tailwind('flex h-full justify-between')}>
                <ProviderDetailsView providerDetails={route.params.providerDetails} />
            </View>
        </SafeAreaView>
    );
}

export default ProviderDetails;
