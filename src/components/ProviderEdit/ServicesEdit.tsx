import Text from "components/common/Text"
import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Colors from "styles/Colors";

import { useAtom } from "jotai";
import providerDetailsAtom from 'atoms/providerDetailsAtom';
import providerUpdatedDetailsAtom from "atoms/providerUpdateDetailsAtom";

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

const ServicesEdit = () => {
    const [providerDetails] = useAtom(providerDetailsAtom);
    const [providerUpdatedDetails, setProviderUpdatedDetails] = useAtom(providerUpdatedDetailsAtom);
    const { services: servicesFromDB } = providerDetails

    const [services, setServices] = useState<any>([])

    const handleService = (v?: string) => {
        if (!services.includes(v)) setServices([...services, v])
        if (services.includes(v)) {
            const removeService = services.filter((s: string) => s !== v)
            setServices(removeService)
        }
    }

    useEffect(() => {
        setServices(servicesFromDB)
    }, [providerDetails])
  
    useEffect(() => {
        setProviderUpdatedDetails({...providerUpdatedDetails, services})
    }, [services])



    return (
        <FlatList
            data={dummyData}
            renderItem={({ item }) => <ListItem handleService={handleService} services={services} item={item} />}
        />
    )
}

export default ServicesEdit

const styles = StyleSheet.create({
    ListItemStyle: {
        height: 48,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})