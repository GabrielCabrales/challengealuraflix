import styled from "styled-components";
import logo from "../../assets/img/logo_aluraflix.png";
import Chatbot from '../Chatbot/Chatbot';

const ContainerFooter = styled.div`
  display: flex;
  padding: 2.5rem 3.5rem;
  background: rgba(0, 0, 0, 0.9);
  border-top: 5px solid #2a7ae4;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #2a7ae4;
  text-align: center;

  @media screen and (min-width: 0) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 2rem 0.8rem;
    p,
    span {
      font-size: 0.6rem;
    }
  }
`;

const Logo = styled.img`
  width: 250px;
  @media screen and (min-width: 0) and (max-width: 767px) {
    width: 180px;
  }
`;

const P = styled.p`
  margin: 1rem 0 0;
`;

function Footer() {
  return (
    <footer>
      <ContainerFooter>
        <Logo src={logo} alt="Logo de AluraFlix" />
        <P>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a id="github" href="https://github.com/GabrielCabrales" target="_blank" rel="noopener noreferrer">
            Challenge AluraFlix Gabriel Cabrales
          </a>
        </P>
        <span>2024</span>
        <Chatbot/>
      </ContainerFooter>
    </footer>
  );
}
export default Footer;
