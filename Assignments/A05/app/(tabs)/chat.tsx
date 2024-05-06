import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

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
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userMessages, setUserMessages] = useState<{ [userId: string]: Message[] }>({});

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    // Initialize messages for the selected user if not already initialized
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
        <Text style={styles.heading}>Users</Text>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserSelect(item)}>
              <Text style={styles.userItem}>{item.name}</Text>
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
                <View style={styles.message}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setMessage}
                value={message}
                placeholder="Type a message..."
                multiline
              />
              <Button title="Send" onPress={handleMessageSend} />
            </View>
          </>
        ) : (
          <Text style={styles.selectUserText}>Please select a user to start chatting</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  userList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userItem: {
    fontSize: 16,
    marginBottom: 10,
    color: 'blue',
  },
  chatContainer: {
    flex: 3,
    padding: 20,
  },
  message: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    maxHeight: 150,
  },
  selectUserText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ChatScreen;
