import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import './Auth-page.scss';
import {IUserAuth} from "@/@types/user";
import {sign_in} from "@/http/auth-http";
import {userStore} from "@/store/user-store";
import {redirect, useNavigate} from "react-router-dom";


const AuthPage = () => {

  const [formData, setFormData] = useState<IUserAuth>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const {is_auth, setUser, setAuth} = userStore();
  const navigate = useNavigate();

  //   console.log(is_auth);
  // if (is_auth) {
  //   navigate('/admin');
  // }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity() || !formData) {
      setValidated(true);
      return;
    }

    setValidated(false);
    const data = await sign_in(formData);
    if (!data) {
      setUser(null);
      setAuth(false);
      alert('Что-то пошло не так');
    }
    setUser(data.user);
    setAuth(true);
    localStorage.setItem("jwtToken", data.token);
    redirect('/admin');
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputType = e.target.id;
    const inputValue = e.target.value;

    setFormData({...formData, [inputType]: inputValue});
  }

  return (
    <main id="main" className="auth-page">
      <div className="auth-page__holder">
        <Form className="auth-page__form" noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 className="auth-page__title text-center h1 mb-4">Авторизация</h1>
          <FloatingLabel label="E-mail" className="auth-page__label mb-2 w-100" as="label">
            <Form.Control id="email" type="email" placeholder="example@gmail.com" onChange={onChangeInput} required/>
          </FloatingLabel>
          <FloatingLabel label="Пароль" className="auth-page__label w-100" as="label">
            <Form.Control id="password" type="password" placeholder="password" onChange={onChangeInput} required/>
          </FloatingLabel>
          <Button type="submit" className="auth-page__submit w-100 mt-4">Вход</Button>
        </Form>
      </div>
    </main>
  );
};

export default AuthPage;