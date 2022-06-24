# sondors-repair

The SONDORS Repair mobile application for both customers and service providers. Built with:

- [x] React Native
- [x] [Expo](https://expo.dev)
- [ ] [Hasura](https://hasura.io) (via [react-query](https://react-query.tanstack.com/))
- [ ] [Auth0](https://auth0.com)
- [ ] [Stream](https://getstream.io/)
- [x] [Tailwind](https://tailwindcss.com/)
- [x] other cool [dependencies](/package.json)

## Getting Started

Start with installing Expo's dependencies, if you don't have them already:

- Node.js LTS
- Git
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall)
- [Yarn Classic](https://classic.yarnpkg.com/lang/en/docs/install/)

Then install Expo:

```bash
$ yarn global add expo-cli
```

If you're a speed demon, you should be able to just install dependencies and start the Expo development server:

```bash
$ cd sondors-repair
$ yarn
$ expo start
```

> This will allow you to use the Expo Go client. If you're having trouble connecting to your development server from your mobile device, this is likely because they are not on the same Wi-Fi; in any case, you can use `expo start --tunnel` instead to connect through the internet instead of a local network.

For more information on using Expo, please refer to [its documentation](https://docs.expo.dev/) or ask a team member.

