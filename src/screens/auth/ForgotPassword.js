import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Alert,Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useTailwind } from "tailwind-rn";
import { useAtom } from "jotai";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import TextInput from "components/common/TextInput";
import Button from "components/common/Button";
// import customerDetailsAtom from "atoms/customerDetailsAtom";
// import currentUserDataAtom from "atoms/currentUserDataAtom";
import HeaderLeft from "components/HeaderLeft";
import Colors from "styles/Colors";

// type Props = StackScreenProps<SettingsStackParamList, "Settings">;

const ForgotPassword = ({ navigation }) => {
  const tailwind = useTailwind();
  const [show, setShow] = useState(false);
  const [email, onChangeEmail] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [customerDetails, setCustomerDetails] = useAtom(currentUserDataAtom);
  const auth = getAuth();

  const updatePasswordEmail = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // if(show){
    //     Alert.alert("Already Send");
    // }else{
        if (emailRegex.test(email)) {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                  console.log("SEND")
                  setShow(true)
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                if(errorMessage.includes("Firebase:")){
                    let a =  errorMessage.slice(10);
                      Alert.alert(a)
                    }
                    if(errorMessage.includes("firebase:")){
                      let a =  errorMessage.slice(10);
                      Alert.alert(a)
                    }
                // console.log(errorMessage);
              });
          } else {
            Alert.alert("Invalid Email Address");
          }
    // }


  };

//   useEffect(() => {
//     // onChangeEmail(customerDetails.email);
//     navigation.setOptions({
//     headerRight: null,
//       headerLeft: () => (
//         <HeaderLeft
          
          
//           onPress={() => navigation.goBack()}
//           title="Forgot Password"
//         />
//       ),
//     });
//   }, []);

  // function updatePassword() {
  //     setCustomerDetails({ ...customerDetails, password: confirmPassword });
  //     navigation.goBack();
  // }

  return (
    <SafeAreaView
      style={{
        ...tailwind("flex bg-white items-center h-full"),
        borderTopWidth: 1,
        borderColor: Colors.border,
      }}
    >
    
      <View style={tailwind("w-full px-6 pt-9")}>
        <Text style={{height: 60}}>
            Enter the email address associated with your account and we will send you instructions for resetting your password.
        </Text>
        <TextInput
          value={email}
          lg
          placeholder="Email"
          onChangeText={(text) => onChangeEmail(text)}

        />
           {
            show &&
            <View style={{backgroundColor:'#d6ffe7', marginVertical: 10, borderRadius: 10}}>
            <Text style={{padding: 10, color: 'green', fontWeight: '700'}}>
                Please check your email or spam and click on the provided link to reset your password.
             </Text>
             </View>
        }
        <View style={{ marginVertical: 20 }}>
          <Button
            style={{ borderRadius: 8 }}
            title="Send"
            onPress={updatePasswordEmail}
          />
        </View>
     
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
