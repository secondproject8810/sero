import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const conversations = [
  {
    id: '1',
    name: 'Startup Club',
    lastMessage: 'Sticker 🔥',
    time: '25 min',
    avatar: require('../assets/startup.jpeg'),
    unread: 1,
  },
  {
    id: '2',
    name: 'Ria',
    lastMessage: 'Typing..',
    time: '27 min',
    avatar: require('../assets/ria.avif'),
    unread: 2,
  },
  
  {
    id: '4',
    name: 'Vansh',
    lastMessage: 'You: Hey! What\'s up, long time..',
    time: '50 min',
    avatar: require('../assets/vanshrathi.avif'),
    unread: 0,
  },
  {
    id: '5',
    name: 'Aryan',
    lastMessage: 'You: Hello how are you?',
    time: '55 min',
    avatar: require('../assets/aryan.jpg'),
    unread: 0,
  },
  {
    id: '6',
    name: 'Mehar',
    lastMessage: 'You: Great I will write later..',
    time: '1 hour',
    avatar: require('../assets/mehar.avif'),
    unread: 0,
  },
];

const MessagesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Chat', { conversation: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
      </View>
      
      <View style={styles.conversationDetails}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>
      
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderTitle}>Messages</Text>
      </View>
      
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
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
          onPress={() => navigation.navigate('Messages')}
        >
          <Ionicons name="chatbubble" size={24} color="#000" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  subheaderContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subheaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  conversationTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

export default MessagesScreen;