import { TouchableOpacity, View, StyleSheet, Alert } from "react-native";
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
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import StarRating from "react-native-star-rating";
import { getAuth } from "firebase/auth";

const ChatListItem = ({
  title,
  subtitle,
  createAt,
  onPress,
  data = {},
  thatId,
  jobDetailsData,
  navigation
}: {
  onPress: () => any;
  title: string;
  subtitle: string;
  createAt: string;
  data: any;
}) => {
  const tailwind = useTailwind();
  const [currentUserData] = useAtom(currentUserDataAtom);
  const auth = getAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [dataaaa, onChangeDataaaa] = useState([])
  const [profileData, onChangeProfileData] = useState(null)
  const [rating, setRating] = useState(0);
  const { currentUser } = auth
  const onStarRatingPress = (rating: number) => {
    setRating(rating);
  };
  
  const db = getFirestore();
  // const test = async (JobID) =>{
  //   const jobsRef = collection(db, "jobs");
  //   const queryGetMyJobs = await query(jobsRef, where("id", "==", JobID));
  //   // alert("sss")
  //   // console.log( data?.job?.trim(),"OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO-------------------------------------------------");
  //   await getDocs(queryGetMyJobs).then((res) => {
  //     // console.log(res)
  //     const dataJobsList = res.docs.map((item) => item.data())
  //     return dataJobsList
  // }).then((dataJobsList: any) => {
  //     console.log({dataJobsList},"========================>>>>>>>>>>>>>>>>")
  //     // setJobs(dataJobsList)
  //     // setLoading(false)
  // }).catch((error) => {
  //     const errorMessage = error.message;
  //     Alert.alert(errorMessage)
  //     // setLoading(false)
  // })
  // }

  var currentUserId = currentUserData.uid;
  var userRef = doc(db, "users", currentUserId);

  var jobID = data?.job?.trim();
  if (jobID) {
    var jobRef = doc(db, "jobs", jobID);
  }
  if (jobID) {
    var jobRefUser = doc(db, "users", data.userApplied.uidP);
  }
  // console.log(data.userApplied.uidP, "TOTAL JOBS");
  const onJobAccept = async () => {
    await setDoc(
      jobRef,
      { data: [{ ...data.userApplied, jobResponseType: "accepted" }] },
      { merge: true }
    );
    await updateDoc(doc(db, "jobs", jobID), {
      "jobDetails.jobStatus": 1,
    });
    await data.getMyJob();
  };

  // const onJobReject = async () => {
  // //  console.log(jobRef,"-------------------------------------------")
  //   // test()
  //   // await setDoc(
  //   //   jobRef,
  //   //   { data: [{ ...data.userApplied, responseOnJob: "rejected" }] },
  //   //   { merge: true }
  //   // );
  //   // // await updateDoc(doc(db, "jobs", jobID), {
  //   // //   "jobDetails.jobStatus": 1,
  //   // // });
  //   // await data.getMyJob();
  // };

  const completeTask = async () => {
    //

    await setDoc(
      jobRef,
      { data: [{ ...data.userApplied, jobResponseType: "completed" }] },
      { merge: true }
    );
    await updateDoc(doc(db, "jobs", jobID), {
      "jobDetails.jobStatus": 2,
    });

    // await updateDoc(doc(db, "users", currentUserId), {
    //   "totalJobs": currentUserData.totalJobs + 1,
    // });
    // const q = query(collection(db, "users"), where("uid", "==", data.userApplied.uidP));

    getDocs(collection(db, "users"))
      .then(async (res) => {
        const users = res.docs.map((item) => {
          const data = item.data();
          return data;
        });
        const newObj = users.filter((item) => {
          return item.uid === data.userApplied.uidP;
        });
        console.log(newObj, "+_+");

        await setDoc(
          jobRefUser,
          { totalJobs: newObj[0].totalJobs + 1, rating: newObj[0].rating + rating },
          { merge: true }
        );
      })
      .catch((e) => {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      });

    // const querySnapshot = await getDocs(q);

    // const querySnapshot = await getDocs(collection(db, "users"));
    // console.log(querySnapshot, "SIZE");

    // await setDoc(jobRefUser, { totalJobs: 9 }, { merge: true });

    await data.getMyJob();
    setIsRatingModal(false);
  };


  const getData = async () => {
    // console.log(thatId,"OOOOOOOOOOOOOOOOOOOOOOOOO");
    getDocs(collection(db, "jobs")).then((res) => {
      const jobsList = res.docs.map((item) => {
          const data = item.data()
          return data
      })
      const newObj = jobsList.filter((item)=>{
          return item.id === jobDetailsData?.id
      })
      let checkArray = []
      if(newObj.length > 0 ){checkArray = newObj[0]?.data.filter((it: any, i: any)=>{
          return it.uidP === currentUserData.uid
      })}
      // console.log(checkArray, "=====")
      if(checkArray.length > 0){
          onChangeDataaaa(checkArray) 
      }

  }).catch((e)=>{
      console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  })
  }

  useEffect(()=>{
    getData()
    getDocs(collection(db, "users"))
    .then(async (res) => {
      const users = res.docs.map((item) => {
        const data = item.data();
        return data;
      });
      const newObj = users.filter((item) => {
        return item.uid === data.userApplied.uidP;
      });
      // console.log(newObj[0], "+_+");
      onChangeProfileData(newObj[0])
    
    })
    .catch((e) => {
      console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    });
  },[])

console.log(dataaaa[0] , "DATA")
  return (
    <>
      <View style={[tailwind("px-5  pb-3 mt-1"), {}]}>
        {currentUserData.userType == "provider" ? (
          <>
            <TouchableOpacity  disabled={
              dataaaa?.length < 0 ? true :
              dataaaa[0]?.jobResponseType == "completed" ? true :
              dataaaa[0]?.jobResponseType == "expired" ? true :
              dataaaa[0]?.responseOnJob == "rejected" ? true :
              dataaaa[0]?.jobResponseType == "accepted" ? false : !dataaaa[0]?.hasOwnProperty("isChat") 
            }  onPress={onPress}>
              <View style={tailwind("flex-row justify-between mt-1")}>
                <Text sm left heavy>
                  {title}
                </Text>
                {/* <Text sm tertiary>
                  {moment(createAt).fromNow()}
                </Text> */}
              </View>
              <Text sm left tertiary style={tailwind("mt-1")}>
                {subtitle}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // if (data.userApplied.jobResponseType === "accepted") {
                onPress();
              // }
            }}
          >
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
        )}
        {currentUserData.userType !== "provider" &&
          (data?.userApplied?.jobResponseType === "applied" && (
            <>
            <View style={styles.btnCont}>
              <TouchableOpacity
                // onPress={onPress}
                style={styles.acceptBtn}
                onPress={() => setIsModalOpen(true)}
              >
                <Text style={{ color: "white" }}>Accept</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnCont}>
              <TouchableOpacity
                // onPress={onPress}
                style={styles.acceptBtn}
                onPress={() => navigation.navigate('profile', {profileData})}
              >
                <Text style={{ color: "white" }}>View Profile</Text>
              </TouchableOpacity>
            </View>
            </>
          ) )}
          {data?.userApplied?.jobResponseType === "accepted" && <View style={styles.btnCont}>
              <TouchableOpacity
                // onPress={onPress}
                style={{
                  backgroundColor: "#00C851",
                  width: "45%",
                  padding: "1.5%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  // setIsRatingModal(true)
                  console.log({jobID})
                }}
              >
                <Text style={{ color: "white" }}>Mark as Complete</Text>
              </TouchableOpacity>
            </View>}
            {data?.userApplied?.jobResponseType === "completed" && <View style={styles.btnCont}>
              <TouchableOpacity
              disabled
                // onPress={onPress}
                style={{
                  backgroundColor: "#2BBBAD",
                  width: "45%",
                  padding: "1.5%",
                  borderRadius: 5,
                }}
                // onPress={() => setIsRatingModal(true)}
              >
                <Text style={{ color: "white" }}>Completed</Text>
              </TouchableOpacity>
            </View>}
      </View>
      {isModalOpen && (
        <Modal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}>
          <Text>
            Are you sure? you want to accept this offer, it will delete all
            other offers on this job.
          </Text>
          <View style={styles.btnContModal}>
            <TouchableOpacity
              onPress={() => {setIsModalOpen(false);}}
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
      )}

      {isModalProfileOpen && (
        <Modal modalVisible={isModalProfileOpen} setModalVisible={setIsModalProfileOpen}>
          <Text>
            Profile
          </Text>
          <View style={styles.btnContModal}>
            <TouchableOpacity
              onPress={() => setIsModalProfileOpen(false)}
              style={styles.btnNo}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
     
          </View>
        </Modal>
      )}
      {/* Rating modal */}
      {isRatingModal && (
        <Modal modalVisible={isRatingModal} setModalVisible={setIsRatingModal}>
          <Text>Rate this service provider.</Text>
          <View style={{height: 100, justifyContent:'center', alignItems:'center'}}>
          <StarRating
            maxStars={5}
            starSize={35}
            // starStyle={{  marginLeft: ml }}
            rating={rating}
            selectedStar={onStarRatingPress}
            fullStarColor="#FCC736"
          />
          </View>
          <View style={styles.btnContModal}>
            <TouchableOpacity
              onPress={() => setIsRatingModal(false)}
              style={styles.btnNo}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={completeTask} style={styles.btnYes}>
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
    backgroundColor: "#4285F4",
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
