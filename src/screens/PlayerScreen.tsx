import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Text, Icon } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { RootStackParamList, PlayerScreenNavigationProp } from '../../types/navigation';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

type Props = {
  route: PlayerScreenRouteProp;
  navigation: PlayerScreenNavigationProp;
};

const PlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { songTitle, songArtist, albumCover, songId } = route.params;  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [likedSongs, setLikedSongs] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + 0.01;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleLike = (id: string) => {
    setLikedSongs(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const item = {
    id: songId,
    liked: likedSongs[songId] || false,
  };

  return (
    <View style={styles.container}>
      <View style={styles.albumArtContainer}>
        <Icon 
          name="music" 
          type="font-awesome" 
          size={200} 
          color="#1DB954" 
          style={styles.albumArt} 
        />
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{songTitle}</Text>
        <Text style={styles.songArtist}>{songArtist}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          value={progress}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#1DB954"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {Math.floor(progress * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => navigation.push('Player', {
            songId: songId, 
            songTitle: songTitle,
            songArtist: songArtist,
            albumCover: albumCover
          })}>
          <Icon 
            name="step-backward" 
            type="font-awesome" 
            size={40} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={togglePlay}>
          <Icon 
            name={isPlaying ? "pause" : "play"} 
            type="font-awesome" 
            size={60} 
            color="#1DB954" 
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push('Player', {
            songId: songId, 
            songTitle: songTitle,
            songArtist: songArtist,
            albumCover: albumCover
          })}>
          <Icon 
            name="step-forward" 
            type="font-awesome" 
            size={40} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Icon 
            name={item.liked ? 'heart' : 'heart-o'} 
            type='font-awesome' 
            color={item.liked ? 'red' : 'gray'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.lyricsContainer}>
        <Icon 
          name="book" 
          type="font-awesome" 
          size={30} 
          color="white" 
        />
        <Text style={styles.lyricsText}>Ver Letra</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumArtContainer: {
    marginBottom: 20,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  songArtist: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  sliderContainer: {
    width: '80%',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  lyricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  lyricsText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PlayerScreen;
