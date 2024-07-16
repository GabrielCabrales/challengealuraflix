import React from "react";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscar } from "../api/api";
import styled from "styled-components";

const SectionContainer = styled.div`
  padding: 1.5rem 4rem 5rem;
  background: rgba(0, 0, 0, 0.9);
  min-height: 63.3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 425px) and (max-width: 1024px) {
    padding: 1.5rem 2rem 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 1.5rem 0.8rem 2rem;
  }
`;

const ContainerDescription = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    gap: 2rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 1rem;
  }
  @media screen and (min-width: 0) and (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ContainerVideo = styled.div`
  padding: 5rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    padding: 3rem 1.5rem;
    height: 70vh;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 2rem 0rem;
    height: 50vh;
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    padding: 2rem 0rem;
    height: 45vh;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 1rem 0rem;
    height: 40vh;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  font-size: 3rem;
  margin: 2rem 0 3.5rem;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.5rem;
    margin: 2rem 0;
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    font-size: 2rem;
    margin: 2rem 0;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 1.3rem;
    margin: 1rem 0;
  }
`;

const ContainerLi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

const Li = styled.li`
  list-style: none;
  color: #ffffff;
  font-size: 1.3rem;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 0.6rem;
  }
`;

const Img = styled.img`
  width: 600px;
  border-radius: 0.5rem;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    width: 350px;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    width: 300px;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    width: 220px;
  }
`;

export default function Video() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    buscar(`videos`, (videos) => {
      const video = videos.find((vid) => vid.id === videoId);
      if (video) {
        setVideo(video);
      } else {
        navigate("*");
      }
    });
  }, [videoId, navigate]);

  return (
    <main>
      <section>
        <SectionContainer>
          <Title>Detalles del Video</Title>
          {
            <>
              <ContainerDescription>
                <ContainerLi>
                  <Li>Título: {video.title}</Li>
                  <Li>Categoría: {video.category}</Li>
                  <Li>Descripción: {video.description}</Li>
                </ContainerLi>
                <div>
                  <Img src={video.linkImg} alt={video.title} />
                </div>
              </ContainerDescription>
              <ContainerVideo>
                <ReactPlayer
                  url={video.linkVideo}
                  controls
                  width="100%"
                  height="100%"
                />
              </ContainerVideo>
            </>
          }
        </SectionContainer>
      </section>
    </main>
  );
}
