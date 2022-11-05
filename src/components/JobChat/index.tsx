import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, Chat, MessageInput, MessageList, useAttachmentPickerContext, Theme, DeepPartial, OverlayProvider } from 'stream-chat-expo';
import { useAtom } from 'jotai';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';
import currentUserDataAtom from 'atoms/currentUserDataAtom';
import streamClientAtom from 'atoms/streamClientAtom';
import Colors from 'styles/Colors';
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';

const theme: DeepPartial<Theme> = {
    messageInput: {
        attachButton: {
            display: 'none'
        },
        attachButtonContainer: {
            display: 'none'
        },
        inputBoxContainer: {
            borderRadius: 2,
            backgroundColor: Colors.accent,
            paddingVertical: 6,
        },
        inputBox: {
            color: Colors.dark,

        },

        commandsButtonContainer: {
            display: 'none'
        },
    },
    messageSimple: {
        avatarWrapper: {
            container: {
                display: 'none'
            }
        },
        content: {
            container: {
                borderRadius: 0,
            },
            containerInner: {
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
            },

        }
    },
    channelPreview: {
        date: {
            display: 'none'
        },
    },
    dateHeader: {
        container: {
            display: 'none'
        }
    },
    inlineDateSeparator: {
        container: {
            display: 'none'
        }
    }
}

type Props = {
    route: RouteProp<JobsStackParamList, 'JobChat'>;
    navigation: NavigationProp<JobsStackParamList, 'JobChat'>;
}

