import {useState} from 'react';

const useInput = (validator) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validator(value);
    const hasError = !isValid && isTouched;

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleBlur() {
        setIsTouched(true);
    }

    function reset() {
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        hasError,
        isValid,
        handleChange,
        handleBlur,
        reset
    }
}

export default useInput;