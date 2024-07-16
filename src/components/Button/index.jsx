import styled from "styled-components";

const ButtonForm = styled.button`
  padding: 0.8rem 2.5rem;
  color: ${(props) => props.color};
  background: ${(props) => props.$bgcolor};
  border-radius: 0.4rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: transform ease-out 0.5s;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    padding: 0.8rem 0.8rem;
    font-size: 0.6rem;
  }
`;

export function Button(props) {
  const { type, color, bgcolor, children, onClick } = props;

  return (
    <ButtonForm color={color} $bgcolor={bgcolor} type={type} onClick={onClick}>
      {children}
    </ButtonForm>
  );
}

const ButtonFormCategory = styled.button`
  background: transparent;
  font-size: 1.1rem;
  border: none;
  color: #e5e5e5;
  cursor: pointer;
  width: 100%;
  transition: color ease-out 0.5s;
  &:hover {
    color: ${(props) => props.color};
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.6rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    font-size: 0.5rem;
  }
`;

export function ButtonEdit(props) {
  const { id, children, onClick } = props;

  return (
    <ButtonFormCategory id={id} onClick={onClick} color="#2A7AE4">
      {children}
    </ButtonFormCategory>
  );
}

export function ButtonDelete(props) {
  const { id, children, onClick } = props;

  return (
    <ButtonFormCategory id={id} onClick={onClick} color="#d80c0c">
      {children}
    </ButtonFormCategory>
  );
}
