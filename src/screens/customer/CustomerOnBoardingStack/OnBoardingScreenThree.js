import React, { useEffect } from "react";
import { SafeAreaView, View,Text,TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useAtom } from "jotai";
import { doc, getFirestore, setDoc,updateDoc } from "firebase/firestore";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import customerDetailsAtom from "atoms/customerDetailsAtom";
import * as Location from 'expo-location';
import { geohashForLocation } from "geofire-common";
import HeaderRight from "components/HeaderRight";



const OnBoardingScreenThree = ({ navigation }) => {
  const tailwind = useTailwind();
  const db = getFirestore();
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);


  const getLocation = async () => {
    const streamUserId = currentUserData?.uid
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const lat = location?.coords?.latitude;
    const lng = location?.coords?.longitude;
    const hash = geohashForLocation([lat, lng]);
    await updateDoc(doc(db, "users", `${streamUserId}`), {
        // location:{
            geohash: hash,
            lat: lat,
            lng: lng,
        // }
    })
    Continue()
}


  
  const Continue = async () => {
 

   
    var jobRef = doc(db, "users", currentUserData?.uid)

    await setDoc(
      jobRef,
      { ...currentUserData, bikes: [...customerDetails.bikes], userProfileCompleted: true },
      { merge: true }
    );
    setCurrentUserData({
      ...currentUserData,
      bikes: [...customerDetails.bikes],
      userProfileCompleted: true,
    });
    // alert("OO");
    navigation.navigate('CustomerHome')
  
};




  return (
    <SafeAreaView
      style={tailwind(
        "flex bg-white items-center justify-center h-full w-full"
      )}
    >
      <View style={{justifyContent:'space-around', width: '100%', height:'20%', alignSelf:'center', alignItems:'center', bottom: 30}}>
        <Text style={{textAlign:'center', fontSize:18}}>Where do you ride?</Text>

          <Text  style={{textAlign:'center', fontSize:15, width: 300,}}>To find service providers near you — we need to know where you are. It’s easier if you set this up now, but you can also skip & do it later.</Text>
      </View>
      <View style={{height: 150, flexDirection:'column', justifyContent:'space-around', width:'100%', alignSelf:'center'}}>
      <View style={{width: "96%", alignSelf:'center'}}>
            <View style={{  width: "96%", heigth: 200,  borderRadius: 12, justifyContent:'center', alignSelf:'center', backgroundColor:'#395AE0' }}>
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={getLocation} >
                            <Text style={{color: 'white',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Grand Location Permissions</Text>
                   </TouchableOpacity> 
            </View>
      </View>
      <View style={{width: "96%", alignSelf:'center'}}>
            <View style={{  width: "96%", heigth: 200,  borderRadius: 12, justifyContent:'center', alignSelf:'center', backgroundColor:'white', borderWidth:2 }}>
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={Continue}>
                            <Text style={{color: 'black',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Skip for now</Text>
                   </TouchableOpacity> 
            </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreenThree;
