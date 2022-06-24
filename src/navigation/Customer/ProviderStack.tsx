import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAtom } from 'jotai';

import { AntDesign } from '@expo/vector-icons';
import Providers from 'screens/customer/CustomerProvidersStack/Providers';
import showProviderSearchFiltersAtom from 'atoms/showProviderSearchFiltersAtom';
import ProviderDetails from 'screens/customer/CustomerProvidersStack/ProviderDetails';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';
import Colors from 'styles/Colors';

const ProviderStack = createStackNavigator<ProviderStackParamList>();

const ProvidersStack = () => {
    const [showProviderSearchFilters, setShowProviderSearchFilters] = useAtom(showProviderSearchFiltersAtom);

    return (
        <ProviderStack.Navigator>
            <ProviderStack.Screen name="Providers" component={Providers} options={{
                headerTitle: "",
                headerLeft: () => <HeaderLeft isRoot title="Providers near you" />,
                headerRight: showProviderSearchFilters ? 
                () => <HeaderRight onPress={() => setShowProviderSearchFilters(false)} icon={<AntDesign name="close" size={20} color={Colors.primary} />} />
                : () => <HeaderRight onPress={() => setShowProviderSearchFilters(true)} icon={<AntDesign name="filter" size={20} color={Colors.primary} />} />,
                headerShadowVisible: false
            }} />
            <ProviderStack.Screen name="ProviderDetails" component={ProviderDetails} options={{
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false
            }} />
        </ProviderStack.Navigator>
    );
};

export default ProvidersStack;
