import styled from "styled-components";
import imgEmptyVideo from "../../assets/img/img_empty_video.jpg";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const H1 = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.5rem;
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 1.3rem;
  }
`;

const Img = styled.img`
  width: 70%;
`;

export default function EmptyVideos({ category }) {
  return (
    <DivContainer>
      <H1>Todavía no hay videos en esta categoría {category}</H1>
      <Img src={imgEmptyVideo} alt="Imagen de No hay video" />
    </DivContainer>
  );
}
