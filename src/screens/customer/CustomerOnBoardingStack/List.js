import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,Image,
  TouchableOpacity,Button
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import HeaderRight from "components/HeaderRight";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import AntDesign from '@expo/vector-icons/Entypo';
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 15) / 2;

var arrayBikes = []

const List = ({navigation,Title,Images,Value,Id,Bikes,O,Address,Date}) => {
  const tailwind = useTailwind();

  const [check, setCheck] = useState(false)

  const SelectInterest = (value, name, Id, Address,Date) => {
    
    if(check == true){ 
        arrayBikes = arrayBikes.filter(function(e) { return e.id !== Id })
        setCheck(false)
    }else{
      
        arrayBikes.push({
            dateAdded: Date.toString(),
            id: Id,
            image: Address,
            model: name,
        })
        setCheck(true)
        // const Array = name   
        // let interestName = name
        // console.log('push', name)
      
        // setItems([...Array, name]);
        // setItems.push(interestName)
        // console.log(name)
        // setItems((pS)=>{
        //     return [
        //         ...pS,
        //         name
        //     ]
        // })
    }
    console.log(arrayBikes, "ARRAY")
    Bikes(arrayBikes)
}

  return (
    <TouchableOpacity key={O} 
    onPress={()=>  SelectInterest(Value, Title, Id, Address,Date)}
     >
    <LinearGradient
    // Background Linear Gradient
    colors={['#f0f0f0', '#fafcff']}
    style={{
      backgroundColor: "#ddd",
        minWidth:  itemWidth ,
        maxWidth:  itemWidth ,
        height: 140,
        borderRadius:12,
        margin: 5,
  
    }}
    >

    <View
      style={{
        flex: 1,
        // margin: 5,
        // backgroundColor: "#ddd",
        // minWidth:  itemWidth ,
        // maxWidth:  itemWidth ,
        // height: 130,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12, justifyContent:'center'
      }}
    >
    {
        Value != check ?
        <View style={{position: 'absolute', top: 10, right: 10}}>
     <AntDesign name="checkcircle" color={'#395AE0'} size={20} />
     </View>: null
    }
  
    <Image source={Images} resizeMode='contain' style={{height: 100, width: 100}} />
    <Text style={{fontWeight:'700', textAlign:'center'}}>{Title}</Text>
    {/* <Text style={{textAlign:'center'}}>Model {index}</Text> */}
    </View>
    <View style={{alignItems:'center'}}>
      {/* <Text>{item.title}</Text> */}
    </View>
    </LinearGradient>
    </TouchableOpacity>
  );
};

export default List;