const JobChat = ({ route, navigation }: Props) => {
    const tailwind = useTailwind();
    const [streamClient] = useAtom(streamClientAtom);
    const [channel, setChannel] = useState<ChannelType | false>();
    const [userData, onChangeuserData] = useAtom(currentUserDataAtom)
    const [isState, setIsState] = useState(false)
    const [job, setJob] = useState({})
    var unsubscribe;

    // console.log(route?.params?.externalId, "====================================ahsan===============================================")

    const getChannels = async () => {
        const channels = await streamClient.queryChannels({ id: route?.params?.externalId  }, [], { watch: false });
        // console.log(channels, "===================channels======================");
        if(channels?.length > 0){
            setChannel(channels?.shift() || false);
        }
        // setChannel(channels.shift() || false);
    };
    useEffect(() => {
      
      
        getChannels().catch((err)=> console.log(err, "=========err==========="))
        // .catch(console.log)
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isBack isRoot onPress={() => navigation.goBack()} title={streamClient?.user?.name || "User"} />,
            headerRight: () =>  { return userData?.userType != 'provider' && <HeaderRight title={'View Job'} onPress={()=>{
                job.hasOwnProperty("jobDetails") && navigation.navigate('CustomerJobDetailsScreen', { 
                    jobDetails:job?.jobDetails,
                    userApplied:job?.data[0],
                    jobID:job?.id }) 
            }} />}
            ,
        });
    }, [job]);

    useEffect(()=>{
        return  unsubscribe
    },[isState])

    // sets the OverlayProvider's bottomInset value for the Attachment Picker
    const tabBarHeight = useBottomTabBarHeight();
    const { setBottomInset } = useAttachmentPickerContext();
    useEffect(() => {
        setBottomInset(tabBarHeight);
    }, [tabBarHeight]);

    if (channel === false) return (
        <View style={tailwind('flex')}>
            <Text>We couldn't find that one. 🤷</Text>
        </View>
    );
    const db = getFirestore();
    const rejectRequest = async (jobID) =>{
        const jobsRef = collection(db, "jobs");
      
        var jobRef = doc(db, "jobs", jobID);
        const queryGetMyJobs = await query(jobsRef, where("id", "==", jobID));
        await getDocs(queryGetMyJobs).then((res) => {
        const dataJobsList = res.docs.map((item) => item.data())
        return dataJobsList
        }).then(async (dataJobsList: any) => {
            // console.log("========================>>>>>>>>>>>>>>>>11",dataJobsList)
            let temp = [...dataJobsList[0].data]
            temp.splice(dataJobsList[0].data.findIndex(object => {
                return object.uidP == route?.params?.userApplied?.uidP
              }),1)

            await setDoc(
                jobRef,
                { data: [...temp,{ ...route?.params?.userApplied, responseOnJob: "rejected" }] },
                { merge: true }
            );
            // await updateDoc(doc(db, "jobs", jobID), {
            //   "jobDetails.jobStatus": 0,
            // });
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            
        })
    }

    const onJobReject = async () => {
        //  console.log(route?.params?.jobID,"-------------------------------------------")
        setIsState(true)
        rejectRequest(route?.params?.jobID)
          // await data.getMyJob();
    };

    const onAcceptReq =  async (jobID) => {
        var jobRef = doc(db, "jobs", jobID);
        await setDoc(
          jobRef,
          { data: [{ ...route?.params?.userApplied, jobResponseType: "accepted",responseOnJob: "accepted" }] },
          { merge: true }
        );
        setIsState(true)
        await updateDoc(doc(db, "jobs", jobID), {
          "jobDetails.jobStatus": 1,
        });
        // await data.getMyJob();
      };
   

      const getProviderJobs = async (jobID) => {
            const z = collection(db, "jobs");
            if(!isState){
                // alert("SAD")
                unsubscribe = onSnapshot(z, async (querySnapshot: any[]) => {
                    // console.log(route?.params?.userApplied,"---------------new")
                    const jobsRef = collection(db, "jobs");
                    var jobRef = doc(db, "jobs", jobID);
                    const queryGetMyJobs = await query(jobsRef, where("id", "==", jobID));
                    await getDocs(queryGetMyJobs).then((res) => {
                        const dataJobsList = res.docs.map((item) => item.data())
                            return dataJobsList
                        }).then(async (dataJobsList: any) => {
                        // console.log("========================>>>>>>>>>>>>>>>>11",dataJobsList[0])
    
                        setJob(dataJobsList[0])
    
                        // let temp = [...dataJobsList[0].data]
                        // temp.splice(dataJobsList[0].data.findIndex(object => {
                        //     return object.uidP == route?.params?.userApplied?.uidP
                        // }),1)
                        // await setDoc(
                        //     jobRef,
                        //     { data: [...temp,{ ...route?.params?.userApplied, isChat:true }] },
                        //     { merge: true }
                        // );
                    }).catch((error) => {
                        const errorMessage = error.message;
                        Alert.alert(errorMessage)
                    })
                });
            }
     
            
        };

    useEffect(() => {
        getProviderJobs(route?.params?.jobID)
        return unsubscribe
    }, [])

    const btnsUi = () => {
        if(job.hasOwnProperty("data")){
            if(!job?.data[0].hasOwnProperty("responseOnJob")){
            return (
                <View style={{
                    backgroundColor:"#e6e6e6",
                width:"100%",
                height:60,
                position:"absolute",
                top:0,
                zIndex:99,
                justifyContent:"space-around",
                alignItems:"center",
                flexDirection:"row"
                }}>
                    <TouchableOpacity onPress={()=>onJobReject()} style={{
                        backgroundColor:"white",
                        width:"45%",
                        paddingVertical:"2%",
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center",
                        borderWidth:1,
                        borderColor:"gray"
                        }}>
                        <Text>Deny Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onAcceptReq(route?.params?.jobID)} style={{
                        backgroundColor:"white",
                        width:"45%",
                        paddingVertical:"2%",
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center",
                        borderWidth:1,
                        borderColor:"gray"
                        }}>
                        <Text>Accept Service</Text>
                    </TouchableOpacity>
                </View>
            )
        }}
    }



    return (
        <>
        
        <OverlayProvider value={{ style: theme }}>
            <View style={tailwind('flex'),{position:"relative"}}>
                {job?.jobDetails?.jobStatus == 0 && btnsUi()}    
                {/* <View style={{backgroundColor:"lightgrey",
                width:"100%",
                height:"8%",
                position:"absolute",
                top:0,
                zIndex:99,
                justifyContent:"space-around",
                alignItems:"center",
                flexDirection:"row"
                }}>
                    <TouchableOpacity 
                    // onPress={()=>onJobReject()}
                    onPress={()=>btnsUi()}
                     style={{
                        backgroundColor:"white",
                        width:"45%",
                        paddingVertical:"2%",
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center",
                        // borderWidth:"1%",
                        // borderColor:"gray"
                        }}>
                        <Text>Deny Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onAcceptReq(route?.params?.jobID)} style={{
                        backgroundColor:"white",
                        width:"45%",
                        paddingVertical:"2%",
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center",
                        // borderWidth:"1%",
                        // borderColor:"gray"
                        }}>
                        <Text>Accept Service</Text>
                    </TouchableOpacity>
                </View> */}
                <Chat client={streamClient}>
                    {channel ? (
                        <Channel channel={channel} AttachButton={() => null} Attachment={() => null} InputButtons={() => null}  >
                            <>
                                <MessageList />
                                <MessageInput additionalTextInputProps={{
                                    placeholder: 'Type here...',
                                    placeholderTextColor: Colors.dark
                                }} />
                            </>
                        </Channel>
                    ) : (
                        <View style={tailwind('flex')}>
                            <Text>Loading...</Text>
                        </View>
                    )}
                </Chat>
            </View>
        </OverlayProvider>
        </>
    );
};

export default JobChat;

const styles = StyleSheet.create({
    CustomMessageInputContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})