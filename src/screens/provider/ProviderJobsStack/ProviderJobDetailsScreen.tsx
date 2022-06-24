import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import JobView from 'components/JobView';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';

type Props = {
    route: RouteProp<ProviderJobsStackParamList, 'ProviderJobDetailsScreen'>;
    navigation: NavigationProp<ProviderJobsStackParamList, 'ProviderJobDetailsScreen'>;
}

const ProviderJobDetailsScreen = ({ route, navigation }: Props) => {
    const tailwind = useTailwind();
    const { headerRightTitle, headerLeftTitle, headerRightOnPress, jobDetails } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title={headerLeftTitle} />,
            headerRight: headerRightTitle ? () => <HeaderRight onPress={headerRightOnPress!} title={headerRightTitle} />: null,
        });
    }, []);

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center w-full h-full')}>
            <View style={tailwind('w-full flex h-full justify-between')}>
                <JobView jobDetails={jobDetails} />
            </View>
        </SafeAreaView>
    );
}

export default ProviderJobDetailsScreen;
