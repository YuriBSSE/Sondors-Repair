import React, { useEffect } from 'react';
import { AccordionList } from "accordion-collapse-react-native";
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Text from 'components/common/Text';
import Colors from 'styles/Colors';
import { Loader } from 'components/common/Loader';

type Props = {
    list?: any
    loading?: boolean
}

const AccordionListData = [
    {
        id: 1,
        title: 'Getting Started',
        body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
    },
    {
        id: 2,
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
    }
]

export const AccordionHead = (item: any) => {
    const borderBottomApply = item.title !== 'Services' && styles.borderBottom
    return (
        <View style={[styles.AccordionHeadStyle, borderBottomApply]}>
            <Text style={{ color: Colors.dark }} lg left bold defaultColor>{item?.title}</Text>
            <View>
                <Feather name="chevron-down" size={24} color={Colors.tertiaryText} />
            </View>
        </View>
    );
}

export const AccordionBody = (item: any) => {
    const paddingApply = item.title !== 'Services' && { paddingHorizontal: 20, paddingVertical: 12 }
    return (
        <View style={[paddingApply]}>
            {item?.body}
        </View>
    );
}


const Accordion = ({ list, loading }: Props) => {
    return (
        <View>
            <AccordionList
                list={list || AccordionListData}
                header={AccordionHead}
                body={!loading ? AccordionBody : Loader}
                keyExtractor={(item: any) => `${item.id}`}
            />
        </View>
    )
}

export default Accordion

const styles = StyleSheet.create({
    AccordionHeadStyle: {

        paddingVertical: 12,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    borderBottom: {
        borderColor: Colors.border,
        borderBottomWidth: 1,
    }
})