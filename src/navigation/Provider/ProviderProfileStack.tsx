import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProviderProfile from 'screens/provider/ProviderProfileStack/ProviderProfile';
import EditProviderProfile from 'screens/provider/ProviderProfileStack/EditProviderProfile';

const ProviderProfileStackNavigator = createStackNavigator<ProviderProfileStackParamList>();

const ProviderProfileStack = () => (
    <ProviderProfileStackNavigator.Navigator>
        <ProviderProfileStackNavigator.Screen name="ProviderProfile" component={ProviderProfile} options={{
            headerTitle: "",
            headerShadowVisible: false
        }} />
        <ProviderProfileStackNavigator.Screen name="EditProviderProfile" component={EditProviderProfile} options={{
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false                
        }} />
    </ProviderProfileStackNavigator.Navigator>
);

export default ProviderProfileStack;
