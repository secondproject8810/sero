import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const FreelancerFilterScreen = ({ navigation, route }) => {
  // Initial filter states
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('Any');
  const [selectedRating, setSelectedRating] = useState('Any');
  const [selectedAvailability, setSelectedAvailability] = useState('Any');
  const [isPremiumOnly, setIsPremiumOnly] = useState(false);
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Profession options
  const professionOptions = [
    'Photographer',
    'Videographer',
    'Designer',
    'Developer',
    'Writer',
    'Editor',
    'Marketer',
    'Consultant',
    'Illustrator',
    'Animator',
  ];
  
  // Specialization options
  const specializationOptions = [
    'Portrait Photography',
    'Wedding Photography',
    'Product Photography',
    'UI/UX Design',
    'Graphic Design',
    'Web Development',
    'Mobile Development',
    'Content Writing',
    'Copywriting',
    'Video Editing',
    'Motion Graphics',
    'Digital Marketing',
    'SEO',
    'Brand Strategy',
    'Illustration',
    '3D Animation',
  ];
  
  // Experience options
  const experienceOptions = ['Any', 'Entry Level (0-2 years)', 'Intermediate (3-5 years)', 'Expert (5+ years)'];
  
  // Rating options
  const ratingOptions = ['Any', '4.5+', '4.0+', '3.5+'];
  
  // Availability options
  const availabilityOptions = ['Any', 'Full-time', 'Part-time', 'Weekends Only', 'Evenings Only'];
  
  // Toggle selection for multi-select options
  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  // Handle single selection for radio-button style options
  const handleSingleSelection = (item, setter) => {
    setter(item);
  };
  
  // Apply filters and navigate back
  const applyFilters = () => {
    const filters = {
      professions: selectedProfessions,
      specializations: selectedSpecializations,
      experience: selectedExperience,
      rating: selectedRating,
      availability: selectedAvailability,
      isPremiumOnly,
      hasPortfolio,
      isVerified,
    };
    
    navigation.navigate('Events', { filters });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedProfessions([]);
    setSelectedSpecializations([]);
    setSelectedExperience('Any');
    setSelectedRating('Any');
    setSelectedAvailability('Any');
    setIsPremiumOnly(false);
    setHasPortfolio(false);
    setIsVerified(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E1E2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Freelancers</Text>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetFilters}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profession Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Profession</Text>
          <View style={styles.optionsContainer}>
            {professionOptions.map((profession, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionChip,
                  selectedProfessions.includes(profession) && styles.selectedChip
                ]}
                onPress={() => toggleSelection(profession, selectedProfessions, setSelectedProfessions)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedProfessions.includes(profession) && styles.selectedOptionText
                  ]}
                >
                  {profession}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Specialization Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Specialization</Text>
          <View style={styles.optionsContainer}>
            {specializationOptions.map((specialization, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionChip,
                  selectedSpecializations.includes(specialization) && styles.selectedChip
                ]}
                onPress={() => toggleSelection(specialization, selectedSpecializations, setSelectedSpecializations)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedSpecializations.includes(specialization) && styles.selectedOptionText
                  ]}
                >
                  {specialization}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Experience Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.radioOptionsContainer}>
            {experienceOptions.map((experience, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioOption}
                onPress={() => handleSingleSelection(experience, setSelectedExperience)}
              >
                <View style={styles.radioButtonContainer}>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedExperience === experience && styles.radioButtonSelected
                    ]}
                  >
                    {selectedExperience === experience && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.radioOptionText}>{experience}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Rating Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Rating</Text>
          <View style={styles.radioOptionsContainer}>
            {ratingOptions.map((rating, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioOption}
                onPress={() => handleSingleSelection(rating, setSelectedRating)}
              >
                <View style={styles.radioButtonContainer}>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedRating === rating && styles.radioButtonSelected
                    ]}
                  >
                    {selectedRating === rating && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.radioOptionText}>
                    {rating}
                    {rating !== 'Any' && (
                      <Text style={styles.ratingStars}> <Ionicons name="star" size={14} color="#F5B700" /></Text>
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Availability Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.radioOptionsContainer}>
            {availabilityOptions.map((availability, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioOption}
                onPress={() => handleSingleSelection(availability, setSelectedAvailability)}
              >
                <View style={styles.radioButtonContainer}>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedAvailability === availability && styles.radioButtonSelected
                    ]}
                  >
                    {selectedAvailability === availability && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.radioOptionText}>{availability}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Additional Filters Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Additional Filters</Text>
          
          <View style={styles.switchOption}>
            <View style={styles.switchTextContainer}>
              <Ionicons name="star" size={18} color="#F5B700" style={styles.switchIcon} />
              <Text style={styles.switchText}>Premium Freelancers Only</Text>
            </View>
            <Switch
              value={isPremiumOnly}
              onValueChange={setIsPremiumOnly}
              trackColor={{ false: '#E9ECEF', true: '#4C9EEB' }}
              thumbColor={isPremiumOnly ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#E9ECEF"
            />
          </View>
          
          <View style={styles.switchOption}>
            <View style={styles.switchTextContainer}>
              <Ionicons name="images-outline" size={18} color="#1E1E2C" style={styles.switchIcon} />
              <Text style={styles.switchText}>Has Portfolio</Text>
            </View>
            <Switch
              value={hasPortfolio}
              onValueChange={setHasPortfolio}
              trackColor={{ false: '#E9ECEF', true: '#4C9EEB' }}
              thumbColor={hasPortfolio ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#E9ECEF"
            />
          </View>
          
          <View style={styles.switchOption}>
            <View style={styles.switchTextContainer}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#1E1E2C" style={styles.switchIcon} />
              <Text style={styles.switchText}>Verified Freelancers</Text>
            </View>
            <Switch
              value={isVerified}
              onValueChange={setIsVerified}
              trackColor={{ false: '#E9ECEF', true: '#4C9EEB' }}
              thumbColor={isVerified ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#E9ECEF"
            />
          </View>
        </View>
        
        {/* Bottom padding for scroll view */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Apply Button */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E2C',
  },
  resetButton: {
    padding: 8,
  },
  resetText: {
    fontSize: 16,
    color: '#4C9EEB',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#1E1E2C',
  },
  optionText: {
    fontSize: 14,
    color: '#1E1E2C',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  radioOptionsContainer: {
    marginBottom: 8,
  },
  radioOption: {
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E1E2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: '#4C9EEB',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4C9EEB',
  },
  radioOptionText: {
    fontSize: 16,
    color: '#1E1E2C',
  },
  ratingStars: {
    fontSize: 16,
    color: '#F5B700',
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchIcon: {
    marginRight: 10,
  },
  switchText: {
    fontSize: 16,
    color: '#1E1E2C',
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  applyButton: {
    height: 56,
    backgroundColor: '#1E1E2C',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FreelancerFilterScreen;