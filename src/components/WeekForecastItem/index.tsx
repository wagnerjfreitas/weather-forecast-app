import moment from 'moment';
import React, { useEffect } from 'react';
import {
  Text, TouchableOpacityProps
} from 'react-native';
import { WeatherForecast } from '../../database/models';
import {
  Container, Description, DescriptionContent, Image, ImageContent, WeekDay
} from './styles';

 type ForecastProps = TouchableOpacityProps & {
   item: WeatherForecast
 }

export function WeekForecastItem({item, ...rest}: ForecastProps){
  let urlImage = {uri:`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
  return (
    <Container {...rest}>
      
      <DescriptionContent>
        <Description>
          {item.temp} C
        </Description>
        <Description>
        {item.description}
        </Description>
        <Description>
        {item.humidity}% de umidade
        </Description>
        </DescriptionContent>

        <ImageContent>
        <Image source={urlImage}/>
        <WeekDay>
          {moment.unix(item.dt).format('ddd')}
        </WeekDay>
      </ImageContent>

    </Container>
  );
}
