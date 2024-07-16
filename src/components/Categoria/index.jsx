import { useState, useEffect } from "react";
import { buscar } from "../../api/api";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "./style.css";
import hexToRgba from "hex-to-rgba";
import 'animate.css';

const SectionContainer = styled.div`
  padding: 4rem 5rem;
  background: rgba(0, 0, 0, 0.9);
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0px) and (max-width: 424px) {
    padding: 2rem 0.8rem;
  }
`;

const DivText = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (min-width: 0px) and (max-width: 767px) {
    gap: 5px;
  }
`;

const CategoryLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: ${(props) => props.background};
  text-align: center;
  transition: background ease-out 0.5s;

  &:hover {
    background: ${(props) => hexToRgba(props.background, 0.85)};
  }

  @media screen and (min-width: 1024px) and (max-width: 1439px) {
    font-size: 1.7rem;
    padding: 0.4rem 0.8rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.4rem;
    padding: 0.4rem 0.8rem;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.72rem;
    padding: 0.4rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 0.5rem;
    padding: 0.3rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #f5f5f5;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 0.65rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 0.48rem;
    margin: 0;
  }
`;

const SliderContainer = styled.div`
  margin: 1rem 0 2rem;
  .slick-track {
    display: flex;
    margin-left: -15px;
  }
  .slick-slide {
    margin: 0 15px;
  }

  @media screen and (min-width: 0) and (max-width: 426px) {
    .slick-track {
      margin-left: -4px;
    }
    .slick-slide {
      margin: 0 8px;
    }
  }
`;

const SliderImg = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  border: 3px solid ${(props) => props.$borderColor || "#6bd1ff"};
  @media screen and (min-width: 0) and (max-width: 424px) {
    border: 1.5px solid ${(props) => props.$borderColor || "#6bd1ff"};
  }
  &:hover {
    animation: shrink 1s forwards;
  }

  @keyframes shrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export function SectionCategory() {
  const [data, setData] = useState({ categories: [], videos: [] });

  useEffect(() => {
    buscar(`/categorias`, (categories) =>
      setData((prevData) => ({ ...prevData, categories }))
    );
    buscar(`/videos`, (videos) =>
      setData((prevData) => ({ ...prevData, videos }))
    );
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section>
      <SectionContainer>
        {data.categories.map((category, index) => {
          const categoryVideos = data.videos.filter(
            (video) => video.category === category.name
          );

          if (categoryVideos.length === 0) {
            return null;
          }

          return (
            <div key={index} className={`container__Category ${category.id}`}>
              <DivText key={category.id}>
                <CategoryLink
                  to={`/categoria/${category.name}`}
                  background={category.color}
                >
                  {category.name}
                </CategoryLink>
                <Description>{category.description}</Description>
              </DivText>
              <SliderContainer>
                <Slider {...settings}>
                  {categoryVideos.reverse().map((video) => (
                    <div key={video.id}>
                      <Link to={`/video/${video.id}`}>
                        <SliderImg
                          src={video.linkImg}
                          alt={video.title}
                          $borderColor={category.color}
                        />
                      </Link>
                    </div>
                  ))}
                </Slider>
              </SliderContainer>
            </div>
          );
        })}
      </SectionContainer>
    </section>
  );
}
