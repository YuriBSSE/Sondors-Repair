import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from 'components/common/Text';
import { useTailwind } from 'tailwind-rn';
import Colors from 'styles/Colors';

const ServiceLabel = ({ title }: { title: string }) => {
    const tailwind = useTailwind();

    return (
        <View style={styles.tagStyle}>
            <Text sm bold tertiary>{title}</Text>
        </View>
    )
}

export default ServiceLabel;


const styles = StyleSheet.create({
    tagStyle: {
        borderColor: Colors.primary,
        borderWidth: 1,
        marginLeft: 4,
        height: 24,
        minWidth: 87,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#F5F8FF',
        paddingHorizontal: 12,
        marginTop: 12
    }
})