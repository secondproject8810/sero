import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  ImageBackground,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width;
const CARD_HEIGHT = height * 0.95;
const SWIPE_THRESHOLD = width * 0.25;

// Memoized badge component for better performance
const Badge = memo(({ text, style, textStyle }) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={[styles.badgeText, textStyle]}>{text}</Text>
    </View>
  );
});

// Memoized section header component
const SectionHeader = memo(({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionDivider} />
    </View>
  );
});

// Memoized education item component
const EducationItem = memo(({ education }) => {
  return (
    <View style={styles.educationItem}>
      <View style={styles.educationIconContainer}>
        <MaterialCommunityIcons name="school" size={24} color="#1877f2" />
      </View>
      <View style={styles.educationContent}>
        <Text style={styles.schoolName}>{education.school}</Text>
        <Text style={styles.degreeText}>{education.degree} • {education.field}</Text>
        <Text style={styles.yearText}>{education.year}</Text>
      </View>
    </View>
  );
});

// Memoized experience item component
const ExperienceItem = memo(({ experience }) => {
  return (
    <View style={styles.experienceItem}>
      <View style={styles.experienceIconContainer}>
        <MaterialCommunityIcons name="briefcase" size={24} color="#e94057" />
      </View>
      <View style={styles.experienceContent}>
        <Text style={styles.companyName}>{experience.company}</Text>
        <Text style={styles.roleText}>{experience.role}</Text>
        <Text style={styles.durationText}>{experience.duration}</Text>
        {experience.description && (
          <Text style={styles.descriptionText}>{experience.description}</Text>
        )}
      </View>
    </View>
  );
});

