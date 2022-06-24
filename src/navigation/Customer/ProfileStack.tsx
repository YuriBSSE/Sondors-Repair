import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAtom } from 'jotai';

import Profile from 'screens/customer/CustomerProfileStack/Profile';
import NewBike from 'screens/customer/CustomerProfileStack/NewBike';
import EditBike from 'screens/customer/CustomerProfileStack/EditBike';
import customerDetailsAtom from 'atoms/customerDetailsAtom';

import HeaderLeft from 'components/HeaderLeft';

const ProfileStackNavigator = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
    const [customerDetails] = useAtom(customerDetailsAtom);
    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen name="Profile" component={Profile} options={{
                headerTitle: "",
                headerLeft: () => <HeaderLeft isRoot title={customerDetails.name} />,
                headerShadowVisible: false
            }} />
            <ProfileStackNavigator.Screen name="EditBike" component={EditBike} options={{
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false                
            }} />
            <ProfileStackNavigator.Screen name="NewBike" component={NewBike} options={{
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false
            }} />
        </ProfileStackNavigator.Navigator>
    );
};

export default ProfileStack;