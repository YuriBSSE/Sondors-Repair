import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image, ActivityIndicator } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAtom } from "jotai";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import customerDetailsAtom from "atoms/customerDetailsAtom";
import KeyboardDismissView from "components/common/KeyboardDismissView";
import Colors from "styles/Colors";
import bikeModelsAtom from "atoms/bikeModelsAtom";
import PickerSelect from "components/common/PickerSelect";
import TextInput from "components/common/TextInput";
import HeaderLeft from "components/HeaderLeft";
import HeaderRight from "components/HeaderRight";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

type Props = StackScreenProps<ProfileStackParamList, "NewBike">;

const NewBike = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
  const [updatedModel, setUpdatedModel] = useState("");
  const [updatedDateAdded, setUpdatedDateAdded] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [loader, setLoader] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [bikeModels] = useAtom(bikeModelsAtom);
  const dateAndTimeValue = new Date();
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  
  const [imageUploaded, setImageUploaded] = useState(false);
  const [image, setImage] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [imageUrlFireStore, setImageUrlFireStore] = useState<any | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const updateCustomerDetails = async (imgUrl) => {
   
    const newBike = {
      id: uuid.v4(),
      model: updatedModel,
      dateAdded: updatedDateAdded.toString(),
      image: imgUrl,
    };
    if (updatedModel != "" || updatedDateAdded != "") {
      var jobRef = doc(db, "users", currentUserData?.uid);

      await setDoc(
        jobRef,
        { ...currentUserData, bikes: [...customerDetails.bikes, newBike] },
        { merge: true }
      );
      setCustomerDetails({
        ...customerDetails,
        bikes: [...customerDetails.bikes, newBike],
      });
      // navigation.goBack();
    } else {
      alert("Something Wrong");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft onPress={() => navigation.goBack()} title="Add New Bike" />
      ),
    });
  }, []);

  async function uploadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });  

    if (!result.cancelled) {
      const uploadUrl = await uploadImageAsync(result.uri);
      setImageUrl(uploadUrl);
      setImage(result.uri);
    }
    setImageUploaded(true);
  }

  async function uploadImageAsync(uri: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  }

  const onCreateNewBike = async () => {
    setLoader(true)
    const timespamp = Date.now();

    const metadata = {
      contentType: "image/jpeg",
    };
    const storage = getStorage();
    const storageRef = ref(storage, `Bike-Create-Image/${timespamp}`);


    uploadBytes(storageRef, imageUrl, metadata).then((snapshot) => {
      const jobsRef = collection(db, "jobs");
      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        console.log("File available at");
        setImageUrlFireStore(downloadURL);
        const URL = downloadURL
        // const jobId = uuid.v4();
        // const { currentUser } = auth;
        updateCustomerDetails(URL)
        setLoader(false)
        navigation.goBack();
    });
  }).catch((err)=>{
    setLoader(false)
  })
  }
  


  return (
    <SafeAreaView style={tailwind("flex bg-white items-center h-full")}>
      <KeyboardDismissView>
        <>
        { 
        image == null ? <View
            style={[
              tailwind("w-full h-48 items-center justify-center"),
              { backgroundColor: Colors.secondaryBackground },
            ]}
          >
            <Text placeholder lg>
              BIKE IMAGE
            </Text>
          </View> :
          <Image source={{uri:image}} style={[
            tailwind("w-full h-48 items-center justify-center"),
          ]} />}
          <View style={tailwind("pt-4 px-5 w-full")}>
            <TouchableOpacity 
              // onPress={() => setUpdatedImage("")}
              onPress={()=>{uploadImage()}}
            >
              <Text bold hyperlink left>
                Upload image
              </Text>
            </TouchableOpacity>
            <Text left bold tertiary style={tailwind("mt-8")}>
              Model
            </Text>
            <PickerSelect
              style={tailwind("mt-3")}
              items={bikeModels}
              value={updatedModel}
              onValueChange={(text: string) => {
                console.log(text, "SADADSAD");
                setUpdatedModel(text);
              }}
              placeholder="Bike Model"
            />
            <Text left bold tertiary style={tailwind("mt-8")}>
              Year Purchased
            </Text>
            <TouchableOpacity
              style={[
                tailwind("mt-3"),
                {
                  // backgroundColor:"red",
                  width: "100%",
                  paddingVertical: "4%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingLeft: 8,
                  borderWidth: 1,
                  borderColor: "#e6e6e6",
                },
              ]}
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Text style={{ color: "gray" }}>
                {updatedDateAdded === ""
                  ? "What month and year was your bike purchased?"
                  : moment(updatedDateAdded).format("YYYY")}
              </Text>
            </TouchableOpacity>
            {/* <TextInput 
                            style={tailwind('mt-3')} 
                            value={updatedDateAdded} 
                            onChangeText={(text: string) => setUpdatedDateAdded(text)} 
                            placeholder="What month and year was your bike purchased?" 
                        /> */}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(data) => {
              setUpdatedDateAdded(data);
              setIsDatePickerVisible(false);
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              width: "90%",
              marginTop: "3%",
              paddingVertical: "3%",
              justifyContent:"center",
              alignItems:"center"
            }}
            disabled={loader}
            onPress={onCreateNewBike}
          >
            {
              loader ? 
              <View style={{justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size={20} color={'white'} />
              </View>: <Text style={{color:"white"}}>Save</Text>
            }
           
          </TouchableOpacity>
        </>
      </KeyboardDismissView>
    </SafeAreaView>
  );
};

export default NewBike;
