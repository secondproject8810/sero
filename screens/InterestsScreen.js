import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  const interests = [
    { id: '1', name: 'Tech', icon: '💻' },
    { id: '2', name: 'Finance', icon: '💰' },
    { id: '3', name: 'Food', icon: '🍔' },
    { id: '4', name: 'Travel', icon: '✈️' },
  ];
  
  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your interests</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFriends')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Select a few of your interests and let everyone know what you're passionate about.
        </Text>
        
        <View style={styles.interestsGrid}>
          {interests.map((interest) => (
            <TouchableOpacity 
              key={interest.id}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest.id) ? styles.selectedInterest : {}
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={styles.interestIcon}>{interest.icon}</Text>
              <Text 
                style={[
                  styles.interestText,
                  selectedInterests.includes(interest.id) ? styles.selectedInterestText : {}
                ]}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('SearchFriends')}
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
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  interestButton: {
    width: '48%',
    backgroundColor: '#f7f7f7',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedInterest: {
    backgroundColor: '#000000',
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  interestText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedInterestText: {
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

export default InterestsScreen;