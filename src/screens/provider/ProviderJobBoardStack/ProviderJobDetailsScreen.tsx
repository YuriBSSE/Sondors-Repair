import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import HeaderLeft from "components/HeaderLeft";
import HeaderRight from "components/HeaderRight";
import JobView from "components/JobView";
import useApi from "../../../firebase/api";

import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import streamClientAtom from "atoms/streamClientAtom";
import TextInput from "components/common/TextInput";
import Text from "components/common/Text";
import AppModal from "components/common/Modal";
import Button from "components/common/Button";
import jobsAtom from "atoms/jobsAtom";
import { async } from "@firebase/util";


type Props = {
  route: RouteProp<ProviderJobsStackParamList, "ProviderJobDetailsScreen">;
  navigation: NavigationProp<
    ProviderJobsStackParamList,
    "ProviderJobDetailsScreen"
  >;
};

const ProviderJobDetailsScreen = ({ route, navigation }: Props) => {
//   console.log(route.params.data, "routerouterouterouterouterouterouteroute");
  const { getProviderJobs } = useApi();
  const [currentUsers] = useAtom(currentUserDataAtom);
  const tailwind = useTailwind();
  const [jobs, setJobs] = useAtom(jobsAtom);
  const {
    headerRightTitle,
    headerLeftTitle,
    headerRightOnPress,
    jobDetails,
    data,
    uidC,
  } = route.params;
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState({});
  const [isChannel, setIsChannel] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const { currentUser } = auth;
  const [streamClient] = useAtom(streamClientAtom);

  useEffect(() => {
    checkChannel();
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft
          onPress={() => navigation.goBack()}
          title={headerLeftTitle}
        />
      ),
      headerRight: () => (
        <HeaderRight onPress={headerRightOnPress!} title={headerRightTitle!} />
      ),
    });
  }, []);

  const handelApplyJob = (name: string, value: string) => {
    setCoverLetter({ ...coverLetter, [name]: value });
  };

  const createPrivateChanel = async () => {
    const { currentUser } = auth;
    const channel = streamClient.channel(
      "messaging",
      `${currentUser?.uid + jobDetails.streamChatId!}`,
      {
        members: [`${currentUser?.uid}`, `${uidC}`],
      }
    );
    await channel.create().catch(console.log);
  };

  const checkChannel = async () => {
    const docJobRef = doc(db, "jobs", `${jobDetails.id}`);
    const docSnap = await getDoc(docJobRef);
    if (docSnap.exists()) {
      const isChannel = docSnap
        .data()
        ?.data.map((item: any) => {
          if (item.uidP === currentUser?.uid) return true;
        })
        .join();

      if (typeof isChannel === "boolean") {
        setIsChannel(isChannel);
      }
    }
  };

  const onApply = async () => {
    console.log(currentUsers?.username,"========================================================")
    setLoading(true);
    const applyOnJobRef = doc(db, "jobs", `${jobDetails.id}`);
    await updateDoc(applyOnJobRef, {
      data: [
        ...data,
        {
          ...coverLetter,
          externalId: currentUser?.uid + jobDetails.streamChatId!,
          uidP: currentUser?.uid,
          createAt: `${new Date().toString()}`,
          jobResponseType: "applied",
         userName: currentUsers?.username
        },
      ],
    })
      .then(() => {
        createPrivateChanel();
      })
      .then(() => {
        setModal(false);

        checkChannel();

        navigation.navigate("ProviderJobBoardScreen", {});
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      })
      .finally(() => {
        setLoading(false);
        getProviderJobs();
      });
  };

  console.log(isChannel, "Channel Check");
  return (
    <SafeAreaView
      style={tailwind("flex bg-white items-center justify-center h-full")}
    >
      <View style={tailwind("w-full flex h-full justify-between")}>
        <JobView
          onPress={async () => {
            console.log(isChannel, "isChannel");
            if (isChannel) {
              navigation.navigate("JobChat", {
                externalId: currentUser?.uid + "" + jobDetails.streamChatId!,
              });
            } else {
              setModal(true);
            }
          }}
          jobDetails={jobDetails}
        />
      </View>
      <AppModal modalVisible={isModal}>
        <Text lg bold title style={{ alignSelf: "flex-start" }}>
          Apply For Job
        </Text>
        <View style={[tailwind("w-full mt-2 mb-2")]}>
          <Text lg style={{ alignSelf: "flex-start" }}>
            Cover Title
          </Text>
          <TextInput
            onChangeText={(text) => handelApplyJob("title", text)}
            style={{ width: "100%", marginTop: 4 }}
          />
        </View>
        <View style={[tailwind("w-full mt-2")]}>
          <Text lg style={{ alignSelf: "flex-start" }}>
            Cover Letter
          </Text>
          <TextInput
            onChangeText={(text) => handelApplyJob("subtitle", text)}
            multiline
            style={{ width: "100%", marginTop: 4 }}
          />
        </View>
        <View style={[tailwind("w-full mt-2"), { display: "flex" }]}>
          <Button
            loading={loading}
            onPress={onApply}
            style={[tailwind("rounded"), { marginTop: 16 }]}
            title={"Apply"}
          />
          <Button
            onPress={() => {
              setModal(false);
              console.log(currentUser, "======================================================================")
            }}
            secondary
            style={[tailwind("rounded"), { marginTop: 12 }]}
            title={"Cancel"}
          />
        </View>
      </AppModal>
    </SafeAreaView>
  );
};

export default ProviderJobDetailsScreen;
