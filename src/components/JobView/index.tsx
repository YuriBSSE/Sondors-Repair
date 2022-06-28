import { View, ScrollView, SafeAreaView,Image,Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import {useEffect, useState} from 'react'
import { useAtom } from 'jotai';
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import { Loader } from 'components/common/Loader';
import jobsAtom from 'atoms/jobsAtom';
import Text from 'components/common/Text';
import capitalizeFirstLetters from 'utilities/capitalizeFirstLetters';
import NewJobImage from 'assets/NewJobImage';
import Button from 'components/common/Button';
import HeaderRight from 'components/HeaderRight';
import { NavigationProp } from '@react-navigation/native';

import currentUserDataAtom from 'atoms/currentUserDataAtom'
type Props = {
    jobDetails: JobDetails;
    onPress?: () => void
}

const JobView = ({ jobDetails, onPress, cu }: Props) => {
    const tailwind = useTailwind();
    const { imageUrl, title, bikeModel, type, description, } = jobDetails;
    const db = getFirestore()
    const [currentUserData] = useAtom(currentUserDataAtom)

    const [loading, setLoading] = useState(false)
    const [data, onChangeData] = useState(null)


    const getJobs = async () => {
        setLoading(true)
         getDocs(collection(db, "jobs")).then((res) => {
            const jobsList = res.docs.map((item) => {
                const data = item.data()
                return data
            })
            const obj = jobsList[0].data.filter((item: { uidP: any; }, index: any)=>{
                return  item.uidP === currentUserData.uid
            })
            onChangeData(obj[0])
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        getJobs().then(()=>{
          
        })
    }, [])

    if(loading){
        return <Loader />
    }

    console.log(currentUserData.userType, "userType")
    return (
            <ScrollView>            
        <View>
            {/* Add Image for Job */}
            <Text left xxl style={{fontWeight: 'bold', paddingHorizontal: 24, marginTop: 20, paddingBottom: 10}}>Job Details</Text>
            {imageUrl ? (
                <View style={tailwind('w-full h-64 items-center justify-center')}>
                    <Image
                        style={tailwind(
                          "w-full h-64 items-center justify-center"
                        )}
                        source={{ uri: imageUrl }}
                        resizeMode="cover"
                      />
                </View>
            ) : (
                <View style={tailwind('w-full h-64 items-center justify-center bg-slate-100')}>
                    <Text lg>No image</Text>
                </View>
            )}
            <SafeAreaView style={tailwind('flex grow px-6 py-3')}>
                <Text left xxl style={{fontWeight: 'bold'}}>{title}</Text>
                <View style={tailwind('mt-0')}>
                <Text left tertiary style={tailwind('mt-2')}>Details</Text>
                <Text left defaultColor style={tailwind('mt-0')}>{bikeModel.toUpperCase()}</Text>
                    <Text left defaultColor lineHeight={24}>{capitalizeFirstLetters(type)}</Text>
                </View>
                <View style={tailwind('mt-4')}>
                    <Text left tertiary>Description</Text>
                    <Text left lg>{description}</Text>
                </View>
            </SafeAreaView>
            {
                currentUserData.userType == 'provider' ?
                <View style={{...tailwind('px-6 py-2')}}>
                    {
                        data?.jobResponseType == 'applied' ? 
                        <View  style={{
                            width: 100, heigth: 100, backgroundColor:'#00C851', borderRadius: 12, padding: 4, justifyContent:'center', alignSelf:'center'
                        }}>
                        <Text  xl style={{fontWeight: 'bold', color: 'white', textAlign:'center'}}>Applied</Text>
                        </View>:
                        <Button onPress={onPress} style={tailwind('rounded')} titleStyle={{ fontWeight: '700' }} lg title='Message' />
                    }
                
                </View>: null
            }
           
        </View>
             </ScrollView>
    );
}

export default JobView;
