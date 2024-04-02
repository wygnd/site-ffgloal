import React from 'react';
import Container from "@/components/container/Container";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {IReviewItem} from "@/@types/reviews";
import IconReviewItem from "./images/review-item_icon.svg";
import ReviewItem from "@/components/reviewsBlock/Review-item";
import './Reviews-block.scss';
import PrevButton from "./images/reviews-block_prev.svg";
import NextButton from "./images/reviews-block_next.svg";

const reviews: IReviewItem[] = [
  {
    id: 1,
    icon: <IconReviewItem/>,
    name: "Равшан Камилевич",
    company: "Трикотажные изделия",
    review: "Сотрудники компании очень профессионально подошли к моей задаче, помогли с упаковкой товаров, заполнением этикеток и подготовкой всей необходимой документации. Благодаря их опыту и знаниям, мне удалось избежать многих ошибок и ускорить процесс запуска моего бизнеса."
  },
  {
    id: 2,
    icon: <IconReviewItem/>,
    name: "Давтян Имануилович",
    company: "Детские товары",
    review: "С самого начала сотрудничества, сотрудники компании проявили высокий уровень профессионализма и компетентности. Они помогли мне с упаковкой и маркировкой товаров, а также предоставили всю необходимую документацию. Это позволило мне сэкономить время и ресурсы, что особенно важно для моего бизнеса."
  },
  {
    id: 3,
    icon: <IconReviewItem/>,
    name: "Равшан Камилевич",
    company: "Детские товары",
    review: "Сотрудники компании очень профессионально подошли к моей задаче, помогли с упаковкой товаров, заполнением этикеток и подготовкой всей необходимой документации. Благодаря их опыту и знаниям, мне удалось избежать многих ошибок и ускорить процесс запуска моего бизнеса."
  },
  {
    id: 4,
    icon: <IconReviewItem/>,
    name: "Давтян Имануилович",
    company: "Трикотажные изделия",
    review: "С самого начала сотрудничества, сотрудники компании проявили высокий уровень профессионализма и компетентности. Они помогли мне с упаковкой и маркировкой товаров, а также предоставили всю необходимую документацию. Это позволило мне сэкономить время и ресурсы, что особенно важно для моего бизнеса."
  },
]

const ReviewsBlock = () => {
  return (
    <div id="reviews-block" className="reviews-block">
      <Container>
        <div className="reviews-block_header">
          <div className="reviews-block_title">Наши клиенты</div>
          <div className="reviews-block_desc">Присоединяйтесь к селлерам, которые довольны качеством нашей работы и
            получайте такие же положительные эмоции от сотрудничества с нами!
          </div>
        </div>
        <ul className="reviews-holder">
          <div className="reviews-swiper-button reviews-prev">
            <PrevButton/>
          </div>
          <Swiper
            modules={[Navigation]}

            speed={800}
            className="reviews-holder_swiper"
            navigation={{
              prevEl: ".reviews-block .reviews-holder .reviews-prev",
              nextEl: ".reviews-block .reviews-holder .reviews-next"
            }}
            breakpoints={{
              1: {
                slidesPerView: 1,
                spaceBetween: 10,
                autoHeight: true
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
                autoHeight: false
              }
            }}
          >
            {reviews.map(item =>
              <SwiperSlide key={item.id}>
                <ReviewItem item={item}/>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="reviews-swiper-button reviews-next">
            <NextButton/>
          </div>
        </ul>
      </Container>
    </div>
  );
};

export default ReviewsBlock;