## iOS

To run the iOS app:

```$ cd jukebox-react-native```

Open ios/JukeboxReactNative.xcodeproj and hit run in Xcode.

Hit ⌘-R in your iOS simulator to reload the app and see your change!

## Android

Follow the setup instructions [here](https://facebook.github.io/react-native/docs/android-setup.html#content)

```$ cd jukebox-react-native```

```$ react-native run-android```

Press the menu button (F2 by default, or ⌘-M in Genymotion) and select Reload JS to see your change!

Run adb logcat *:S ReactNative:V ReactNativeJS:V in a terminal to see your app's logs

## Settings

You may need to change `jsCodeLocation` in `AppDelegate` to point to your IP

Also change localhost to your IP in `node_modules/react-native/Libraries/WebSocket/RCTWebSocketExecutor.m`

Debugging: http://localhost:8081/debugger-ui

## Setup

Run ```npm install``` within root folder to install all node dependancies
