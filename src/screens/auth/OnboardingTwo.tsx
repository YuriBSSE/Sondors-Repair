import Text from "components/common/Text"
import { View, SafeAreaView, StyleSheet, FlatList, NativeModules, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';
import Button from "components/common/Button";
import Colors from "styles/Colors";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getFirestore } from "firebase/firestore";


const dummyData = [
    {
        title: 'Assembly'
    },
    {
        title: 'Tune-up'
    },
    {
        title: 'General Troubleshooting'
    },
    {
        title: 'LCD Display Replacement'
    },
    {
        title: 'Controller Replacement'
    },
    {
        title: 'Shifter and Derailleur Adjustment'
    },
    {
        title: 'Brake Adjustment — Hydraulic'
    },
    {
        title: 'Brake Adjustment — Mechanical'
    },
    {
        title: 'Flat Repair — Front'
    },
    {
        title: 'Flat Repair — Rear'
    },
 
]


const ListItem = ({ item, services, handleService }: { item: any, services?: any, handleService?: (v?: string) => void }) => {

    return (
        <TouchableOpacity onPress={() => handleService && handleService(item.title)}>
            <View style={styles.ListItemStyle}>
                <AntDesign style={{ marginTop: 5, marginEnd: 12 }} name="check" size={20} color={services && services.includes(item.title) ? Colors.primary : Colors.placeholderText} />
                <Text
                    left lg
                    style={{ color: Colors.dark }}
                >
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function OnboardingTwo() {
    const auth = getAuth();
    const db = getFirestore();

    const tailwind = useTailwind()
    const [services, setServices] = useState<any>([])

    const handleService = (v?: string) => {
        if (!services.includes(v)) setServices([...services, v])
        if (services.includes(v)) {
            const removeService = services.filter((s: string) => s !== v)
            setServices(removeService)
        }
    }

    const onFinish = async () => {
        if(!services.length) return Alert.alert('Select at least one service ')
        const { currentUser } = auth
        await updateDoc(doc(db, "users", `${currentUser?.uid}`), {
            isShop: true,
            services
        }).then(() => {
            NativeModules.DevSettings.reload()
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, ...tailwind('mt-16') }}>
            <Text
                style={styles.servicesText}
                title>What services do you offer at your shop?
            </Text>
            <View style={{ ...tailwind(''), flex: 4.5 }}>
                <FlatList
                    data={dummyData}
                    renderItem={({ item }) => <ListItem handleService={handleService} services={services} item={item} />}
                />
            </View>
            <View style={styles.finishBtnWrapper}>
                <Button
                    onPress={onFinish}
                    style={tailwind('mt-3 rounded')}
                    titleStyle={{ fontWeight: '700' }}
                    lg
                    title='Finish'
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    servicesText: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 38,
        flex: 1
    },
    finishBtnWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        display: 'flex',
        justifyContent: 'center'
    },
    ListItemStyle: {
        height: 48,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})