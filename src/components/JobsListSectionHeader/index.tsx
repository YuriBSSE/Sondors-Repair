import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Text from 'components/common/Text';
import capitalizeFirstLetter from 'utilities/capitalizeFirstLetter';
import Colors from 'styles/Colors';

const statusStyle = (value: string) => {
    switch (capitalizeFirstLetter(value)) {
        case 'Accepted': return {
            backgroundColor: Colors.darkAccent,
            color: Colors.dark
        }
            break;
        case 'Completed': return {
            backgroundColor: Colors.darkAccent,
            color: Colors.dark
        }
            break;
        case 'Lead': return {
            backgroundColor: '#F5F8FF',
            color: Colors.primary
        }
            break;
        case 'Offer Rejected': return {
            backgroundColor: '#FFF5F7',
            color: Colors.errorText
        }
            break;
        default:
            break;
    }
}

const JobsListSectionHeader = ({ title, status, onPress }: { title: string, status: string, onPress: (event: GestureResponderEvent) => void }) => {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity onPress={onPress} style={{borderTopWidth: 1, borderColor: '#EDEDF2'}}>
            <View style={[tailwind('px-5 flex-row justify-between items-center mt-3 mb-3')]}>
                <>
                <Text style={{ color: Colors.dark }} bold lg>{title}</Text>
                <Text
                    bold lg style={[statusStyle(status), { paddingVertical: 4 }, tailwind('px-2 rounded')]}
                    >{capitalizeFirstLetter(status)}
                </Text>
                </>
            </View>
        </TouchableOpacity>
    )
}

export default JobsListSectionHeader;
