import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import moment from 'moment';

import { 
  Container, 
  Header,
  HeaderTitle,
  TodayForecastContainer,
  TodayForecastHeader,
  TodayForecastHeaderTitle,
  Today,
  TodayCity,
  TodayImage,
  TodayForecastContent,
  TemperatureContent,
  Temperature,
  TemperatureUnit,
  TodayDescriptionContent,
  TodayDescription,
  WeekForecasts,
  ImageContent,
} from './styles';

import { City, Forecast } from '../../types/WeatherForecast';

import {forecast} from './weatherForecastList';
import { ForecastCard } from '../../components/ForecastCard';
import { Search } from '../../components/Search';

type ImageUri = {
  uri: string;
}

export function Dashboard(){

  // const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [city, setCity] = useState<City>({} as City);
  const [listForecast, setListForecast] = useState<Forecast[]>([] as Forecast[]);
  const [todayForecast, setTodayForecast] = useState<Forecast>({} as Forecast);
  const [urlImage, setUrlImage] = useState<ImageUri>({} as ImageUri);

  useEffect(() => {
    if (forecast){      
      
      setCity(forecast.city)
      setListForecast(forecast.list);
      
      setUrlImage({uri:`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`})
      setTodayForecast(forecast.list[0] as Forecast)

      console.log(forecast.list[0]);
    }
  },[])


  return (
    <Container>
      <Header>
        <HeaderTitle>Seja Bem Vindo</HeaderTitle>
      </Header>
    {!todayForecast.main ? <AppLoading/> :
      <TodayForecastContainer>
        <TodayForecastHeader>
          <TodayForecastHeaderTitle>
            <Today>{moment.unix(todayForecast.dt).format('dddd')}</Today>
            <TodayCity>{city.name}</TodayCity>
          </TodayForecastHeaderTitle>
          <ImageContent>
            <TodayImage source={urlImage} />
          </ImageContent>
        </TodayForecastHeader>
        <TodayForecastContent> 
          <TemperatureContent>
            <Temperature>
              {todayForecast.main.temp ? todayForecast.main.temp : 0}
            </Temperature>
            <TemperatureUnit>
              C
            </TemperatureUnit>
          </TemperatureContent>
          <TodayDescriptionContent>
            <TodayDescription>
              {todayForecast.weather[0].description}
            </TodayDescription>
            <TodayDescription>
              {moment.unix(todayForecast.dt).format('ddd HH:mm YY')}
            </TodayDescription>
          </TodayDescriptionContent>
        </TodayForecastContent>
        </TodayForecastContainer>
}
      <Search />

      <WeekForecasts>
        {listForecast.map((item, index) => 
          <ForecastCard key={index} item={item} /> 
        )}
      </WeekForecasts>
      
    </Container>
  );
}
