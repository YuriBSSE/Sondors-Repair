import { TouchableOpacity, View,StyleSheet } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import moment from 'moment';
import { useAtom } from 'jotai';
import currentUserDataAtom from 'atoms/currentUserDataAtom';
import Text from 'components/common/Text';

const ChatListItem = ({ title, subtitle, createAt, onPress }: { onPress: () => any, title: string, subtitle: string, createAt: string }) => {
    const tailwind = useTailwind();
    const [currentUserData] = useAtom(currentUserDataAtom);

    return (
        <View style={tailwind('px-5  pb-3 mt-1')}>
            {currentUserData.userType == "provider" ? 
            <>
                <TouchableOpacity onPress={onPress}>
                    <View style={tailwind('flex-row justify-between mt-1')}>
                        <Text sm left heavy>{title}</Text>
                        <Text sm tertiary>{moment(createAt).fromNow()}</Text>
                    </View>
                    <Text sm left tertiary style={tailwind('mt-1')}>{subtitle}</Text> 
                </TouchableOpacity>
            </> :
            <>
                <View style={tailwind('flex-row justify-between mt-1')}>
                    <Text sm left heavy>{title}</Text>
                    <Text sm tertiary>{moment(createAt).fromNow()}</Text>
                </View>
                <Text sm left tertiary style={tailwind('mt-1')}>{subtitle}</Text> 
            </>
            }
            {currentUserData.userType !== "provider" && <View style={styles.btnCont}>
                <TouchableOpacity onPress={onPress} style={styles.acceptBtn}>
                    <Text style={{color:"white"}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                    <Text style={{color:"white"}}>Reject</Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
}

export default ChatListItem;
        // <TouchableOpacity style={tailwind('px-5  pb-3 mt-1')} onPress={onPress}>
        //     <View style={tailwind('flex-row justify-between mt-1')}>
        //         <Text sm left heavy>{title}</Text>
        //         <Text sm tertiary>{moment(createAt).fromNow()}</Text>
        //     </View>
        //     <Text sm left tertiary style={tailwind('mt-1')}>{subtitle}</Text>
        // </TouchableOpacity>

const styles = StyleSheet.create({
    btnCont:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:'1.5%'
    },
    acceptBtn:{
        backgroundColor:"green",
        width:"45%",
        padding:"1.5%",
        borderRadius:5
    },
    rejectBtn:{
        backgroundColor:"red",
        width:"45%",
        padding:"1.5%",
        borderRadius:5
    }
})
