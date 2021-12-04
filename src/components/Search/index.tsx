import React from 'react';
import {
  Text, TextInput, View
} from 'react-native';

import { 
    Container,
    InputTitle,
    InputText,

  } from './styles';

type InputProps = {
    
  }
 
 export function Search({...rest}){
    return(
      <Container>
        <InputTitle>Selecione a Cidade</InputTitle>
        <InputText placeholder="Pesquisa por cidade" {...rest}/>
      </Container>
    )
 }