// Dummy profiles data with seroimg.png for all images
const profiles = [
  {
    id: '1',
    name: 'Varun Sharma',
    age: 23,
    location: 'Noida',
    distance: '1 km',
    profession: 'Developer',
    bio: 'My name is Varun Sharma and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading.',
    images: [
      require('../assets/varun.jpg'),
    ],
    education: [
      {
        school: 'Delhi University',
        degree: 'Bachelor of Technology',
        field: 'Computer Science',
        year: '2018-2022'
      },
      {
        school: 'Delhi Public School',
        degree: 'High School',
        field: 'Science',
        year: '2016-2018'
      }
    ],
    experience: [
      {
        company: 'TechSolutions India',
        role: 'Frontend Developer',
        duration: '2022-Present',
        description: 'Building responsive web applications using React and Next.js. Implementing UI/UX designs and optimizing performance.'
      },
      {
        company: 'CodeCraft Studios',
        role: 'Web Development Intern',
        duration: 'Summer 2021',
        description: 'Assisted in developing website features and fixing bugs. Learned modern JavaScript frameworks and best practices.'
      }
    ],
    skills: ['Linux', 'JavaScript', 'React', 'Editing', 'Front End'],
    availability: 'Looking for networking and collaboration in noida!',
    tagline: 'Building Epic React Experiences & Slicing Videos Like a Creative Boss',
    talents: 'Powering Up Code Projects / Building Web Looks That Rule / Cutting Videos With Swagger',
    about: 'I create React web projects that run like a charm and cut videos that have a real kick. We\'d vibe perfectly if you\'re ready to work on something exciting with me!',
    lookingFor: ['Network', 'Social', 'Professional'],
    interests: ['Travelling', 'Books', 'Music', 'Dancing', 'Modeling'],
    portfolio: 'Add your portfolio link here......',
    socialLinks: {
      linkedin: 'linkedin.com/in/varunsharma',
      instagram: 'instagram.com/varunsharma',
      facebook: 'facebook.com/varunsharma',
    },
    verified: true,
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 25,
    location: 'Delhi',
    distance: '5 km',
    profession: 'UI/UX Designer',
    bio: 'Creative designer with a passion for user-centered design. I love creating intuitive and beautiful interfaces that solve real problems.',
    images: [
      require('../assets/priya.avif'),
    ],
    education: [
      {
        school: 'National Institute of Design',
        degree: 'Master of Design',
        field: 'User Experience',
        year: '2020-2022'
      },
      {
        school: 'Mumbai University',
        degree: 'Bachelor of Fine Arts',
        field: 'Visual Communication',
        year: '2016-2020'
      }
    ],
    experience: [
      {
        company: 'DesignHub Studios',
        role: 'Senior UI/UX Designer',
        duration: '2022-Present',
        description: 'Leading design for mobile and web applications. Creating user flows, wireframes, and high-fidelity prototypes.'
      },
      {
        company: 'Creative Solutions',
        role: 'UI Designer',
        duration: '2020-2022',
        description: 'Designed user interfaces for various clients across e-commerce, healthcare, and fintech sectors.'
      }
    ],
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Prototyping'],
    availability: 'Open to freelance projects and collaboration opportunities',
    tagline: 'Crafting Digital Experiences That Users Love',
    talents: 'UI/UX Design / User Research / Interactive Prototyping',
    about: 'I specialize in creating user-centered designs that not only look great but also provide seamless experiences. Always looking to collaborate with developers who care about design details!',
    lookingFor: ['Freelance', 'Collaboration', 'Networking'],
    interests: ['Art', 'Photography', 'Hiking', 'Coffee', 'Tech'],
    portfolio: 'behance.net/priyapatel',
    socialLinks: {
      linkedin: 'linkedin.com/in/priyapatel',
      instagram: 'instagram.com/priyapatel',
      dribbble: 'dribbble.com/priyapatel',
    },
    verified: true,
  },
  {
    id: '3',
    name: 'Rahul Verma',
    age: 28,
    location: 'Gurgaon',
    distance: '8 km',
    profession: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications. I enjoy solving complex problems and learning new technologies.',
    images: [
      require('../assets/rahul.avif'),
    ],
    education: [
      {
        school: 'Indian Institute of Technology, Delhi',
        degree: 'Master of Technology',
        field: 'Computer Science',
        year: '2018-2020'
      },
      {
        school: 'BITS Pilani',
        degree: 'Bachelor of Engineering',
        field: 'Computer Science',
        year: '2014-2018'
      }
    ],
    experience: [
      {
        company: 'InnovateX Solutions',
        role: 'Senior Full Stack Developer',
        duration: '2021-Present',
        description: 'Architecting and developing scalable web applications using MERN stack. Leading a team of 5 developers.'
      },
      {
        company: 'TechGiant India',
        role: 'Software Engineer',
        duration: '2020-2021',
        description: 'Developed and maintained cloud-based applications. Implemented CI/CD pipelines and improved system performance.'
      },
      {
        company: 'StartupHub',
        role: 'Junior Developer',
        duration: '2018-2020',
        description: 'Worked on frontend and backend development for various startup projects.'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    availability: 'Looking for startup opportunities and technical co-founders',
    tagline: 'Building Scalable Solutions for Modern Problems',
    talents: 'Full Stack Development / Cloud Architecture / Performance Optimization',
    about: 'I build end-to-end web applications with a focus on performance and scalability. Always excited to work on challenging projects that push my technical boundaries.',
    lookingFor: ['Startup', 'Co-founder', 'Technical Partner'],
    interests: ['Coding', 'Chess', 'Running', 'Podcasts', 'Investing'],
    portfolio: 'github.com/rahulverma',
    socialLinks: {
      linkedin: 'linkedin.com/in/rahulverma',
      github: 'github.com/rahulverma',
      twitter: 'twitter.com/rahulverma',
    },
    verified: true,
  },
];

const SwipeCardScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwipingCard, setIsSwipingCard] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  
  // Initialize with the original profiles data
  const [profilesData] = useState(profiles || []);

  // Animation values
  const position = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef(null);
  const initialTouchY = useRef(0);
  const initialTouchX = useRef(0);
  const scrollEnabled = useRef(true);

  // Reset position when current index changes
  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
    
    // Reset scroll position when card changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
    
    // Reset expanded sections
    setExpandedSections({});
  }, [currentIndex]);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Improved pan responder with better gesture detection
  const panResponder = useRef(
    PanResponder.create({
      // Don't capture all touches initially
      onStartShouldSetPanResponder: () => false,
      
      // Only capture significant horizontal movements
      onMoveShouldSetPanResponder: (evt, gesture) => {
        // Store initial touch position
        if (!initialTouchY.current) {
          initialTouchY.current = gesture.dy;
          initialTouchX.current = gesture.dx;
        }
        
        // Determine if this is a horizontal swipe (card swipe) or vertical movement (scrolling)
        const isHorizontalSwipe = Math.abs(gesture.dx) > Math.abs(gesture.dy) * 2;
        const isSignificantMove = Math.abs(gesture.dx) > 15;
        
        // Only handle horizontal swipes and only if we're not already scrolling
        if (isHorizontalSwipe && isSignificantMove && !isSwipingCard) {
          scrollEnabled.current = false;
          setIsSwipingCard(true);
          return true;
        }
        
        return false;
      },
      
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: 0,
        });
        position.setValue({ x: 0, y: 0 });
      },
      
      onPanResponderMove: (_, gesture) => {
        // Only move the card horizontally
        position.setValue({ x: gesture.dx, y: 0 });
      },
      
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset();
        
        // Reset touch tracking
        initialTouchY.current = 0;
        initialTouchX.current = 0;
        
        // Handle card swipe
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction = gesture.dx > 0 ? 'right' : 'left';
          
          // Animate card off screen
          Animated.timing(position, {
            toValue: {
              x: direction === 'right' ? width * 1.5 : -width * 1.5,
              y: 0,
            },
            duration: 50,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex((current) => {
              const next = current + 1;
              if (next >= (profilesData?.length || 0)) {
                return 0;
              }
              return next;
            });
            setIsSwipingCard(false);
            scrollEnabled.current = true;
          });
        } else {
          // Return card to center
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }).start(() => {
            setIsSwipingCard(false);
            scrollEnabled.current = true;
          });
        }
      },
      
      onPanResponderTerminate: () => {
        // Reset touch tracking
        initialTouchY.current = 0;
        initialTouchX.current = 0;
        
        // Return card to center
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start(() => {
          setIsSwipingCard(false);
          scrollEnabled.current = true;
        });
      },
    })
  ).current;

  // Optimized interpolations
  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Render a single card
  const renderCard = useCallback((profile, index) => {
    if (!profile) return null;

    const isFirst = index === currentIndex;
    const dragHandlers = isFirst ? panResponder.panHandlers : {};

    return (
      <Animated.View
        key={`card-${profile.id}-${index}`}
        style={[
          styles.card,
          {
            transform: isFirst
              ? [{ translateX: position.x }, { rotate: rotation }]
              : [],
            opacity: isFirst ? 1 : 0,
            zIndex: isFirst ? 1 : 0,
          },
        ]}
        {...dragHandlers}
      >
        {/* Scrollable Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.cardInner}
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={16}
          scrollEnabled={scrollEnabled.current && !isSwipingCard}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
        >
          {/* Profile Image with Gradient Overlay */}
          <View style={styles.profileImageContainer}>
            <ImageBackground 
              source={
                currentIndex === 0 
                  ? require('../assets/varun.jpg') 
                  : currentIndex === 1 
                    ? require('../assets/priya.avif')
                    : currentIndex === 2
                      ? require('../assets/rahul.avif')
                      : require('../assets/seroimg.png')
              } 
              style={styles.profileImage} 
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              >
                <View style={styles.imageOverlayContent}>
                  <View style={styles.statusBar}>
                    <Text style={styles.timeText}>4:20</Text>
                    <View style={styles.statusIcons}>
                      <Ionicons name="wifi" size={16} color="#ffffff" />
                      <Ionicons name="cellular" size={16} color="#ffffff" style={{marginLeft: 4}} />
                      <Ionicons name="battery-full" size={16} color="#ffffff" style={{marginLeft: 4}} />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
          
          {/* Profile Info Card */}
          <View style={styles.profileInfoCard}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
                {profile.verified && (
                  <MaterialIcons name="verified" size={22} color="#1877f2" style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.profession}>{profile.profession}</Text>
            </View>
            
            {/* Location */}
            <View style={styles.locationContainer}>
              <View style={styles.locationBadge}>
                <Ionicons name="location-outline" size={16} color="#555555" />
                <Text style={styles.locationText}>{profile.distance}</Text>
              </View>
              <Text style={styles.locationName}>{profile.location}</Text>
            </View>
            
            {/* About */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="About" />
              <Text style={styles.bioText}>{profile.bio}</Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read more</Text>
              </TouchableOpacity>
            </View>
            
            {/* Experience - LinkedIn Style */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Experience" />
              <View style={styles.experienceContainer}>
                {profile.experience && profile.experience.map((exp, index) => (
                  <ExperienceItem key={`exp-${index}`} experience={exp} />
                ))}
              </View>
            </View>
            
            {/* Education - LinkedIn Style */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Education" />
              <View style={styles.educationContainer}>
                {profile.education && profile.education.map((edu, index) => (
                  <EducationItem key={`edu-${index}`} education={edu} />
                ))}
              </View>
            </View>
            
            {/* Skills */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Skills" />
              <View style={styles.skillsContainer}>
                {profile.skills.map((skill, index) => (
                  <Badge 
                    key={`skill-${index}`} 
                    text={skill} 
                    style={styles.skillBadge}
                    textStyle={styles.skillText}
                  />
                ))}
              </View>
            </View>
            
            {/* Availability/Current Goal */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Availability/Current Goal" />
              <View style={styles.availabilityContainer}>
                <Text style={styles.availabilityText}>{profile.availability}</Text>
              </View>
            </View>
            
            {/* Tagline */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Craft your tagline......" />
              <View style={styles.taglineContainer}>
                <Text style={styles.taglineText}>{profile.tagline}</Text>
              </View>
            </View>
            
            {/* Talents */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Drop your talents, rise up......." />
              <View style={styles.talentsContainer}>
                <Text style={styles.talentsText}>{profile.talents}</Text>
              </View>
            </View>
            
            {/* About You */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Tell more about you....." />
              <View style={styles.aboutYouContainer}>
                <Text style={styles.aboutYouText}>{profile.about}</Text>
              </View>
            </View>
            
            {/* Looking For */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Looking for" />
              <View style={styles.lookingForContainer}>
                {profile.lookingFor.map((item, index) => (
                  <Badge 
                    key={`looking-${index}`} 
                    text={item} 
                    style={styles.lookingForBadge}
                    textStyle={styles.lookingForText}
                  />
                ))}
              </View>
            </View>
            
            {/* Interests */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Interests" />
              <View style={styles.interestsContainer}>
                {profile.interests.map((interest, index) => (
                  <Badge 
                    key={`interest-${index}`} 
                    text={interest} 
                    style={styles.interestBadge}
                    textStyle={styles.interestText}
                  />
                ))}
              </View>
            </View>
            
            {/* Portfolio */}
            <View style={styles.sectionContainer}>
              <SectionHeader title="Portfolio" />
              <View style={styles.portfolioContainer}>
                <Text style={styles.portfolioText}>{profile.portfolio}</Text>
              </View>
            </View>
            
            {/* Social Links */}
            <View style={styles.socialLinksContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <LinearGradient
                  colors={['#0077B5', '#0a66c2']}
                  style={styles.socialGradient}
                >
                  <FontAwesome name="linkedin-square" size={28} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <LinearGradient
                  colors={['#E1306C', '#e94057']}
                  style={styles.socialGradient}
                >
                  <FontAwesome name="instagram" size={28} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <LinearGradient
                  colors={['#1877F2', '#1877f2']}
                  style={styles.socialGradient}
                >
                  <FontAwesome name="facebook-square" size={28} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Bottom spacer to ensure content is scrollable past the tab bar */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
        
        {/* Like/Dislike Indicators */}
        <Animated.View style={[styles.swipeIndicator, styles.likeIndicator, { opacity: likeOpacity }]}>
          <Text style={styles.likeIndicatorText}>CONNECT</Text>
        </Animated.View>
        
        <Animated.View style={[styles.swipeIndicator, styles.dislikeIndicator, { opacity: dislikeOpacity }]}>
          <Text style={styles.dislikeIndicatorText}>PASS</Text>
        </Animated.View>
      </Animated.View>
    );
  }, [currentIndex, isSwipingCard, panResponder, rotation, likeOpacity, dislikeOpacity, expandedSections]);

  // Render loading state if profiles are not yet loaded
  if (!profilesData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profiles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render no profiles state if array is empty
  if (profilesData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noProfilesContainer}>
          <Text style={styles.noProfilesText}>No profiles available</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate visible profiles - only render the current and next card for better performance
  const visibleProfiles = Array.isArray(profilesData) 
    ? profilesData.slice(
        currentIndex,
        Math.min(currentIndex + 2, profilesData.length)
      )
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Cards */}
      {visibleProfiles.map((profile, index) => renderCard(profile, currentIndex + index))}
      
      {/* Tab Bar */}
      <View style={[styles.tabBar, { paddingBottom: Platform.OS === 'ios' ? 20 : 0 }]}>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => {
            console.log('Navigating to HomeFeed screen');
            navigation.navigate('HomeFeed');
          }}
        >
          <Ionicons name="home-outline" size={24} color="#071624" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, { opacity: 1 }]}
        >
          <Ionicons name="people-outline" size={24} color="#071624" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => {
            console.log('Navigating to Events screen');
            navigation.navigate('Events');
          }}
        >
          <Ionicons name="calendar-outline" size={24} color="#071624" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => {
            console.log('Navigating to Messages screen');
            navigation.navigate('Messages');
          }}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#071624" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => {
            console.log('Navigating to ProfileScreen');
            navigation.navigate('ProfileScreen');
          }}
        >
          <Ionicons name="person-outline" size={24} color="#071624" />
        </TouchableOpacity>
      </View>
      
      {/* Manual swipe buttons for better accessibility */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Simulate left swipe
            Animated.timing(position, {
              toValue: { x: -width, y: 0 },
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setCurrentIndex((current) => {
                const next = current + 1;
                if (next >= (profilesData?.length || 0)) {
                  return 0;
                }
                return next;
              });
            });
          }}
        >
          <LinearGradient
            colors={['#ff6b81', '#e94057']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="close" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Simulate right swipe
            Animated.timing(position, {
              toValue: { x: width, y: 0 },
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setCurrentIndex((current) => {
                const next = current + 1;
                if (next >= (profilesData?.length || 0)) {
                  return 0;
                }
                return next;
              });
            });
          }}
        >
          <LinearGradient
            colors={['#4CD964', '#34c759']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="checkmark" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    left: 0,
    right: 0,
  },
  cardInner: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileImageContainer: {
    height: height * 0.55,
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  imageOverlayContent: {
    width: '100%',
  },
  statusBar: {
    position: 'absolute',
    top: -height * 0.5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  profileHeader: {
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#071624',
    letterSpacing: 0.3,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  profession: {
    fontSize: 18,
    color: '#555555',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e6ea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 4,
    fontWeight: '500',
  },
  locationName: {
    fontSize: 15,
    color: '#555555',
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeaderContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#071624',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  sectionDivider: {
    height: 2,
    width: 40,
    backgroundColor: '#e94057',
    borderRadius: 1,
  },
  bioText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  readMoreButton: {
    marginTop: 12,
  },
  readMoreText: {
    fontSize: 15,
    color: '#e94057',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  // Education styles - LinkedIn style
  educationContainer: {
    marginBottom: 10,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e6ea',
  },
  educationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  educationContent: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#071624',
    marginBottom: 4,
  },
  degreeText: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 4,
    fontWeight: '500',
  },
  yearText: {
    fontSize: 14,
    color: '#a87878',
    fontWeight: '400',
  },
  // Experience styles - LinkedIn style
  experienceContainer: {
    marginBottom: 10,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e6ea',
  },
  experienceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff0f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  experienceContent: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#071624',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 15,
    color: '#e94057',
    marginBottom: 4,
    fontWeight: '500',
  },
  durationText: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
    fontWeight: '400',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  skillBadge: {
    backgroundColor: '#f3f3f3',
    borderWidth: 0,
  },
  skillText: {
    fontSize: 14,
    color: '#071624',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  availabilityContainer: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#e94057',
  },
  availabilityText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  taglineContainer: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#a87878',
  },
  taglineText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontStyle: 'italic',
  },
  talentsContainer: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#1877f2',
  },
  talentsText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  aboutYouContainer: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#071624',
  },
  aboutYouText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  lookingForContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lookingForBadge: {
    backgroundColor: '#f8f0f0',
    borderWidth: 0,
  },
  lookingForText: {
    fontSize: 14,
    color: '#a87878',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestBadge: {
    backgroundColor: '#f0f5ff',
    borderWidth: 0,
  },
  interestText: {
    fontSize: 14,
    color: '#1877f2',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  portfolioContainer: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#555555',
  },
  portfolioText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontStyle: 'italic',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  socialButton: {
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  socialGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
  swipeIndicator: {
    position: 'absolute',
    top: height * 0.3,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  likeIndicator: {
    right: 20,
    borderColor: '#4CD964',
  },
  dislikeIndicator: {
    left: 20,
    borderColor: '#e94057',
  },
  likeIndicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CD964',
    letterSpacing: 1,
  },
  dislikeIndicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94057',
    letterSpacing: 1,
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
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  noProfilesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfilesText: {
    fontSize: 18,
    color: '#555555',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#555555',
    fontWeight: '500',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    zIndex: 10,
  },
  actionButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SwipeCardScreen;