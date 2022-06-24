import { atom } from 'jotai';

const initialJobs: Job[] = [];

const providerJobsAtom = atom(initialJobs);

export default providerJobsAtom;