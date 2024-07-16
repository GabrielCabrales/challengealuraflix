import { useState } from "react";
import styled from "styled-components";
import { InputTexto, TextArea } from "../Inputs";
import { Button } from "../Button";
import { UpdateVideo } from "../../api/api";
import { ModalAddVideo } from "../Modal";

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
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

export default function FormEditVideo(props) {
  const { initialValues, setShowForm, onVideoEdited } = props;
  const [editedTitle, setEditedTitle] = useState(initialValues?.title || "");
  const [editedLinkVideo, setEditedLinkVideo] = useState(
    initialValues?.linkVideo || ""
  );
  const [editedLinkImg, setEditedLinkImg] = useState(
    initialValues?.linkImg || ""
  );
  const [editedDescription, setEditedDescription] = useState(
    initialValues?.description || ""
  );
  const [editedCode, setEditedCode] = useState(initialValues?.code || "");
  const [isVideoEdited, setIsVideoEdited] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [modalWarning2, setModalWarning2] = useState(false);

  function CleanData() {
    setEditedTitle("");
    setEditedLinkVideo("");
    setEditedLinkImg("");
    setEditedDescription("");
    setEditedCode("");
  }

  const handleSaveEditingClick = async (e) => {
    e.preventDefault();
    if (
      !editedTitle ||
      !editedLinkVideo ||
      !editedLinkImg ||
      !editedDescription ||
      !editedCode
    ) {
      setModalWarning2(true);
      return;
    }

    try {
      const updatedVideo = {
        ...initialValues,
        title: editedTitle,
        linkVideo: editedLinkVideo,
        linkImg: editedLinkImg,
        description: editedDescription,
        code: editedCode,
      };
      if (
        updatedVideo.title.length < 4 ||
        updatedVideo.linkVideo.length < 4 ||
        updatedVideo.linkImg.length < 4 ||
        updatedVideo.description.length < 4 ||
        updatedVideo.code.length < 4
      ) {
        setModalWarning(true);
      } else {
        await UpdateVideo(updatedVideo);
        setIsVideoEdited(true);
        onVideoEdited(updatedVideo);
      }
    } catch (error) {
      console.error("Error al actualizar el video:", error);
    }
  };

  return (
    <FormVideo onSubmit={handleSaveEditingClick}>
      <InputTexto
        id="title"
        label="Título"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <InputTexto
        id="linkVideo"
        label="Link del video"
        value={editedLinkVideo}
        onChange={(e) => setEditedLinkVideo(e.target.value)}
      />
      <InputTexto
        id="linkImg"
        label="Link imagen del video"
        value={editedLinkImg}
        onChange={(e) => setEditedLinkImg(e.target.value)}
      />
      <TextArea
        id="description"
        label="Descripción"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <InputTexto
        label="Código de seguridad"
        value={editedCode}
        onChange={(e) => setEditedCode(e.target.value)}
      />
      <ButtonGroup>
        <Button type="submit" color="#FFFFFF" bgcolor="#2A7AE4">
          Guardar
        </Button>
        {isVideoEdited && (
          <ModalAddVideo
            onClose={() => {
              setIsVideoEdited(false);
              setShowForm(false);
            }}
          >
            Video editado con éxito
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
        <Button
          type="button"
          color="#FFFFFF"
          bgcolor="#2A7AE4"
          onClick={() => {
            setShowForm(false);
          }}
        >
          Regresar
        </Button>
      </ButtonGroup>
    </FormVideo>
  );
}
