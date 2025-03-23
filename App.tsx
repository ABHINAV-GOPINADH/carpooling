import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import 'react-native-gesture-handler';
import { Provider as PaperProvider,MD3LightTheme  } from 'react-native-paper';
import { registerTranslation, en, } from 'react-native-paper-dates';
// Polyfill URL & other browser APIs
import 'react-native-url-polyfill/auto';



const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#28a745',
    onPrimary: '#ffffff',
    surfaceVariant: '#e0f7e9',
    secondary: '#66bb6a',
    onSecondary: '#ffffff',
  },
};

registerTranslation('en', en);
 

export default function App() {
    return <PaperProvider  theme={theme}>
    <AppNavigator />
  </PaperProvider>;
}
