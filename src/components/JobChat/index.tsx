import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, Chat, MessageInput, MessageList, useAttachmentPickerContext, Theme, DeepPartial, OverlayProvider } from 'stream-chat-expo';
import { useAtom } from 'jotai';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn';
import HeaderLeft from 'components/HeaderLeft';
import HeaderRight from 'components/HeaderRight';

import streamClientAtom from 'atoms/streamClientAtom';
import Colors from 'styles/Colors';

const theme: DeepPartial<Theme> = {
    messageInput: {
        attachButton: {
            display: 'none'
        },
        attachButtonContainer: {
            display: 'none'
        },
        inputBoxContainer: {
            borderRadius: 2,
            backgroundColor: Colors.accent,
            paddingVertical: 6,
        },
        inputBox: {
            color: Colors.dark,

        },

        commandsButtonContainer: {
            display: 'none'
        },
    },
    messageSimple: {
        avatarWrapper: {
            container: {
                display: 'none'
            }
        },
        content: {
            container: {
                borderRadius: 0,
            },
            containerInner: {
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
            },

        }
    },
    channelPreview: {
        date: {
            display: 'none'
        },
    },
    dateHeader: {
        container: {
            display: 'none'
        }
    },
    inlineDateSeparator: {
        container: {
            display: 'none'
        }
    }
}

type Props = {
    route: RouteProp<JobsStackParamList, 'JobChat'>;
    navigation: NavigationProp<JobsStackParamList, 'JobChat'>;
}

const JobChat = ({ route, navigation }: Props) => {
    const tailwind = useTailwind();
    const [streamClient] = useAtom(streamClientAtom);
    const [channel, setChannel] = useState<ChannelType | false>();

    useEffect(() => {
        const getChannels = async () => {
            const channels = await streamClient.queryChannels({ id: route.params.externalId  }, [], { watch: false });
            setChannel(channels.shift() || false);
        };
        getChannels().catch(console.log)
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft isBack isRoot onPress={() => navigation.goBack()} title={streamClient?.user?.name || "User"} />,
            headerRight: () => <HeaderRight title={'View Job'} />,
        });
    }, []);

    // sets the OverlayProvider's bottomInset value for the Attachment Picker
    const tabBarHeight = useBottomTabBarHeight();
    const { setBottomInset } = useAttachmentPickerContext();
    useEffect(() => {
        setBottomInset(tabBarHeight);
    }, [tabBarHeight]);

    if (channel === false) return (
        <View style={tailwind('flex')}>
            <Text>We couldn't find that one. 🤷</Text>
        </View>
    );


    return (
        <OverlayProvider value={{ style: theme }}>
            <View style={tailwind('flex')}>
                <Chat client={streamClient}>
                    {channel ? (
                        <Channel channel={channel} AttachButton={() => null} Attachment={() => null} InputButtons={() => null}  >
                            <>
                                <MessageList />
                                <MessageInput additionalTextInputProps={{
                                    placeholder: 'Type here...',
                                    placeholderTextColor: Colors.dark
                                }} />
                            </>
                        </Channel>
                    ) : (
                        <View style={tailwind('flex')}>
                            <Text>Loading...</Text>
                        </View>
                    )}
                </Chat>
            </View>
        </OverlayProvider>
    );
};

export default JobChat;

const styles = StyleSheet.create({
    CustomMessageInputContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})