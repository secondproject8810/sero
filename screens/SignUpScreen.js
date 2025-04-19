import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign up to continue</Text>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('MobileVerification')}
        >
          <Text style={styles.continueButtonText}>Continue with email</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>or sign up with</Text>
        
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../assets/google.avif')} 
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../assets/linkedin.jpg')} 
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../assets/x.avif')} 
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity>
            <Text style={styles.termsText}>Terms of use</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.termsText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  socialButton: {
    marginHorizontal: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    bottom: 40,
  },
  termsText: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;