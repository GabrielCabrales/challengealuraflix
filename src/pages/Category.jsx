import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { buscar } from "../api/api";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SectionContainer = styled.div`
  padding: 1.5rem 4rem 5rem;
  background: rgba(0, 0, 0, 0.9);
  min-height: 64vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 425px) and (max-width: 768px) {
    padding: 2rem;
    justify-content: space-evenly;
    gap: 1rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 2.5rem 0.8rem;
    justify-content: space-evenly;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  font-size: 3rem;
  margin: 2rem 0 3.5rem;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.5rem;
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    font-size: 2rem;
    margin: 0;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 1.3rem;
    margin: 0 0 1rem;
  }
`;

const VideosContainer = styled.div`
  position: relative;
  max-width: 1900px;
`;

const ListVideos = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0;
  margin: 0;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem 1rem;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.5rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;

const LiVideos = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
  transition: transform ease-in 0.5s;
  &&:hover {
    transform: scale(1.02);
  }
`;

const VideoTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: #ffffff;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    font-size: 1rem;
    margin: 0;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.7rem;
    margin: 0;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 0.6rem;
    margin: 0;
  }
`;

export default function Category() {
  const { categoryName } = useParams();
  const [categoryVideos, setCategoryVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscar(`videos`, (videos) => {
      const videosFiltered = videos.filter(
        (video) => video.category === categoryName
      );
      if (videosFiltered.length === 0) {
        navigate("*");
      } else {
        setCategoryVideos(videosFiltered);
      }
    });
  }, [categoryName, navigate]);

  return (
    <main>
      <section>
        <SectionContainer>
          <Title>Videos de la categoría {categoryName}</Title>
          <VideosContainer>
            <ListVideos>
              {categoryVideos.map((video) => (
                <LiVideos key={video.id}>
                  <Link to={`video/${video.id}`}>
                    <Img src={video.linkImg} alt={video.title} />
                  </Link>
                  <VideoTitle>{video.title}</VideoTitle>
                </LiVideos>
              ))}
            </ListVideos>
          </VideosContainer>
        </SectionContainer>
      </section>
    </main>
  );
}
