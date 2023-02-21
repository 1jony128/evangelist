import {AddPointShema} from '../store/addPointStore';

export const getIsOpen = (state: AddPointShema) => state.isOpen;
export const getSetOpen = (state: AddPointShema) => state.setOpen;
export const getSetClose = (state: AddPointShema) => state.setClose;
export const getFio = (state: AddPointShema) => state.fio;
export const getSetFio = (state: AddPointShema) => state.setFio;
