import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTailwind } from 'tailwind-rn';

import SignIn from './SignIn';
import SignUp from './SignUp';
import OnboardingOne from './OnboardingOne';
import OnboardingTwo from './OnboardingTwo';
import ForgotPassword from './ForgotPassword'

const Stack = createStackNavigator();

type Props = {
    isShop: boolean
}

const Auth = ({ isShop } : Props) => {
    const tailwind = useTailwind();

    return (
        <Stack.Navigator  initialRouteName={isShop ? 'OnboardingOne' : 'SignIn'}>
            <Stack.Screen name="SignIn" component={SignIn} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{
                headerShown: false
            }} />
            <Stack.Screen name="OnboardingOne" component={OnboardingOne} options={{
                headerShown: false
            }} />
            <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} options={{
                headerShown: false
            }} />
             <Stack.Screen name="Reset Password" component={ForgotPassword} options={{
                headerShown: true
            }} />
        </Stack.Navigator>
    )
}

export default Auth