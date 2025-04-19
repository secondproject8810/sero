import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

const HomeFeedScreen = ({ navigation }) => {
  const posts = [
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        handle: '@priyasharma',
        avatar: require('../assets/dakshkamboj.avif'),
        bio: 'Tech Entrepreneur | Founder @TechStartIndia | IIT Delhi Alumnus | Building the future of Indian tech',
        location: 'New Delhi, India',
        followers: 1250,
        following: 850,
        connections: 320
      },
      date: '10/03/25',
      content: 'Just launched our new AI-powered edtech platform for Indian students! Excited to revolutionize education in India 🇮🇳 #EdTech #StartupIndia',
      images: [require('../assets/bhagclub.jpg')],
      comments: 7,
      retweets: 1,
      likes: 3,
    },
    {
      id: '2',
      user: {
        name: 'Rahul Verma',
        handle: '@rahulv',
        avatar: require('../assets/vanshrathi.avif'),
        bio: 'Digital Marketing Expert | Content Creator | Helping Indian brands go global',
        location: 'Mumbai, India',
        followers: 980,
        following: 450,
        connections: 210
      },
      date: '9/03/25',
      content: 'Looking for passionate content creators to join our digital marketing agency in Mumbai! DM if interested #DigitalIndia #ContentCreation',
      images: [],
      comments: 7,
      retweets: 1,
      likes: 3,
    },
    {
      id: '3',
      user: {
        name: 'Ananya Patel',
        handle: '@ananyap',
        avatar: require('../assets/pragunmittal.avif'),
        bio: 'Fashion Designer | Sustainable Fashion Advocate | NIFT Graduate',
        location: 'Ahmedabad, India',
        followers: 1500,
        following: 600,
        connections: 280
      },
      date: '10/03/25',
      content: 'Launching our new sustainable fashion line made with traditional Indian fabrics! Preserving heritage while being eco-friendly 🌿 #SustainableFashion #MakeInIndia',
      images: [require('../assets/photoshoot.jpg')],
      comments: 4,
      retweets: 2,
      likes: 8,
    },
    {
      id: '4',
      user: {
        name: 'Arjun Mehta',
        handle: '@arjunm',
        avatar: require('../assets/aishapatel.avif'),
        bio: 'Software Engineer | Open Source Contributor | Building India\'s tech community',
        location: 'Bangalore, India',
        followers: 2000,
        following: 800,
        connections: 450
      },
      date: '10/03/25',
      content: 'Hosting a free coding workshop for underprivileged students this weekend. Let\'s bridge the digital divide! #TechForGood #DigitalIndia',
      images: [],
      comments: 12,
      retweets: 5,
      likes: 24,
    },
    {
      id: '5',
      user: {
        name: 'Neha Kapoor',
        handle: '@nehak',
        avatar: require('../assets/rohansharma.avif'),
        bio: 'UX Designer | Product Manager | Creating user-centric digital experiences',
        location: 'Hyderabad, India',
        followers: 1800,
        following: 700,
        connections: 380
      },
      date: '9/03/25',
      content: 'Just completed our new fintech app design! Focused on making digital payments accessible to all Indians 💳 #FinTech #UXDesign',
      images: [require('../assets/website.png')],
      comments: 9,
      retweets: 3,
      likes: 17,
    },
    {
      id: '6',
      user: {
        name: 'Vikram Singh',
        handle: '@vikrams',
        avatar: require('../assets/nehagupta.avif'),
        bio: 'Social Entrepreneur | Founder @EduForAll | Working towards quality education for all',
        location: 'Chennai, India',
        followers: 1600,
        following: 750,
        connections: 420
      },
      date: '8/03/25',
      content: 'Looking for volunteers to teach coding in rural schools. Let\'s empower the next generation of Indian innovators! #EducationForAll #CodingForKids',
      images: [],
      comments: 15,
      retweets: 8,
      likes: 6,
    },
  ];

  const renderPost = (post) => {
    return (
      <View key={post.id} style={styles.postContainer}>
        <View style={styles.postHeader}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('UserProfileScreen', { userId: post.user.handle.replace('@', '') })}
          >
            <Image source={post.user.avatar} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.postHeaderText}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{post.user.name}</Text>
              <Text style={styles.userHandle}>{post.user.handle}</Text>
              <Text style={styles.postDate}>·{post.date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Feather name="chevron-down" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        {/* Image container moved above content container */}
        {post.images.length > 0 && (
          <View style={styles.imageContainer}>
            <Image source={post.images[0]} style={styles.postImage} />
          </View>
        )}
        
        <View style={styles.contentContainer}>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
        
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={18} color="#8E8E93" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="retweet" size={18} color="#8E8E93" />
            <Text style={styles.actionText}>{post.retweets}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="heart" size={18} color="#8E8E93" />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Image 
                source={require('../assets/profilepic.avif')} 
                style={styles.profileImage} 
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>What's happening today?</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {posts.map(post => renderPost(post))}
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('HomeFeed')}
        >
          <Ionicons name="home" size={24} color="#000" />
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  scrollView: {
    flex: 1,
  },
  postContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 4,
  },
  userHandle: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 4,
  },
  postDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  moreButton: {
    padding: 4,
  },
  imageContainer: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 48,
    marginBottom: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#8E8E93',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginTop: 8,
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

export default HomeFeedScreen;