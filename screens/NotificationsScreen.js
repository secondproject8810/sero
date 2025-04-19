import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enable notification's</Text>
        <View style={{ width: 20 }}></View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/notification.jpg')} 
            style={styles.image} 
          />
        </View>
        
        <Text style={styles.description}>
          Get push notifications when you get a match or receive a message
        </Text>
        
        <TouchableOpacity 
          style={styles.enableButton}
          onPress={() => {
            // Replace the current screen with HomeFeed
            navigation.replace('HomeFeed');
          }}
        >
          <Text style={styles.enableButtonText}>I want to be notified</Text>
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
  enableButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  enableButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationsScreen;
