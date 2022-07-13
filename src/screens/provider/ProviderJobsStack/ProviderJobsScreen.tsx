import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  SectionList,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp } from "@react-navigation/native";
import { useAtom } from "jotai";
import ButtonTabs from "components/ButtonTabs";
import Text from "components/common/Text";
import { Feather } from "@expo/vector-icons";
import { Loader } from "components/common/Loader";
import _ from "loadsh";
import providerJobsAtom from "atoms/providerJobsAtom";

import ChatListItem from "components/ChatListItem";
import JobsListSectionHeader from "components/JobsListSectionHeader";
import Colors from "styles/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import useApi from "../../../firebase/api";

import {
  getDocs,
  getFirestore,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";

type Props = {
  navigation: NavigationProp<ProviderJobsStackParamList, "ProviderJobsScreen">;
};

const ViewOlderJob = () => {
  const tailwind = useTailwind();
  return (
    <>
      <TouchableOpacity onPress={() => Alert.alert("No older jobs her")}>
        <View
          style={[
            tailwind(
              "px-5 py-3  border-b border-gray-200  flex-row justify-between items-center"
            ),
            { borderTopWidth: 1, borderColor: "#EDEDF2" },
          ]}
        >
          <Text left sm tertiary bold>
            View older completed jobs
          </Text>
          <View>
            <Feather
              name="chevron-right"
              size={16}
              color={Colors.tertiaryText}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 200,
        }}
      ></View>
    </>
  );
};

const ProviderJobsScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const [currentUser] = useAtom(currentUserDataAtom);
  const [value, onChangeValue] = useState("All");
  const [flatlistData, onChangeFlatlistData] = useState([]);
  const [dataa, onChangeDataa] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  var unsubscribe;

  const consoleLog = (data) => {
    onChangeValue(data);
  };

  const filterFunc = () => {
    if (value !== "All") {
      const x = dataa.filter((item, index) => {
        return item?.data[0]?.jobResponseType == value.toLowerCase();
      });

      onChangeFlatlistData([...x]);
    } else {
      onChangeFlatlistData([...dataa]);
    }
  };

  const getProviderJobs = async () => {
    setLoading(true);

    const z = collection(db, "jobs");

    unsubscribe = onSnapshot(z, (querySnapshot: any[]) => {
      const jobs: any[] = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      const dataJobsList: any = [];
      if (jobs?.length > 0) {
        // console.log(jobs.length);

        jobs.map((item, index) => {
          const data = item;
          data.jobDetails.id = item.id;
          // console.log(data);
          if (data.data.length > 0) {
            const userIn = data.data.filter((o: any) => {
              if (o.uidP === currentUser.uid) {
                return o;
              }
            });
            data.data = userIn;
            dataJobsList.push(data);
          }
        });
        const j = dataJobsList.sort(function (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) {
          return (
            new Date(b.jobDetails.createdAt) - new Date(a.jobDetails.createdAt)
          );
        });
        onChangeDataa(_.compact(j));
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    filterFunc();
  }, [value, dataa]);

  useEffect(() => {
    getProviderJobs();
    return unsubscribe;
  }, []);


  return (
    <SafeAreaView
      style={tailwind("flex bg-white items-center justify-center h-full")}
    >
      <View style={tailwind("px-5 mt-3")}>
        <ButtonTabs
          newFunc={consoleLog}
          tabList={["All", "Applied", "Accepted", "Completed"]}
        />
      </View>
      <View style={tailwind("flex h-full justify-between w-full mt-2")}>
        {!loading ? (
          <SectionList
            sections={flatlistData}
            keyExtractor={(item, index) => item.title + item.subtitle + index}
            renderItem={({
              item: { title, subtitle, externalId, createAt, uidP },
              section: { jobDetails },
            }) => (
              <ChatListItem
                jobDetailsData={jobDetails}
                thatId={uidP}
                title={title}
                subtitle={subtitle}
                onPress={
                  externalId
                    ? () => navigation.navigate("JobChat", { externalId })
                    : () => Alert.alert("No chat exists")
                }
                createAt={createAt}
              />
            )}
            ListFooterComponent={() => <ViewOlderJob />}
            renderSectionHeader={({
              section: { title, status, jobDetails },
            }) => (
              <JobsListSectionHeader
                title={title}
                status={status}
                jd={jobDetails}
                onPress={() =>
                  navigation.navigate("ProviderJobDetailsScreen", {
                    jobDetails,
                    headerLeftTitle: "Job Details",
                    headerRightTitle: "Go to chat",
                    headerRightOnPress: jobDetails?.streamChatId
                      ? () =>
                          navigation.navigate("JobChat", {
                            externalId: jobDetails?.streamChatId,
                          })
                      :  () => Alert.alert("No chat exists"),
                  })
                }
              />
            )}
          />
        ) : (
          <Loader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProviderJobsScreen;

const styles = StyleSheet.create({
  btnWrapper: {
    height: 44,
    backgroundColor: Colors.inputBorder,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  primaryBtnTabStyle: {
    borderRadius: 6,
    flex: 1,
    marginEnd: 4,
    backgroundColor: Colors.primary,
  },
  secondaryBtnTabStyle: {
    borderRadius: 6,
    flex: 1,
    marginEnd: 4,
    backgroundColor: Colors.inputBorder,
    color: Colors.dark,
  },
});
