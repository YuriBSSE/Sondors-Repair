import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, View, Alert, } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { StackScreenProps } from '@react-navigation/stack';

import jobsAtom from 'atoms/jobsAtom';
import Text from 'components/common/Text';
import ChatListItem from 'components/ChatListItem';
import JobsListSectionHeader from 'components/JobsListSectionHeader';
import Button from 'components/common/Button';
import { Loader } from 'components/common/Loader';

import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


type Props = StackScreenProps<JobsStackParamList, 'MyJobs'>;

const Jobs = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth();
    const db = getFirestore();
    const [jobs, setJobs] = useAtom(jobsAtom);
    const [loading, setLoading] = useState(false)

    const getMyJob = async () => {
        setLoading(true)
        const { currentUser } = auth
        const jobsRef = collection(db, "jobs");
        const queryGetMyJobs = await query(jobsRef, where("uid", "==", currentUser?.uid));
        await getDocs(queryGetMyJobs).then((res) => {
            const dataJobsList = res.docs.map((item) => item.data())
            return dataJobsList
        }).then((dataJobsList: any) => {
            setJobs(dataJobsList)
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(false)
        })
    }

    useEffect(() => {
        getMyJob()
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
                            return <ChatListItem data={{userApplied:mainItem.item,job:mainItem.section?.id,getMyJob:()=>getMyJob()}} createAt={mainItem.item.createAt} title={mainItem.item.title} subtitle={mainItem.item.subtitle} onPress={() => {
                            navigation.navigate("JobChat", { externalId:mainItem.item.externalId })
                        }} />
                        }}
                        // ItemSeparatorComponent={() => <View style={tailwind('w-full bg-gray-200 h-px')} />}
                        renderSectionHeader={({ section: { title, status, jobDetails } }) =>
                            <>
                                <JobsListSectionHeader
                                    title={title}
                                    status={status}
                                    onPress={() => navigation.navigate('CustomerJobDetailsScreen', { jobDetails })}
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
