import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const userData = route.params?.user || {
    name: 'Yug Jindal',
    username: '@yugj',
    bio: 'CSE Sophomore at JIIT Noida | SIH\'24 Winner | AI & Web 5 Enthusiast | 3x Startup Contest Winner | 2x Hackathon Winner | Web Developer',
    joinDate: 'Joined February 2023',
    following: 217,
    followers: 143,
    connections: 50,
    location: 'Noida, India',
    skills: ['Linux', 'Javascript', 'React', 'Editing', 'Front End'],
    availability: 'Looking for networking and collaboration in noida!',
    tagline: 'Building Epic React Experiences & Slicing Videos Like a Creative Boss',
    talents: 'Powering Up React Projects / Building Web Looks That Rule / Cutting Videos With Swagger',
    about: 'I create React web projects that run like a charm and cut videos that have a real kick. We\'d vibe perfectly if you\'re ready to work on something exciting with me!',
    lookingFor: ['Network', 'Social', 'Professional'],
    interests: ['Travelling', 'Books', 'Music', 'Dancing', 'Modeling'],
    portfolio: 'Add your portfolio link here....',
    avatar: require('../assets/profilepic.avif'),
    coverPhoto: require('../assets/coverphoto.avif'),
    experience: [
      {
        id: '1',
        role: 'Tech CSE Team Member',
        company: 'IEEE Student Branch JIIT Noida',
        type: 'Part-time',
        location: 'Hybrid',
        period: 'Jul 2023 - Present · 8 mos',
        description: 'Spearheaded a 5-day Gen AI Bootcamp, achieving 90%+ project success and record-breaking...',
        skills: ['NumPy', 'Pandas'],
        skillCount: 1,
        logo: require('../assets/ieee.jpg'),
      },
      {
        id: '2',
        role: 'Technical Team Member',
        company: 'AIML Hub of JIT',
        type: 'Part-time',
        location: 'Noida, Uttar Pradesh, India · On-site',
        period: 'Mar 2024 - Oct 2024 · 8 mos',
        description: 'Conducted research on advanced AIML algorithms, collaborated on innovative projects, organic...',
        skills: ['NumPy', 'Pandas'],
        skillCount: 1,
        logo: require('../assets/aiml.jpeg'),
      },
      {
        id: '3',
        role: 'Organising Team',
        company: 'Delhi Kotlin User Group',
        type: 'Part-time',
        location: 'New Delhi, Delhi, India · Hybrid',
        period: 'May 2024 - Jun 2024 · 2 mos',
        description: 'In the organising team of Kotlin Conf 2024 Delhi NCR, India\'s biggest Kotlin Conf as a video editor.',
        skills: ['Public Speaking', 'Adobe premier pro'],
        skillCount: 4,
        logo: require('../assets/kotlin.png'),
      },
    ],
    education: [
      {
        id: '1',
        school: 'Jaypee Institute Of Information Technology',
        degree: 'B.Tech, Computer science and engineering',
        period: 'Jul 2023 - Jul 2027',
        skills: ['Internet of Things (IoT)', 'STEM'],
        skillCount: 6,
        logo: require('../assets/jiit.jpeg'),
      },
      {
        id: '2',
        school: 'Presidium School',
        degree: 'High school, PCM with CS',
        period: 'Apr 2011 - May 2023',
        grade: 'Grade: 94% in computer science',
        activities: 'Activities and societies: Participated in Hackathons and other coding competitions.',
        skills: ['MySQL', 'STEM'],
        skillCount: 1,
        logo: require('../assets/presidium.png'),
      },
    ],
    posts: [
      {
        id: '1',
        content: 'Scheme Constructor - your ultimate prototyping kit for all UX web and mobileapp design!',
        link: 'constructor.pixsellz.io',
        hashtags: ['#prototyping', '#wireframe', '#uidx', '#ux'],
        video: require('../assets/scheme.jpg'),
        date: '5/03/25',
        views: 109,
        likes: 15,
        comments: 2,
        shares: 3,
      }
    ],
    media: [
      { id: '1', type: 'image', source: require('../assets/scheme.jpg') },
      { id: '4', type: 'video', source: require('../assets/seroimg.png'), duration: '0:45' },
    ]
  };

  const renderProfileTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {userData.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability/Current Goal</Text>
        <View style={styles.textBox}>
          <Text style={styles.regularText}>{userData.availability}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Craft your tagline......</Text>
        <View style={styles.textBox}>
          <Text style={styles.regularText}>{userData.tagline}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drop your talents, rise up.......</Text>
        <View style={styles.textBox}>
          <Text style={styles.regularText}>{userData.talents}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tell more about you......</Text>
        <View style={styles.textBox}>
          <Text style={styles.regularText}>{userData.about}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Looking for</Text>
        <View style={styles.badgesContainer}>
          {userData.lookingFor.map((item, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.badgesContainer}>
          {userData.interests.map((interest, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <View style={styles.portfolioBox}>
          <Text style={styles.regularText}>{userData.portfolio}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {userData.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.expLogoContainer}>
              <Image source={exp.logo} style={styles.expLogo} />
            </View>
            <View style={styles.expDetails}>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expCompany}>{exp.company} · {exp.type}</Text>
              <Text style={styles.expPeriod}>{exp.period}</Text>
              <Text style={styles.expLocation}>{exp.location}</Text>
              <Text style={styles.expDescription}>{exp.description}</Text>
              <View style={styles.expSkillsContainer}>
                <Ionicons name="heart" size={16} color="#666" />
                <Text style={styles.expSkillsText}>
                  {exp.skills.join(', ')} and +{exp.skillCount} skill
                </Text>
              </View>
              
              {index === 2 && (
                <View style={styles.linkedinPostContainer}>
                  <Image source={require('../assets/kotlinpost.jpeg')} style={styles.linkedinPostImage} />
                  <Text style={styles.linkedinPostText}>LinkedIn Post</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {userData.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.eduLogoContainer}>
              <Image source={edu.logo} style={styles.eduLogo} />
            </View>
            <View style={styles.eduDetails}>
              <Text style={styles.eduSchool}>{edu.school}</Text>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduPeriod}>{edu.period}</Text>
              {edu.grade && <Text style={styles.eduGrade}>{edu.grade}</Text>}
              {edu.activities && <Text style={styles.eduActivities}>{edu.activities}</Text>}
              <View style={styles.eduSkillsContainer}>
                <Ionicons name="heart" size={16} color="#666" />
                <Text style={styles.eduSkillsText}>
                  {edu.skills.join(', ')} and +{edu.skillCount} skill
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.socialLinksContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/linkedin.jpg')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/x.avif')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/insta.jpeg')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );

  const renderPostsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {userData.posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <View style={styles.postHeader}>
            <View style={styles.postUserInfo}>
              <Image source={userData.avatar} style={styles.postAvatar} />
              <View>
                <View style={styles.postNameContainer}>
                  <Text style={styles.postName}>{userData.name}</Text>
                  <Text style={styles.postUsername}>{userData.username} · {post.date}</Text>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                <Text style={styles.postLink}>{post.link}</Text>
                <View style={styles.hashtagsContainer}>
                  {post.hashtags.map((tag, index) => (
                    <Text key={index} style={styles.hashtag}>{tag}</Text>
                  ))}
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.postMoreButton}>
              <Feather name="more-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.postVideoContainer}>
            <Image source={post.video} style={styles.postVideo} />
            <View style={styles.playButtonContainer}>
              <Ionicons name="play" size={24} color="#fff" />
            </View>
            <View style={styles.videoDurationContainer}>
              <Text style={styles.videoDuration}>0:11</Text>
            </View>
          </View>
          
          <View style={styles.postStats}>
            <Text style={styles.postViews}>{post.views} views</Text>
          </View>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="heart-outline" size={22} color="#666" />
              <Text style={styles.actionCount}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={22} color="#666" />
              <Text style={styles.actionCount}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="arrow-redo-outline" size={22} color="#666" />
              <Text style={styles.actionCount}>{post.shares}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="share-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );

  const renderMediaTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.mediaGrid}>
        {userData.media.map((item) => (
          <View key={item.id} style={styles.mediaItem}>
            <Image source={item.source} style={styles.mediaImage} />
            {item.type === 'video' && (
              <>
                <View style={styles.mediaPlayButton}>
                  <Ionicons name="play" size={20} color="#fff" />
                </View>
                <View style={styles.mediaDurationContainer}>
                  <Text style={styles.mediaDuration}>{item.duration}</Text>
                </View>
              </>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return renderProfileTab();
      case 'Post':
        return renderPostsTab();
      case 'Media':
        return renderMediaTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.coverPhotoContainer}>
          <Image source={userData.coverPhoto} style={styles.coverPhoto} />
          <View style={styles.coverGradient} />
        </View>
        
        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image source={userData.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Feather name="edit-2" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{userData.name}</Text>
            <Text style={styles.usernameText}>{userData.username}</Text>
          </View>
          
          <Text style={styles.bioText}>{userData.bio}</Text>
          
          <Text style={styles.joinDateText}>{userData.joinDate}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.connections}</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Feather name="share-2" size={18} color="#1E1E2C" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'Profile' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('Profile')}
          >
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'Profile' && styles.activeTabButtonText
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'Post' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('Post')}
          >
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'Post' && styles.activeTabButtonText
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'Media' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('Media')}
          >
            <Text 
              style={[
                styles.tabButtonText, 
                activeTab === 'Media' && styles.activeTabButtonText
              ]}
            >
              Media
            </Text>
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to HomeFeed screen');
            navigation.navigate('HomeFeed');
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
          onPress={() => {
            console.log('Navigating to Events screen');
            navigation.navigate('Events');
          }}
        >
          <Ionicons name="calendar-outline" size={24} color="#8E8E93" />
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
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Ionicons name="person" size={24} color="#000" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E1E2C',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  coverPhotoContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -60,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1E2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameContainer: {
    marginBottom: 8,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 16,
    color: '#6C757D',
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1E1E2C',
    marginBottom: 12,
  },
  joinDateText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E9ECEF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E2C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E9ECEF',
    alignSelf: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#1E1E2C',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E2C',
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#1E1E2C',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C757D',
  },
  activeTabButtonText: {
    color: '#1E1E2C',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  skillBadge: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  skillText: {
    fontSize: 14,
    color: '#000000',
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 5,
    padding: 12,
  },
  regularText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  badge: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  badgeText: {
    fontSize: 14,
    color: '#000000',
  },
  portfolioBox: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 5,
    padding: 12,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  expLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  expLogo: {
    width: 40,
    height: 40,
  },
  expDetails: {
    flex: 1,
  },
  expRole: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  expPeriod: {
    fontSize: 14,
    color: '#687684',
    marginBottom: 2,
  },
  expLocation: {
    fontSize: 14,
    color: '#687684',
    marginBottom: 5,
  },
  expDescription: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 5,
  },
  expSkillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  expSkillsText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 5,
  },
  linkedinPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 5,
  },
  linkedinPostImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  linkedinPostText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  eduLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  eduLogo: {
    width: 40,
    height: 40,
  },
  eduDetails: {
    flex: 1,
  },
  eduSchool: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  eduDegree: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  eduPeriod: {
    fontSize: 14,
    color: '#687684',
    marginBottom: 2,
  },
  eduGrade: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  eduActivities: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 5,
  },
  eduSkillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eduSkillsText: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 5,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  socialButton: {
    marginHorizontal: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postUserInfo: {
    flexDirection: 'row',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 5,
  },
  postUsername: {
    fontSize: 14,
    color: '#687684',
  },
  postContent: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginTop: 5,
  },
  postLink: {
    fontSize: 14,
    color: '#4C9EEB',
    marginTop: 5,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  hashtag: {
    fontSize: 14,
    color: '#4C9EEB',
    marginRight: 5,
  },
  postMoreButton: {
    padding: 5,
  },
  postVideoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    position: 'relative',
  },
  postVideo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  videoDurationContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoDuration: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  postStats: {
    marginVertical: 10,
  },
  postViews: {
    fontSize: 14,
    color: '#687684',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCount: {
    fontSize: 14,
    color: '#687684',
    marginLeft: 5,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  mediaItem: {
    width: width / 3 - 4,
    height: width / 3 - 4,
    margin: 2,
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 4,
  },
  mediaPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  mediaDurationContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mediaDuration: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  bottomSpacer: {
    height: 60,
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
});

export default ProfileScreen;