import { useState, ChangeEvent, useCallback } from "react"


const useInput = (initialValue, placeholderInit) => {
    const [value, setValue] = useState(initialValue);
    const [placeholder, setPlaceholder]  = useState(placeholderInit || "");
    const [label, setLabel]  = useState("");
    const [error, setError] = useState(null);
    const [hover, setHover] = useState(false);
    const onChange = useCallback((e) => {
        setValue(e.target.value)
        setHover(true)
    },[])

    const onBlur = useCallback(() => () => {
        setHover(false)
    },[])

    const onFocus = useCallback(() => () => {
        setHover(true)
    },[])

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
    }
}

export default useInput