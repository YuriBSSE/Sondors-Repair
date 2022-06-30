import { View, ScrollView, SafeAreaView,Image,Alert,TouchableOpacity } from 'react-native';
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
    // console.log(jobDetails, "jobDetailsjobDetailsjobDetailsjobDetails")
    const tailwind = useTailwind();
    const { imageUrl, title, bikeModel, type, description, } = jobDetails;
    const db = getFirestore()
    const [currentUserData] = useAtom(currentUserDataAtom)

    const [loading, setLoading] = useState(false)
    const [data, onChangeData] = useState([])


    const getJobs = async () => {
        setLoading(true)
         getDocs(collection(db, "jobs")).then((res) => {
            const jobsList = res.docs.map((item) => {
                const data = item.data()
                return data
            })
            const newObj = jobsList.filter((item)=>{
                return item.id === jobDetails.id
            })
            let checkArray = []
            if(newObj.length > 0 ){checkArray = newObj[0]?.data.filter((it: any, i: any)=>{
                return it.uidP === currentUserData.uid
            })}
            if(checkArray.length > 0){
                onChangeData(checkArray) 
            }
           
            setLoading(false)
        }).catch((e)=>{
            console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
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
// console.log(data, "datadatadatadatadata")
    return (
            <ScrollView>            
        <View>
            {/* Add Image for Job */}
            <Text left xxl style={{fontWeight: 'bold', paddingHorizontal: 24, marginTop: 20, paddingBottom: 10}}>Job Details</Text>
            {imageUrl ? (
                <View style={tailwind('w-full h-64 items-center justify-center')}>
                    {console.log(imageUrl, "imageUrlimageUrlimageUrlimageUrl")}
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
                        data[0]?.jobResponseType == 'applied'  &&  data.length > 0 ?
                        <View  style={{
                            width: 150, heigth: 100, backgroundColor:'#00C851', borderRadius: 12, padding: 4, justifyContent:'center', alignSelf:'center'
                        }}>
                        <Text  xl style={{fontWeight: 'bold', color: 'white', textAlign:'center'}}>Applied</Text>
                        </View>:
                         data[0]?.jobResponseType == 'accepted'  &&  data.length > 0 ?
                     
                         <View  style={{
                            width: 150, heigth: 100, backgroundColor:'#4285F4', borderRadius: 12, padding: 4, justifyContent:'center', alignSelf:'center'
                        }}>
                        <Text  xl style={{fontWeight: 'bold', color: 'white', textAlign:'center'}}>Acceptedd</Text>
                        </View>
                        :
                        jobDetails.jobStatus == 2 &&  data.length > 0 ?
  
                           <View  style={{
                            width: 150, heigth: 100, backgroundColor:'#2BBBAD', borderRadius: 12, padding: 4, justifyContent:'center', alignSelf:'center'
                        }}>
                        <Text  xl style={{fontWeight: 'bold', color: 'white', textAlign:'center'}}>Completed</Text>
                        </View>
                      
                        : jobDetails.jobStatus != 0 ?
                        <View  style={{
                            width: 150, heigth: 100, backgroundColor:'#ff4444', borderRadius: 12, padding: 4, justifyContent:'center', alignSelf:'center'
                        }}>
                        <Text  xl style={{fontWeight: 'bold', color: 'white', textAlign:'center'}}>Expired</Text>
                        </View>:
                        
                        <Button onPress={onPress} style={tailwind('rounded')} titleStyle={{ fontWeight: '700' }} lg title='Apply' />
                    }
                
                </View>:   null
            }
          
        </View>
             </ScrollView>
    );
}

export default JobView;
