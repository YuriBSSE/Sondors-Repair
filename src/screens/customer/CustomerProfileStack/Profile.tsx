import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAtom } from "jotai";
import { StackScreenProps } from "@react-navigation/stack";

import Text from "components/common/Text";
import customerDetailsAtom from "atoms/customerDetailsAtom";
import Button from "components/common/Button";
import Colors from "styles/Colors";
import capitalizeFirstLetters from "utilities/capitalizeFirstLetters";
import Rating from "components/Rating";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import moment from "moment";

type Props = StackScreenProps<ProfileStackParamList, "Profile">;

const Profile = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [openDrpDown, setOpenDrpDown] = useState(null);
  const db = getFirestore();

  function confirmDeleteBike(id: string) {
    async function deleteBike() {
      //   const initialMemo: CustomerBike[] = [];
      //   const newBikes = customerDetails.bikes.reduce(
      //     (memo: CustomerBike[], iteratee: CustomerBike): CustomerBike[] => {
      //       if (iteratee.id !== id) {
      //         memo.push(iteratee);
      //       }

      //       return memo;
      //     },
      //     initialMemo
      //   );
      //   setCustomerDetails({ ...customerDetails, bikes: newBikes });
      //   const jobsRef = collection(db, "jobs");
      var jobRef = doc(db, "users", currentUserData?.uid);
      let temp = [...customerDetails?.bikes];
      temp.splice(
        customerDetails?.bikes.findIndex((object) => {
          return object.id == id;
        }),
        1
      );
      await setDoc(
        jobRef,
        { ...currentUserData, bikes: [...temp] },
        { merge: true }
      );
      setCustomerDetails({ ...customerDetails, bikes: [...temp] });
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this bike?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteBike(),
        },
      ]
    );
  }
  //   const date = new TimeStamp(yourTimeStamp.seconds , yourTimeStamp.nanoseconds).toDate();
  return (
    <SafeAreaView style={tailwind("flex bg-white items-center h-full")}>
      <View style={tailwind("flex flex-col w-full")}>
        <View style={{padding: 10}}>
          <Rating
            disabled
            isLabel={false}
            isCount={false}
            defaultRating={currentUserData.rating}
          />
          <Text tertiary left sm style={tailwind("mt-2 px-2 ")}>
            {/* Member since September 2022 */}
            {`Member since ${moment(currentUserData?.createAt.toDate()).format(
              "MMMM YYYY"
            )}`}
          </Text>
        </View>
        <View style={[tailwind("mt-8 px-3")]}>
          <Text tertiary left bold xl>
            Your SONDORS
          </Text>
          <FlatList
            style={{height: 600, alignSelf:'center' }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={<View style={{ height: 80 }} />}
            renderItem={({ item }: { item: CustomerBike }) => {
              return (
                <TouchableOpacity
                  style={[
                    tailwind("flex-row rounded mt-6"),
                    {
                      borderColor: Colors.secondaryBackground,
                      borderWidth: 1,
                      width: '98%',
                      height: 110,
                      alignSelf:'center'
                    },
                  ]}
                  onPress={() => console.log("OOO")}
                  disabled={true}
                >
                  {/* <View
                    style={[
                      tailwind("justify-center items-center"),
                      {
                        backgroundColor: Colors.secondaryBackground,
                        width: "50%",
                      },
                    ]}
                  > */}
                    {/* <Text sm>BIKE IMAGE</Text> */}
                    <Image source={{uri:item?.image}} resizeMode='contain' style={[
                      tailwind("justify-center items-center"),
                      {
                        backgroundColor: Colors.secondaryBackground,
                        width: 180,
                      },
                    ]} />
                  {/* </View> */}
                  <View
                    style={[
                      tailwind("flex-col px-3 pb-3.5 pt-5 justify-between"),
                      { width: "40%" },
                    ]}
                  >
                    <Text left>{capitalizeFirstLetters(item.model)}</Text>
                    <View>
                      <Text left tertiary sm>
                        Date Added
                      </Text>
                      {console.log(item.dateAdded, "PPP")}
                      <Text sm left>
                        {moment(item?.dateAdded).format("LL")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "relative",
                      width: "10%",
                    }}
                  >
                    <TouchableOpacity
                      style={{ padding: 8 }}
                      onPress={() => {
                        openDrpDown !== item.id
                          ? setOpenDrpDown(item.id)
                          : setOpenDrpDown(null);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={16}
                        color="black"
                      />
                    </TouchableOpacity>
                    {openDrpDown == item.id && (
                      <View
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          right: 0,
                          top: "35%",
                          width: 80,
                          borderWidth: 1,
                          borderColor: "#e6e6e6",
                          zIndex: 9999,
                        }}
                      >
                        <TouchableOpacity
                          style={{ padding: 8 }}
                          onPress={() =>{
                            setOpenDrpDown(null)
                            navigation.navigate("EditBike", {
                              bikeDetails: item,
                            })
                          }}
                        >
                          <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ padding: 8 }}
                          onPress={() => {confirmDeleteBike(item.id); setOpenDrpDown(null);}}
                        >
                          <Text style={{ color: "red" }}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            data={customerDetails.bikes}
            ListFooterComponent={
              <>
                 <View style={{ height: 20 }} />
                <Button
                  title="Add new"
                  onPress={() => navigation.navigate("NewBike")}
                />
                <View style={{ height: 100 }} />
              </>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
