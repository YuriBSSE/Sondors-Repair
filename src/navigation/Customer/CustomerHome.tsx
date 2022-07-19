import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import ProfileStack from './ProfileStack';
import SettingsStack from '../Shared/SettingsStack';
import JobStack from './JobStack';
import Colors from 'styles/Colors';
import ProviderStack from './ProviderStack';
import streamClientAtom from 'atoms/streamClientAtom';
import currentUserDataAtom from 'atoms/currentUserDataAtom';
import * as Location from 'expo-location';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { geohashForLocation } from "geofire-common";


const CustomerRootTab = createBottomTabNavigator<CustomerRootTabParamList>();

const CustomerHome = () => {
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
        return () => { streamClient.disconnectUser() };
    }, [])

    return (
        <CustomerRootTab.Navigator>
      
            <CustomerRootTab.Screen name="JobStack" component={JobStack} options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color } : {color: any}) => <Fontisto name="bicycle" size={24} color={color} />,
                    tabBarActiveTintColor: Colors.primaryText,
                    tabBarLabel: 'Jobs'
                }}
            />
            <CustomerRootTab.Screen name="ProvidersStack" component={ProviderStack} options={
                {
                    tabBarIcon: ({ color }) => <FontAwesome name="group"  size={24} color={color}  />,
                    tabBarActiveTintColor: Colors.primaryText,
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarLabel: 'Providers'
                }
            } />
            <CustomerRootTab.Screen name="ProfileStack" component={ProfileStack} options={
                {
                    tabBarIcon: ({ color } : {color: any}) => <FontAwesome name="user" size={24} color={color}  />,
                    tabBarActiveTintColor: Colors.primaryText,
                    headerShadowVisible: false,
                    tabBarLabel: 'Profile',
                    headerShown: false
                }
            } />
            <CustomerRootTab.Screen name="SettingsStack" component={SettingsStack} options={
                {
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                    tabBarActiveTintColor: Colors.primaryText,
                    headerShadowVisible: false,
                    tabBarLabel: 'Settings',
                    headerShown: false
                }
            } />
        </CustomerRootTab.Navigator>
    );
};

export default CustomerHome;
