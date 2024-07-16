import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  border: 2px solid #333; /* Cambiado a un tono oscuro similar */
  border-radius: 2rem;
  font-size: 1rem;
  color: white; /* Texto blanco */
  background-color: #333; /* Fondo oscuro */
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #1a73e8; /* Color de enfoque */
  }
`;

const SearchResults = styled.div`
  position: absolute;
  background: #333; /* Fondo oscuro */
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #444; /* Borde oscuro */
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  z-index: 1000;
`;

const ResultItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background: #555; /* Fondo oscuro al pasar el ratón */
  }
  a {
    text-decoration: none;
    color: white; /* Texto blanco */
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    axios.get('https://6691b54626c2a69f6e907f80.mockapi.io/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]);
    }
  }, [searchTerm, videos]);

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredVideos.length > 0 && (
        <SearchResults>
          {filteredVideos.map(video => (
            <Link to={`/video/${video.id}`} key={video.id}>
              <ResultItem>
                {video.title}
              </ResultItem>
            </Link>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;