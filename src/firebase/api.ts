import _ from 'loadsh'

import { useAtom } from 'jotai';
import providerJobsAtom from 'atoms/providerJobsAtom';
import currentUserDataAtom from 'atoms/currentUserDataAtom';

import { Alert } from 'react-native';

import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import { useState } from 'react';


const useApi = () => {
    const db = getFirestore()
    
    const [currentUser] = useAtom(currentUserDataAtom);
    const [providerJobs, setProvidersJobs] = useAtom(providerJobsAtom); 

    const [loading, setLoading] = useState(false)

    const getProviderJobs = async () => {
        setLoading(true)
        await getDocs(collection(db, "jobs")).then((res) => {
            const dataJobsList: any = []
            res.docs.map((item, index) => {
                const data = item.data()
                data.jobDetails.id = item.id
                if (data.data.length > 0) {
                    const userIn = data.data.filter((o: any) => {
                        if (o.uidP === currentUser.uid) {
                            return o
                        }
                    })
                    data.data = userIn
                    dataJobsList.push(data)
                }
            })
            return dataJobsList
        }).then((dataJobsList: any) => {
        
            const j = dataJobsList.sort(function(a: { date: string | number | Date; },b: { date: string | number | Date; }){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.jobDetails.createdAt) - new Date(a.jobDetails.createdAt);
              });
              setProvidersJobs(_.compact(j))
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
            setLoading(false)
        })
    }

    return {
        loading,
        getProviderJobs,
    }

}

export default useApi