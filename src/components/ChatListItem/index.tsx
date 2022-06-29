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
  const db = getFirestore();
  const onJobAccept = async () => {
    let id = data.job.trim();
    const frankDocRef = doc(db, "jobs", id);
    const cityRef = doc(db, "jobs", id);
    await setDoc(cityRef, { data: [{...data.userApplied, jobResponseType: 'accepted'}]}, { merge: true });
    await updateDoc(doc(db, "jobs", id), {
        'jobDetails.jobStatus': 1
    })
    await data.getMyJob()
  };


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
          <TouchableOpacity onPress={()=>{
            if (data.userApplied.jobResponseType === "accepted") {
              onPress()
            }
          }}>
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
        {currentUserData.userType !== "provider" && (
          data.userApplied.jobResponseType !== "accepted" ? <View style={styles.btnCont}>
            <TouchableOpacity
              // onPress={onPress}
              style={styles.acceptBtn}
              onPress={() => setIsModalOpen(true)}
            >
              <Text style={{ color: "white" }}>Accept</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.btnCont}>
          <TouchableOpacity
            // onPress={onPress}
            style={styles.acceptBtn}
            onPress={() => setIsModalOpen(true)}
          >
            <Text style={{ color: "white" }}>Mark as compelete</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
  
      <Modal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}>
        <Text>
          Are you sure? you want to accept this offer, it will delete all other
          offers on this job.
        </Text>
        <View style={styles.btnContModal}>
        <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.btnNo}>
            <Text style={{color:"white"}}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onJobAccept();setIsModalOpen(false);}} style={styles.btnYes}>
            <Text style={{color:"white"}}>Yes</Text>
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
  btnContModal:{
    width:"100%",
    justifyContent:"space-around",
    flexDirection:"row",
    marginTop:"3%"
  },
  btnYes:{
    backgroundColor:"green",
    width:"35%",
    paddingVertical:"2%",
    borderRadius:5
  },
  btnNo:{
    backgroundColor:"red",
    width:"35%",
    paddingVertical:"2%",
    borderRadius:5
  }
});
