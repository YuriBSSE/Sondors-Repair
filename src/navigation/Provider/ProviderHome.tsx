import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import Constants from 'expo-constants';

import ProviderProfileStack from './ProviderProfileStack';
import SettingsStack from '../Shared/SettingsStack';
import ProviderJobsStack from './ProviderJobsStack';
import ProviderJobBoardStack from './ProviderJobBoardStack';
import Colors from 'styles/Colors';
import streamClientAtom from 'atoms/streamClientAtom';
import currentUserDataAtom from 'atoms/currentUserDataAtom';

import * as Location from 'expo-location';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { geohashForLocation } from "geofire-common";

const ProviderRootTab = createBottomTabNavigator<ProviderRootTabParamList>();


const ProviderHome = () => {
    const [currentUserData] = useAtom(currentUserDataAtom);
    const [streamClient] = useAtom(streamClientAtom);
    const db = getFirestore()

    const getLocation = async (id: any) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        const lat = location?.coords?.latitude;
        const lng = location?.coords?.longitude;
        const hash = geohashForLocation([lat, lng]);
        await updateDoc(doc(db, "users", `${id}`), {
            // location:{
                geohash: hash,
                lat: lat,
                lng: lng,
            // }
        })
}

    useEffect(() => {
        const streamUserName = currentUserData.email.split('@')[0]
        const streamUserId = currentUserData?.uid
        getLocation(streamUserId)
        const setupClient = async () => {
            await streamClient.connectUser({ id: streamUserId, name: streamUserName }, streamClient.devToken(streamUserId));
        };

         setupClient().catch(console.log);

        return () => { 
            streamClient.disconnectUser() 
        };
    }, [])

    return (
    <ProviderRootTab.Navigator>
        <ProviderRootTab.Screen name="ProviderJobsStack" component={ProviderJobsStack} options={
            {
                headerShown: false,
                tabBarIcon: ({ color }) =>  <Fontisto name="bicycle" size={24} color={color} />,
                tabBarActiveTintColor: Colors.primaryText,
                tabBarLabel: 'My Jobs'
            }}
        />
        <ProviderRootTab.Screen name="ProviderJobBoardStack" component={ProviderJobBoardStack} options={
            {
                tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />,
                tabBarActiveTintColor: Colors.primaryText,
                headerShadowVisible: false,
                headerShown: false,
                tabBarLabel: 'Job Board'
            }
        } />
        <ProviderRootTab.Screen name="ProviderProfileStack" component={ProviderProfileStack} options={
            {
                tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color}  />,
                tabBarActiveTintColor: Colors.primaryText,
                headerShadowVisible: false,
                tabBarLabel: 'Profile',
                headerShown: false
            }
        } />
        <ProviderRootTab.Screen name="SettingsStack" component={SettingsStack} options={
            {
                tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                tabBarActiveTintColor: Colors.primaryText,
                headerShadowVisible: false,
                tabBarLabel: 'Settings',
                headerShown: false
            }
        } />
    </ProviderRootTab.Navigator>
    )
};

export default ProviderHome;
