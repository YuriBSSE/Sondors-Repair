import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import Rating from 'components/Rating';

import ServiceLabel from 'components/common/ServiceLabel';
import Text from 'components/common/Text';
import { useTailwind } from 'tailwind-rn/dist';

type Props = {
    provider: Provider;
    onPress: (event: GestureResponderEvent) => void;
}

const ProviderSearchListItem = ({ provider, onPress }: Props) => {
    const { name, address, rating, distance, services } = provider;
    const tailwind = useTailwind();
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={tailwind('p-5 flex-col')}>
                <View style={tailwind('justify-between flex-row')}>
                    <Text bold left>{name}</Text>
                    <Rating disabled starSize={14} ml={2} isCount={false} isLabel={false} defaultRating={rating} />
                </View>
                <View style={tailwind('justify-between flex-row mt-2')}>
                    <View />
                    <Text tertiary right>{distance}</Text>
                </View>
                <View style={tailwind('mt-2')}>
                    <Text tertiary left>{address.street1}</Text>
                </View>
                <View style={[tailwind('mt-2'), {display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}]}>
                    {services.map((service: string) => <ServiceLabel key={service} title={service} />)}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ProviderSearchListItem;
