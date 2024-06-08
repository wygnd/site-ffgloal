import React from 'react';
import Container from "@/components/container/Container";
import IconTg from "./images/icon-tg.svg";
import IconTime from "./images/icon-time.svg"
import IconAddress from "./images/icon-address.svg"
import {Button} from "@/components/button/Button";
import "./Contacts-block.scss";
import Form from "@/components/form/Form";

const ContactsBlock = () => {

  return (
    <div id="contacts-block" className="contacts-block">
      <Container>
        <div className="contacts-title">Начнем работу?</div>
        <div className="contacts-desc">Оставьте заявку или напишите нам в Telegram/WhatsApp</div>
        <div className="contacts-holder">
          <div className="contacts-holder_form">
            <Form/>
          </div>
          <div className="contacts-holder_socials">
            <Button component={"a"} href="https://wa.me/79361360000" target="_blank" className="btn dark socials-button socials-button-whatsapp">Написать
              на WhatsApp</Button>
            <div className="socials-icon">
              <IconTg/>
            </div>
            <div className="socials-name">Напишите менеджеру в Telegram для уточнения всех вопросов</div>
            <Button component={"a"} href="https://t.me/FFGloba1" target="_blank" className="btn dark socials-button socials-button-telegramm">Написать
              в Telegram</Button>
          </div>
          <div className="contacts-holder_info">
            <div className="info-item">
              <div className="info-item_icon">
                <IconTime/>
              </div>
              <div className="info-item_desc">На связи 7 дней в неделю с 8:00 до 18:00</div>
            </div>
            <a href="https://yandex.ru/maps/-/CDRPfTkM" target="_blank" className="info-item">
              <div className="info-item_icon">
                <IconAddress/>
              </div>
              <div className="info-item_desc">г. Москва<br/>Алтуфьевское
                шоссе 102Б
              </div>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactsBlock;