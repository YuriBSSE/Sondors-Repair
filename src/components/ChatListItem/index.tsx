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
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import StarRating from 'react-native-star-rating';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [rating, setRating] = useState(0)
  const db = getFirestore();
  // console.log(data.job, "=======================");

  // console.log(data.userApplied, "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
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
    await setDoc(
      cityRef,
      { data: [{ ...data.userApplied, jobResponseType: "accepted" }] },
      { merge: true }
    );

    // await updateDoc(frankDocRef, {
    //     data: arrayRemove("applied")
    // });

    await updateDoc(doc(db, "jobs", id), {
      "jobDetails.jobStatus": 1,
    });

    await data.getMyJob();
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
    <>
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
          <TouchableOpacity
            onPress={() => {
              if (data.userApplied.jobResponseType === "accepted") {
                onPress();
              }
            }}
          >
            <View style={tailwind("flex-row justify-between mt-1")}>
              <Text sm left heavy>
                {title}dd
              </Text>
              <Text sm tertiary>
                {moment(createAt).fromNow()}
              </Text>
            </View>
            <Text sm left tertiary style={tailwind("mt-1")}>
              {subtitle}
            </Text>
          </TouchableOpacity>
        )}
        {currentUserData.userType !== "provider" &&
          (data.userApplied.jobResponseType !== "accepted" ? (
            <View style={styles.btnCont}>
              <TouchableOpacity
                // onPress={onPress}
                style={styles.acceptBtn}
                onPress={() => setIsModalOpen(true)}
              >
                <Text style={{ color: "white" }}>Accept</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnCont}>
              <TouchableOpacity
                // onPress={onPress}
                style={styles.acceptBtn}
                onPress={() => setIsRatingModal(true)}
              >
                <Text style={{ color: "white" }}>Mark as compelete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <Modal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}>
        <Text>
          Are you sure? you want to accept this offer, it will delete all other
          offers on this job.
        </Text>
        <View style={styles.btnContModal}>
          <TouchableOpacity
            onPress={() => setIsModalOpen(false)}
            style={styles.btnNo}
          >
            <Text style={{ color: "white" }}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onJobAccept();
              setIsModalOpen(false);
            }}
            style={styles.btnYes}
          >
            <Text style={{ color: "white" }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Rating modal */}
      <Modal modalVisible={isRatingModal} setModalVisible={setIsRatingModal}>
        <Text>Rate this service provider.</Text>
        <View style={styles.btnContModal}>
          <TouchableOpacity
            onPress={() => setIsRatingModal(false)}
            style={styles.btnNo}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert("PP")}} style={styles.btnYes}>
            <Text style={{color:"white"}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
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
    justifyContent: "flex-end",
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
  btnContModal: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: "3%",
  },
  btnYes: {
    backgroundColor: "green",
    width: "35%",
    paddingVertical: "2%",
    borderRadius: 5,
  },
  btnNo: {
    backgroundColor: "red",
    width: "35%",
    paddingVertical: "2%",
    borderRadius: 5,
  },
});
