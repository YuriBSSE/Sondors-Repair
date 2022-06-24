import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAtom } from 'jotai';
import { NavigationProp } from '@react-navigation/native';

import jobsAtom from 'atoms/jobsAtom';
import JobBoardListItem from 'components/JobBoardListItem';

import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import { Loader } from 'components/common/Loader';
import Text from 'components/common/Text';

type Props = {
    navigation: NavigationProp<ProviderJobBoardStackParamList, 'ProviderJobBoardScreen'>;
};

const ProviderJobBoardScreen = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const auth = getAuth()
    const db = getFirestore()
    const [jobs, setJobs] = useAtom(jobsAtom)
    const [loading, setLoading] = useState(false)

    const getJobs = async () => {
        setLoading(true)
        await getDocs(collection(db, "jobs")).then((res) => {
            const dataJobsList = res.docs.map((item) => {
                const data = item.data()
            
                data.jobDetails.id = item.id
                // console.log(data, "ahsan");
                return data
            })
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
        getJobs()
    }, [])


    const NoJobs = () => {
        const tailwind = useTailwind();
        return (
            <View style={tailwind('flex bg-white items-center justify-center h-full px-8 w-full')}>
                <Text bold numberOfLines={2} xxl>Recently their is no Job.</Text>
                <Text tertiary lg style={tailwind('mt-4')}>{`When Customer create create Job here will be show`}</Text>
            </View>
        );
    }
 
    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <View style={tailwind('flex h-full justify-between w-full')}>
                {
                    jobs.length ?
                        !loading ?
                            <FlatList
                                data={jobs}
                                renderItem={
                                    ({ item: { jobDetails, data, uid } }) => (
                                        <JobBoardListItem
                                            job={jobDetails}
                                            onPress={() => navigation.navigate(
                                                'ProviderJobDetailsScreen',
                                                {
                                                    jobDetails,
                                                    data,
                                                    uidC: uid,
                                                    headerLeftTitle: 'Job board'
                                                }
                                            )}
                                        />
                                    )
                                }
                                ItemSeparatorComponent={() => <View style={tailwind('w-full bg-gray-200 h-px')} />}
                            />
                            :
                            <Loader />
                        :
                        <NoJobs />
                }

            </View>
        </SafeAreaView>
    );
}

export default ProviderJobBoardScreen;
