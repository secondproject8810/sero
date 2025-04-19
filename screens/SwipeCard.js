import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 200;

const users = [
  {
    id: '1',
    name: 'Pragun',
    title: 'Photography Business Owner',
    location: 'Delhi, India',
    image: require('../assets/images/pragunmittal.avif'),
    description: 'Specializes in commercial and event photography. Looking for reliable video editors for quick turnarounds.',
    skills: ['Photography', 'Commercial Shoots', 'Event Coverage'],
    experience: '5 years',
    rating: 4.8,
    projects: 120,
  },
  {
    id: '2',
    name: 'Ishaan',
    title: 'Video Editor',
    location: 'Noida, India',
    image: require('../assets/images/varun.jpg'),
    description: 'Expert in video editing and post-production. Works primarily through local referrals.',
    skills: ['Video Editing', 'Post-Production', 'Color Grading'],
    experience: '3 years',
    rating: 4.9,
    projects: 85,
  },
  {
    id: '3',
    name: 'Riya',
    title: 'Content Creator',
    location: 'Mumbai, India',
    image: require('../assets/images/ria.jpg'),
    description: 'Social media content creator looking for reliable editors for consistent content production.',
    skills: ['Content Creation', 'Social Media', 'Branding'],
    experience: '2 years',
    rating: 4.7,
    projects: 45,
  },
  {
    id: '4',
    name: 'Arjun',
    title: 'Wedding Photographer',
    location: 'Bangalore, India',
    image: require('../assets/images/aryan.jpg'),
    description: 'Specializes in wedding photography and videography. Needs quick editing support for event coverage.',
    skills: ['Wedding Photography', 'Event Coverage', 'Portrait'],
    experience: '4 years',
    rating: 4.9,
    projects: 150,
  },
  {
    id: '5',
    name: 'Neha',
    title: 'Fashion Photographer',
    location: 'Delhi, India',
    image: require('../assets/images/priya.avif'),
    description: 'Fashion and lifestyle photographer seeking reliable editors for consistent brand content.',
    skills: ['Fashion Photography', 'Brand Content', 'Lifestyle'],
    experience: '3 years',
    rating: 4.8,
    projects: 90,
  },
  {
    id: '6',
    name: 'Varun',
    title: 'Commercial Photographer',
    location: 'Mumbai, India',
    image: require('../assets/images/varun.jpg'),
    description: 'Commercial photographer specializing in product and brand shoots. Looking for quick editing turnaround.',
    skills: ['Product Photography', 'Brand Shoots', 'Commercial'],
    experience: '4 years',
    rating: 4.7,
    projects: 110,
  },
  {
    id: '7',
    name: 'Priya',
    title: 'Event Photographer',
    location: 'Bangalore, India',
    image: require('../assets/images/priya.avif'),
    description: 'Event photographer with expertise in corporate and social events. Needs reliable editing support.',
    skills: ['Event Photography', 'Corporate Events', 'Social Events'],
    experience: '3 years',
    rating: 4.8,
    projects: 95,
  },
  {
    id: '8',
    name: 'Aryan',
    title: 'Portrait Photographer',
    location: 'Delhi, India',
    image: require('../assets/images/aryan.jpg'),
    description: 'Specializes in portrait and lifestyle photography. Looking for consistent editing partners.',
    skills: ['Portrait Photography', 'Lifestyle', 'Fashion'],
    experience: '5 years',
    rating: 4.9,
    projects: 130,
  },
  {
    id: '9',
    name: 'Ria',
    title: 'Wedding Videographer',
    location: 'Mumbai, India',
    image: require('../assets/images/ria.jpg'),
    description: 'Wedding videographer seeking reliable editors for quick post-production turnaround.',
    skills: ['Wedding Videography', 'Event Coverage', 'Post-Production'],
    experience: '3 years',
    rating: 4.7,
    projects: 80,
  },
  {
    id: '10',
    name: 'Pragun Mittal',
    title: 'Commercial Videographer',
    location: 'Noida, India',
    image: require('../assets/images/pragunmittal.avif'),
    description: 'Commercial videographer specializing in brand content. Needs quick editing support.',
    skills: ['Commercial Videography', 'Brand Content', 'Corporate'],
    experience: '4 years',
    rating: 4.8,
    projects: 100,
  }
];

const SwipeCard = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = useCallback((direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.spring(position, {
      toValue: { x, y: 0 },
      useNativeDriver: true,
      tension: 50,
      friction: 8,
      velocity: 0.3,
    }).start(() => onSwipeComplete(direction));
  }, [position]);

  const onSwipeComplete = useCallback((direction) => {
    const user = users[currentIndex];
    direction === 'right' 
      ? setLikedUsers([...likedUsers, user])
      : setDislikedUsers([...dislikedUsers, user]);

    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  }, [currentIndex, likedUsers, dislikedUsers, position]);

  const resetPosition = useCallback(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      tension: 50,
      friction: 8,
      velocity: 0.3,
    }).start();
  }, [position]);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    const scale = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [0.8, 1, 0.8],
    });

    return {
      ...position.getLayout(),
      transform: [
        { rotate },
        { scale }
      ],
    };
  };

  const renderCard = (item, index) => {
    if (index < currentIndex) return null;

    if (index === currentIndex) {
      return (
        <Animated.View
          key={item.id}
          style={[styles.card, getCardStyle()]}
          {...panResponder.panHandlers}
        >
          <Image source={item.image} style={styles.image} />
          <View style={styles.infoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#666666" />
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.experience}</Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.projects}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
            </View>
            <View style={styles.skillsContainer}>
              {item.skills.map((skill, skillIndex) => (
                <View key={skillIndex} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.card,
          {
            top: 10 * (index - currentIndex),
            opacity: 1 - (index - currentIndex) * 0.2,
            transform: [{ scale: 1 - (index - currentIndex) * 0.05 }],
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666666" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {users.map((user, index) => renderCard(user, index))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
          onPress={() => forceSwipe('left')}
        >
          <Ionicons name="close" size={32} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={() => forceSwipe('right')}
        >
          <Ionicons name="heart" size={32} color="#4CD964" />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E6EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH * 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#666666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#999999',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: '#4CD964',
  },
});

export default SwipeCard; 