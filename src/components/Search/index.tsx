import React from 'react';

import {
  Text, TextInput, View, TextInputProps
} from 'react-native';

import { 
    Container,
    InputTitle,
    InputText,
    IconSearch,
    InputContent,

  } from './styles';

type SearchProps = TextInputProps & {
  onSearch: () => void;
  }
 
 export function Search({onSearch, ...rest}: SearchProps){
    
    return(
      <Container>
        <InputTitle>Selecione a Cidade</InputTitle>
        <InputContent>
          <InputText  placeholder="Pesquisa por cidade" {...rest}/>
          <IconSearch 
            onPress={onSearch} 
            name='search-outline'/>
        </InputContent>
      </Container>
    )
 }
