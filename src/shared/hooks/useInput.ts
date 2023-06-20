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
  setValue: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | boolean | null>>;
  setHover: Dispatch<SetStateAction<boolean>>;
  setLabel: Dispatch<SetStateAction<string>>;
  clear: () => void;
  error: null | string | boolean;
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
  const [error, setError] = useState<string | boolean | null>(null);
  const [hover, setHover] = useState(false);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHover(true);
    if(error){
      setError(null)
    }
  }, []);

  const onBlur = () => {
    setHover(false);
  };

  const onFocus = () => {
    setHover(true);
  };

  const clear = () => {
    setValue("")
    setError("")
    setHover(false);
  }

  return {
    clear,
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
