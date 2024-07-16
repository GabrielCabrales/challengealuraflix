import styled from "styled-components";

const Title = styled.h2`
  text-align: center;
  color: #ffffff;
  font-size: 3.5rem;
  margin: 0 0 2rem;
  @media screen and (min-width: 425px) and (max-width: 768px) {
    font-size: 2.6rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    font-size: 1.8rem;
    margin: 0;
  }
`;

export default function TitleForm(props) {
  return <Title>{props.children}</Title>;
}
