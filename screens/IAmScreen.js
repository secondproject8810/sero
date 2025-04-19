import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const IAmScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('User');
  
  const options = ['User', 'Business', 'Investor', 'Mentor'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>I am a</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Education')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Select your role within our network and we'll tailor your experience.
        </Text>
        
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity 
              key={option}
              style={[
                styles.optionButton,
                selected === option ? styles.selectedOption : {}
              ]}
              onPress={() => setSelected(option)}
            >
              <Text 
                style={[
                  styles.optionText,
                  selected === option ? styles.selectedOptionText : {}
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Education')}
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
  optionsContainer: {
    marginBottom: 40,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e8e6ea',
    marginBottom: 15,
  },
  selectedOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOptionText: {
    color: '#ffffff',
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

export default IAmScreen;