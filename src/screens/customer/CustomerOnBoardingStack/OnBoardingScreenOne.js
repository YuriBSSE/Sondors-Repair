import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,Button
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import HeaderRight from "components/HeaderRight";

const { height, width } = Dimensions.get("window");
const itemWidth = (width - 15) / 2;

const OnBoardingScreenOne = ({navigation}) => {
  const tailwind = useTailwind();
   

  return (
    <SafeAreaView
      style={tailwind(
        "flex bg-white items-center justify-center h-full w-full"
      )}
    >
      <View style={tailwind("flex h-full justify-between w-full")}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Which SONDORS do you have?
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12]}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-around",
          }}
          keyExtractor={(index) => index}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
            <View
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: "#ddd",
                minWidth:  itemWidth ,
                maxWidth:  itemWidth ,
                height: 130,
                borderRadius:12, justifyContent:'center'
              }}
            >
            <Text style={{textAlign:'center'}}>Model {item}</Text>
            </View>
            </TouchableOpacity>
          )}
          ListFooterComponentStyle={{
            width: "98%", heigth: 200,alignSelf:'center'
          }}
          ListFooterComponent={
            <>
            <View style={{  width: "96%", heigth: 200,  borderRadius: 12, justifyContent:'center', alignSelf:'center', backgroundColor:'#395AE0', top: 10 }}>
                   <TouchableOpacity style={{width: "96%", heigth: 200,}} onPress={()=> navigation.navigate('OnBoardingScreenTwo')}>
                            <Text style={{color: 'white',fontWeight: '700', textAlign:"center", padding: 20, fontSize:17}}> Continue</Text>
                   </TouchableOpacity> 
            </View>
            <View style={{height: 40}} />
            </>
          }
        />
      </View>
      
    </SafeAreaView>
  );
};

export default OnBoardingScreenOne;
