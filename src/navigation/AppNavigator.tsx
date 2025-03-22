// AppNavigation.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/login/SplashScreen";
import SignInSignUpScreen from "../screens/login/SignInSignUpScreen";
import PersonalDetailsScreen from "../screens/login/PersonalDetailsScreen";
import SignUpScreen from "../screens/login/SignUpScreen";
import SignInScreen from "../screens/login/SignInScreen";
import WelcomeScreen from "../screens/login/WelcomeScreen";
import RegisterScreen from "../screens/login/RegisterScreen";
import LoginScreen from "../screens/login/LoginScreen";

// Search Ride part
import HomeScreen from "../screens/search_ride/HomeScreen"; 
import SelectLocationScreen from "../screens/search_ride/BookRide/SelectLocationScreen";
import SelectStationScreen from "../screens/search_ride/BookRide/SelectStationScreen";
import RideRequestSentScreen from "../screens/search_ride/BookRide/RideRequestSentScreen";
import AvailableRidesScreen from "../screens/search_ride/BookRide/AvailableRidesScreen";
import WaitingScreen from "../screens/search_ride/BookRide/WaitingScreen";
import SelectDateScreen from "../screens/search_ride/BookRide/SelectDateScreen";
import SelectSeatsScreen from "../screens/search_ride/BookRide/SelectSeatsScreen";
 
 // Profile & Settings
 import ProfileSettingsScreen from '../screens/profile/ProfileSettingsScreen';

import ProfileSummaryScreen from "../screens/profile/ProfileSummaryScreen";
import ChangeNumberScreen from "../screens/profile/ChangeNumberScreen";
import PublishRideScreen from "../screens/publish_ride/PublishRideScreen";
// import OtpVerificationScreen from "../screens/profile/OtpVerificationScreen";

export type RootStackParamList = {
  Splash: undefined;
  SignInSignUp: undefined;
  PersonalDetails: undefined;
  SignUp?: { name?: string; gender?: string } | undefined;
  SignIn: undefined;
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  // Book Ride Flow
  SelectLocation: undefined;
  SelectStation: undefined;
  SelectDate: undefined;
  SelectSeats: undefined;
  AvailableRides: undefined;
  Waiting: undefined;
  RequestSent: undefined;
  PublishRide: undefined; 

  
  // Profile Flow
  ProfileSummary: undefined;
  ChangeNumber: undefined;
  ProfileSettings: undefined;
  OtpVerification: { phoneNumber: string };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignInSignUp" component={SignInSignUpScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} /> 

         {/* Profile */}
        <Stack.Screen name="ProfileSummary" component={ProfileSummaryScreen} options={{ title: "My Profile" }} />
        <Stack.Screen name="ChangeNumber" component={ChangeNumberScreen} options={{ title: "Change Phone Number" }} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />

        {/* <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ title: "OTP Verification" }} /> */}



      {/* Publish a Ride section */}
      <Stack.Screen name="PublishRide" component={PublishRideScreen} options={{ title: "Publish Ride" }} />


        {/* Book a ride flow */}
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="SelectStation" component={SelectStationScreen} />
        <Stack.Screen name="SelectDate" component={SelectDateScreen} />
        <Stack.Screen name="SelectSeats" component={SelectSeatsScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="AvailableRides" component={AvailableRidesScreen} />
        <Stack.Screen name="RequestSent" component={RideRequestSentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
