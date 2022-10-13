type JobDetails = {
    jobStatus: number;
    uid: string | undefined | null
    id: string | undefined
    title: string;
    createdAt: string;
    streamChatId: string | undefined | null;
    description: string;
    type: string;
    bikeModel: string;
    imageUrl: string | undefined | null;
};

type ChatRequest = {
    title: string;
    externalId: string | undefined | null;
    subtitle: string;
    createAt: string;
};

type Job = {
    jobId: string,
    uuid: string,
    title: string;
    status: string;
    jobDetails: JobDetails;
    data: ChatRequest[];
};

type Address = {
    street1: string;
    street2: string;
};

type Hour = {
    id: string;
    startDay: string;
    endDay: string;
    startHour: string;
    endHour: string;
};

type Provider = {
    id: string;
    name: string;
    address: Address;
    hours: Hour[];
    rating: number;
    distance: string;
    services: string[];
};

type CustomerBike = {
    id: string;
    model: string;
    dateAdded: string;
    image: string;
};

type CustomerDetails = {
    name: string;
    rating: number;
    bikes: CustomerBike[];
};