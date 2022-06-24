import React from 'react';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import Colors from 'styles/Colors';

import ProviderJobBoardScreen from 'screens/provider/ProviderJobBoardStack/ProviderJobBoardScreen';
import ProviderJobDetailsScreen from 'screens/provider/ProviderJobBoardStack/ProviderJobDetailsScreen';

import HeaderLeft from 'components/HeaderLeft';

const ProviderJobBoard = createStackNavigator<ProviderJobBoardStackParamList>();

const ProviderJobBoardStack = () => (
    <ProviderJobBoard.Navigator>
        <ProviderJobBoard.Screen name="ProviderJobBoardScreen" component={ProviderJobBoardScreen} options={{
           title: 'Job Board',
           headerTitleStyle: {
               fontWeight: 'bold',
             },
             headerTintColor: Colors.dark,
             headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderColor: Colors.border

             }
        }} />
        <ProviderJobBoard.Screen name="ProviderJobDetailsScreen" component={ProviderJobDetailsScreen} options={{
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false                
        }} />
    </ProviderJobBoard.Navigator>
);

export default ProviderJobBoardStack;
