import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import Text from "components/common/Text";
import capitalizeFirstLetter from "utilities/capitalizeFirstLetter";
import Colors from "styles/Colors";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import { AntDesign } from '@expo/vector-icons'; 

const statusStyle = (value: string) => {
  switch (capitalizeFirstLetter(value)) {
    case "Accepted":
      return {
        backgroundColor: '#ecfadc',
        color: 'green',
        paddingVertical: 4,
      };
      break;
    case "Completed":
      return {
        backgroundColor: Colors.darkAccent,
        color: Colors.dark,
        paddingVertical: 4,
      };
      break;
    case "Lead":
      return {
        backgroundColor: "#F5F8FF",
        color: Colors.primary,
        paddingVertical: 4,
      };
      break;
    case "Offer Rejected":
      return {
        backgroundColor: "#FFF5F7",
        color: Colors.errorText,
        paddingVertical: 4,
      };
      break;
    default:
      break;
  }
};

const JobsListSectionHeader = ({
  title,
  status,
  onPress,
  jd,
}: {
  title: string;
  status: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const tailwind = useTailwind();

  const db = getFirestore();
  const [currentUserData] = useAtom(currentUserDataAtom);

  const [loading, setLoading] = useState(false);
  const [data, onChangeData] = useState([]);

  const getJobs = async () => {
    setLoading(true);
    getDocs(collection(db, "jobs"))
      .then((res) => {
        const jobsList = res.docs.map((item) => {
          const data = item.data();
          return data;
        });
        const newObj = jobsList.filter((item) => {
          return item.id === jd.id;
        });
        let checkArray = [];
        if (newObj.length > 0) {
          checkArray = newObj[0]?.data.filter((it: any, i: any) => {
            return it.uidP === currentUserData.uid;
          });
        }
        // console.log(checkArray, "=====")
        if (checkArray.length > 0) {
          onChangeData(checkArray);
        }

        setLoading(false);
      })
      .catch((e) => {
        console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      });
  };

  useEffect(() => {
    setLoading(true);
    getJobs().then(() => {});
  }, [jd]);
  if (jd.jobStatus != 0 || data[0]?.responseOnJob == 'rejected') {
    return null
  }

  // console.log(data[0]?.jobResponseType, "TYPE");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ borderTopWidth: 1, borderColor: "#EDEDF2",
      backgroundColor:currentUserData.userType !== "provider" ? "#E6E6E6" : "#ffffff"
     }}
    >
      <View
        style={[
          tailwind("px-5 flex-row justify-between items-center mt-3 mb-3")
        ]}
      >
        <>
          <Text style={{ color: Colors.dark, fontSize:17 }} bold lg>
            {title}
          </Text>
          {currentUserData.userType !== "provider" && <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <Text style={{ color: jd?.jobStatus == 0 ? Colors.primary 
              : jd?.jobStatus == 1 ? "green" : Colors.dark
              , fontSize:14,marginRight:5 }} >
              {jd?.jobStatus == 0 ? "Reviewing Offers" : jd?.jobStatus == 1 ? "In Progress" : "Completed"}
            </Text>
            <AntDesign name="right" size={13} color="black" />
          </View>}
          {currentUserData.userType == "provider" ? (
            <View
              style={{
                justifyContent: "flex-end",
                width: 180,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {data[0]?.jobResponseType.toLowerCase() == "active" &&
              data.length > 0 ? (
                <>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      height: 60,
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      bold
                      lg
                      style={[
                        statusStyle(status),
                        {
                          paddingVertical: 4,
                          backgroundColor: "#00C851",
                          color: "white",
                        },
                        tailwind("px-2 rounded"),
                      ]}
                    >
                      Applied
                    </Text>
                    <View style={tailwind("flex-row")}>
                      <Text style={{ marginRight: 12 }} sm right tertiary>
                        {moment(jd.createdAt).calendar()}
                      </Text>
                      <FontAwesome
                        name="clock-o"
                        size={16}
                        color={Colors.tertiaryText}
                      />
                    </View>
                  </View>
                </>
              ) : data[0]?.jobResponseType.toLowerCase() == "accepted" &&
                data.length > 0 ? (
                <>
                  {/* {alert(data[0]?.jobResponseType, "JOB LIST SECTION HEADER")} */}
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      height: 60,
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      bold
                      
                      style={[
                        statusStyle("Accepted"),
                       
                        tailwind("px-2 rounded"),
                      ]}
                    >
                      Accepted
                    </Text>
                    <View style={tailwind("flex-row")}>
                      <Text style={{ marginRight: 12 }} sm right tertiary>
                        {/* {moment(jd.createdAt).calendar()} */}
                        {moment(jd.createdAt).format("LT")}
                      </Text>
                      {/* <FontAwesome
                        name="clock-o"
                        size={16}
                        color={Colors.tertiaryText}
                      /> */}
                    </View>
                  </View>
                </>
              ) : jd.jobStatus == 2 && data.length > 0 ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: 60,
                    justifyContent: "space-around",
                  }}
                >
                    {/* {console.log(jd.jobStatus , "jd.jobStatus jd.jobStatus jd.jobStatus ")} */}
                  <Text
                    bold
                  
                    style={[
                      statusStyle("Completed"),
                     
                      tailwind("px-2 rounded"),
                    ]}
                  >
                    Completed
                  </Text>
                  <View style={tailwind("flex-row")}>
                    <Text style={{ marginRight: 12 }} sm right tertiary>
                    {moment(jd.createdAt).format("LT")}
                    </Text>
                    {/* <FontAwesome
                      name="clock-o"
                      size={16}
                      color={Colors.tertiaryText}
                    /> */}
                  </View>
                </View>
              ) : jd.jobStatus != 0 || data[0]?.responseOnJob == 'rejected' ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: 60,
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    bold
                   
                    style={[
                      statusStyle(status),
                      {
                        paddingVertical: 4,
                        backgroundColor: "#ffe7e6",
                        color: "#CC0000",
                      },
                      tailwind("px-2 rounded"),
                    ]}
                  >
                    Offer Rejected
                  </Text>
                  <View style={tailwind("flex-row")}>
                    <Text style={{ marginRight: 12 }} sm right tertiary>
                    {moment(jd.createdAt).format("LT")}
                    </Text>
                    {/* <FontAwesome
                      name="clock-o"
                      size={16}
                      color={Colors.tertiaryText}
                    /> */}
                  </View>
                </View>
              ) :data[0]?.responseOnJob == 'rejected' ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: 60,
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    bold
                   
                    style={[
                      statusStyle(status),
                      {
                        paddingVertical: 4,
                        backgroundColor: "#ffe7e6",
                        color: "#CC0000",
                      },
                      tailwind("px-2 rounded"),
                    ]}
                  >
                    Offer Rejected
                  </Text>
                  <View style={tailwind("flex-row")}>
                    <Text style={{ marginRight: 12 }} sm right tertiary>
                    {moment(jd.createdAt).format("LT")}
                    </Text>
                    {/* <FontAwesome
                      name="clock-o"
                      size={16}
                      color={Colors.tertiaryText}
                    /> */}
                  </View>
                </View>
              ): (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: 60,
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    bold
                    
                    style={[
                      statusStyle("Lead"),
                     
                      tailwind("px-2 rounded"),
                    ]}
                  >
                    Lead
                  </Text>
                  <View style={tailwind("flex-row")}>
                    <Text style={{ marginRight: 12 }} sm right tertiary>
                      {/* {moment(jd.createdAt).calendar()} */}
                      {moment(jd.createdAt).format("LT")}
                    </Text>
                    {/* <FontAwesome
                      name="clock-o"
                      size={16}
                      color={Colors.tertiaryText}
                    /> */}
                  </View>
                </View>
              )}

              {/* <Text
                    bold lg style={[statusStyle(status), { paddingVertical: 4 }, tailwind('px-2 rounded')]}
                    >{capitalizeFirstLetter(status)}
                </Text> */}
            </View>
          ) : null}
        </>
      </View>
    </TouchableOpacity>
  );
};

export default JobsListSectionHeader;
