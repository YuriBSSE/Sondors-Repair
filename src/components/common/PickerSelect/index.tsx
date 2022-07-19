import { TextStyle,View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from 'styles/Colors';
import { useTailwind } from 'tailwind-rn';
import PickerSelectProps from 'types/pickerSelectProps';

/**
 * This function represents the PickerSelect component used throughout the app.
 * @param props
 */
const PickerSelect = ({
    // TextInput styles
    style,
    // PickerSelect props
    onValueChange,
    items,
    placeholder,
    value    
}: PickerSelectProps) => {
    const tailwind = useTailwind();
    const pickerStyle: TextStyle = tailwind('border py-3 px-2 rounded-sm');
    return (
        <View style={{borderRadius: 5, borderWidth: 0.5, borderColor: '#f0f0f0' }} >
        <RNPickerSelect
            onValueChange={onValueChange}
            items={items}
            value={value}
            placeholder={{ label: placeholder }}
            style={{ inputIOS: pickerStyle, inputIOSContainer: style, placeholder: { color: Colors.placeholderText }, inputAndroid:{color: '000'}}}
        />
        </View>
    );
}

export default PickerSelect;
