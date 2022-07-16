import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

import Text from "components/common/Text";
import truncate from "utilities/truncateText";
import Colors from "styles/Colors";

type Props = {
  job: JobDetails;
  onPress: (event: GestureResponderEvent) => void;
};

const JobBoardListItem = ({ job, onPress }: Props) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity onPress={onPress} style={tailwind("py-3 px-5")}>
      <View style={tailwind("flex-row justify-between")}>
        <Text md left normal>
          {job.title}
        </Text>
        <View style={{flexDirection:'column', alignItems:'flex-end',}}>
        {/* <View style={tailwind("flex-row")}>
            <Text style={{ marginRight: 12 }} sm right tertiary>
              {moment(job.createdAt).calendar()}
            </Text>
            <FontAwesome
              name="clock-o"
              size={16}
              color={Colors.tertiaryText}
            />
          </View> */}
          <View style={tailwind("flex-row")}>
            <Text style={{ marginRight: 12 }} sm right tertiary>
              {moment(job.createdAt).format("LL")}
            </Text>
            <FontAwesome
              name="angle-right"
              size={16}
              color={Colors.tertiaryText}
            />
          </View>
       
        </View>
      </View>
      <View style={tailwind("flex-col mt-2")}>
        <Text md left tertiary>
          {truncate(job.description, 100)}
        </Text>
        <View style={{ display: "flex", flexWrap: "wrap" }}>
          <TouchableOpacity style={styles.tagStyle}>
            <Text left hyperlink bold onPress={onPress}>
              {job.type}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobBoardListItem;

const styles = StyleSheet.create({
  tagStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingBottom: 2,
    lineHeight: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    marginTop: 12,
    backgroundColor: "#F5F8FF",
  },
});
