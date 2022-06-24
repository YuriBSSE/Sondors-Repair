import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import JobChat from 'components/JobChat'
import Jobs from 'screens/customer/CustomerJobStack/Jobs';
import NewJob from 'screens/customer/CustomerJobStack/NewJob';
import CustomerJobDetailsScreen from 'screens/customer/CustomerJobStack/CustomerJobDetailsScreen';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';

type Props = StackScreenProps<JobsStackParamList, 'MyJobs'>;
const JobsStack = createStackNavigator<JobsStackParamList>();

const JobStack = ({ navigation }: Props) => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen name="MyJobs" component={Jobs} options={{
                headerTitle: "",
                headerLeft: () => <HeaderLeft isRoot title="My Jobs" />,
                headerRight: () => <HeaderRight onPress={() => navigation.navigate('NewJob')} title="Create new" />,
                headerShadowVisible: false
            }} />
            <JobsStack.Screen name="NewJob" component={NewJob} options={{
                headerLeft: () => <HeaderLeft title="Create a job" isModal={true} />,
                headerRight: () => <HeaderRight onPress={() => navigation.goBack()} title="Cancel" />,
                headerShown: true,
                headerTitle: "",
                presentation: 'modal',
                headerShadowVisible: false                
            }} />
            <JobsStack.Screen name="CustomerJobDetailsScreen" component={CustomerJobDetailsScreen} options={{
                headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} title="My Jobs" />,
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false
            }} />
            <JobsStack.Screen name="JobChat" component={JobChat} options={{
                headerLeft: () => <HeaderLeft onPress={() => navigation.popToTop()} title="" />,
                headerTitle: "",
                headerShadowVisible: false
            }} />
        </JobsStack.Navigator>
    );
};

export default JobStack;
