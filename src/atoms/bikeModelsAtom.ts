import { atom } from 'jotai';

const bikeModels = [
    { label: 'Sondors X', value: 'sondors x' },
    { label: 'Sondors XS', value: 'sondors xs' },
    { label: 'Sondors MXS', value: 'sondors mxs' },
    { label: 'Sondors Fold X', value: 'sondors fold x' },
    { label: 'Sondors Fold XS', value: 'sondors fold xs' },
    { label: 'Sondors Smart Step', value: 'sondors smart step' },
    { label: 'Sondors LX', value: 'sondors lx' },
    { label: 'Sondors Cruiser', value: 'sondors cruiser' },
    { label: 'Sondors Rockstar', value: 'sondors rockstar' },
    { label: 'Sondors MadMods Retro', value: 'sondors madmods retro' },
    { label: 'Sondors MadMods Scrambler', value: 'sondors madmods scrambler' },
    { label: 'Sondors MadMods Cafe', value: 'sondors madmods cafe' }
];

const bikeModelsAtom = atom(bikeModels);

export default bikeModelsAtom;
