import { View } from 'react-native'
import Colors from 'styles/Colors'

type props = {
    style?: Object
}

const Divider = ({style}: props) => {
  return (
    <View style={{...style, backgroundColor: Colors.border, width: 24, height: 1}} />
  )
}

export default Divider
