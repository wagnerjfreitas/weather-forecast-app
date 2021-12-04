import moment from 'moment';
import React from 'react';
import {
  Text
} from 'react-native';
import { Forecast } from '../../types/WeatherForecast';
import {
  Container, Description, DescriptionContent, Image, ImageContent, WeekDay
} from './styles';



 type ForecastProps = {
   item: Forecast
 }

export function ForecastCard({item}:ForecastProps){
  let urlImage = {uri:`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
  return (
    <Container>
      
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
