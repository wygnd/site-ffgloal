import React, {useEffect, useRef} from 'react';
import Container from "@/components/container/Container";
import IconTg from "./images/icon-tg.svg";
import IconTime from "./images/icon-time.svg"
import IconAddress from "./images/icon-address.svg"
import {Button} from "@/components/button/Button";
import "./Contacts-block.scss";


const ContactsBlock = () => {

  const scriptRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn-ru.bitrix24.ru/b25617662/crm/form/loader_3.js';
    script.async = true;

    scriptRef.current.appendChild(script);

    return () => {
      scriptRef.current.removeChild(script);
    }
  }, [])

  return (
    <div id="contacts-block" className="contacts-block">
      <Container>
        <div className="contacts-title">Начнем работу?</div>
        <div className="contacts-desc">Оставьте заявку или напишите нам в Telegram/WhatsApp</div>
        <div className="contacts-holder">
          <div className="contacts-holder_form" ref={scriptRef}></div>
          <div className="contacts-holder_socials">
            <div className="socials-icon">
              <IconTg/>
            </div>
            <div className="socials-name">Напишите менеджеру в Telegram для уточнения всех вопросов</div>
            <Button className="btn dark socials-button">Написать в Telegram</Button>
          </div>
          <div className="contacts-holder_info">
            <div className="info-item">
              <div className="info-item_icon">
                <IconTime/>
              </div>
              <div className="info-item_desc">На связи 7 дней в неделю с 8:00 до 18:00</div>
            </div>
            <div className="info-item">
              <div className="info-item_icon">
                <IconAddress/>
              </div>
              <div className="info-item_desc">г. Москва<br/>Алтуфьевское шоссе 102Б</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactsBlock;