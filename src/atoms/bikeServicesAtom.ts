import { atom } from 'jotai';

const bikeServices = [
    { label: 'Assembly', value: 'Assembly' },
    { label: 'Tune-up', value: 'Tune-up' },
    { label: 'General Troubleshooting', value: 'General Troubleshooting' },
    { label: 'LCD Display Replacement', value: 'LCD Display Replacement' },
    { label: 'Controller Replacement', value: 'Controller Replacement' },
    { label: 'Shifter and Derailleur Adjustment', value: 'Shifter and Derailleur Adjustment' },
    { label: 'Brake Adjustment — Hydraulic', value: 'Brake Adjustment — Hydraulic' },
    { label: 'Brake Adjustment — Mechanical', value: 'Brake Adjustment — Mechanical' },
    { label: 'Flat Repair — Front', value: 'Flat Repair — Front' },
    { label: 'Flat Repair — Rear', value: 'Flat Repair — Rear' }
];

const bikeServicesAtom = atom(bikeServices);

export default bikeServicesAtom;

// { label: 'Assembly', value: 'Assembly' },
// { label: 'Tune-up', value: 'Tune-up' },
// { label: 'General Troubleshooting', value: 'General Troubleshooting' },
// { label: 'LCD Display Replacement', value: 'LCD Display Replacement' },
// { label: 'Controller Replacement', value: 'Controller Replacement' },
// { label: 'Shifter and Derailleur Adjustment', value: 'Shifter and Derailleur Adjustment' },
// { label: 'Brake Adjustment - Hydraulic', value: 'Brake Adjustment - Hydraulic' },
// { label: 'Brake Adjustment - Mechanical', value: 'Brake Adjustment - Mechanical' },
// { label: 'Flat Repair - Front', value: 'Flat Repair - Front' },
// { label: 'Flat Repair - Rear', value: 'Flat Repair - Rear' }