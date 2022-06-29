import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, SectionList, View, StyleSheet, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NavigationProp } from '@react-navigation/native';
import { useAtom } from 'jotai';
import ButtonTabs from 'components/ButtonTabs';
import Text from 'components/common/Text';
import { Feather } from '@expo/vector-icons';
import { Loader } from 'components/common/Loader';
import _ from 'loadsh'
import providerJobsAtom from 'atoms/providerJobsAtom';

import ChatListItem from 'components/ChatListItem';
import JobsListSectionHeader from 'components/JobsListSectionHeader';
import Colors from 'styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useApi from '../../../firebase/api'



type Props = {
    navigation: NavigationProp<ProviderJobsStackParamList, 'ProviderJobsScreen'>;
}

const ViewOlderJob = () => {
    const tailwind = useTailwind();
    return (
        <>
        <TouchableOpacity onPress={() => Alert.alert('No older jobs her')}>
            <View style={[tailwind('px-5 py-3  border-b border-gray-200  flex-row justify-between items-center'), { borderTopWidth: 1, borderColor: '#EDEDF2' }]}>
                <Text left sm tertiary bold>View older completed jobs</Text>
                <View>
                    <Feather name="chevron-right" size={16} color={Colors.tertiaryText} />
                </View>
            </View>
        </TouchableOpacity>
        <View style={{
            height: 200
        }}></View>
        </>
    )
}

const ProviderJobsScreen = ({ navigation }: Props) => {
    const tailwind = useTailwind();
    const [providerJobs] = useAtom(providerJobsAtom);
    const { loading, getProviderJobs } = useApi()
    const [ value, onChangeValue ] = useState('All')
    const [ flatlistData, onChangeFlatlistData ] = useState([])
    useEffect(() => {
        getProviderJobs()
    }, [])
    // console.log(providerJobs, "providerJobsproviderJobs=======================")

    const consoleLog = (data) =>{
            console.log(data);
            onChangeValue(data)
    }

    const filterFunc = () =>{
       if(value !== "All"){
        const x = providerJobs.filter((item,index)=>{
                return  item?.data[0]?.jobResponseType == value.toLowerCase()
        })
        console.log(x);
        onChangeFlatlistData([...x])
    }else{
        // alert("OOOO")
     console.log(providerJobs)
        onChangeFlatlistData([...providerJobs])
     }
    }

    useEffect(()=>{
        filterFunc()
    },[value, providerJobs])

    return (
        <SafeAreaView style={tailwind('flex bg-white items-center justify-center h-full')}>
            <View style={tailwind('px-5 mt-3')}>
                <ButtonTabs newFunc={consoleLog}  tabList={['All', 'Applied', 'Accepted', 'Completed']} />
            </View>
            <View style={tailwind('flex h-full justify-between w-full mt-2')}>
           {!loading ?
                <SectionList
                    sections={flatlistData}
                    keyExtractor={(item, index) => item.title + item.subtitle + index}
                    
                    renderItem={({ item: { title, subtitle, externalId, createAt, uidP }, section: { jobDetails}  }) => <ChatListItem  

                                                                                        jobDetailsData={jobDetails}
                                                                                        thatId={uidP}
                                                                                        title={title} subtitle={subtitle}
                                                                                        onPress={externalId ? () => navigation.navigate('JobChat', { externalId }) : () => Alert.alert('No chat exists')} 
                                                                                        createAt={createAt} 
                                                                                        />}
                    ListFooterComponent={() => <ViewOlderJob />}
                    renderSectionHeader={
                        ({ section: { title, status, jobDetails } }) =>
                            <JobsListSectionHeader
                                title={title}
                                status={status}
                                jd={jobDetails}
                                onPress={
                                    () => navigation.navigate('ProviderJobDetailsScreen', {
                                        jobDetails,
                                        headerLeftTitle: 'Job Details',
                                        headerRightOnPress: jobDetails.streamChatId ? () => navigation.navigate('JobChat', { externalId: jobDetails.streamChatId }) : undefined,
                                        // headerRightTitle: jobDetails.streamChatId ? 'Go to chat' : undefined
                                    })
                                }
                            />
                    }
                />
            : 
            <Loader />
            }
            </View> 
        </SafeAreaView>
    );
}

export default ProviderJobsScreen;

const styles = StyleSheet.create({
    btnWrapper: {
        height: 44,
        backgroundColor: Colors.inputBorder,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    primaryBtnTabStyle: { borderRadius: 6, flex: 1, marginEnd: 4, backgroundColor: Colors.primary },
    secondaryBtnTabStyle: { borderRadius: 6, flex: 1, marginEnd: 4, backgroundColor: Colors.inputBorder, color: Colors.dark },
})