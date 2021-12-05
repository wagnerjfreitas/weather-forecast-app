import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import moment from 'moment';

import { 
  Container, 
  Header,
  HeaderTitle,
  MainForecastContainer,
  MainForecastHeader,
  MainForecastHeaderTitle,
  WeekDay,
  MainCity,
  MainImage,
  MainForecastContent,
  TemperatureContent,
  Temperature,
  TemperatureUnit,
  MainDescriptionContent,
  MainDescription,
  WeekForecasts,
  ImageContent,
} from './styles';

import { City, Forecast } from '../../types/WeatherForecast';

import {forecast} from './weatherForecastList';
import { WeekForecastItem } from '../../components/WeekForecastItem';
import { Search } from '../../components/Search';

type ImageUri = {
  uri: string;
}

export function Dashboard(){

  // const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [city, setCity] = useState<City>({} as City);
  const [listForecast, setListForecast] = useState<Forecast[]>([] as Forecast[]);
  const [mainForecast, setMainForecast] = useState<Forecast>({} as Forecast);
  const [urlImage, setUrlImage] = useState<ImageUri>({} as ImageUri);
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {
    if (forecast){      
      
      setCity(forecast.city)
      setListForecast(forecast.list);
      
      // setUrlImage({uri:`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`})
      setMainForecast(forecast.list[0] as Forecast)

    }
  },[]);

  useEffect(() => {
    if (mainForecast.dt){
      setUrlImage({uri:`http://openweathermap.org/img/wn/${mainForecast.weather[0].icon}@2x.png`})
    }
  }, [mainForecast])

  function handleOnSearch() {
    console.log('handleOnSearch')
  }

  function handleOnChangeText(value: string) {
    console.log('handleOnChangeText');
    setItemSearch(value);
  }

  function handleOnSelectItem(item: Forecast){
    console.log('item '+ item.dt_txt + ' selecionado')
    setMainForecast(item);
  }


  return (
    <Container>
      <Header>
        <HeaderTitle>Seja Bem Vindo</HeaderTitle>
      </Header>
      {!mainForecast.main ? <AppLoading/> :
        <MainForecastContainer>
          <MainForecastHeader>
            <MainForecastHeaderTitle>
              <WeekDay>{moment.unix(mainForecast.dt).format('dddd')}</WeekDay>
              <MainCity>{city.name}</MainCity>
            </MainForecastHeaderTitle>
            <ImageContent>
              <MainImage source={urlImage} />
            </ImageContent>
          </MainForecastHeader>
          <MainForecastContent> 
            <TemperatureContent>
              <Temperature>
                {mainForecast.main.temp ? mainForecast.main.temp : 0}
              </Temperature>
              <TemperatureUnit>
                C
              </TemperatureUnit>
            </TemperatureContent>
            <MainDescriptionContent>
              <MainDescription>
                {mainForecast.weather[0].description}
              </MainDescription>
              <MainDescription>
                {moment.unix(mainForecast.dt).format('ddd HH:mm YY')}
              </MainDescription>
            </MainDescriptionContent>
          </MainForecastContent>
        </MainForecastContainer>
      }
      <Search
        onSearch={handleOnSearch} 
        value={itemSearch} 
        onChangeText={handleOnChangeText}
      />

      <WeekForecasts>
        {listForecast.map((item, index) => 
          <WeekForecastItem 
            key={index} 
            item={item} 
            onPress={ () => handleOnSelectItem(item)}/> 
        )}
      </WeekForecasts>
      
    </Container>
  );
}
