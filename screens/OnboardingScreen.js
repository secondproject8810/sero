import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Network',
    description: 'Users connect through shared interest relating passions to discover interests and valuable connections.',
    image: require('../assets/onboarding1.jpg'),
  },
  {
    id: '2',
    title: 'Socialise',
    description: 'We connect you with the shared passion for connection.',
    image: require('../assets/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Connect',
    description: 'Step up today and enjoy the best match of potential business to an event.',
    image: require('../assets/onboarding3.jpg'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => {
            if (index === onboardingData.length - 1) {
              navigation.navigate('SignUp');
            } else {
              flatListRef.current.scrollToIndex({ index: index + 1 });
            }
          }}
        >
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>
        
        <View style={styles.signInContainer}>
          <Text style={styles.alreadyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { opacity: index === currentIndex ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#000000',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 40,
    lineHeight: 22,
  },
  createButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  alreadyText: {
    color: '#000000',
    fontSize: 14,
  },
  signInText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
    marginHorizontal: 5,
  },
});

export default OnboardingScreen;