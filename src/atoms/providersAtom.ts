import { atom } from 'jotai';

const initialProviders: Provider[] = [
    {
        id: '1',
        name: 'Provider 1',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    },
    {
        id: '2',
        name: 'Provider 2',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    },
    {
        id: '3',
        name: 'Provider 3',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    },
    {
        id: '4',
        name: 'Provider 4',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    },
    {
        id: '5',
        name: 'Provider 5',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    },
    {
        id: '6',
        name: 'Provider 6',
        address: {
            street1: '1234 Santa Monica Blvd',
            street2: 'West Hollywood, CA 90046'
        },
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
        rating: 5,
        distance: '.5 mi away',
        services: [
            'Assembly', 'Tune-up', 'General Troubleshooting'
        ]
    }
];

const providersAtom = atom(initialProviders);

export default providersAtom;
