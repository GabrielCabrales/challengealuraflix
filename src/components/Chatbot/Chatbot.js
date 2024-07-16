import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Estilos usando styled-components
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  top: 650px;
  right: 20px;
  width: 350px;
  height: 60px;
  background-color: #1a73e8;
  color: white;
  border-radius: 30px 30px 0 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
    &:hover {
    animation: shrink 1s forwards;
  }
  @keyframes shrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  &:hover {
    animation: shrink 1s forwards;
  }
  @keyframes shrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ChatHeader = styled.div`
  background-color: #1a73e8;
  color: white;
  padding: 10px;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background-color: ${(props) => (props.sender === 'user' ? '#1a73e8' : '#ddd')};
  color: ${(props) => (props.sender === 'user' ? 'white' : 'black')};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const SearchResult = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

const ResultContainer = styled.div`
  max-height: 300px; /* Altura máxima para el contenedor de resultados */
  overflow-y: auto; /* Permite desplazamiento vertical cuando los resultados exceden la altura máxima */
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0d47a1;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);

  const googleApiKey = 'AIzaSyBG9afuB7hfplBuCCB-DoJRu09FTXtF02g'; 
  const searchEngineId = '25305101969284c44';  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://6691b54626c2a69f6e907f80.mockapi.io/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://6691b54626c2a69f6e907f80.mockapi.io/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchVideos();
    fetchCategories();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputText('');

    let responseMessage = 'No tengo información sobre eso.';

    const lowerCaseInput = inputText.toLowerCase();

    const foundCategory = categories.find(item =>
      item.name.toLowerCase().includes(lowerCaseInput) ||
      item.description.toLowerCase().includes(lowerCaseInput)
    );

    if (foundCategory) {
      responseMessage = `Categoría: ${foundCategory.name}\nDescripción: ${foundCategory.description}`;
    } else {
      const foundVideo = videos.find(item =>
        item.title.toLowerCase().includes(lowerCaseInput) ||
        item.description.toLowerCase().includes(lowerCaseInput)
      );

      if (foundVideo) {
        responseMessage = `Título: ${foundVideo.title}\nDescripción: ${foundVideo.description}\nLink: ${foundVideo.linkVideo}`;
      } else {
        // Realizar búsqueda en Google
        try {
          const googleResponse = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
              key: googleApiKey,
              cx: searchEngineId,
              q: inputText
            }
          });

          if (googleResponse.data.items && googleResponse.data.items.length > 0) {
            const topResults = googleResponse.data.items.slice(0, 5);
            responseMessage = (
              <ResultContainer>
                {topResults.map((item, index) => (
                  <SearchResult key={index}>
                    <strong>{item.title}</strong><br />
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a><br />
                    {item.snippet}
                  </SearchResult>
                ))}
              </ResultContainer>
            );
          } else {
            responseMessage = 'No se encontraron resultados en Google.';
          }
        } catch (error) {
          console.error('Error searching Google:', error);
          responseMessage = 'Hubo un error buscando en Google.';
        }
      }
    }

    const aiMessage = { text: responseMessage, sender: 'ai' };
    setMessages([...messages, aiMessage]);
  };

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <ChatbotContainer onClick={toggleChatbot}>
        {!isVisible && <span>Chatbot Creativo</span>}
      </ChatbotContainer>
      <ChatWindow isVisible={isVisible}>
        <ChatHeader>Chatbot Creativo</ChatHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <Message key={index} sender={message.sender}>
              {message.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <InputContainer>
          <ChatInput
            type="text"
            placeholder="Escribe algo..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>Enviar</SendButton>
        </InputContainer>
      </ChatWindow>
    </>
  );
};

export default Chatbot;