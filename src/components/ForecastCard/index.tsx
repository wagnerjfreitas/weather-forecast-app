import React from 'react';

import {
  View
} from 'react-native';

import { 
  Container,
  ImageContent,
  Image,
  WeekDay,
  DescriptionContent,
  Cloulds,
  Temperature,
  SpeedWind,

 } from './styles';

export function ForecastCard(){
  return (
    <Container>
      <ImageContent>
        <Image>

        </Image>
        <WeekDay>

        </WeekDay>
      </ImageContent>
      <DescriptionContent>
        <Temperature>
        
        </Temperature>
        <SpeedWind>
        
        </SpeedWind>
        <Cloulds>

        </Cloulds>
        </DescriptionContent>
    </Container>
  );
}
