import { useState } from "react";
import { InputTexto, TextArea, SelectCategory } from "../components/Inputs";
import { Button } from "../components/Button";
import { v4 as uuid } from "uuid";
import { CreateNewVideo } from "../api/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ModalAddVideo } from "../components/Modal";
import TitleForm from "../components/TitleForm";

const DivContainer = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 1.5rem 4rem 6rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    padding: 2rem 0.8rem;
  }
`;

const FormVideo = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 1900px;
  margin: 0 auto;
  @media screen and (min-width: 0px) and (max-width: 424px) {
    gap: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  @media screen and (min-width: 0px) and (max-width: 767px) {
    flex-wrap: wrap;
  }
  @media screen and (min-width: 0px) and (max-width: 441px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (min-width: 0px) and (max-width: 441px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

function FormAddVideo() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [linkImg, setLinkImg] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [modalWarning2, setModalWarning2] = useState(false);

  function CleanData() {
    setId("");
    setTitle("");
    setLinkVideo("");
    setLinkImg("");
    setDescription("");
    setCategory("");
    setCode("");
  }

  const SubmitNewVideo = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !linkVideo ||
      !linkImg ||
      !description ||
      !category ||
      !code
    ) {
      setModalWarning2(true);
      return;
    }

    const id = uuid();
    setId(id);
    const dataNewVideo = {
      id,
      title,
      linkVideo,
      linkImg,
      description,
      category,
      code,
    };

    try {
      if (
        dataNewVideo.title.length < 4 ||
        dataNewVideo.linkVideo.length < 4 ||
        dataNewVideo.linkImg.length < 4 ||
        dataNewVideo.description.length < 4 ||
        dataNewVideo.code.length < 4
      ) {
        setModalWarning(true);
      } else {
        await CreateNewVideo(dataNewVideo);
        CleanData();
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear", error);
    }
  };

  return (
    <main>
      <section>
        <DivContainer>
          <FormVideo onSubmit={SubmitNewVideo} id={id}>
            <TitleForm>Nuevo Video</TitleForm>
            <InputTexto
              id="title"
              label="Título"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <InputTexto
              id="linkVideo"
              label="Link del video"
              value={linkVideo}
              onChange={(e) => {
                setLinkVideo(e.target.value);
              }}
            />
            <InputTexto
              id="linkImg"
              label="Link imagen del video"
              value={linkImg}
              onChange={(e) => {
                setLinkImg(e.target.value);
              }}
            />
            <TextArea
              id="description"
              label="Descripción"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <SelectCategory
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <InputTexto
              label="Código de seguridad"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <ButtonContainer>
              <ButtonGroup>
                <Button type="submit" color="#FFFFFF" bgcolor="#2A7AE4">
                  Guardar
                </Button>
                {isModalOpen && (
                  <ModalAddVideo onClose={() => setIsModalOpen(false)}>
                    Video Creado con éxito
                  </ModalAddVideo>
                )}
                {modalWarning && (
                  <ModalAddVideo onClose={() => setModalWarning(false)}>
                    Por favor cumplir con los requisitos de cada campo
                  </ModalAddVideo>
                )}
                {modalWarning2 && (
                  <ModalAddVideo onClose={() => setModalWarning2(false)}>
                    Completar los campos por favor
                  </ModalAddVideo>
                )}
                <Button
                  type="button"
                  color="#000000"
                  bgcolor="#9E9E9E"
                  onClick={CleanData}
                >
                  Limpiar
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Link to={"/nuevaCategoria"}>
                  <Button type="button" color="#FFFFFF" bgcolor="#2A7AE4">
                    Nueva Categoría
                  </Button>
                </Link>
                <Link to={"/videoSettings"}>
                  <Button type="button" color="#FFFFFF" bgcolor="#2A7AE4">
                    Editar / Eliminar Video
                  </Button>
                </Link>
              </ButtonGroup>
            </ButtonContainer>
          </FormVideo>
        </DivContainer>
      </section>
    </main>
  );
}

export default FormAddVideo;
