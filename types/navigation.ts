import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Playlist: undefined;
  Player: { 
    songId: string; 
    songTitle: string; 
    songArtist: string;
    albumCover: string;
  };
};

export type PlaylistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Playlist'>;
export type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Player'>;