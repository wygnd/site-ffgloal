import React from 'react';
import Container from "@/components/container/Container";
import Logo from "@/components/logo/Logo";
import IconVK from "./images/vk.svg";
import IconTG from "./images/tg.svg";
import IconWA from "./images/whatsapp.svg";
import "./Footer.scss";
import ModalMessage from "@/components/modals/modalMessage/Modal-message";
import {modalStore} from "@/store/modal-store";
import {IoIosInformationCircle} from "react-icons/io";
import ModalInstance from "@/components/modals/modalInstance/Modal-instance";
import Form from "@/components/form/Form";
import {GrStatusGood} from "react-icons/gr";

const Footer = () => {

  const {
    showSuccess,
    setSuccess,
    showModalForm,
    setModalForm,
    successMsg,
    errorMsg,
    showError,
    setError
  } = modalStore();

  return (
    <>
      <footer id="footer" className="footer">
        <Container>
          <div className="footer-holder">
            <Logo className="footer-holder_logo"/>
            <div className="footer-holder_contacts">
              <a href="tel:+79361360000" className="contact-item phone">
                +7 (936) 136 00 00
              </a>
              <div className="contact-item socials">
                <a href="/" target="_blank" className="social-item">
                  <IconTG/>
                </a>
                <a href="/" target="_blank" className="social-item">
                  <IconVK/>
                </a>
                <a href="/" target="_blank" className="social-item">
                  <IconWA/>
                </a>
              </div>
            </div>
            <div className="footer-holder_copyright">© 2024 Copyright. All rights reserved by FFGlobal</div>
          </div>
        </Container>
      </footer>
      <ModalMessage
        type={1}
        icon={<GrStatusGood/>}
        message={successMsg}
        show={showSuccess}
        hide={() => setSuccess(false)}
      />
      <ModalMessage
        type={-1}
        icon={<IoIosInformationCircle/>}
        message={errorMsg}
        show={showError}
        hide={() => setError(false)}
      />
      <ModalInstance show={showModalForm} hide={() => setModalForm(false)}>
        <h4 className="modal-title">Оставить заявку</h4>
        <Form className="modal-form"/>
      </ModalInstance>
    </>
  );
};

export default Footer;