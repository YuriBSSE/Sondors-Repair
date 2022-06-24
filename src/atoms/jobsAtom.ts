import { atom } from 'jotai';

const initialJobs: Job[] = [];

const jobsAtom = atom(initialJobs);

export default jobsAtom;
