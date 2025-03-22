import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import SignInSignUpScreen from "../screens/SignInSignUpScreen";
import PersonalDetailsScreen from "../screens/PersonalDetailsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import PublishRideScreen from "../screens/publish_ride/PublishRideScreen";
import FindRideScreen from "../screens/search_ride/SearchScreen";
import HomeScreen from "../screens/HomeScreen";

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
  // FindRide: undefined;
  PublishRide: undefined;
  // Search: undefined;
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PublishRide" component={PublishRideScreen} />
        {/* <Stack.Screen name="FindRide" component={FindRideScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
