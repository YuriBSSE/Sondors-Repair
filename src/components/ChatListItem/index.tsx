import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import { useAtom } from "jotai";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import Text from "components/common/Text";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect } from "react";

const ChatListItem = ({
  title,
  subtitle,
  createAt,
  onPress,
  data = {},
}: {
  onPress: () => any;
  title: string;
  subtitle: string;
  createAt: string;
  data: any;
}) => {
  const tailwind = useTailwind();
  const [currentUserData] = useAtom(currentUserDataAtom);
  const db = getFirestore();
  console.log(data.job, "=======================");

  console.log(data.userApplied, "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
  const onJobAccept = async () => {
    // HQEhKAAdC1iDhPzwWSJP
    // HQEhKAAdC1iDhPzwWSJP
    let id = data.job.trim();
    // const washingtonRef = doc(db, "jobs", id);

    const frankDocRef = doc(db, "jobs", id);
    // await setDoc(frankDocRef, {
    //   name: "Frank",
    //   favorites: [
    //     { id: 1, food: "Pizza" },
    //     { id: 2, color: "Blue" },
    //     { id: 3, subject: "recess" },
    //   ],
    //   age: 12,
    // });

    // Set the "capital" field of the city 'DC'
    // await updateDoc(frankDocRef, {
    //     data: arrayUnion({ id: 1, food: "Pizza" })
    // });
    const cityRef = doc(db, "jobs", id);
    await setDoc(cityRef, { data: [{...data.userApplied, jobResponseType: 'accepted'}]}, { merge: true });

    // await updateDoc(frankDocRef, {
    //     data: arrayRemove("applied")
    // });
    
    await updateDoc(doc(db, "jobs", id), {
        'jobDetails.jobStatus': 1
    })
    // await updateDoc(washingtonRef, {
    //     data: arrayUnion('jobResponseType', 'accepted')
    // });

    // Set the "capital" field of the city 'DC'

    // const jobsRef = collection(db , "jobs");
    // console.log({jobsRef})
    // const queryGetMyJobs = await query(
    //     jobsRef,
    //     where("id", "==", data.job)
    //   );
    // console.log(queryGetMyJobs, "queryGetMyJobsqueryGetMyJobsqueryGetMyJobsqueryGetMyJobs")
    // await updateDoc(doc(db, "jobs", `${data?.job}`), {
    //     status: "AHSAN"
    // }
    // }).then(()=>{
    //     alert("hit")
    // }).catch((e)=>{
    //     console.log(e)
    // })
  };
  // const getJobs = async () => {
  //     // setLoading(true)
  //     await getDocs(collection(db, "jobs")).then((res) => {
  //         const dataJobsList = res.docs.map((item) => {
  //             const data = item.data()

  //             data.jobDetails.id = item.id
  //             // console.log(data, "ahsan");
  //             return data
  //         })
  //         return dataJobsList
  //     }).then((dataJobsList: any) => {
  //         // setJobs(dataJobsList)
  //         console.log({dataJobsList})
  //         // setLoading(false)
  //     }).catch((error) => {
  //         const errorMessage = error.message;
  //         alert(errorMessage)
  //         // setLoading(false)
  //     })
  // }

  // useEffect(() => {
  //     getJobs()
  // }, [])

  return (
    <View style={tailwind("px-5  pb-3 mt-1")}>
      {currentUserData.userType == "provider" ? (
        <>
          <TouchableOpacity onPress={onPress}>
            <View style={tailwind("flex-row justify-between mt-1")}>
              <Text sm left heavy>
                {title}
              </Text>
              <Text sm tertiary>
                {moment(createAt).fromNow()}
              </Text>
            </View>
            <Text sm left tertiary style={tailwind("mt-1")}>
              {subtitle}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={tailwind("flex-row justify-between mt-1")}>
            <Text sm left heavy>
              {title}
            </Text>
            <Text sm tertiary>
              {moment(createAt).fromNow()}
            </Text>
          </View>
          <Text sm left tertiary style={tailwind("mt-1")}>
            {subtitle}
          </Text>
        </>
      )}
      {currentUserData.userType !== "provider" && (
        <View style={styles.btnCont}>
          <TouchableOpacity
            // onPress={onPress}
            style={styles.acceptBtn}
            onPress={() => onJobAccept()}
          >
            <Text style={{ color: "white" }}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("cancel")}
            style={styles.rejectBtn}
          >
            <Text style={{ color: "white" }}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatListItem;
// <TouchableOpacity style={tailwind('px-5  pb-3 mt-1')} onPress={onPress}>
//     <View style={tailwind('flex-row justify-between mt-1')}>
//         <Text sm left heavy>{title}</Text>
//         <Text sm tertiary>{moment(createAt).fromNow()}</Text>
//     </View>
//     <Text sm left tertiary style={tailwind('mt-1')}>{subtitle}</Text>
// </TouchableOpacity>

const styles = StyleSheet.create({
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "1.5%",
  },
  acceptBtn: {
    backgroundColor: "green",
    width: "45%",
    padding: "1.5%",
    borderRadius: 5,
  },
  rejectBtn: {
    backgroundColor: "red",
    width: "45%",
    padding: "1.5%",
    borderRadius: 5,
  },
});
