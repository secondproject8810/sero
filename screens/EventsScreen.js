import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample data for events and jobs
const eventsData = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    organizer: 'TechHub India',
    date: 'March 25-27, 2025',
    location: 'Hyderabad International Convention Center',
    image: require('../assets/conference.avif'),
    attendees: 342,
    interested: 520,
    premium: true,
    description: 'Join the biggest tech conference in India featuring keynotes from industry leaders, workshops, and networking opportunities.',
  },
  {
    id: '2',
    title: 'Design Workshop',
    organizer: 'UX Design Association',
    date: 'April 10, 2025',
    location: 'The Design Studio, Delhi',
    image: require('../assets/designworkshop.avif'),
    attendees: 56,
    interested: 98,
    premium: false,
    description: 'A hands-on workshop on the latest UI/UX design trends and tools. Perfect for beginners and intermediate designers.',
  },
  {
    id: '3',
    title: 'Startup Networking Mixer',
    organizer: 'Startup India',
    date: 'March 31, 2025',
    location: 'WeWork, Noida',
    image: require('../assets/networking.avif'),
    attendees: 120,
    interested: 210,
    premium: true,
    description: 'Connect with fellow entrepreneurs, investors, and mentors. Great opportunity to showcase your startup and find potential collaborators.',
  },
];

const jobsData = [
  {
    id: '1',
    title: 'Editor Required for Urgent Work',
    company: 'FilmCraft Productions',
    location: 'Remote (India)',
    salary: '₹40,000 - ₹60,000 per project',
    posted: '2 hours ago',
    deadline: 'March 20, 2025',
    image: require('../assets/editor.avif'),
    premium: true,
    description: 'Looking for an experienced video editor for a short film project. Must be proficient in Adobe Premiere Pro and After Effects. Quick turnaround required.',
    skills: ['Video Editing', 'Adobe Premiere', 'After Effects', 'Color Grading'],
  },
  {
    id: '2',
    title: 'Need 4 Models for Jewelry Brand',
    company: 'Elegance Jewels',
    location: 'Mumbai, Maharashtra',
    salary: '₹15,000 per day',
    posted: '5 hours ago',
    deadline: 'This Weekend',
    image: require('../assets/jewelry.avif'),
    premium: true,
    description: 'Seeking 4 professional models for a jewelry photoshoot this weekend. Both male and female models needed. Previous modeling experience required.',
    skills: ['Modeling', 'Photoshoot Experience', 'Professional Attitude'],
  },
  {
    id: '3',
    title: 'UI/UX Designer for Fintech App',
    company: 'PaySmart Solutions',
    location: 'Bangalore, Karnataka',
    salary: '₹25,000 - ₹35,000 per project',
    posted: '1 day ago',
    deadline: 'March 25, 2025',
    image: require('../assets/company.avif'),
    premium: false,
    description: 'Looking for a talented UI/UX designer to redesign our fintech application. Should have experience in financial applications and user-centered design.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Financial Apps'],
  },
  {
    id: '4',
    title: 'Content Writer for Tech Blog',
    company: 'TechInsights Media',
    location: 'Remote',
    salary: '₹2 per word',
    posted: '2 days ago',
    deadline: 'Ongoing',
    image: require('../assets/logo1.avif'),
    premium: false,
    description: 'Hiring content writers with technical background to create engaging articles for our tech blog. Topics include AI, blockchain, and software development.',
    skills: ['Content Writing', 'Technical Knowledge', 'SEO', 'Research'],
  },
];

