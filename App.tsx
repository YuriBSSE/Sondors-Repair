import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import { useAtom } from "jotai";
import { Loader } from "components/common/Loader";

import Auth from "./src/screens/auth/Auth";
import CustomerHome from "./src/navigation/Customer/CustomerHome";
import OnBoardingScreensStacks from "navigation/Customer/OnBoardingStack";
import ProviderHome from "./src/navigation/Provider/ProviderHome";
import utilities from "./tailwind.json";
import isAuthenticatedAtom from "atoms/isAuthenticatedAtom";
import currentUserDataAtom from "atoms/currentUserDataAtom";
import customerDetailsAtom from "atoms/customerDetailsAtom";

import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

import { doc, getDoc, getFirestore } from "firebase/firestore";

const { firebaseConfig } = Constants.manifest!.extra!;
initializeApp(firebaseConfig);

const Stack = createStackNavigator<RootStackParamList>();
LogBox.ignoreAllLogs();

export default function App() {
  const auth = getAuth();
  const db = getFirestore();
  const [isAuthenticated, setIsAuthenticatedAtom] =
    useAtom(isAuthenticatedAtom);
  const [isUser, setIsUser] = useState("");
  const [userDataa, onChangeUserData] = useState(null);
  const [isShop, setIsShope] = useState<boolean>(false);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [customerDetailData, setCustomerDetailData] =
    useAtom(customerDetailsAtom);

  useEffect(() => {
    setIsAuthenticatedAtom(true);
    onAuthStateChanged(auth, (user) => {
      if (user == null) {
        setIsAuthenticatedAtom(false);
      }

      if (user != null) {
        setIsAuthenticatedAtom(true);
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then((currentUser) => {
          const userData = currentUser.data();
          // console.log("*********************************************************************",userData.bikes)
          setCurrentUserData(userData);
          if (userData?.userType === "owner") {
            setCustomerDetailData({ bikes: userData?.bikes });
            onChangeUserData(userData);
            setIsUser("customer");
          } else {
            if ((userData?.userType === "provider", userData?.isShop)) {
              setIsUser("provider");
            } else {
              setIsAuthenticatedAtom(false);
              setIsShope(true);
            }
          }
        });
      } else {
        setIsAuthenticatedAtom(false);
      }
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name="Authentication"
                  component={() => <Auth isShop={isShop} />}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </OverlayProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </TailwindProvider>
    );
  } else {
    return (
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider topInset={60}>
              <Stack.Navigator>
                {isAuthenticated && isUser === "customer" ? (
                  <>
                    {userDataa.userProfileCompleted ? (
                      <Stack.Screen
                        name="CustomerHome"
                        component={CustomerHome}
                        options={{ headerShown: false }}
                      />
                    ) : (
                      <>
                        <Stack.Screen
                          name="onBoarding"
                          component={OnBoardingScreensStacks}
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="CustomerHome"
                          component={CustomerHome}
                          options={{ headerShown: false }}
                        />
                      </>
                    )}
                  </>
                ) : isAuthenticated && isUser === "provider" ? (
                  <Stack.Screen
                    name="ProviderHome"
                    component={ProviderHome}
                    options={{ headerShown: false }}
                  />
                ) : (
                  isAuthenticated &&
                  !isUser && (
                    <Stack.Screen
                      name="loader"
                      component={Loader}
                      options={{ headerShown: false }}
                    />
                  )
                )}
              </Stack.Navigator>
            </OverlayProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </TailwindProvider>
    );
  }
}
