import { useState } from "react";
import { DeleteCategory } from "../../api/api";
import styled from "styled-components";
import "./style.css";
import { ButtonEdit, ButtonDelete } from "../Button";
import { ModalAddVideo } from "../Modal";

const Table = styled.table`
  border: 3px solid #2a7ae4;
  max-width: 1900px;
  width: 100%;
  border-spacing: 0;
  @media screen and (min-width: 0px) and (max-width: 767px) {
    border: 1.5px solid #2a7ae4;
  }
`;

const Thead = styled.thead`
  color: #ffffff;
  font-size: 1.5rem;
`;

const ThHead = styled.th`
  border-bottom: 3px solid #2a7ae4;
  padding: 1rem 1.5rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 0.1rem;
    border-bottom: 1.5px solid #2a7ae4;
    font-size: 0.8rem;
    font-weight: normal;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    padding: 0.1rem;
    border-bottom: 1.5px solid #2a7ae4;
    font-size: 0.6rem;
    font-weight: normal;
  }
`;

const Tbody = styled.tbody`
  color: #e5e5e5;
  font-size: 1.1rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.7rem;
    font-weight: normal;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    font-size: 0.5rem;
    font-weight: normal;
  }
`;

export default function TableCategory(props) {
  const { setSelectedCategory, category, setCategoryList } = props;

  const [isDeleted, setIsDeleted] = useState(false);

  const handleEditClick = (categoria) => {
    setSelectedCategory(categoria);
  };

  const handleDeleteClick = async (categoria) => {
    try {
      const response = await DeleteCategory(categoria.id);
      if (response.success) {
        setIsDeleted(true);
        setCategoryList((prevList) =>
          prevList.filter((category) => category.id !== categoria.id)
        );
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table>
      <Thead>
        <tr>
          <ThHead className="encabezado">Nombre</ThHead>
          <ThHead className="encabezado">Descripción</ThHead>
          <ThHead className="encabezado">Editar</ThHead>
          <ThHead>Remover</ThHead>
        </tr>
      </Thead>
      <Tbody>
        {category.map((categoria, index) => {
          const { id, name, description } = categoria;

          return (
            <tr key={index}>
              <td className={`text text__file `}>{name}</td>
              <td className={`text text__file`}>{description}</td>
              <td className={`text text__file text__center`}>
                <ButtonEdit id={id} onClick={() => handleEditClick(categoria)}>
                  Editar
                </ButtonEdit>
              </td>
              <td className={`text text__center`}>
                <ButtonDelete
                  id={id}
                  onClick={() => handleDeleteClick(categoria)}
                >
                  Remover
                </ButtonDelete>
                {isDeleted && (
                  <ModalAddVideo onClose={() => setIsDeleted(false)}>
                    Categoría eliminada exitosamente
                  </ModalAddVideo>
                )}
              </td>
            </tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
