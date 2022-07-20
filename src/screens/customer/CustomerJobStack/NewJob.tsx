import { useState, useEffect,useRef } from "react";
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useTailwind } from "tailwind-rn";
import { useAtom } from "jotai";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { Loader } from "components/common/Loader";
import KeyboardDismissView from "components/common/KeyboardDismissView";
import NewJobImage from "assets/NewJobImage";
import jobsAtom from "atoms/jobsAtom";
import isKeyboardVisibleAtom from "atoms/isKeyboardVisibleAtom";
import bikeModelsAtom from "atoms/bikeModelsAtom";
import bikeServicesAtom from "atoms/bikeServicesAtom";
import Text from "components/common/Text";
import Button from "components/common/Button";
import JobView from "components/JobView";
import TextInput from "components/common/TextInput";
import PickerSelect from "components/common/PickerSelect";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  
} from "firebase/firestore";
import streamClientAtom from "atoms/streamClientAtom";
// import { getDatabase, ref, onValue } from 'firebase/database';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
// import firestore from '@react-native-firebase/firestore';

type Props = StackScreenProps<JobsStackParamList, "NewJob">;

const CreateJob = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const auth = getAuth();
  const db = getFirestore();
  const jobDescriptionPlaceholder =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu felis porttitor, ornare purus ut, egestas massa. Sed a felis sed orci consequat gravida sit amet vel erat. Morbi vitae orci ante. In commodo, purus sed auctor pellentesque, velit lacus elementum augue, ut viverra sem ligula non massa. Cras nec consequat risus.";
  const [imageUploaded, setImageUploaded] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [bikeModel, setBikeModel] = useState("");
  const [image, setImage] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [imageUrlFireStore, setImageUrlFireStore] = useState<any | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isKeyboardVisible] = useAtom(isKeyboardVisibleAtom);
  const [jobs, setJobs] = useAtom(jobsAtom);
  const [bikeModels] = useAtom(bikeModelsAtom);
  const [bikeServices] = useAtom(bikeServicesAtom);
  const [loading, setLoading] = useState(false);
  const [streamClient] = useAtom(streamClientAtom);
  const refText = useRef()
  const formCompleted = bikeModel && jobTitle && jobType && jobDescription;
  const dateAndTimeValue = new Date();

  async function uploadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  

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

  // const uploadImageOnFireStore = async () => {
  //   // console.log(imageUrl, "BLOB");
  //   const timespamp = Date.now();

  //   const metadata = {
  //     contentType: "image/jpeg",
  //   };
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `Job-Create-Image/${timespamp}`);

  //   uploadBytes(storageRef, imageUrl, metadata).then((snapshot) => {
  //   //   console.log("Uploaded a blob or file!");
  //     getDownloadURL(snapshot.ref).then((downloadURL) => {
  //       console.log("File available at");
     
  //       setImageUrlFireStore(downloadURL);
  //     });
  
  //   });

   
  // };

  const getMyJob = async () => {
    const { currentUser } = auth;
    const jobsRef = collection(db, "jobs");
    const queryGetMyJobs = await query(
      jobsRef,
      where("uid", "==", currentUser?.uid)
    );
    await getDocs(queryGetMyJobs)
      .then((res) => {
        const dataJobsList = res.docs.map((item) => item.data());
        return dataJobsList;
      })
      .then((dataJobsList: any) => {
        setJobs(dataJobsList);
        setLoading(false);
      })
      .then(() => {
        setPreviewMode(true)
        // navigation.navigate("MyJobs");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        setLoading(false);
      });
  };

  const onCreateNewJob = async () => {
    setLoading(true);
   
    const timespamp = Date.now();

    const metadata = {
      contentType: "image/jpeg",
    };
    const storage = getStorage();
    const storageRef = ref(storage, `Job-Create-Image/${timespamp}`);

    // var URL = null

    uploadBytes(storageRef, imageUrl, metadata).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    const jobsRef = collection(db, "jobs");
      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        console.log("File available at");
        setImageUrlFireStore(downloadURL);
        const URL = downloadURL
        const jobId = uuid.v4();
        const { currentUser } = auth;

      
        // console.log(URL, "imageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStoreimageUrlFireStore")
       const getID = await doc(collection(db, "jobs"))

       let x = {
        jobId: jobId,
        uid: currentUser?.uid,
        title: jobTitle,
        status: "Lead",
        id: getID.id,
        jobDetails: {
          title: jobTitle,
          createdAt: dateAndTimeValue.toString(),
          streamChatId: currentUser?.uid,
          description: jobDescription,
          type: jobType,
          bikeModel: bikeModel,
          imageUrl: URL,
          jobStatus: 0
        },
        data: [],
      }

      setDoc(getID, x)
          .then(() => {
            getMyJob();
          })
          .then(() => {
            setPreviewMode(true)
            // navigation.navigate("MyJobs");
          })
          .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            Alert.alert(errorMessage);
          });
      });
  
    });

   
  };

  return (
    <SafeAreaView style={tailwind("flex bg-white h-full")}>
      {!loading ? (
       
          <ScrollView>
            <KeyboardAwareScrollView>
            <View style={tailwind("flex h-full justify-between")}>
              {/* New Job Form */}
              {previewMode ? (
                <JobView
                  jobDetails={{
                    imageUrl: imageUploaded ? image : undefined,
                    createdAt: "empty",
                    streamChatId: undefined,
                    title: jobTitle,
                    bikeModel,
                    type: jobType,
                    description: jobDescription,
                    jobViewState: true
                  }}
                />
              ) : (
                <View>
                  
                  {imageUploaded ? (
                    <View
                      style={tailwind(
                        "w-full h-64 items-center justify-center"
                      )}
                    >
                      <Image
                        style={tailwind(
                          "w-full h-64 items-center justify-center"
                        )}
                        source={{ uri: image }}
                        resizeMode="cover"
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={isKeyboardVisible}
                      style={tailwind(
                        "w-full h-64 items-center justify-center bg-slate-100"
                      )}
                      onPress={() => uploadImage()}
                    >
                      <Text lg>Add Image (Optional)</Text>
                    </TouchableOpacity>
                  )}
                  <View
                    style={tailwind("flex grow justify-between px-8 py-6 ")}
                  >
                    <View style={{height:350,justifyContent:"space-between"}}>
                      <PickerSelect
                        onValueChange={(selectedBikeModel: string) => {
                          setBikeModel(selectedBikeModel);
                        }}
                        items={bikeModels}
                        value={bikeModel}
                        placeholder="Type of bike"
                        // style={{borderWidth:10,borderColor:"red"}}
                      />
                      <TextInput
                        value={jobTitle}
                        onChangeText={(text) => setJobTitle(text)}
                        placeholder="Job title"
                        style={{borderColor: 'black' ,borderRadius: 5, borderWidth: 1,}}
                      />
                      <PickerSelect
                        onValueChange={(selectedServiceType: string) =>
                          setJobType(selectedServiceType)
                        }
                        items={bikeServices}
                        placeholder="Type of service needed"
                        value={jobType}
                      
                      />
                      <TextInput
                        style={[tailwind("h-36 leading-4"),{borderColor: 'black' ,borderRadius: 5, borderWidth: 1,}]}
                        value={jobDescription}
                        onChangeText={(text) => setJobDescription(text)}
                        multiline={true}
                        placeholder={jobDescriptionPlaceholder}
                        
                      />
                    </View>
                  </View>
                </View>
              )}
              {/* Preview Button */}
              {console.log(previewMode)}
              {
                !previewMode &&
                <View style={tailwind("px-8 py-6")}>
                <Button
                  onPress={onCreateNewJob}
                  disabled={!formCompleted}
                  primary={!!formCompleted}
                  title={"Create"}
                />
              </View>
              }
             
            </View>
            </KeyboardAwareScrollView>
          </ScrollView>
      
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default CreateJob;
