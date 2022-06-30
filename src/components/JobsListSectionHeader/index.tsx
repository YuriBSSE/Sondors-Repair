import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import {useEffect, useState} from 'react'
import { useAtom } from 'jotai';
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import Text from 'components/common/Text';
import capitalizeFirstLetter from 'utilities/capitalizeFirstLetter';
import Colors from 'styles/Colors';

import currentUserDataAtom from 'atoms/currentUserDataAtom'
const statusStyle = (value: string) => {
    switch (capitalizeFirstLetter(value)) {
        case 'Accepted': return {
            backgroundColor: Colors.darkAccent,
            color: Colors.dark
        }
            break;
        case 'Completed': return {
            backgroundColor: Colors.darkAccent,
            color: Colors.dark
        }
            break;
        case 'Lead': return {
            backgroundColor: '#F5F8FF',
            color: Colors.primary
        }
            break;
        case 'Offer Rejected': return {
            backgroundColor: '#FFF5F7',
            color: Colors.errorText
        }
            break;
        default:
            break;
    }
}

const JobsListSectionHeader = ({ title, status, onPress, jd }: { title: string, status: string, onPress: (event: GestureResponderEvent) => void }) => {
    const tailwind = useTailwind();

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
                return item.id === jd.id
            })
            let checkArray = []
            if(newObj.length > 0 ){checkArray = newObj[0]?.data.filter((it: any, i: any)=>{
                return it.uidP === currentUserData.uid
            })}
            // console.log(checkArray, "=====")
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

    }, [jd])
console.log(data[0]?.jobResponseType , "======sdadsa=====",jd)
    return (
        <TouchableOpacity onPress={onPress} style={{borderTopWidth: 1, borderColor: '#EDEDF2',}}>
            <View style={[tailwind('px-5 flex-row justify-between items-center mt-3 mb-3')]}>
                <>
                <Text style={{ color: Colors.dark }} bold lg>{title}</Text>
                {
                     currentUserData.userType == "provider" ? 
                
                <View style={{justifyContent:'flex-end', width: 180, flexDirection:'row', alignItems:'center'}}>
                {
                    data[0]?.jobResponseType.toLowerCase() == "applied" &&  data.length > 0  ?
                    <>
                    {console.log(data[0]?.jobResponseType, "JOB LIST SECTION HEADER")}
                    <Text
                        bold lg style={[statusStyle(status), { paddingVertical: 4, backgroundColor:'#00C851', color: 'white' }, tailwind('px-2 rounded')]}
                        >Applied
                    </Text>
                    </>: 
                     data[0]?.jobResponseType.toLowerCase() == "accepted" &&  data.length > 0 ? 
                     <>
                      {/* {alert(data[0]?.jobResponseType, "JOB LIST SECTION HEADER")} */}
                     <Text
                         bold lg style={[statusStyle(status), { paddingVertical: 4, backgroundColor:'#33b5e5', color: 'white' }, tailwind('px-2 rounded')]}
                         >Accepted
                     </Text>
                     </>:
                        jd.jobStatus == 2 &&  data.length > 0 ?
                        <Text
                            bold lg style={[statusStyle(status), { paddingVertical: 4, backgroundColor:'#2BBBAD', color: 'white' }, tailwind('px-2 rounded')]}
                            >Completed
                        </Text>:
                       jd.jobStatus != 0 ?
                       <Text
                           bold lg style={[statusStyle(status), { paddingVertical: 4, backgroundColor:'#CC0000', color: 'white' }, tailwind('px-2 rounded')]}
                           >Expired
                       </Text>:
                         <Text
                         bold lg style={[statusStyle(status), { paddingVertical: 4, backgroundColor:'#4285F4', color: 'white' }, tailwind('px-2 rounded')]}
                         >Apply Now
                     </Text>
                }
               
                {/* <Text
                    bold lg style={[statusStyle(status), { paddingVertical: 4 }, tailwind('px-2 rounded')]}
                    >{capitalizeFirstLetter(status)}
                </Text> */}
                </View>: null
                }
                </>
            </View>
        </TouchableOpacity>
    )
}

export default JobsListSectionHeader;
