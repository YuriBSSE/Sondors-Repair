import { useEffect, useState } from "react";
import { Alert, View} from "react-native";
import { useTailwind } from 'tailwind-rn';
import TextInput from "components/common/TextInput";
import { useAtom } from "jotai";
import providerDetailsAtom from 'atoms/providerDetailsAtom';
import providerUpdatedDetailsAtom from "atoms/providerUpdateDetailsAtom"
const InfoForm = () => {
    const tailwind = useTailwind();
    const [providerDetails, setProviderDetails] = useAtom(providerDetailsAtom);
    const [providerUpdatedDetails, setProviderUpdatedDetails] = useAtom(providerUpdatedDetailsAtom);
    const [providerEditedDetail, setProviderEditedDetail] = useState<any>({})
    const [providerAddress, setProviderAddress] = useState<any>({})

    useEffect(() => {
        setProviderEditedDetail(providerDetails)
        const street2 = providerDetails.address.street2.split(',')
        setProviderAddress({
            street1: providerDetails.address.street1,
            city: street2[0],
            state: street2[1],
            zipCode: street2[2] 
        })
    }, [providerDetails])

    useEffect(() => {
        setProviderUpdatedDetails({
            ...providerUpdatedDetails,
            name: providerEditedDetail.name,
            address: {
                street1: providerAddress.street1,
                street2: (providerAddress.city && providerAddress.state && providerAddress.zipCode) ? `${providerAddress.city}, ${providerAddress.state}, ${providerAddress.zipCode}` : "",
            }
        })
    }, [providerEditedDetail, providerAddress, providerDetails])

  return (
    <View>
    <TextInput
         lg placeholder='Shop Name'
        onChangeText={(text) => {
            setProviderEditedDetail({...providerEditedDetail, name: text})
        }}
        value={providerEditedDetail?.name}
    />
    <TextInput
        style={tailwind('mt-3')} lg placeholder='Street Address'
        onChangeText={(text) => setProviderAddress({...providerAddress, street1: text})}
        value={providerAddress.street1}
        
    />
    <View style={{ ...tailwind('mt-3 flex flex-row') }}>
        <TextInput
            style={{ flex: 2, marginRight: 8 }}
            lg placeholder='City'
            onChangeText={(text) => setProviderAddress({...providerAddress, city: text})}
            value={providerAddress?.city}
        />
        <TextInput
            style={{ flex: 1, marginRight: 8 }}
            lg placeholder='State'
            onChangeText={(text) => setProviderAddress({...providerAddress, state: text})}
            value={providerAddress?.state}
        />
        <TextInput
            style={{ flex: 1.5 }}
            lg
            placeholder='Zip Code'
            onChangeText={(text) => setProviderAddress({...providerAddress, zipCode: text})}
            value={providerAddress?.zipCode}
            />
    </View>
</View>
  )
}

export default InfoForm