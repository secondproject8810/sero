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
import { userProfiles } from '../data/userProfiles';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const { userId } = route.params;
  
  // Get user data with fallback to prevent undefined errors
  const userData = userProfiles[userId] || {
    name: 'Unknown User',
    handle: '@unknown',
    avatar: require('../assets/mehar.avif'),
    bio: 'No bio available',
    location: 'Location not specified',
    followers: 0,
    following: 0,
    connections: 0,
    skills: [],
    availability: 'Not specified',
    tagline: 'Not specified',
    talents: 'Not specified',
    about: 'Not specified',
    lookingFor: [],
    interests: [],
    portfolio: 'Not specified',
    experience: [],
    education: [],
    posts: [],
    media: []
  };

  const ProfileHeader = () => (
    <>
      <View style={styles.coverPhotoContainer}>
        <Image source={userData.coverPhoto || require('../assets/mehar.avif')} style={styles.coverPhoto} />
      </View>

      <View style={styles.profileInfo}>
        <Image source={userData.avatar} style={styles.profileAvatar} />
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.handle}>{userData.handle}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#666" />
          {userData.location}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
          onPress={() => setActiveTab('Profile')}
        >
          <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Posts' && styles.activeTab]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Media' && styles.activeTab]}
          onPress={() => setActiveTab('Media')}
        >
          <Text style={[styles.tabText, activeTab === 'Media' && styles.activeTabText]}>Media</Text>
        </TouchableOpacity>
      </View>
    </>
  );

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
    </ScrollView>
  );

  const renderPostsTab = () => (
    <FlatList
      data={userData.posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image source={userData.avatar} style={styles.avatar} />
            <View style={styles.postUserInfo}>
              <Text style={styles.postUsername}>{userData.name}</Text>
              <Text style={styles.postHandle}>{userData.handle}</Text>
            </View>
          </View>
          <Text style={styles.postContent}>{item.content}</Text>
          {item.images && item.images.length > 0 && (
            <Image source={item.images[0]} style={styles.postImage} />
          )}
          <View style={styles.postStats}>
            <Text style={styles.postStat}>{item.likes} likes</Text>
            <Text style={styles.postStat}>{item.comments} comments</Text>
            <Text style={styles.postStat}>{item.shares} shares</Text>
          </View>
        </View>
      )}
    />
  );

  const renderMediaTab = () => (
    <View style={styles.mediaGrid}>
      {userData.media && userData.media.length > 0 ? (
        userData.media.map((item) => (
          <View key={item.id} style={styles.mediaItem}>
            {item.type === 'image' ? (
              <Image source={item.source} style={styles.mediaImage} />
            ) : (
              <View style={styles.videoContainer}>
                <Image source={item.source} style={styles.mediaImage} />
                <View style={styles.videoOverlay}>
                  <Ionicons name="play" size={24} color="white" />
                  <Text style={styles.videoDuration}>{item.duration}</Text>
                </View>
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={styles.noMediaContainer}>
          <Text style={styles.noMediaText}>No media available</Text>
        </View>
      )}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <FlatList
            data={[{ key: 'profile' }]}
            renderItem={() => renderProfileTab()}
            ListHeaderComponent={ProfileHeader}
          />
        );
      case 'Posts':
        return (
          <FlatList
            data={userData.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={userData.avatar} style={styles.avatar} />
                  <View style={styles.postUserInfo}>
                    <Text style={styles.postUsername}>{userData.name}</Text>
                    <Text style={styles.postHandle}>{userData.handle}</Text>
                  </View>
                </View>
                <Text style={styles.postContent}>{item.content}</Text>
                {item.images && item.images.length > 0 && (
                  <Image source={item.images[0]} style={styles.postImage} />
                )}
                <View style={styles.postStats}>
                  <Text style={styles.postStat}>{item.likes} likes</Text>
                  <Text style={styles.postStat}>{item.comments} comments</Text>
                  <Text style={styles.postStat}>{item.shares} shares</Text>
                </View>
              </View>
            )}
            ListHeaderComponent={ProfileHeader}
          />
        );
      case 'Media':
        return (
          <FlatList
            data={[{ key: 'media' }]}
            renderItem={() => renderMediaTab()}
            ListHeaderComponent={ProfileHeader}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userData.name}</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  coverPhotoContainer: {
    height: 200,
    width: '100%',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: -60,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  handle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  bio: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
  },
  textBox: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  regularText: {
    fontSize: 16,
    lineHeight: 24,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 14,
  },
  portfolioBox: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  expLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
  },
  expLogo: {
    width: '100%',
    height: '100%',
  },
  expDetails: {
    flex: 1,
  },
  expRole: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expCompany: {
    fontSize: 14,
    color: '#666',
  },
  expPeriod: {
    fontSize: 14,
    color: '#666',
  },
  expLocation: {
    fontSize: 14,
    color: '#666',
  },
  expDescription: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  expSkillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  expSkillsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eduLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
  },
  eduLogo: {
    width: '100%',
    height: '100%',
  },
  eduDetails: {
    flex: 1,
  },
  eduSchool: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eduDegree: {
    fontSize: 14,
    color: '#666',
  },
  eduPeriod: {
    fontSize: 14,
    color: '#666',
  },
  eduGrade: {
    fontSize: 14,
    color: '#666',
  },
  eduActivities: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  eduSkillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  eduSkillsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postUserInfo: {
    marginLeft: 12,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postHandle: {
    fontSize: 14,
    color: '#666',
  },
  postContent: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 8,
  },
  postStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  postStat: {
    fontSize: 14,
    color: '#666',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaItem: {
    width: width / 3,
    height: width / 3,
    padding: 1,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    position: 'relative',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    borderRadius: 4,
  },
  videoDuration: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  noMediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMediaText: {
    fontSize: 16,
    color: '#666',
  },
});

export default UserProfileScreen; 