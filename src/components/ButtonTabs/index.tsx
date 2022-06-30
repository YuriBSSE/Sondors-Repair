import { View, StyleSheet } from "react-native"
import Button from 'components/common/Button';
import { useTailwind } from 'tailwind-rn';
import Colors from 'styles/Colors';
import { useState } from "react";

type props = {
    tabList?: Array<any>;
}

const ButtonTabs = ({ tabList, newFunc }: props) => {
    const tailwind = useTailwind();
    const [activeTab, setActiveTab] = useState('All')

    const handelActiveTab = (value: string) => {
        setActiveTab(value)
        newFunc(value)
    }

    return (
        <View style={[tailwind('w-full mt-16'), styles.btnWrapper]}>
            {tabList?.map((item) => {
                return (
                    <Button
                        onPress={() => handelActiveTab(item)}
                        key={item}
                        containerPaddingVoid
                        buttonStyle={[tailwind('h-full'), activeTab === item ? styles.primaryBtnTabStyle : styles.secondaryBtnTabStyle]}
                        sm
                        title={item}
                        titleStyle={{ color: activeTab === item ? '#fff' : Colors.dark }}
                    />
                )
            })}
        </View>
    )
}

export default ButtonTabs

const styles = StyleSheet.create({
    btnWrapper: {
        height: 44,
        backgroundColor: Colors.inputBorder,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    primaryBtnTabStyle: { borderRadius: 6, flex: 1, marginEnd: 4, backgroundColor: Colors.primary },
    secondaryBtnTabStyle: { borderRadius: 6, flex: 1, marginEnd: 4, backgroundColor: Colors.inputBorder, color: Colors.dark },
})