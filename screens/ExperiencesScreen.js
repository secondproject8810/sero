import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

const ExperiencesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Experiences</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Interests')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Tell us about your professional experience and the skills you've gained.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Job Title</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Sales Manager"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Interests')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#adafbb',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f7f7f7',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
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

export default ExperiencesScreen;