import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
}

interface User {
  id: string;
  name: string;
}

const ChatScreen = () => {
  const [message, setMessage] = useState<string>('');
  const [users] = useState<User[]>([
    { id: '1', name: 'Brayden Lawson' },
    { id: '2', name: 'Jorge Santos' },
    { id: '3', name: 'Dr.Griffin' },
    { id: '4', name: 'Willy Wonka' },
    { id: '5', name: 'Joker' },
    { id: '6', name: 'Batman' },


  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userMessages, setUserMessages] = useState<{ [userId: string]: Message[] }>({});

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    if (!userMessages[user.id]) {
      setUserMessages(prevUserMessages => ({ ...prevUserMessages, [user.id]: [] }));
    }
  };

  const handleMessageSend = () => {
    if (!selectedUser || message.trim() === '') return;
    const newMessage: Message = { id: Date.now().toString(), text: message };
    setUserMessages(prevUserMessages => ({
      ...prevUserMessages,
      [selectedUser.id]: [...prevUserMessages[selectedUser.id], newMessage],
    }));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userList}>
        <Text style={styles.heading}>🍭 Users</Text>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserSelect(item)}>
              <Text style={[styles.userItem, selectedUser?.id === item.id && styles.selectedUser]}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.chatContainer}>
        {selectedUser ? (
          <>
            <FlatList
              data={userMessages[selectedUser.id] || []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={[styles.message, styles.receiverMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setMessage}
                value={message}
                placeholder="Type a sweet message..."
                multiline
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={handleMessageSend}>
                <MaterialIcons name="send" size={24} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.selectUserText}>🍬 Please select a user to start chatting</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffe4e1',
  },
  userList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ff69b4',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#ff69b4',
  },
  userItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ff69b4',
  },
  selectedUser: {
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  chatContainer: {
    flex: 3,
    padding: 20,
  },
  message: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  receiverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffb6c1',
    marginLeft: '20%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ff69b4',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ff69b4',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    maxHeight: 150,
    backgroundColor: '#fff',
    color: '#333',
  },
  selectUserText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#ff69b4',
  },
});

export default ChatScreen;
