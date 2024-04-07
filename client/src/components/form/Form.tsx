import React, {ChangeEvent, FC, useState} from 'react';
import {Button} from "@/components/button/Button";
import Input from "@/components/input/Input";
import {IFormData, IFormProps, SelectValue} from "@/@types/form";
import Select from "@/components/select/Select";
import "./Form.scss";
import IconArrow from "@/assets/images/toggler.svg";
import {create_deal} from "@/http/bitrix";
import clsx from "clsx";
import {modalStore} from "@/store/modal-store";

const Form: FC<IFormProps> = ({className}) => {

  const [form, setForm] = useState<IFormData>({
    name: "",
    phone: "",
    message: "",
    callback: null
  });
  const [clearSelect, setClearSelect] = useState<boolean>(false);
  const {showModalForm, setModalForm, setError, showError, setErrorMsg, setSuccessMsg, setSuccess} = modalStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmitForm = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await create_deal(form);
    if (showModalForm) {
      setModalForm(false);
    }
    setForm(null);
    setClearSelect(!clearSelect);
    if (data === null) {
      setErrorMsg("Что-то пошло не так");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setSuccessMsg("Форма успешно отправлена");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  const selectValues: SelectValue[] = [
    {
      name: "Звонок",
      value: 0,
    },
    {
      name: "WhatsApp",
      value: 1,
    }, {
      name: "Telegram",
      value: 2,
    }
  ]

  return (
    <form className={clsx("form", className)} onSubmit={handleSubmitForm}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        value={form?.name}
        onChange={handleInputChange}
        className="form-input"
      />
      <Input
        type="tel"
        name="phone"
        placeholder="+7 (999) 999-99-99"
        required value={form?.phone}
        onChange={handleInputChange}
        className="form-input"
      />
      <Input
        type="text"
        name="message"
        placeholder="Какой объем ваших товаров?"
        value={form?.message}
        onChange={handleInputChange}
        className="form-input"
      />
      <Select
        defaultValue="Как удобнее связаться"
        values={selectValues}
        icon={<IconArrow/>}
        result={(value) => setForm({...form, callback: selectValues.filter(el => el.value === value)[0].name})}
        clear={clearSelect}
      />
      <Button
        className="btn primary"
        type="submit">Свяжитесь со мной</Button>
    </form>
  );
};

export default Form;