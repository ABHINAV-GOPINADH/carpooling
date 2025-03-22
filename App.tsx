import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { registerTranslation, en } from 'react-native-paper-dates';
// Polyfill URL & other browser APIs
import 'react-native-url-polyfill/auto';


registerTranslation('en', en);
 

export default function App() {
    return <PaperProvider>
    <AppNavigator />
  </PaperProvider>;
}
