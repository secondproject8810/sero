import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './screens/OnboardingScreen';
import SignUpScreen from './screens/SignUpScreen';
import MobileVerificationScreen from './screens/MobileVerificationScreen';
import ProfileDetailsScreen from './screens/ProfileDetailsScreen';
import IAmScreen from './screens/IAmScreen';
import EducationScreen from './screens/EducationScreen';
import ExperiencesScreen from './screens/ExperiencesScreen';
import InterestsScreen from './screens/InterestsScreen';
import SearchFriendsScreen from './screens/SearchFriendsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HomeFeedScreen from './screens/HomeFeedScreen';
import SwipeCardScreen from './screens/SwipeCardScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventsScreen from './screens/EventsScreen';
import JobFilterScreen from './screens/JobFilterScreen';
import FreelancerFilterScreen from './screens/FreelancerFilterScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 200,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            };
          },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MobileVerification" component={MobileVerificationScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="IAm" component={IAmScreen} />
        <Stack.Screen name="Education" component={EducationScreen} />
        <Stack.Screen name="Experiences" component={ExperiencesScreen} />
        <Stack.Screen name="Interests" component={InterestsScreen} />
        <Stack.Screen name="SearchFriends" component={SearchFriendsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="HomeFeed" component={HomeFeedScreen} />
        <Stack.Screen name="SwipeCard" component={SwipeCardScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="JobFilter" component={JobFilterScreen} />
        <Stack.Screen name="FreelancerFilter" component={FreelancerFilterScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}