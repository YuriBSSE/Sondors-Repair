import Constants from 'expo-constants';
import { atom } from 'jotai';
const { streamUserId } = Constants.manifest!.extra!;

const isCustomerAtom = atom(streamUserId === 'customer');

export default isCustomerAtom;