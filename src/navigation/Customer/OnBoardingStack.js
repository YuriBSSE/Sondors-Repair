import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAtom } from 'jotai';

import OnBoardingScreenOne from 'screens/customer/CustomerOnBoardingStack/OnBoardingScreenOne';
import OnBoardingScreenTwo from 'screens/customer/CustomerOnBoardingStack/OnBoardingScreenTwo';
import OnBoardingScreenThree from 'screens/customer/CustomerOnBoardingStack/OnBoardingScreenThree';



const ProfileStackNavigator = createStackNavigator();

const OnBoardingScreensStacks = () => {

    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen name="OnBoardingScreenOne" component={OnBoardingScreenOne} options={{
                headerShown: false
            }} />
            <ProfileStackNavigator.Screen name="OnBoardingScreenTwo" component={OnBoardingScreenTwo} options={{
                    headerShown: false              
            }} />
            <ProfileStackNavigator.Screen name="OnBoardingScreenThree" component={OnBoardingScreenThree} options={{
                    headerShown: false
            }} />
        </ProfileStackNavigator.Navigator>
    );
};

export default OnBoardingScreensStacks;