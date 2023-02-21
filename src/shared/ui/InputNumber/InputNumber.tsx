import {FC} from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';

interface InputNumberProps {
  value: number;
  setValue: (value: number) => void
}

const InputNumber: FC<InputNumberProps> = ({value, setValue}) => {
    return (
      <NumberInput
        value={value}
        onChange={(value) => setValue(Number(value))}
        defaultValue={20}
        min={0} max={200}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
};

export default InputNumber;
