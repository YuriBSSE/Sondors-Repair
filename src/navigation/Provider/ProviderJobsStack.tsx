import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import ProviderJobsScreen from 'screens/provider/ProviderJobsStack/ProviderJobsScreen';
import JobDetails from 'screens/provider/ProviderJobsStack/ProviderJobDetailsScreen';
import HeaderLeft from 'components/HeaderLeft';
import JobChat from 'components/JobChat';
import Colors from 'styles/Colors';

type Props = StackScreenProps<ProviderJobsStackParamList, 'ProviderJobsScreen'>;
const ProviderJobs = createStackNavigator<ProviderJobsStackParamList>();

const ProviderJobsStack = ({ navigation }: Props) => (
    <ProviderJobs.Navigator>
        <ProviderJobs.Screen name="ProviderJobsScreen" component={ProviderJobsScreen} options={{
            title: 'My Jobs',
            headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTintColor: Colors.dark,            
        }} />
        <ProviderJobs.Screen name="ProviderJobDetailsScreen" component={JobDetails} options={{
            headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title="Job Details" />,
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false                
        }} />
        <ProviderJobs.Screen name="JobChat" component={JobChat} options={{
            headerLeft: () => <HeaderLeft onPress={() => navigation.popToTop()} title="" />,
            headerTitle: "",
            headerShadowVisible: false
        }} />
    </ProviderJobs.Navigator>
);

export default ProviderJobsStack;
