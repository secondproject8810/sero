import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const SearchFriendsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search friend's</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/contactlist.png')} 
            style={styles.image} 
          />
        </View>
        
        <Text style={styles.description}>
          You can find friends from your contact list to connect with them
        </Text>
        
        <TouchableOpacity 
          style={styles.accessButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.accessButtonText}>Access to a contact list</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backText: {
    fontSize: 24,
    color: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  skipText: {
    fontSize: 16,
    color: '#e94057',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  accessButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  accessButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchFriendsScreen;