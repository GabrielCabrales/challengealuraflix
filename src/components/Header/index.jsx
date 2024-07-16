import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo_aluraflix.png";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import SearchBar from '../SearchBar/SearchBar';

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  background: #000000;
  border-bottom: 5px solid #2a7ae4;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 1.5rem 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 1.5rem 0.8rem;
  }
`;

const Logo = styled.img`
  width: 200px;
  transition: transform ease 0.5s;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 0) and (max-width: 767px) {
    width: 120px;
  }
`;

const BtnAddVideo = styled(Link)`
  color: #ffffff;
  background: #000000;
  cursor: pointer;
  font-size: 1.5rem;
  border: 2px solid #ffffff;
  padding: 10px 30px;
  text-decoration: none;
  border-radius: 10px;
  transition: background ease-in 0.5s;

  &:hover {
    background: #2a7ae4;
  }

  @media screen and (min-width: 0) and (max-width: 767px) {
    display: none;
  }
`;

const Btn2AddVideo = styled(Link)`
  display: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: #2a7ae4;
  transition: transform ease 0.5s;

  &:hover {
    transform: scale(1.2);
  }

  @media screen and (min-width: 0) and (max-width: 767px) {
    display: block;
  }
`;

function Header() {
  const location = useLocation();

  const showBtnAddVideo = location.pathname !== "/nuevoVideo";

  return (
    <header>
      <ContainerHeader>
        <Link to={"/"}>
          <Logo src={logo} alt="Logo de AluraFlix" />
        </Link>
        <SearchBar/>
        {showBtnAddVideo && (
          <>
            <BtnAddVideo to={"/nuevoVideo"}>Nuevo Video</BtnAddVideo>
            <Btn2AddVideo to={"/nuevoVideo"}>
              <AiOutlineVideoCameraAdd />
            </Btn2AddVideo>
          </>
        )}
      </ContainerHeader>
    </header>
  );
}
export default Header;
