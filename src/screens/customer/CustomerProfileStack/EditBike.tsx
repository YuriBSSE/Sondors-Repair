import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import * as ImagePicker from "expo-image-picker";
import Text from 'components/common/Text';
import customerDetailsAtom from 'atoms/customerDetailsAtom';
import currentUserDataAtom from 'atoms/currentUserDataAtom';
import Colors from 'styles/Colors';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import NewJobImage from 'assets/NewJobImage';
import PickerSelect from 'components/common/PickerSelect';
import bikeModelsAtom from 'atoms/bikeModelsAtom';
import TextInput from 'components/common/TextInput';
import KeyboardDismissView from 'components/common/KeyboardDismissView';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

type Props = {
    navigation: NavigationProp<ProfileStackParamList, 'EditBike'>;
    route: RouteProp<ProfileStackParamList, 'EditBike'>;
};

const EditBike = ({ navigation, route }: Props) => {
    const { id, model, dateAdded, image } = route.params.bikeDetails;
    const tailwind = useTailwind();
    const [customerDetails, setCustomerDetails] = useAtom(customerDetailsAtom);
    const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
    const [updatedModel, setUpdatedModel] = useState(model);
    const [updatedDateAdded, setUpdatedDateAdded] = useState(dateAdded);
    const [bikeModels] = useAtom(bikeModelsAtom);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [loader, setLoader] = useState(false);

    const [imageUploaded, setImageUploaded] = useState(false);
    const [updatedImage, setUpdatedImage] = useState(image);
    // const [imageForUI, setImageForUI] = useState<any | null>(null);
    const [imageUrl, setImageUrl] = useState<any | null>(null);
    const db = getFirestore();
    // const [imageUrlFireStore, setImageUrlFireStore] = useState<any | null>(null);

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
          setUpdatedImage(result.uri);
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

    async function updateCustomerDetails(url) {
        const updatedBikes = customerDetails.bikes.map(bike => {
            console.log(bike.id === id)
            if (bike.id === id) {
                
                const updatedBike = {
                    id,
                    model: updatedModel,
                    dateAdded: updatedDateAdded,
                    image: imageUploaded ? url : image
                };

                return updatedBike;
            }
            return bike;
        })
        var jobRef = doc(db, "users", currentUserData?.uid);

        await setDoc(
            jobRef,
            { ...currentUserData, bikes: [...updatedBikes] },
            { merge: true }
        );
        setCustomerDetails({
            ...customerDetails,
            bikes: [...updatedBikes],
        });
        // // const newCustomerDetails = {
        // //     // name: customerDetails.name,
        // //     // password: customerDetails.password,
        // //     // rating: customerDetails.rating,
        // //     bikes: newBikes
        // // }; 
        // console.log(newBikes)
        // // setCustomerDetails(newCustomerDetails);
        // // navigation.goBack();
    }
    const onUpdateBike = async () => {
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
            console.log("File available at",downloadURL);
            const URL = downloadURL
            updateCustomerDetails(URL)
            setLoader(false)
            navigation.goBack();
        });
        }).catch((err)=>{
            console.log(err)
            setLoader(false)
        })
      }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title={route.params.bikeDetails.model} />,
        });
    }, []);

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center h-full')}>
            <KeyboardDismissView>
                <>
                    {image ? (
                        // <View style={tailwind('w-full h-64 items-center justify-center')}>
                            // {/* <NewJobImage /> */}
                            <Image source={{uri:updatedImage}} style={tailwind('w-full h-64 items-center justify-center')} />
                        // </View>
                    ) : (
                        <View style={[tailwind('w-full h-48 items-center justify-center'), { backgroundColor: Colors.secondaryBackground }]}>
                            <Text placeholder lg>BIKE IMAGE</Text>
                        </View>
                    )}
                    <View style={tailwind('pt-4 px-5 w-full')}>
                        <TouchableOpacity onPress={uploadImage}>
                            <Text bold hyperlink left>Upload new image</Text>
                        </TouchableOpacity>
                        <Text left bold tertiary style={tailwind('mt-8')}>Model</Text>
                        <PickerSelect style={tailwind('mt-3')} items={bikeModels} value={updatedModel} onValueChange={(text: string) => setUpdatedModel(text)} placeholder='Bike Model' />
                        <Text left bold tertiary style={tailwind('mt-8')}>Year Purchased</Text>
                        {/* <TextInput style={tailwind('mt-3')} value={dateAdded} onChangeText={(text: string) => setUpdatedDateAdded(text)} placeholder="What month and year was your bike purchased?" /> */}
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
                                {moment(dateAdded).format("YYYY")}
                            </Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={(data) => {
                                    setUpdatedDateAdded(data);
                                    setIsDatePickerVisible(false);
                                }}
                                onCancel={() => setIsDatePickerVisible(false)}
                            />
                    </View>
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
                        onPress={onUpdateBike}
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
}

export default EditBike;
