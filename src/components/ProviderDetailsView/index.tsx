import { useTailwind } from 'tailwind-rn';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Rating from 'components/Rating';
import Colors from 'styles/Colors';
import moment from 'moment'

import Text from 'components/common/Text';
import ServiceLabel from 'components/common/ServiceLabel';

const ProviderDetailsView = ({ providerDetails }: { providerDetails: Provider }) => {
    const tailwind = useTailwind()
    console.log(providerDetails,"providerDetails")
    const totalRatting = providerDetails.rating / providerDetails.totalJobs 
    return (
        <View style={tailwind('flex flex-col px-6')}>
            <View style={tailwind('mt-4')}>
                <Rating disabled={true} defaultRating={totalRatting || 0} />
                <Text left sm tertiary style={tailwind('mt-1')}>Member since September 2022</Text>
            </View>
            <View style={{...tailwind('mt-3'), maxHeight: 232}}>
                <Text left bold sm tertiary>Services Provided</Text>
                <ScrollView contentContainerStyle={{...tailwind('flex-row mt-1 pb-3'), flexWrap: 'wrap'}}>
                    {providerDetails.services.map((service: string) => (
                        <ServiceLabel key={service} title={service} />
                        ))}
                </ScrollView>
            </View>
            <View style={tailwind('mt-8')}>
                <Text left bold sm tertiary>Address</Text>
                <Text left>{providerDetails.address.street1}</Text>
                <Text left>{providerDetails.address.street2}</Text>
            </View>
            <View style={tailwind('mt-6')}>
                <Text left bold sm tertiary>Hours</Text>
                {providerDetails.hours.map((item: Hour) => 
              { 
                  return  (
                    <Text left style={[tailwind('mt-2'), {textTransform: 'capitalize'}]}>{`${item.startDay} -- ${item.endDay}: ${moment(item.startHour).format('LT')} - ${moment(item.endHour).format('LT')}`}</Text>
                )
            }
                )}
            </View>
        </View>
    );
}

export default ProviderDetailsView;
