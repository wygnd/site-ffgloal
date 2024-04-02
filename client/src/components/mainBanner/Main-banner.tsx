import React from "react";
import './Main-banner.scss';
import Container from "@/components/container/Container";
import HelpCircleSvg from "@/assets/images/help-circle.svg";
import ozLogo from "@/assets/images/ozon-logo.png"
import wbLogo from "@/assets/images/wildberries-logo.png"
import yaLogo from "@/assets/images/market-logo.png"
import Button from "@/components/button/Base-button";
import imageSlide from './images/image-slide.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import ArrowNext from './images/arrow-next.svg';
import ArrowPrev from './images/arrow-prev.svg';

const MainBanner = () => {
  return (
    <div id="main-block" className="main-block">
      <Container>
        <div className="main-block_top">
          <div className="main-block_content">
            <h1 className="content-title">Фулфилмент полного цикла в Москве</h1>
            <div className="content-desc">
              Для маркетплейсов по схеме FBO и FBS
              <span className="desc-question">
                <span className="desc-title">
                  <HelpCircleSvg/> Что это?
                </span>
                <span className="desc-text">
                  FBO (fulfilment by operator) - схема, которая предполагает хранение товаров на складе Ozon, а также организацию доставки силами маркетплейса.<br/>FBS (fulfilment by seller) - схема, при которой продавец обязан хранить товары на своем или арендованном складе, своими силами осуществлять доставку.
                </span>
              </span>
            </div>
          </div>
          <div className="main-block_markets">
            <a href="/" rel="noreferrer" target="_blank" className="market-item ozon">
              <img src={ozLogo} decoding="async" loading="lazy" alt="ozon-logo"/>
            </a>
            <a href="/" rel="noreferrer" target="_blank" className="market-item wildberries">
              <img src={wbLogo} decoding="async" loading="lazy" alt="ozon-logo"/>
            </a>
            <a href="/" rel="noreferrer" target="_blank" className="market-item yandex">
              <img src={yaLogo} decoding="async" loading="lazy" alt="ozon-logo"/>
            </a>
          </div>
        </div>
        <div className="main-block_bottom">
          <div className="main-block_info">
            <div className="info-holder">
              <h2 className="info-title">Работа с маркетплейсами — это просто</h2>
              <div className="info-desc">Вам необходимо просто дать нам задание. Все остальное сделаем мы и в самые
                короткие сроки. За счёт этого вы сможете сосредоточить внимание на своём бизнесе и продажах!
              </div>
            </div>
            <div className="info-buttons">
              <Button component="a" href="/" target="_blank" className="btn primary">Сделать расчет</Button>
              <Button component="a" href="/" target="_blank" className="btn secondary">Получить консультацию</Button>
            </div>
          </div>
          <div className="main-block_sales">
            <Swiper
              modules={[Navigation]}
              speed={1000}
              spaceBetween={10}
              navigation={{
                prevEl: ".main-block_sales .main-block_theme .theme-prev",
                nextEl: ".main-block_sales .main-block_theme .theme-next"
              }}
              className=".main-block_sales-swiper"
            >
              <SwiperSlide className="swiper-slide">
                <div className="main-block_sales-item">
                  <img src={imageSlide} decoding="async" loading="lazy" alt="main-block_slide-item"/>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="main-block_sales-item">
                  <img src={imageSlide} decoding="async" loading="lazy" alt="main-block_slide-item"/>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="main-block_sales-item">
                  <img src={imageSlide} decoding="async" loading="lazy" alt="main-block_slide-item"/>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="main-block_theme">
              <div className="theme-prev">
                <ArrowPrev color="white"/>
              </div>
              <div className="theme-next">
                <ArrowNext color="white"/>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MainBanner;