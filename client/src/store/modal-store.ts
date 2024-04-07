import {create} from "zustand";
import {ModalStoreType} from "@/@types/modal";


export const modalStore = create<ModalStoreType>()((set) => ({
  showInfo: false,
  setInfo: (bool: boolean) => set(() => (
    {
      showInfo: bool,
    }
  )),
  setErrorMsg: (msg: string) => set(() => (
    {
      errorMsg: msg,
    }
  )),
  showError: false,
  setError: (bool: boolean) => set(() => (
    {
      showError: bool,
    }
  )),
  showSuccess: false,
  setSuccess: (bool: boolean) => set(() => (
    {
      showSuccess: bool,
    }
  )),
  setSuccessMsg: (msg: string) => set(() => (
    {
      successMsg: msg,
    }
  )),
  showModalForm: false,
  setModalForm: (bool: boolean) => set(() => (
    {
      showModalForm: bool,
    }
  )),
  setInfoMsg: (msg: string) => set(() => (
    {
      infoMsg: msg,
    }
  )),
}))