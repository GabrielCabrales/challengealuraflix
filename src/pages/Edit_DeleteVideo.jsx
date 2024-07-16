import { useEffect, useState } from "react";
import { SelectCategory } from "../components/Inputs";
import styled from "styled-components";
import { loadVideosByCategory, DeleteVideo } from "../api/api";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ModalAddVideo } from "../components/Modal";
import FormEditVideo from "../components/FormVideo";
import { Link } from "react-router-dom";
import EmptyVideos from "../components/EmptyVideos";
import TitleForm from "../components/TitleForm";

const Section = styled.section`
  background: rgba(0, 0, 0, 0.9);
`;

const DivContainer = styled.div`
  padding: 3rem 4rem 6rem;
  display: flex;
  flex-direction: column;
  min-height: 67vh;
  max-width: 1900px;
  margin: 0 auto;
  gap: 2.5rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    padding: 2rem 0.8rem;
    gap: 1.5rem;
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
    gap: 2rem;
  }
`;

const CardContainer = styled.div`
  position: relative;
`;

const ContainerIcons = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  right: 5%;
  top: -10%;
  font-size: 1.8rem;
  z-index: 10;
  color: ${(props) => props.color};
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.1rem;
    gap: 0.5rem;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.9rem;
    gap: 0.4rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    font-size: 1rem;
    gap: 0.5rem;
  }
`;

const Icon = styled.li`
  list-style: none;
  border: 1px solid #2a7ae4;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 0.4rem;
  background: #ffffff;
  transition: transform ease-in 0.4s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (min-width: 0px) and (max-width: 767px) {
    padding: 0.28rem;
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  border: 3px solid #53585d;
  box-sizing: border-box;
  transition: transform ease-in 0.5s;
  z-index: 1;
  &&:hover {
    transform: scale(1.02);
  }
`;

export default function EditDeleteVideo() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [isVideoDeleted, setIsVideoDeleted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingVideoData, setEditingVideoData] = useState(null);

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setIsVideoDeleted(false);
    try {
      const videosData = await loadVideosByCategory(category);
      setData(videosData);
    } catch (error) {
      console.error("Error al cargar los videos por categoría: ", error);
    }
  };

  const handleDeleteClick = async (videoId) => {
    try {
      await DeleteVideo(videoId);
      const updatedData = data.filter((video) => video.id !== videoId);
      setData(updatedData);
      if (selectedCategory) {
        const updatedVideosData = await loadVideosByCategory(selectedCategory);
        setData(updatedVideosData);
      }
      setIsVideoDeleted(true);
    } catch (error) {
      console.error("Error al eliminar el video: ", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      loadVideosByCategory(selectedCategory)
        .then((videosData) => {
          setData(videosData);
        })
        .catch((error) => {
          console.error("Error al cargar los videos por categoría: ", error);
        });
    }
  }, [selectedCategory]);

  const toggleEditingForm = (videoData) => {
    setEditingVideoData(videoData);
    setShowForm(!showForm);
  };

  const handleVideoEdited = (editedVideo) => {
    const updatedData = data.map((video) =>
      video.id === editedVideo.id ? editedVideo : video
    );
    setData(updatedData);
  };

  return (
    <main>
      <Section>
        <DivContainer>
          <TitleForm>Editar Video</TitleForm>
          <SelectCategory
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <VideosContainer>
            {selectedCategory && data.length === 0 ? (
              <EmptyVideos category={selectedCategory} />
            ) : (
              <>
                {!showForm ? (
                  <ListVideos>
                    {data.map((video) => (
                      <CardContainer key={video.id}>
                        <ContainerIcons>
                          <Icon onClick={() => handleDeleteClick(video.id)}>
                            <AiFillDelete color="#d80c0c" />
                          </Icon>
                          <Icon onClick={() => toggleEditingForm(video)}>
                            <AiFillEdit color="#34b10e" />
                          </Icon>
                        </ContainerIcons>
                        <Link to={`/video/${video.id}`}>
                          <Img src={video.linkImg} alt={video.title} />
                        </Link>
                      </CardContainer>
                    ))}
                  </ListVideos>
                ) : (
                  <>
                    <FormEditVideo
                      initialValues={editingVideoData}
                      setShowForm={setShowForm}
                      onVideoEdited={handleVideoEdited}
                    />
                  </>
                )}
                {isVideoDeleted && (
                  <ModalAddVideo onClose={() => setIsVideoDeleted(false)}>
                    Video borrado con éxito
                  </ModalAddVideo>
                )}
              </>
            )}
          </VideosContainer>
        </DivContainer>
      </Section>
    </main>
  );
}
