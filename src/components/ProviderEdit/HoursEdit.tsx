import { View, TouchableOpacity} from "react-native";
import { useTailwind } from 'tailwind-rn';
import { DaysTimePicker } from 'components/CustomDateTimePicker';
import Text from "components/common/Text";
import { useAtom } from "jotai";
import providerDetailsAtom from "atoms/providerDetailsAtom";
import providerUpdatedDetailsAtom from "atoms/providerUpdateDetailsAtom";

useAtom
const HoursEdit = () => {
  const tailwind = useTailwind();
  const [providerDetails, setProviderDetails] = useAtom(providerDetailsAtom);
  const [providerUpdatedDetails, setProviderUpdatedDetails] = useAtom(providerUpdatedDetailsAtom);
  const { hours } = providerDetails

  const getWorkingDays = (data: any) => {
    setProviderUpdatedDetails({...providerUpdatedDetails, hours: [data]})
  }

  
  return (
    <View>
      {hours.map((item, index) => {
        return(
          <DaysTimePicker key={index} setWorkingDaysHours={getWorkingDays} isEdit={true} workingDaysFromDB={item} DaysTimePickerClasses='mt-6' />
        )
      })}
        <TouchableOpacity style={tailwind('mt-3')}>
            <Text left md tertiary title >+ Additional Hours</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HoursEdit