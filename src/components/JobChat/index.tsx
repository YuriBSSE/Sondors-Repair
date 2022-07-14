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

import streamClientAtom from 'atoms/streamClientAtom';
import Colors from 'styles/Colors';
import { collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';

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

    useEffect(() => {
      
        const getChannels = async () => {
            const channels = await streamClient.queryChannels({ id: route.params.externalId  }, [], { watch: false });
        
            setChannel(channels.shift() || false);
        };
        getChannels().catch(console.log)
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isBack isRoot onPress={() => navigation.goBack()} title={streamClient?.user?.name || "User"} />,
            // headerRight: () => <HeaderRight title={'View Job'} />,
        });
    }, []);

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
    const test = async (jobID) =>{
    console.log(route?.params?.userApplied,"000001")
        const jobsRef = collection(db, "jobs");
      
        var jobRef = doc(db, "jobs", jobID);
        const queryGetMyJobs = await query(jobsRef, where("id", "==", jobID));
        await getDocs(queryGetMyJobs).then((res) => {
        const dataJobsList = res.docs.map((item) => item.data())
        return dataJobsList
        }).then(async (dataJobsList: any) => {
            // console.log(dataJobsList[0].data.findIndex(object => {
            //     return object.uidP == route?.params?.userApplied?.uidP
            //   }),"========================>>>>>>>>>>>>>>>>11",route?.params?.userApplied)
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
        //  console.log(jobRef,"-------------------------------------------")
          test(route?.params?.jobID)
          // await setDoc(
          //   jobRef,
          //   { data: [{ ...data.userApplied, responseOnJob: "rejected" }] },
          //   { merge: true }
          // );
          // // await updateDoc(doc(db, "jobs", jobID), {
          // //   "jobDetails.jobStatus": 1,
          // // });
          // await data.getMyJob();
    };


    return (
        <>
        <OverlayProvider value={{ style: theme }}>
            <View style={tailwind('flex'),{position:"relative"}}>
                <View style={{backgroundColor:"lightgrey",width:"100%",height:"8%",position:"absolute",top:0,zIndex:99,justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={onJobReject} style={{
                        backgroundColor:"red",
                        width:"45%",
                        paddingVertical:"2%",
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center"
                        }}>
                        <Text>Deny Service</Text>
                    </TouchableOpacity>
                </View>
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