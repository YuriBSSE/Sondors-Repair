import React, { useEffect } from "react";
import { SafeAreaView, View ,Text, TouchableOpacity} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import HeaderRight from "components/HeaderRight";



const OnBoardingScreenTwo = ({ navigation }) => {
  const tailwind = useTailwind();






  return (
    <SafeAreaView
      style={tailwind(
        "flex bg-white items-center justify-center h-full w-full"
      )}
    >
      <View style={{justifyContent:'space-around', width: '100%', height:'38%'}}>
        <Text style={{textAlign:'center', fontSize:18}}>Your Garage</Text>
        <TouchableOpacity>
          <View style={{ borderRadius: 12, height: 170, width: '80%', backgroundColor:'#ddd', justifyContent:'center', alignSelf:'center' }}>
                <Text style={{textAlign:'center', fontSize: 17}}>Model</Text>
          </View>
          </TouchableOpacity>
          <Text  style={{textAlign:'center', fontSize:15}}>Add more SONDORS</Text>
      </View>
      <View style={{position:'absolute', bottom: 20,width: "96%",}}>
            <View style={{  width: "96%", heigth: 200,  borderRadius: 12, justifyContent:'center', alignSelf:'center', backgroundColor:'#395AE0' }}>
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={()=> navigation.navigate('OnBoardingScreenThree')}>
                            <Text style={{color: 'white',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Continue</Text>
                   </TouchableOpacity> 
            </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreenTwo;
