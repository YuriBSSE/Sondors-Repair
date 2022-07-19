import React, { useEffect } from "react";
import { SafeAreaView, View,Text,TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";


import HeaderRight from "components/HeaderRight";



const OnBoardingScreenThree = ({ navigation }) => {
  const tailwind = useTailwind();




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
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={()=> navigation.navigate('CustomerHome')} >
                            <Text style={{color: 'white',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Grand Location Permissions</Text>
                   </TouchableOpacity> 
            </View>
      </View>
      <View style={{width: "96%", alignSelf:'center'}}>
            <View style={{  width: "96%", heigth: 200,  borderRadius: 12, justifyContent:'center', alignSelf:'center', backgroundColor:'white', borderWidth:2 }}>
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={()=> navigation.navigate('CustomerHome')}>
                            <Text style={{color: 'black',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Skip for now</Text>
                   </TouchableOpacity> 
            </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreenThree;
