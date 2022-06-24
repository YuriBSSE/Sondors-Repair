import { atom } from 'jotai';

const customerDetailsAtom = atom({
    name: 'Customer Name',
    password: 'password123',
    rating: 5,
    bikes: [
        {
            id: '1',
            model: 'Fold XS',
            dateAdded: 'September 1, 2022',
            image: ''
        },
        {
            id: '2',
            model: 'Fold XS',
            dateAdded: 'September 1, 2022',
            image: ''
        }
    ]
});

export default customerDetailsAtom;