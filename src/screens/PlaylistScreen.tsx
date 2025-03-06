import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { PlaylistScreenNavigationProp } from '../../types/navigation';

type Song = {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  liked: boolean;
};

const PLAYLIST_DATA: Song[] = [
  {
    id: '1',
    title: 'Cien Años',
    artist: 'Pedro Infante',
    albumCover: 'https://placehold.co/120x120/png',
    liked: false
  },
  {
    id: '2',
    title: 'Fallaste Corazón',
    artist: 'Pedro Infante',
    albumCover: 'https://placehold.co/120x120/png',
    liked: true
  },
  {
    id: '3',
    title: 'Amorcito Corazón',
    artist: 'Pedro Infante',
    albumCover: 'https://placehold.co/120x120/png',
    liked: true
  },
  {
    id: '4',
    title: 'Cielito Lindo',
    artist: 'Pedro Infante',
    albumCover: 'https://placehold.co/120x120/png',
    liked: true
  }
];

type Props = {
  navigation: PlaylistScreenNavigationProp;
};

const PlaylistScreen: React.FC<Props> = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>(PLAYLIST_DATA);

  const toggleLike = (songId: string) => {
    setSongs(songs.map(song => 
      song.id === songId ? { ...song, liked: !song.liked } : song
    ));
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <View style={styles.songCard}>
      <TouchableOpacity 
        style={styles.songContainer}
        onPress={() => navigation.navigate('Player', {
          songId: item.id,
          songTitle: item.title,
          songArtist: item.artist,
          albumCover: item.albumCover
        })}
      >
        <Image source={{ uri: item.albumCover }} style={styles.albumCover} />
        <View style={styles.songDetails}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleLike(item.id)}>
        <Icon 
          name={item.liked ? 'heart' : 'heart-o'} 
          type='font-awesome' 
          color={item.liked ? 'red' : 'gray'} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con la imagen y el botón */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image 
            source={{ uri: 'https://placehold.co/400x200/png' }} 
            style={styles.headerImage} 
          />
          <Text style={{ color: 'white', position: 'absolute', bottom: 10, left: 10 }} >Pedro Infante</Text>
        </View>
        <View style={{ position: 'absolute', margin: 10, right: -20, top: 140 }}>
        <TouchableOpacity 
          style={styles.playAllButton} 
          onPress={() => navigation.navigate('Player', {
            songId: songs[0].id,
            songTitle: songs[0].title,
            songArtist: songs[0].artist,
            albumCover: songs[0].albumCover
          })}
        >
          <Icon name='play' type='font-awesome' color='black' size={30} />
        </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  headerImageContainer: {
    width: 400,
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
  },
  playAllButton: {
    marginTop: 10, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songCard: {
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  songDetails: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PlaylistScreen;
