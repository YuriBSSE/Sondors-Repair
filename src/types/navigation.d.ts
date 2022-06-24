// Shared

type RootStackParamList = {
    loader: undefined
    Authentication: undefined;
    CustomerHome: undefined;
    ProviderHome: undefined;
};

type SettingsStackParamList = {
    Settings: undefined;
    UpdatePassword: undefined;
};

// Customer

type CustomerRootTabParamList = {
    JobStack: undefined;
    ProvidersStack: undefined;
    ProfileStack: undefined;
    SettingsStack: undefined;
};

type JobsStackParamList = {
    MyJobs: undefined;
    NewJob: undefined;
    JobChat: Pick<ChatRequest, "externalId">;
    CustomerJobDetailsScreen: {
        jobDetails: JobDetails
    };
};

type ProviderStackParamList = {
    Providers: undefined;
    ProviderDetails: { providerDetails: ProviderDetails };
    JobChat: Pick<ChatRequest, "externalId">;
};

type ProfileStackParamList = {
    Profile: undefined;
    EditBike: { bikeDetails: CustomerBike };
    NewBike: undefined;
};

// Provider

type JobViewParamList = {
    JobView: undefined;
    JobChat: undefined;
}

type ProviderRootTabParamList = {
    ProviderJobsStack: undefined;
    ProviderJobBoardStack: undefined;
    ProviderProfileStack: undefined;
    SettingsStack: undefined;
};

type ProviderProfileStackParamList = {
    ProviderProfile: undefined;
    EditProviderProfile: undefined;
};

type ProviderJobsStackParamList = {
    ProviderJobsScreen: undefined;
    ProviderJobDetailsScreen: {
        headerRightTitle: string | undefined,
        headerLeftTitle: string,
        headerRightOnPress: undefined | ((event: GestureResponderEvent) => void),
        jobDetails: JobDetails,
        uidC: string,
        data: any,
    };
    JobChat: Pick<ChatRequest, "externalId">;
};

type ProviderJobBoardStackParamList = {
    ProviderJobBoardScreen: undefined;
    ProviderJobDetailsScreen: {
        headerLeftTitle: string,
        jobDetails: JobDetails,
        data: any,
        uidC: string
    };
};

type SignInStackParamList = {
    SignIn: undefined;
    SignUp: undefined; 
};

type SignUpStackParamList = {
    SignUp: undefined;
    SignIn: undefined;
    OnboardingOne: undefined;
};

type OnboardingOneParamList = {
    OnboardingTwo: undefined;
    OnboardingOne: undefined;
};

