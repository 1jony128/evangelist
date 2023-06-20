import {AddPointShema} from '../store/addPointStore';

export const selectIsOpen = (state: AddPointShema) => state.isOpen;
export const selectSetOpen = (state: AddPointShema) => state.setOpen;
export const selectSetClose = (state: AddPointShema) => state.setClose;
export const selectFio = (state: AddPointShema) => state.fio;
export const selectSetFio = (state: AddPointShema) => state.setFio;
export const selectAddress = (state: AddPointShema) => state.address;
export const selectSetAddress = (state: AddPointShema) => state.setAddress;
export const selectCount = (state: AddPointShema) => state.count;
export const selectSetCount = (state: AddPointShema) => state.setCount;
export const selectMode = (state: AddPointShema) => state.mode;
export const selectPoint = (state: AddPointShema) => state.point;
export const selectSetComment = (state: AddPointShema) => state.setComment;
export const selectComment = (state: AddPointShema) => state.comment;
export const selectClearForm = (state: AddPointShema) => state.clearForm;

