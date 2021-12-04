import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Text, TextInput, View} from 'react-native';

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
  Search,
  InputTitle,
} from './styles';

import { City, Forecast, WeatherForecast } from '../../types/WeatherForecast';
import {forecast} from './weatherForecastList';

export function Dashboard(){

  // const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [city, setCity] = useState<City>({} as City);
  const [listForecast, setListForecast] = useState<Forecast[]>([] as Forecast[]);

  useEffect(() => {
    if (forecast){
      const {city} = forecast;
      const {list} = forecast;
      setCity(city)
      setListForecast(list);
      console.log(city);
      console.log(list);
      // setWeatherForecast(forecast);
    }
  },[])

  return (
    <Container>
      <Header>
        <HeaderTitle>Seja Bem Vindo</HeaderTitle>
      </Header>
      <TodayForecastContainer>
        <TodayForecastHeader>
          <TodayForecastHeaderTitle>
            <Today>Hoje</Today>
            <TodayCity>{city.name}</TodayCity>
          </TodayForecastHeaderTitle>
          <TodayImage>Imagem</TodayImage>
        </TodayForecastHeader>
        <TodayForecastContent> 
          <TemperatureContent>
            <Temperature>
              28
            </Temperature>
            <TemperatureUnit>
              C
            </TemperatureUnit>
          </TemperatureContent>
          <TodayDescriptionContent>
            <TodayDescription>
              chuva leve
            </TodayDescription>
            <TodayDescription>
              15:00 Fev 19
            </TodayDescription>
          </TodayDescriptionContent>
        </TodayForecastContent>
        </TodayForecastContainer>

      <Search>
        <InputTitle>Selecione a Cidade</InputTitle>
        <TextInput placeholder="Pesquisa por cidade" />
      </Search>

      <ScrollView>
        {listForecast.map((item, index) => 
          <View key={index}> 
            <Text>{item.main.temp}</Text>
          </View>
        )}
      </ScrollView>
      
    </Container>
  );
}
