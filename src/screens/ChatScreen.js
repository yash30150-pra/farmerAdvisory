// src/screens/ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../utils/colors';
import { t } from '../utils/i18n';
import { getChatResponse, QUICK_SUGGESTIONS } from '../services/chatService';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chatGreeting'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botResponse = getChatResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputText('');
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputText(suggestion);
  };

  const renderMessage = (message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.sender === 'user'
          ? styles.userMessageContainer
          : styles.botMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.sender === 'user'
            ? styles.userMessage
            : styles.botMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.sender === 'user'
              ? styles.userMessageText
              : styles.botMessageText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.sender === 'user'
              ? styles.userTimestamp
              : styles.botTimestamp,
          ]}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Messages List */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message) => renderMessage(message))}
      </ScrollView>

      {/* Quick Suggestions */}
      {messages.length <= 2 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsLabel}>💡 {t('suggestedQuestions')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsList}
          >
            {QUICK_SUGGESTIONS.map((suggestion, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionBtn}
                onPress={() => handleQuickSuggestion(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={t('askQuestion')}
          placeholderTextColor={colors.textTertiary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxHeight={100}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendBtnText}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  userMessage: {
    backgroundColor: colors.primary,
  },
  botMessage: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: colors.background,
  },
  botMessageText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: colors.background,
    opacity: 0.7,
  },
  botTimestamp: {
    color: colors.textTertiary,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  suggestionsLabel: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionsList: {
    marginBottom: 8,
  },
  suggestionBtn: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 12,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnText: {
    fontSize: 20,
  },
});

export default ChatScreen;
