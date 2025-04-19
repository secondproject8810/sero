import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';

const EducationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Educational Qualification</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Experiences')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Tell us about your educational background and any other qualifications you may have.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>School name</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Harvard University"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Degree</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Bachelor's"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Field of study</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Computer Science"
          />
        </View>
        
        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <Text style={styles.inputLabel}>Start date (is expected)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Year"
            />
          </View>
          
          <View style={styles.dateInputContainer}>
            <Text style={styles.inputLabel}>End date (is expected)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Year"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Grade</Text>
          <TextInput 
            style={styles.input}
            placeholder="Grade"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Experiences')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    width: '48%',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EducationScreen;