import { atom } from 'jotai';
import { StreamChat, Channel as ChannelType } from 'stream-chat';
import Constants from 'expo-constants';

const { streamChatApiKey } = Constants.manifest!.extra!;

const streamClient = StreamChat.getInstance(streamChatApiKey);
console.log(streamChatApiKey, "streamClient=================================================")

const streamClientAtom = atom(streamClient);

export default streamClientAtom;
