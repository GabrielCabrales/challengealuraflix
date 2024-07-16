import { useState, useEffect } from "react";
import { InputTexto, TextArea, InputColor } from "../components/Inputs";
import { Button } from "../components/Button";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { CreateNewCategory, UpdateCategory } from "../api/api";
import TableCategory from "../components/Table";
import styled from "styled-components";
import { ModalAddVideo } from "../components/Modal";
import TitleForm from "../components/TitleForm";
import { buscar } from "../api/api";

const DivContainer = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 1.5rem 4rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
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
  width: 100%;
  @media screen and (min-width: 0px) and (max-width: 424px) {
    gap: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 0px) and (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function FormNewCategory() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescrip] = useState("");
  const [color, setColor] = useState("#000000");
  const [code, setCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [idEdited, setidEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdated, setIsModalUpdated] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [modalWarning2, setModalWarning2] = useState(false);
  const [category, setCategoryList] = useState([]);

  useEffect(() => {
    buscar(`/categorias`, setCategoryList);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setId(selectedCategory.id);
      setName(selectedCategory.name);
      setDescrip(selectedCategory.description);
      setColor(selectedCategory.color);
      setCode(selectedCategory.code);
      setidEdited(true);
    } else {
      setId("");
    }
  }, [selectedCategory]);

  function CleanData() {
    setId("");
    setName("");
    setColor("#000000");
    setDescrip("");
    setCode("");
  }

  const SubmitNewCategory = async (e) => {
    e.preventDefault();

    if (!name || !description || !code) {
      setModalWarning2(true);
      return;
    }

    const dataNewCategory = {
      id: idEdited ? id : uuid(),
      name,
      description,
      color,
      code,
    };

    try {
      if (
        dataNewCategory.name.length < 4 ||
        dataNewCategory.description.length < 4 ||
        dataNewCategory.code.length < 4
      ) {
        setModalWarning(true);
      } else {
        if (id) {
          const updatedCategory = await UpdateCategory(dataNewCategory);
          setCategoryList((prevList) =>
            prevList.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
            )
          );
          CleanData();
          setIsModalUpdated(true);
        } else {
          const newCategory = await CreateNewCategory(dataNewCategory);
          setCategoryList((prevList) => [...prevList, newCategory]);
          CleanData();
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Error al crear", error);
    }
  };

  return (
    <main>
      <section>
        <DivContainer>
          <FormVideo onSubmit={SubmitNewCategory} id={id}>
            <TitleForm>Nueva Categoría</TitleForm>
            <InputTexto
              id="name"
              label="Nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextArea
              id="description"
              label="Descripción"
              value={description}
              onChange={(e) => {
                setDescrip(e.target.value);
              }}
            />
            <InputColor
              id="color"
              label="Color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              type="color"
            />
            <InputTexto
              id="code"
              label="Código de Seguridad"
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
                    Categoría añadida exitosamente
                  </ModalAddVideo>
                )}
                {isModalUpdated && (
                  <ModalAddVideo onClose={() => setIsModalUpdated(false)}>
                    Categoría actualizada exitosamente
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
              <Link to={"/"}>
                <Button type="button" color="#FFFFFF" bgcolor="#2A7AE4">
                  Página Inicial
                </Button>
              </Link>
            </ButtonContainer>
          </FormVideo>
          <TableCategory
            setSelectedCategory={setSelectedCategory}
            category={category}
            setCategoryList={setCategoryList}
          />
        </DivContainer>
      </section>
    </main>
  );
}
