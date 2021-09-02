import { useEffect, useRef, useState, useCallback } from 'react';
import { InputHTMLAttributes, ReactNode } from 'react'

import { useField } from '@unform/core';

import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  icon: ReactNode,
}

export function Input(props: InputProps) {

  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(props.name);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur(value: string) {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  // const handleInputFocus = useCallback(() => {
  //   setIsFocused(true);
  // }, []);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRef.current?.value);
  // }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (

    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {Icon && <Icon size={20} />} */}

      <input
        onFocus={handleInputFocus}
        onBlur={event => handleInputBlur(event.target.value)}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />
    </Container>

  )

}