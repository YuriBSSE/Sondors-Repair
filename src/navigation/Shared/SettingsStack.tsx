import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from 'screens/shared/Settings';
import UpdatePassword from 'screens/shared/UpdatePassword';
import HeaderLeft from 'components/HeaderLeft';

const SettingsStackNavigator = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
    return (
        <SettingsStackNavigator.Navigator>
            <SettingsStackNavigator.Screen name="Settings" component={Settings} options={{
                headerTitle: "",
                headerLeft: () => <HeaderLeft isRoot title="Settings" />,
                headerShadowVisible: false
                
            }} />
            <SettingsStackNavigator.Screen name="UpdatePassword" component={UpdatePassword} options={{
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false                
            }} />
        </SettingsStackNavigator.Navigator>
    );
};

export default SettingsStack;