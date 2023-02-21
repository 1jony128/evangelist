import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';

export interface IInput {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<any>>;
  setError: Dispatch<SetStateAction<any>>;
  setHover: Dispatch<SetStateAction<any>>;
  setLabel: Dispatch<SetStateAction<any>>;
  error: null | string;
  hover: boolean;
  onBlur: () => void;
  onFocus: () => void;
  label: string;
  placeholder: string;
  name: string | undefined;
}

const useInput = (
  initialValue: string,
  placeholderInit?: string,
  name?: string
): IInput => {
  const [value, setValue] = useState(initialValue);
  const [placeholder, setPlaceholder] = useState(placeholderInit || '');
  const [label, setLabel] = useState('');
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHover(true);
  }, []);

  const onBlur = () => {
    setHover(false);
  };

  const onFocus = () => {
    setHover(true);
  };

  return {
    value,
    onChange,
    setValue,
    setError,
    setLabel,
    error,
    hover,
    setHover,
    onBlur,
    onFocus,
    label,
    placeholder,
    name,
  };
};

export default useInput;
