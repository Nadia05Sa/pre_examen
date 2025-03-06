import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PlaylistScreen from '../screens/PlaylistScreen';
import PlayerScreen from '../screens/PlayerScreen';

type PlayerScreenRouteParams = {
  songTitle: string;
  songArtist: string;
  albumCover: string;
};

type RootStackParamList = {
  Playlist: undefined;
  Player: PlayerScreenRouteParams;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    id={undefined}
    screenOptions={{ 
      headerStyle: { backgroundColor: '#181818' }, 
      headerTintColor: 'white' 
    }}
  >
    <Stack.Screen 
      name="Playlist" 
      component={PlaylistScreen} 
      options={{ title: 'Mi Playlist', headerTitleAlign: 'center' }} 
    />
    
    <Stack.Screen
      name="Player" 
      component={PlayerScreen} 
      options={({ route }: { route: RouteProp<RootStackParamList, 'Player'> }) => ({
        title: route.params?.songTitle || 'Reproduciendo...',
        headerTitleAlign: 'center',
      })}
    />
  </Stack.Navigator>
);

export default AppNavigator;
