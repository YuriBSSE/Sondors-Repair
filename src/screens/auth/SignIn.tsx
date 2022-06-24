import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTailwind } from 'tailwind-rn';
import { View, Keyboard, Alert } from 'react-native';
import { Image, Dimensions } from 'react-native';
import Text from 'components/common/Text';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import { NavigationProp } from '@react-navigation/native';
import HomeImage from '../../assets/images/sondors.png'
import SondorsLogoBlack from '../../assets/images/sondors-logo-black.png'

import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";


type Props = {
    navigation: NavigationProp<SignInStackParamList, 'SignIn'>;
};

const SignIn = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth();

    const [keyboardShow, setKeyboardShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardShow(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardShow(false);
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

      const onHandelSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
        })
        .catch((error) => {
            const errorMessage = error.message;
           Alert.alert(errorMessage)
        });
      }

    const { width } = Dimensions.get('window');
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 2 / 1.5, backgroundColor: '#fff', ...tailwind('flex items-center justify-center') }}>
                <Image source={HomeImage} style={{ width: '100%', height: '100%', resizeMode: keyboardShow ? 'cover' : 'contain' }} />  
            </View>
            <View style={{ flex: 2, ...tailwind('bg-white flex items-center') }}>
                <View >
                    <Image resizeMode='cover'  source={SondorsLogoBlack} style={{ resizeMode: 'contain', alignSelf: 'center', width: width * .7 }}  /> 
                </View>
                <View style={tailwind('w-full px-6 mt-8')}>
                    <TextInput value={email} lg placeholder='Email' onChangeText={(text) => setEmail(text)} />
                    <TextInput value={password} secureTextEntry style={tailwind('mt-3')} lg placeholder='Password' onChangeText={(text) => setPassword(text)} />
                    <Button onPress={onHandelSignIn} style={tailwind('mt-4 rounded')} titleStyle={{ fontWeight: '700' }} lg title='Sign in' />
                    <Text lg tertiary style={tailwind('mt-2 mb-2')}>or</Text>
                    <Button onPress={() =>  {
                       navigation.navigate("SignUp")
                    }} secondary titleStyle={{ fontWeight: '700' }} style={tailwind('mt-3 rounded')} lg title='Create account' />
                </View>
            </View>
        </View>
    );
}

export default SignIn;