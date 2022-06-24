import { atom } from 'jotai';

const providerDetailsAtom = atom({
    id: '1',
    name: 'Provider Name',
    distance: '.5 mi away',
    password: 'password123',
    address: {
        street1: '1234 Santa Monica Blvd',
        street2: 'West Hollywood, CA 90046'
    },
    rating: 5,
    hours: [
        {
            id: '1',
            startDay: 'Monday',
            endDay: 'Friday',
            startHour: '9:00am',
            endHour: '5:00pm'
            
        },
        {
            id: '2',
            startDay: 'Saturday',
            endDay: 'Sunday',
            startHour: '10:00am',
            endHour: '3:00pm'
        }
    ],
    services: [
         'Tune-up', 'General Troubleshooting',
        'Assembly',  'General Troubleshooting',
        'Assembly', 'Tune-up', 'General Troubleshooting',
        'Assembly',  'General Troubleshooting',
    ]
});

export default providerDetailsAtom;