import { atom } from 'jotai';

const bikeServices = [
    { label: 'Assembly', value: 'assembly' },
    { label: 'Tune-up', value: 'tune-up' },
    { label: 'General Troubleshooting', value: 'general troubleshooting' },
    { label: 'LCD Display Replacement', value: 'lcd display replacement' },
    { label: 'Controller Replacement', value: 'controller replacement' },
    { label: 'Shifter and Derailleur Adjustment', value: 'shifter and derailleur adjustment' },
    { label: 'Brake Adjustment - Hydraulic', value: 'brake adjustment - hydraulic' },
    { label: 'Brake Adjustment - Mechanical', value: 'brake adjustment - mechanical' },
    { label: 'Flat Repair - Front', value: 'flat repair - front' },
    { label: 'Flat Repair - Rear', value: 'flat repair - rear' }
];

const bikeServicesAtom = atom(bikeServices);

export default bikeServicesAtom;
