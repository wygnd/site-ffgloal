import React from 'react';
import Container from "@/components/container/Container";
import image from './images/form-block_image.png'
import './Form-block.scss';
import {Button} from "@/components/button/Button";
import {modalStore} from "@/store/modal-store";

const FormBlock = () => {
  const {setModalForm} = modalStore();
  return (
    <div className="form-block">
      <Container>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-title">Получить консультацию нашего менеджера</div>
            <div className="form-desc">Наш специалист ответит на все интересующие вас вопросы и поможет подобрать вам
              оптимальный вариант под ваши задачи.
            </div>
            <Button className="btn primary" onClick={() => setModalForm(true)}>Получить консультацию</Button>
          </div>
          <div className="form-image">
            <img src={image} decoding="async" loading="lazy" alt="form-block-image"/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FormBlock;