// Sample data for freelancers
const freelancersData = [
  {
    id: '1',
    name: 'Arjun Mehta',
    profession: 'Photographer',
    specialization: 'Portrait & Wedding',
    location: 'Delhi, India',
    experience: '5 years',
    rating: 4.8,
    reviews: 42,
    hourlyRate: '₹2,500/hour',
    avatar: require('../assets/dakshkamboj.avif'),
    portfolio: [require('../assets/bhagclub.jpg')],
    premium: true,
    bio: 'Professional photographer specializing in portrait and wedding photography. Capturing your special moments with a creative touch.',
    skills: ['Portrait', 'Wedding', 'Event', 'Product', 'Editing'],
    availability: 'Available on weekends',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    profession: 'Graphic Designer',
    specialization: 'Brand Identity & UI',
    location: 'Mumbai, India',
    experience: '7 years',
    rating: 4.9,
    reviews: 78,
    hourlyRate: '₹1,800/hour',
    avatar: require('../assets/aishapatel.avif'),
    portfolio: [require('../assets/designworkshop.avif')],
    premium: true,
    bio: 'Creative graphic designer with expertise in brand identity and UI design. Helping businesses stand out with unique visual identities.',
    skills: ['Logo Design', 'Branding', 'UI/UX', 'Illustration', 'Typography'],
    availability: 'Full-time availability',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    profession: 'Video Editor',
    specialization: 'Commercial & Film',
    location: 'Bangalore, India',
    experience: '4 years',
    rating: 4.7,
    reviews: 36,
    hourlyRate: '₹1,500/hour',
    avatar: require('../assets/pragunmittal.avif'),
    portfolio: [require('../assets/editor.avif')],
    premium: false,
    bio: 'Professional video editor with experience in commercial and film editing. Transforming raw footage into compelling visual stories.',
    skills: ['Video Editing', 'Color Grading', 'Motion Graphics', 'Sound Design'],
    availability: 'Available for projects',
  },
  {
    id: '4',
    name: 'Neha Gupta',
    profession: 'Content Writer',
    specialization: 'Tech & Business',
    location: 'Remote',
    experience: '6 years',
    rating: 4.6,
    reviews: 52,
    hourlyRate: '₹1,200/hour',
    avatar: require('../assets/nehagupta.avif'),
    portfolio: [],
    premium: false,
    bio: 'Experienced content writer specializing in technology and business topics. Creating engaging and informative content that drives results.',
    skills: ['Blog Writing', 'Technical Writing', 'SEO', 'Copywriting', 'Research'],
    availability: 'Open to long-term contracts',
  },
  {
    id: '5',
    name: 'Rohan Kapoor',
    profession: 'Web Developer',
    specialization: 'Frontend & React',
    location: 'Pune, India',
    experience: '5 years',
    rating: 4.9,
    reviews: 63,
    hourlyRate: '₹2,000/hour',
    avatar: require('../assets/rohansharma.avif'),
    portfolio: [require('../assets/website.png')],
    premium: true,
    bio: 'Frontend developer with expertise in React and modern web technologies. Building responsive and user-friendly web applications.',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'API Integration'],
    availability: 'Available for freelance projects',
  },
];

const EventsScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(route.params?.filters || null);
  
  // Add animation values for tab transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTabTransition = (newTab) => {
    // Fade out current content
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // Change tab and reset animations
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
        }),
      ]),
    ]).start();

    setActiveTab(newTab);
  };

  // Apply filters from route params if available
  React.useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
      // You can apply the filters to your data here
    }
  }, [route.params?.filters]);
  
  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.organizerContainer}>
          <Text style={styles.organizerText}>By </Text>
          <Text style={styles.organizerName}>{item.organizer}</Text>
        </View>
        
        <View style={styles.eventDetailsRow}>
          <View style={styles.eventDetailItem}>
            <Ionicons name="calendar-outline" size={16} color="#687684" />
            <Text style={styles.eventDetailText}>{item.date}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <Ionicons name="location-outline" size={16} color="#687684" />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.eventFooter}>
          <View style={styles.attendeesContainer}>
            <View style={styles.attendeeAvatars}>
              <View style={[styles.attendeeAvatar, { zIndex: 3, marginRight: -10 }]}>
                <Text style={styles.attendeeInitial}>A</Text>
              </View>
              <View style={[styles.attendeeAvatar, { zIndex: 2, marginRight: -10 }]}>
                <Text style={styles.attendeeInitial}>B</Text>
              </View>
              <View style={[styles.attendeeAvatar, { zIndex: 1 }]}>
                <Text style={styles.attendeeInitial}>C</Text>
              </View>
            </View>
            <Text style={styles.attendeesText}>
              {item.attendees} attending • {item.interested} interested
            </Text>
          </View>
          
          <TouchableOpacity style={styles.interestedButton}>
            <Text style={styles.interestedButtonText}>Join Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Image source={item.image} style={styles.companyLogo} />
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <TouchableOpacity style={styles.saveJobButton}>
          <Ionicons name="bookmark-outline" size={22} color="#4C9EEB" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.jobDetailsContainer}>
        <View style={styles.jobDetailItem}>
          <Ionicons name="location-outline" size={16} color="#687684" />
          <Text style={styles.jobDetailText}>{item.location}</Text>
        </View>
        
        <View style={styles.jobDetailItem}>
          <Ionicons name="cash-outline" size={16} color="#687684" />
          <Text style={styles.jobDetailText}>{item.salary}</Text>
        </View>
        
        <View style={styles.jobDetailItem}>
          <Ionicons name="time-outline" size={16} color="#687684" />
          <Text style={styles.jobDetailText}>Posted {item.posted}</Text>
        </View>
        
        <View style={styles.jobDetailItem}>
          <Ionicons name="calendar-outline" size={16} color="#687684" />
          <Text style={styles.jobDetailText}>Deadline: {item.deadline}</Text>
        </View>
      </View>
      
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.skillsContainer}>
        {item.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.jobFooter}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  // Render freelancer profiles
  const renderFreelancerItem = ({ item }) => (
    <TouchableOpacity style={styles.freelancerCard}>
      <View style={styles.freelancerHeader}>
        <Image source={item.avatar} style={styles.freelancerAvatar} />
        <View style={styles.freelancerInfo}>
          <Text style={styles.freelancerName}>{item.name}</Text>
          <Text style={styles.freelancerTitle}>{item.profession}</Text>
          <View style={styles.freelancerSpecialization}>
            <MaterialCommunityIcons name="briefcase-outline" size={14} color="#687684" />
            <Text style={styles.specializationText}>{item.specialization}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            <Ionicons name="star" size={14} color="#F5B700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
        </View>
      </View>
      
      <View style={styles.freelancerDetailsContainer}>
        <View style={styles.freelancerDetailItem}>
          <Ionicons name="location-outline" size={16} color="#687684" />
          <Text style={styles.freelancerDetailText}>{item.location}</Text>
        </View>
        
        <View style={styles.freelancerDetailItem}>
          <Ionicons name="time-outline" size={16} color="#687684" />
          <Text style={styles.freelancerDetailText}>{item.experience} experience</Text>
        </View>
        
        <View style={styles.freelancerDetailItem}>
          <Ionicons name="cash-outline" size={16} color="#687684" />
          <Text style={styles.freelancerDetailText}>{item.hourlyRate}</Text>
        </View>
        
        <View style={styles.freelancerDetailItem}>
          <Ionicons name="calendar-outline" size={16} color="#687684" />
          <Text style={styles.freelancerDetailText}>{item.availability}</Text>
        </View>
      </View>
      
      <Text style={styles.freelancerBio} numberOfLines={2}>
        {item.bio}
      </Text>
      
      <View style={styles.skillsContainer}>
        {item.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.freelancerFooter}>
        <TouchableOpacity style={styles.viewProfileButton}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactFreelancerButton}>
          <Text style={styles.contactFreelancerText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
        <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
          <Text style={[styles.filterChipText, styles.activeFilterChipText]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>This Week</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>This Month</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Remote</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Delhi NCR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Premium</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
  
  const renderContent = () => {
    let content;
    if (activeTab === 'Events') {
      content = (
        <FlatList
          data={eventsData}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    } else if (activeTab === 'Jobs & Gigs') {
      content = (
        <FlatList
          data={jobsData}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    } else {
      content = (
        <FlatList
          data={freelancersData}
          renderItem={renderFreelancerItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    }

    return (
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          }
        ]}
      >
        {content}
      </Animated.View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Search and Filter Row */}
        <View style={styles.searchFilterRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#687684" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={
                activeTab === 'Events' 
                  ? "Search events..." 
                  : activeTab === 'Jobs & Gigs' 
                    ? "Search jobs and gigs..." 
                    : "Search freelancers..."
              }
              placeholderTextColor="#687684"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          {(activeTab === 'Jobs & Gigs' || activeTab === 'Freelancers') && (
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {
                if (activeTab === 'Jobs & Gigs') {
                  navigation.navigate('JobFilter');
                } else if (activeTab === 'Freelancers') {
                  navigation.navigate('FreelancerFilter');
                }
              }}
            >
              <Ionicons name="filter" size={20} color="#4C9EEB" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs Row */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Events' && styles.activeTab]}
            onPress={() => animateTabTransition('Events')}
          >
            <Text style={[styles.tabText, activeTab === 'Events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Jobs & Gigs' && styles.activeTab]}
            onPress={() => animateTabTransition('Jobs & Gigs')}
          >
            <Text style={[styles.tabText, activeTab === 'Jobs & Gigs' && styles.activeTabText]}>
              Jobs & Gigs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Freelancers' && styles.activeTab]}
            onPress={() => animateTabTransition('Freelancers')}
          >
            <Text style={[styles.tabText, activeTab === 'Freelancers' && styles.activeTabText]}>
              Freelancers
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showFilters && renderFilters()}
      
      {renderContent()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 50,
                useNativeDriver: true,
              }),
            ]).start(() => {
              navigation.navigate('HomeFeed');
            });
          }}
        >
          <Ionicons name="home-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to SwipeCard screen');
            navigation.navigate('SwipeCard');
          }}
        >
          <Ionicons name="people-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('Events')}
        >
          <Ionicons name="calendar" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to Messages screen');
            navigation.navigate('Messages');
          }}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to ProfileScreen');
            navigation.navigate('ProfileScreen');
          }}
        >
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    zIndex: 10,
  },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#687684',
  },
  activeTabText: {
    color: '#ffffff',
  },
  listContent: {
    padding: 20,
    paddingBottom: 80,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 8,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  organizerText: {
    fontSize: 14,
    color: '#687684',
  },
  organizerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  eventDetailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 6,
  },
  eventDescription: {
    fontSize: 14,
    color: '#1E1E2C',
    lineHeight: 20,
    marginBottom: 16,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendeeInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E2C',
  },
  attendeesText: {
    fontSize: 14,
    color: '#687684',
  },
  interestedButton: {
    padding: 12,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  interestedButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#687684',
  },
  jobDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  jobDetailText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 6,
  },
  jobDescription: {
    fontSize: 14,
    color: '#1E1E2C',
    lineHeight: 20,
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#1E1E2C',
    fontWeight: '500',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyButton: {
    padding: 12,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactButton: {
    padding: 12,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#687684',
  },
  freelancerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  freelancerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  freelancerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  freelancerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  freelancerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 2,
  },
  freelancerTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 4,
  },
  freelancerSpecialization: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specializationText: {
    fontSize: 13,
    color: '#687684',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#687684',
  },
  freelancerDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  freelancerDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  freelancerDetailText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 6,
  },
  freelancerBio: {
    fontSize: 14,
    color: '#1E1E2C',
    lineHeight: 20,
    marginBottom: 16,
  },
  freelancerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewProfileButton: {
    padding: 12,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactFreelancerButton: {
    padding: 12,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
  },
  contactFreelancerText: {
    fontSize: 14,
    color: '#687684',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e6ea',
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 100,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  filtersContainer: {
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#1E1E2C',
  },
  filterChipText: {
    fontSize: 14,
    color: '#1E1E2C',
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
});

export default EventsScreen;
