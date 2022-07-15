import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, View, Alert, } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { StackScreenProps } from '@react-navigation/stack';
import _ from "loadsh";
import jobsAtom from 'atoms/jobsAtom';
import Text from 'components/common/Text';
import ChatListItem from 'components/ChatListItem';
import JobsListSectionHeader from 'components/JobsListSectionHeader';
import Button from 'components/common/Button';
import { Loader } from 'components/common/Loader';

import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';


type Props = StackScreenProps<JobsStackParamList, 'MyJobs'>;

const Jobs = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth();
    const db = getFirestore();
    const [jobs, setJobs] = useAtom(jobsAtom);
    const [dataa, onChangeDataa] = useState([]);
    const [loading, setLoading] = useState(false)
    var unsubscribe;

    const getMyJob = async () => {
        setLoading(true)

        const { currentUser } = auth
        
        const jobsRef = collection(db, "jobs");

        const queryGetMyJobs = await query(jobsRef, where("uid", "==", currentUser?.uid));
        await getDocs(queryGetMyJobs).then((res) => {
            const dataJobsList = res.docs.map((item) => item.data())
            return dataJobsList
        }).then((dataJobsList: any) => {
            // console.log({dataJobsList},"========================>>>>>>>>>>>>>>>>")
            setJobs(dataJobsList)
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(false)
        })
    }
    const getProviderJobs = async () => {
       
        const { currentUser } = auth
        const z = collection(db, "jobs");

    unsubscribe = onSnapshot(z, (querySnapshot: any[]) => {
    //   const jobs: any[] = [];
    //   querySnapshot.forEach((doc) => {
    //     jobs.push(doc.data());
    //   });
    //   const dataJobsList: any = [];
    //   alert("AHSAN")
      getMyJob()
    //   if (jobs?.length > 0) {
    //     // console.log(jobs.length);
        
    //     jobs.map((item, index) => {
    //       const data = item;
    //       data.jobDetails.id = item.id;
    //       // console.log(data);
    //       if (data.data.length > 0) {
    //         const userIn = data.data.filter((o: any) => {
    //           if (o.uidP === currentUser?.uid) {
    //             return o;
    //           }
    //         });
    //         data.data = userIn;
    //         dataJobsList.push(data);
    //       }
    //     });
    //     const j = dataJobsList.sort(function (
    //       a: { date: string | number | Date },
    //       b: { date: string | number | Date }
    //     ) {
    //       return (
    //         new Date(b.jobDetails.createdAt) - new Date(a.jobDetails.createdAt)
    //       );
    //     });
    //     onChangeDataa(_.compact(j));
    //   }
    });
      
      };

    useEffect(() => {
        getProviderJobs()
       
        // alert("PPP")
        return unsubscribe
    }, [])




    const NoJobs = () => {
        const tailwind = useTailwind();
        return (
            <View style={tailwind('flex bg-white items-center justify-center h-full px-8 w-full')}>
                <Text bold numberOfLines={2} xxl>Need help with assembly or to repair your eBike?</Text>
                <Text tertiary lg style={tailwind('mt-4')}>{`Create a job & service providers in your area will reach out`}</Text>
                <Button buttonStyle={tailwind('mt-12')} title="get started" onPress={() => navigation.navigate('NewJob')} />
            </View>
        );
    }


    const updateChatStatus = async (jobID, userApplied) =>{
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
                return object.uidP == userApplied?.uidP
              }),1)

            await setDoc(
                jobRef,
                { data: [...temp,{ ...userApplied, isChat: true }] },
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

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            {
            jobs.length ? (
                    <SectionList
                        sections={jobs}
                        style={tailwind('w-full')}
                        keyExtractor={(item, index) => item.title + item.subtitle + index}
                        renderItem={(mainItem
                            // ,{ item: { title, subtitle, externalId, createAt } }
                            ) =>{ 
                            // console.log(mainItem.item,")___________________________________________))))))))))))")
                            // return <Text>TESTING y</Text>
                            if (mainItem?.item.hasOwnProperty("responseOnJob")) {
                                if (mainItem?.item?.responseOnJob == "rejected") {
                                    return null
                                }
                            } 
                            return <ChatListItem 
                            data={{userApplied:mainItem?.item,job:mainItem?.section?.id,getMyJob:()=>getMyJob()}} 
                            createAt={mainItem?.item?.createAt} 
                            title={mainItem?.item?.title} 
                            subtitle={mainItem?.item?.subtitle} 
                            navigation={navigation}
                            onPress={() => {
                                updateChatStatus(mainItem?.section?.id, mainItem?.item)
                                navigation.navigate("JobChat", { externalId:mainItem?.item?.externalId, jobID:mainItem?.section?.id, userApplied:mainItem?.item })
                            }} />
                        }}
                        // ItemSeparatorComponent={() => <View style={tailwind('w-full bg-gray-200 h-px')} />}
                        renderSectionHeader={(data) =>
                            <>
                                <JobsListSectionHeader
                                    title={data?.section?.title}
                                    status={data?.section?.status}
                                    jd={data?.section?.jobDetails}
                                    onPress={() => navigation.navigate('CustomerJobDetailsScreen', { jobDetails:data?.section?.jobDetails,userApplied:data?.section?.data[0],jobID:data?.section?.id })}
                                />
                            </>
                        }
                    />
                    ) : !loading ? <NoJobs /> : <Loader />
            }
            <StatusBar style='dark' />
        </SafeAreaView>
    );
}

export default Jobs;
