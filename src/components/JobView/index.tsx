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

const JobView = ({ jobDetails, onPress }: Props) => {
    const tailwind = useTailwind();
    const { imageUrl, title, bikeModel, type, description,jobStatus } = jobDetails;
    const db = getFirestore()
    const [currentUserData] = useAtom(currentUserDataAtom)
    const [jobs] = useAtom(jobsAtom)
    const [loading, setLoading] = useState(false)
    const [data, onChangeData] = useState(null)


    const getJobs = async () => {
        const a =  jobs.filter((item, index)=>{
            return item.jobDetails.id === jobDetails.id
        })
        const b = a[0].data.filter((item, index)=>{
            return  item.uidP === currentUserData.uid
        })
        console.log(b, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        onChangeData(b[0])
    }

    useEffect(() => {
        setLoading(true)
        getJobs().then(()=>{
            setLoading(false)
        })
        // console.log(currentUserData.uid, 'user id');
    }, [])

    if(loading){
        return <Loader />
    }

    console.log(data?.jobResponseType, "new")
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
               
            </View>
        </View>
             </ScrollView>
    );
}

export default JobView;
