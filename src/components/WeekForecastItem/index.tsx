import moment from 'moment';
import React from 'react';
import {
  Text, TouchableOpacityProps
} from 'react-native';
import { Forecast } from '../../types/WeatherForecast';
import {
  Container, Description, DescriptionContent, Image, ImageContent, WeekDay
} from './styles';



 type ForecastProps = TouchableOpacityProps & {
   item: Forecast
 }

export function WeekForecastItem({item, ...rest}: ForecastProps){
  let urlImage = {uri:`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
  return (
    <Container {...rest}>
      
      <DescriptionContent>
        <Description>
          {item.main.temp} C
        </Description>
        <Description>
        {item.weather[0].description}
        </Description>
        <Description>
        {item.main.humidity}% de umidade
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
