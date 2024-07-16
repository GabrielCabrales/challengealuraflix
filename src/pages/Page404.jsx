import styled from "styled-components";
import imgNoPage from "../assets/img/img_404.png";
import imgNumber from "../assets/img/img_number0.png";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  min-height: 68vh;
  padding: 4.5rem 4rem;

  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 2rem 0.8rem;
  }
`;

const ContainerNoPage = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ContainerLi = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

const Li = styled.li`
  font-size: 20rem;
  font-weight: bold;
  list-style: none;
  color: #2a7ae4;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    font-size: 15rem;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 10rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 6rem;
  }
`;

const ImgNumber = styled.img`
  width: 300px;
  height: 300px;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    width: 220px;
    height: 220px;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    width: 130px;
    height: 130px;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    width: 100px;
    height: 100px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 0) and (max-width: 1023px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 300px;
  height: 400px;

  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    width: 200px;
    height: 250px;
  }
`;

const Img1 = styled.img`
  transform: scaleX(-1);
  width: 300px;
  height: 400px;
  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    width: 200px;
    height: 250px;
  }
`;

const ContainerTexto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const P = styled.p`
  text-align: center;
  margin: 0;
  font-size: 3rem;
  color: #ffffff;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.6rem;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 2.2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 1.4rem;
  }
`;

export default function Page404() {
  return (
    <main>
      <section>
        <PageContainer>
          <ContainerNoPage>
            <ImgContainer>
              <Img src={imgNoPage} alt="Error 404" />
            </ImgContainer>
            <ContainerLi>
              <Li>4</Li>
              <ImgNumber src={imgNumber} alt="Numero 0" />
              <Li>4</Li>
            </ContainerLi>
            <ImgContainer>
              <Img1 src={imgNoPage} alt="Error 404" />
            </ImgContainer>
          </ContainerNoPage>
          <ContainerTexto>
            <P>La página que estas buscando no existe</P>
            <Link to={"/"}>
              <Button type="button" color="#FFFFFF" bgcolor="#2a7ae4">
                Home
              </Button>
            </Link>
          </ContainerTexto>
        </PageContainer>
      </section>
    </main>
  );
}
