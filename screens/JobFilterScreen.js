import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  Animated,
  Dimensions,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Custom Checkbox Component
const Checkbox = ({ label, checked, onPress, style }) => (
  <TouchableOpacity 
    style={[styles.checkboxContainer, style]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// Custom Radio Button Component
const RadioButton = ({ label, selected, onPress, style }) => (
  <TouchableOpacity 
    style={[styles.radioContainer, style]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.radioOuter}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// Category Card Component
const CategoryCard = ({ category, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryCard, selected && styles.categoryCardSelected]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.categoryIconContainer}>
      {category.icon}
    </View>
    <Text style={styles.categoryName}>{category.name}</Text>
    {selected && (
      <View style={styles.selectedIndicator}>
        <Ionicons name="checkmark-circle" size={18} color="#e94057" />
      </View>
    )}
  </TouchableOpacity>
);

// Skill Chip Component
const SkillChip = ({ skill, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.skillChip, selected && styles.skillChipSelected]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.skillChipText, selected && styles.skillChipTextSelected]}>{skill}</Text>
  </TouchableOpacity>
);

// Filter Section Component
const FilterSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.filterContainer}>
      {children}
    </View>
  </View>
);

// Filter Chip Component
const FilterChip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.selectedChip]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, selected && styles.selectedChipText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const JobFilterScreen = ({ navigation }) => {
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('any');
  const [availability, setAvailability] = useState('any');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [locationPreference, setLocationPreference] = useState('any');
  const [activeTab, setActiveTab] = useState('Jobs');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  
  // Freelancer categories
  const categories = [
    { 
      id: 'photographer', 
      name: 'Photographer', 
      icon: <FontAwesome5 name="camera" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'videoEditor', 
      name: 'Video Editor', 
      icon: <MaterialIcons name="video-settings" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'graphicDesigner', 
      name: 'Graphic Designer', 
      icon: <MaterialCommunityIcons name="palette-outline" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'animator', 
      name: 'Animator', 
      icon: <MaterialCommunityIcons name="animation-outline" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'webDeveloper', 
      name: 'Web Developer', 
      icon: <MaterialCommunityIcons name="web" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'contentWriter', 
      name: 'Content Writer', 
      icon: <MaterialCommunityIcons name="pencil-outline" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'musicProducer', 
      name: 'Music Producer', 
      icon: <FontAwesome5 name="music" size={24} color="#1a1a1a" /> 
    },
    { 
      id: 'voiceArtist', 
      name: 'Voice Artist', 
      icon: <FontAwesome5 name="microphone" size={24} color="#1a1a1a" /> 
    },
  ];
  
  // Specialized skills
  const skills = {
    photographer: ['Portrait', 'Wedding', 'Product', 'Fashion', 'Event', 'Landscape', 'Architectural'],
    videoEditor: ['Motion Graphics', 'Color Grading', 'VFX', 'Transitions', 'Sound Design', 'Storytelling'],
    graphicDesigner: ['Branding', 'Illustration', 'UI/UX', 'Print Design', 'Typography', 'Packaging'],
    animator: ['2D Animation', '3D Animation', 'Character Design', 'Storyboarding', 'Rigging'],
    webDeveloper: ['Frontend', 'Backend', 'Full Stack', 'WordPress', 'E-commerce', 'Mobile-Responsive'],
    contentWriter: ['Blog Posts', 'SEO', 'Technical Writing', 'Copywriting', 'Scriptwriting'],
    musicProducer: ['Mixing', 'Mastering', 'Composition', 'Sound Design', 'Vocal Production'],
    voiceArtist: ['Commercial', 'Character Voices', 'Narration', 'Audiobooks', 'Podcasting'],
  };
  
  // Get relevant skills based on selected categories
  const getRelevantSkills = () => {
    let relevantSkills = [];
    selectedCategories.forEach(category => {
      if (skills[category]) {
        relevantSkills = [...relevantSkills, ...skills[category]];
      }
    });
    
    // If no categories selected, show a mix of popular skills
    if (relevantSkills.length === 0) {
      Object.values(skills).forEach(skillSet => {
        relevantSkills = [...relevantSkills, ...skillSet.slice(0, 2)];
      });
    }
    
    // Remove duplicates
    return [...new Set(relevantSkills)];
  };
  
  // Experience level options
  const experienceOptions = [
    { value: 'any', label: 'Any experience' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' },
  ];
  
  // Availability options
  const availabilityOptions = [
    { value: 'any', label: 'Any availability' },
    { value: 'fullTime', label: 'Full-time' },
    { value: 'partTime', label: 'Part-time' },
    { value: 'weekends', label: 'Weekends only' },
    { value: 'evenings', label: 'Evenings only' },
  ];
  
  // Location options
  const locationOptions = [
    { value: 'any', label: 'Any location' },
    { value: 'remote', label: 'Remote only' },
    { value: 'local', label: 'Local only' },
    { value: 'willing', label: 'Willing to travel' },
  ];
  
  // Toggle category selection
  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  // Toggle skill selection
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    setExperienceLevel('any');
    setAvailability('any');
    setVerifiedOnly(false);
    setTopRatedOnly(false);
    setLocationPreference('any');
  };
  
  // Apply filters and navigate back
  const applyFilters = () => {
    // Here you would typically pass the filter state back to the previous screen
    // or store it in a global state manager
    navigation.goBack();
  };
  
  // Animation on component mount
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
      </TouchableOpacity>
      
      <Animated.ScrollView 
        style={[
          styles.scrollView,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FilterSection title="Job Type">
          {categories.map(category => (
            <FilterChip
              key={category.id}
              label={category.name}
              selected={selectedCategories.includes(category.id)}
              onPress={() => toggleCategory(category.id)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Experience Level">
          {experienceOptions.map(level => (
            <FilterChip
              key={level.value}
              label={level.label}
              selected={experienceLevel === level.value}
              onPress={() => setExperienceLevel(level.value)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Availability">
          {availabilityOptions.map(option => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={availability === option.value}
              onPress={() => setAvailability(option.value)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Location">
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="Enter location"
            value={locationPreference}
            onChangeText={(text) => setLocationPreference(text)}
          />
        </FilterSection>

        <FilterSection title="Skills">
          {getRelevantSkills().map(skill => (
            <FilterChip
              key={skill}
              label={skill}
              selected={selectedSkills.includes(skill)}
              onPress={() => toggleSkill(skill)}
            />
          ))}
        </FilterSection>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      <Animated.View 
        style={[
          styles.applyButtonContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <TouchableOpacity
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <LinearGradient
            colors={['#000000', '#1a1a1a']}
            style={styles.applyButtonGradient}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20, // Increased top padding to account for status bar
    paddingBottom: 120, // Increased padding to account for the footer
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f8f8f8',
  },
  categoryCardSelected: {
    borderColor: '#000000',
    backgroundColor: '#f8f8f8',
  },
  categoryIconContainer: {
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f8f8f8',
  },
  skillChipSelected: {
    backgroundColor: '#f8f8f8',
    borderColor: '#000000',
  },
  skillChipText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  skillChipTextSelected: {
    color: '#000000',
    fontWeight: '600',
  },
  experienceContainer: {
    marginBottom: 10,
  },
  experienceRadio: {
    marginBottom: 15,
  },
  availabilityContainer: {
    marginBottom: 10,
  },
  availabilityRadio: {
    marginBottom: 15,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationRadio: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#e8e6ea',
    backgroundColor: '#ffffff',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  radioLabel: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  additionalFiltersContainer: {
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  switchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchIcon: {
    marginRight: 10,
  },
  switchText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  switchControl: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  bottomSpacer: {
    height: 100,
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  applyButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  applyButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e8e6ea',
    borderRadius: 12,
  },
  locationInput: {
    borderWidth: 1,
    borderColor: '#e8e6ea',
    borderRadius: 12,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salarySeparator: {
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#000000',
  },
  chipText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default JobFilterScreen;