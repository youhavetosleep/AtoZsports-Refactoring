import React from 'react'
import styled from 'styled-components'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import futsalSliderImg from '../image/futsal_main.jpg'
import '../styles/slick.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import GlobalStyle from '../globalStyle/globalStyle'

const Futsal = () => {
  const setting = {
    slide: 'div',
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <FutsalSliderContainer>
        <FutsalSliderIn>
            <img src={futsalSliderImg} className="futsal_mainImg" />
              <Slider {...setting}>
                <div witdh="100%">
                  <div className="futsal_mainText">첫번째 텍스트 입니다.</div>
                  <div className="futsal_suvText">머 그냥 그렇다구.</div>
                </div>
            </Slider>
        </FutsalSliderIn>
      </FutsalSliderContainer>
      <div>111</div>
      <div>222</div>
      <Footer />
    </>
  )
}

const FutsalSliderContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`

const FutsalSliderIn = styled.div`
  position: relative;
  .img {
    width: 100%;
    background-size: cover;
    vertical-align: middle;
  }
  .futsal_mainText {
      top: 45%;
    left: 20%;
    font-size: 30px;
    color: black;
    position: absolute;
    z-index: 10;
    }
    .futsal_suvText {
      top: 50%;
    left: 20%;
    font-size: 30px;
    color: black;
    position: absolute;
    z-index: 10;
    }
`

export default Futsal

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <>
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </>
  );
}