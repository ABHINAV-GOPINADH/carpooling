// src/navigation/AppNavigator.tsx
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
import HomeScreen from "../screens/search_ride/HomeScreen";
import SelectLocationScreen from "../screens/search_ride/BookRide/SelectLocationScreen";
import SelectStationScreen from "../screens/search_ride/BookRide/SelectStationScreen";
import RideRequestSentScreen from "../screens/search_ride/BookRide/RideRequestSentScreen";
import AvailableRidesScreen from "../screens/search_ride/BookRide/AvailableRidesScreen";
import WaitingScreen from "../screens/search_ride/BookRide/WaitingScreen";
import SelectDateScreen from "../screens/search_ride/BookRide/SelectDateScreen";
import SelectSeatsScreen from "../screens/search_ride/BookRide/SelectSeatsScreen";
import ProfileSettingsScreen from "../screens/profile/ProfileSettingsScreen";
import ProfileSummaryScreen from "../screens/profile/ProfileSummaryScreen";
import ChangeNumberScreen from "../screens/profile/ChangeNumberScreen";
import PublishRideScreen from "../screens/publish_ride/PublishRideScreen";
import PublishRideVehicleScreen from "../screens/publish_ride/PublishRideVehicleScreen";
import PublishRideLocationScreen from "../screens/publish_ride/PublishRideLocationScreen";
import PublishRideStopsScreen from "../screens/publish_ride/PublishRideStopsScreen";
import PublishRidePricesScreen from "../screens/publish_ride/PublishRidePricesScreen";
import PublishRideDateTimeScreen from "../screens/publish_ride/PublishRideDateTimeScreen";
import PublishRideSeatsScreen from "../screens/publish_ride/PublishRideSeatsScreen";
import PublishRideSummaryScreen from "../screens/publish_ride/PublishRideSummaryScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";
import PaymentConfirmationScreen from "../screens/payment/PaymentConfirmationScreen";
import RatingScreen from "../screens/payment/RatingScreen";
import RideDetailScreen from "../screens/search_ride/BookRide/RideDetailScreen";
import RideStatusScreen from "../screens/search_ride/BookRide/RideStatusScreen";
import RideRequestsScreen from "../screens/publish_ride/RideRequestsScreen";
// import OtpVerificationScreen from "../screens/profile/OtpVerificationScreen";


export type RootStackParamList = {
  // Existing routes...
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
  // Publish a Ride Flow
  PublishRideVehicle: undefined;
  PublishRideLocation: undefined;
  PublishRideStops: undefined;
  PublishRidePrices: undefined;
  PublishRideDateTime: undefined;
  PublishRideSeats: undefined;
  PublishRideSummary: undefined;

  // Payment Flow
  Payment: undefined;
  PaymentConfirmation: undefined;
  Rating: undefined;

  // Ride Details Screen (if needed)
  RideDetail: { 
    ride: {
      id: string;
      name: string;
      rating: string;
      time: string;
      location: string;
      destination: string;
      vehicle: string;
      price: string;
    }
  };

  // New Screens for Request Management
  RideRequests: undefined; // For the publisher viewing incoming requests
  RideStatus: { requestStatus: string }; // For the customer to view request status
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
        <Stack.Screen name="RideStatus" component={RideStatusScreen} options={{ title: "Request Status" }} />


        {/* Publish Ride Flow Screens */}

        <Stack.Screen name="RideRequests" component={RideRequestsScreen} options={{ title: "Ride Requests" }} />

        <Stack.Screen
          name="PublishRideVehicle"
          component={PublishRideVehicleScreen}
          options={{ title: "Publish Ride - Vehicle" }}
        />
        <Stack.Screen
          name="PublishRideLocation"
          component={PublishRideLocationScreen}
          options={{ title: "Publish Ride - Location" }}
        />
        <Stack.Screen
          name="PublishRideStops"
          component={PublishRideStopsScreen}
          options={{ title: "Publish Ride - Stops" }}
        />
        <Stack.Screen
          name="PublishRidePrices"
          component={PublishRidePricesScreen}
          options={{ title: "Publish Ride - Prices" }}
        />
        <Stack.Screen
          name="PublishRideDateTime"
          component={PublishRideDateTimeScreen}
          options={{ title: "Publish Ride - Date & Time" }}
        />
        <Stack.Screen
          name="PublishRideSeats"
          component={PublishRideSeatsScreen}
          options={{ title: "Publish Ride - Seats" }}
        />
        <Stack.Screen
          name="PublishRideSummary"
          component={PublishRideSummaryScreen}
          options={{ title: "Publish Ride - Summary" }}
        />

        {/* Payment */}
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Rating" component={RatingScreen} options={{ headerShown: false }} />

        {/* New Ride Detail Screen */}
        <Stack.Screen
          name="RideDetail"
          component={RideDetailScreen}
          options={{ title: "Ride Details" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
