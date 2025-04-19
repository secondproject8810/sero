import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

const ProfileDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={{ width: 50 }}></View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../assets/varun.jpg')} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Details</Text>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('IAm')}
        >
          <Text style={styles.continueButtonText}>Complete Profile</Text>
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
    fontSize: 16,
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
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#e94057',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileDetailsScreen;