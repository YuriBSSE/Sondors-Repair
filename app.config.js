import 'dotenv/config';

/**
 * This is called by Expo (and by association expo-constants) to determine application configuration.
 * The base configuration is stored in app.json. This function ultimately determines the final
 * configuration, and is passed the `config` property of app.json in order to augment it.
 *
 * config: the `config` property of app.json, passed to this function to be augmented.
 */
export default ({ config }) => {
  return {
    ...config, // do not overwrite app.json configuration
    extra: {
      ...(config.extra || {}), // ... or it's `extra` properties, if any exist
      streamChatApiKey: process.env.STREAM_CHAT_API_KEY || '',
      streamUserId: process.env.STREAM_USER_ID || '',
      streamUserName: process.env.STREAM_USER_NAME || '',
      firebaseConfig: {
        apiKey: process.env.API_KEY || '',
        authDomain: process.env.AUTH_DOMAIN || '',
        databaseURL: process.env.DATABASE_URL || '',
        projectId: process.env.PROJECT_ID || '',
        storageBucket: process.env.STORAGE_BUCKET || '',
        messagingSenderId: process.env.MESSAGING_SENDER_ID || '',
        appId: process.env.APP_ID || '',
        // measurementId:  process.env.MEASUREMENT_ID || '',
      }
    },
  };
};
