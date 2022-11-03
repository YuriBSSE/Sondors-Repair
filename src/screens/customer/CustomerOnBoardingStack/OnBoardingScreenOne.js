import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import HeaderRight from "components/HeaderRight";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import List from "./List";
import { useAtom } from "jotai";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import bikeModelsAtom from "atoms/bikeModelsAtom";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import customerDetailsAtom from "atoms/customerDetailsAtom";
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 15) / 2;

const array = [
  {
    id: 1,
    image: require("./../../../assets/images/bike1.png"),
    date: new Date(),
    title: "SONDORS X",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike12.png?alt=media&token=e91c6218-027c-438a-99ab-915d4fd8a028",
  },
  {
    id: 2,
    image: require("./../../../assets/images/bike2.png"),
    date: new Date(),
    title: "SONDORS XS",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike12.png?alt=media&token=e91c6218-027c-438a-99ab-915d4fd8a028",
  },
  {
    id: 3,
    image: require("./../../../assets/images/bike3.png"),
    date: new Date(),
    title: "SONDORS Fold X",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike2.png?alt=media&token=52d1d321-fe8f-4ea8-be31-6ea1cbed5e00",
  },
  {
    id: 4,
    image: require("./../../../assets/images/bike4.png"),
    date: new Date(),
    title: "SONDORS Fold XS",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike8.png?alt=media&token=fd80d5f0-4214-4c91-84da-45c4c323ce73",
  },
  {
    id: 5,
    image: require("./../../../assets/images/bike5.png"),
    date: new Date(),
    title: "SONDORS MXS",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike3.png?alt=media&token=d90c56ad-2ee1-4af4-8d64-b6ba76e5ebf2",
  },
  {
    id: 6,
    image: require("./../../../assets/images/bike6.png"),
    date: new Date(),
    title: "SONDORS Smart Step",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike5.png?alt=media&token=d1b32421-1421-450d-b96a-9460605f514e",
  },
  {
    id: 7,
    image: require("./../../../assets/images/bike7.png"),
    date: new Date(),
    title: "SONDORS LX",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike10.png?alt=media&token=5c5d21a6-d117-4935-89f4-df42b8fe1676",
  },
  {
    id: 8,
    image: require("./../../../assets/images/bike8.png"),
    date: new Date(),
    title: "SONDORS Rockstar",
    Value: false,
    imageAddress:
      "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike1.png?alt=media&token=a6867f93-1152-4430-98d2-319a6ca6de51",
  },
  {
    id: 9,
    image: require("./../../../assets/images/bike9.png"),
    date: new Date(),
    title: "SONDORS MadMods Retro",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike4.png?alt=media&token=eed82da8-342e-44c3-9643-91559c669a92",
  },
  {
    id: 10,
    image: require("./../../../assets/images/bike10.png"),
    date: new Date(),
    title: "SONDORS MadMods Scrambler",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike11.png?alt=media&token=96d2b495-806e-49e5-a87a-f516596a92a5",
  },
  {
    id: 11,
    image: require("./../../../assets/images/bike11.png"),
    date: new Date(),
    title: "SONDORS MadMods Cafe",
    Value: false,
    imageAddress: "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike6.png?alt=media&token=76c8b9e2-2567-4ae1-9e9b-b118de50b3c7",
  },
  {
    id: 12,
    image: require("./../../../assets/images/bike12.png"),
    date: new Date(),
    title: "SONDORS Cruiser",
    Value: false,
    imageAddress:
      "https://firebasestorage.googleapis.com/v0/b/expo-9eeab.appspot.com/o/Bike-Create-Image%2Fbike9.png?alt=media&token=657c61f2-8df0-4c24-8179-3dd8c3c6ebb6",
  },
];

const OnBoardingScreenOne = ({ navigation }) => {
  const tailwind = useTailwind();
  const [items, setItems] = useState([]);
  const db = getFirestore();
  const [bikeModels] = useAtom(bikeModelsAtom);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
  //   var interests = []
  //   const SelectInterest = (value, name) => {

  //     if(check == true){
  //         interests = interests.filter(function(e) { return e !== name })
  //         setCheck(false)
  //     }else{
  //         interests.push(name)
  //         setCheck(true)
  //         // const Array = name
  //         // let interestName = name
  //         // console.log('push', name)

  //         // setItems([...Array, name]);
  //         // setItems.push(interestName)
  //         // console.log(name)
  //         // setItems((pS)=>{
  //         //     return [
  //         //         ...pS,
  //         //         name
  //         //     ]
  //         // })
  //     }
  // }

  const Continue = async () => {
 

    if (items.length > 0) {
      var jobRef = doc(db, "users", currentUserData?.uid);

      await setDoc(
        jobRef,
        { ...currentUserData, bikes: [...items] },
        { merge: true }
      );
      setCustomerDetails({
        ...customerDetails,
        bikes: [...items],
      });
      // alert("OO");
      navigation.navigate("OnBoardingScreenTwo")
    } else {
      alert("Please select atleast one sondors");
    }
  };


  console.log(items, "=================================");
  return (
    <SafeAreaView
      style={tailwind(
        "flex bg-white items-center justify-center h-full w-full"
      )}
    >
      <StatusBar style="light" />
      <View
        style={[
          tailwind("flex h-full justify-between w-full"),
          { marginTop: 60 },
        ]}
      >
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Which SONDORS do you have?
        </Text>
        <FlatList
          data={array}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-around",
          }}
          keyExtractor={(index) => index}
          renderItem={({ item, index }) => (
            <List
              O={index}
              Title={item.title}
              Images={item.image}
              Value={item.Value}
              Id={item.id}
              Bikes={setItems}
              Address={item.imageAddress}
              Date={item.date}
            />
          )}
          ListFooterComponentStyle={{
            width: "98%",
            heigth: 200,
            alignSelf: "center",
          }}
          ListFooterComponent={
            <>
              <View
                style={{
                  width: "96%",
                  heigth: 200,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignSelf: "center",
                  backgroundColor: "#395AE0",
                  top: 10,
                }}
              >
                <TouchableOpacity
                  style={{ width: "96%", heigth: 200 }}
                  onPress={Continue}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",
                      textAlign: "center",
                      padding: 20,
                      fontSize: 17,
                    }}
                  >
                    {" "}
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 80 }} />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreenOne;
