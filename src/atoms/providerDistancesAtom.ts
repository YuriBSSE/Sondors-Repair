import { atom } from 'jotai';

const providerDistancesAtom = atom([
    { label: '0', value: 0 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 }
]);

export default providerDistancesAtom;