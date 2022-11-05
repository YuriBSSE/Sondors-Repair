import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collection, doc } from "firebase/firestore";
import { Loader } from "components/common/Loader";
import jobsAtom from "atoms/jobsAtom";
import Text from "components/common/Text";
import capitalizeFirstLetters from "utilities/capitalizeFirstLetters";
import NewJobImage from "assets/NewJobImage";
import Button from "components/common/Button";

import { NavigationProp } from "@react-navigation/native";
import Colors from "styles/Colors";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import capitalizeFirstLetter from "utilities/capitalizeFirstLetter";
import Rating from "components/Rating";
import moment from "moment";
import ServiceLabel from "components/common/ServiceLabel";
import HeaderLeft from "components/HeaderLeft";
import HeaderRight from "components/HeaderRight";

const ProfileScreen = ({ route, navigation }) => {
  // console.log(route.params.profileData, "profileData");
  const profile = route.params.profileData;
  const tailwind = useTailwind();

  const totalRatting = profile.rating / profile.totalJobs;
  const db = getFirestore();
  const [currentUserData] = useAtom(currentUserDataAtom);

  const [loading, setLoading] = useState(false);
  const [data, onChangeData] = useState([]);

  useEffect(() => {
    // checkChannel();
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft
          onPress={() => navigation.goBack()}
          title={"User Profile"}
        />
      ),
    });
  }, []);

  // console.log(profile, "SADASDASDASD");
  return (
    <ScrollView>
    <View style={tailwind("flex flex-col px-6")}>
      <View style={tailwind("mt-4")}>
        <Text left sm tertiary style={tailwind("mt-1")}>
          Name
        </Text>
        <View style={tailwind("mt-2")}>
          <Text left lg style={tailwind("mt-1")}>
            {profile?.username}
          </Text>
        </View>
      </View>
      <View style={tailwind("mt-4")}>
        <Text left sm tertiary style={tailwind("mt-1")}>
          Email
        </Text>
        <View style={tailwind("mt-2")}>
          <Text left lg style={tailwind("mt-1")}>
            {profile?.email}
          </Text>
        </View>
      </View>
      <View style={tailwind("mt-4")}>
        <Text left sm tertiary style={tailwind("mt-1")}>
          Total Jobs
        </Text>
        <View style={tailwind("mt-2")}>
          <Text left lg style={tailwind("mt-1")}>
            {profile?.totalJobs}
          </Text>
        </View>
      </View>
      <View style={tailwind("mt-4")}>
        <Rating disabled={true} defaultRating={totalRatting || 0} />

        <Text left sm tertiary style={tailwind("mt-1")}>
          Member since {moment(profile.createdAt).format("LL")}
        </Text>
      </View>

      <View style={{ ...tailwind("mt-3"), maxHeight: 232 }}>
        <Text left bold sm tertiary>
          Services Provided
        </Text>
        <ScrollView
          contentContainerStyle={{
            ...tailwind("flex-row mt-1 pb-3"),
            flexWrap: "wrap",
          }}
        >
          {profile.services.map((service: string) => (
            <ServiceLabel key={service} title={service} />
          ))}
        </ScrollView>
      </View>
      <View style={tailwind("mt-8")}>
        <Text left bold sm tertiary>
          Address
        </Text>
        <Text left>{profile.address.street1}</Text>
        <Text left>{profile.address.street2}</Text>
      </View>
      <View style={tailwind("mt-6")}>
        <Text left bold sm tertiary>
          Hours
        </Text>
        {profile.hours.map((item: Hour) => {
          return (
            <Text
              left
              style={[tailwind("mt-2"), { textTransform: "capitalize" }]}
            >{`${item.startDay} -- ${item.endDay}: ${moment(
              item.startHour
            ).format("LT")} - ${moment(item.endHour).format("LT")}`}</Text>
          );
        })}
      </View>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;
