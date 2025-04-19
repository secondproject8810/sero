import React, { useState } from 'react';
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const initialMessages = [
  {
    id: '1',
    text: "Hi Daksh, how are you? I saw on the app that we've crossed paths several times this week in college 😊",
    sender: 'them',
    time: '2:55 PM',
  },
  {
    id: '2',
    text: "Haha truly! Nice to meet you Vansh! What about a cup of coffee today evening in the cafeteria? ☕",
    sender: 'me',
    time: '3:02 PM',
    read: true,
  },
  {
    id: '3',
    text: "Sure, let's do it! 😀",
    sender: 'them',
    time: '3:10 PM',
  },
  {
    id: '4',
    text: "Great !",
    sender: 'me',
    time: '3:12 PM',
    read: true,
  },
];

const ChatScreen = ({ route, navigation }) => {
  const { conversation } = route.params;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessageContainer : styles.theirMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessageBubble : styles.theirMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'me' ? styles.myMessageText : styles.theirMessageText
        ]}>
          {item.text}
        </Text>
      </View>
      <View style={styles.messageTimeContainer}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.sender === 'me' && item.read && (
          <Ionicons name="checkmark-done" size={16} color="#8E8E93" style={styles.readIcon} />
        )}
      </View>
    </View>
  );

  const renderDateSeparator = () => (
    <View style={styles.dateSeparator}>
      <View style={styles.dateLine} />
      <Text style={styles.dateText}>Today</Text>
      <View style={styles.dateLine} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.profileContainer}>
            <Image source={conversation.avatar} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{conversation.name}</Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderDateSeparator}
          inverted={false}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Your message"
              placeholderTextColor="#8E8E93"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.scheduleButton}>
              <Ionicons name="time-outline" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to HomeFeed screen');
            navigation.navigate('HomeFeed');
          }}
        >
          <Ionicons name="home" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to SwipeCard screen');
            navigation.navigate('SwipeCard');
          }}
        >
          <Ionicons name="people" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to Events screen');
            navigation.navigate('Events');
          }}
        >
          <Ionicons name="calendar" size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {
            console.log('Navigating to Messages screen');
            navigation.navigate('Messages');
          }}
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
          <Ionicons name="person" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginRight: 5,
  },
  onlineText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dateText: {
    fontSize: 14,
    color: '#8E8E93',
    marginHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  myMessageBubble: {
    backgroundColor: '#FFFFFF',
  },
  theirMessageBubble: {
    backgroundColor: '#E9E9EB',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#000000',
  },
  theirMessageText: {
    color: '#000000',
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  readIcon: {
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
    maxHeight: 100,
  },
  scheduleButton: {
    padding: 5,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default ChatScreen;