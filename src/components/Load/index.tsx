import React from 'react';

import {
  ActivityIndicator
} from 'react-native';

import { Container, Searching } from './styles';

export function Load(){
  return (
    <Container>
      <Searching/>
    </Container>
  );
}
