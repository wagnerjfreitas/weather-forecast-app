import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import moment from 'moment';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import { 
  Container, 
  Header,
  ButtonHistoric,
  IconHistoric,
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
import { api } from '../../services/api';
import { WeatherForecast } from '../../database/models';
import { Alert } from 'react-native';
import DAO from '../../database/sqlite/DAO';
import db from '../../database/sqlite/db';
import { isNetworkAvailable } from '../../utils/network';

type ImageUri = {
  uri: string;
}

export function Dashboard(){

  // const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [city, setCity] = useState<City>({} as City);
  const [listForecast, setListForecast] = useState<WeatherForecast[]>([] as WeatherForecast[]);
  const [mainForecast, setMainForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [urlImage, setUrlImage] = useState<ImageUri>({} as ImageUri);
  const [itemSearch, setItemSearch] = useState('');
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    loadTodayForecast('São Paulo');
  },[]);

  useEffect(() => {
    moment.updateLocale('pt-br', {
      weekdays: [
        "Domingo","Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
      ]
  });
    if (mainForecast.dt){
      setUrlImage({uri:`http://openweathermap.org/img/wn/${mainForecast.icon}@2x.png`})
    }
  }, [mainForecast]);

  async function loadTodayForecast(city: string){
    const isConnected = await isNetworkAvailable();
    let response = [] as WeatherForecast[];

    if (!city){
      return
    }

    if (isConnected) {
      response = await api.get5Days(city);
      if (response && response.length > 0){
        await saveWeatherForecast(response);
      } else {
        Alert.alert("Aviso", "Previsão não encontrada para " + city);
        setSearching(false);
      }
    } else {
      response = await DAO.WeatherForecastDAO.findByCityName(city);      
    }
    if (response && response.length > 0){
      setMainForecast(response[0]);
      // response.splice(0);            
      setListForecast(response.length > 0 ? response : []);
    }
    setSearching(false);
    // console.log('response', response);
  }

  async function saveWeatherForecast(data: WeatherForecast[]){

    const historyCity = await DAO.WeatherForecastDAO.findByCityId(data[0].city_id);
    if (historyCity && historyCity.length > 0){
      await DAO.WeatherForecastDAO.removeHistoryByCityId(data[0].city_id);
    }

    data?.forEach( async (item) => {
      item.id = uuidv4(); 
      await DAO.WeatherForecastDAO.create(item);
    });
    setSearching(false);
  }

  function handleOnSearch(city: string) {
    if (!city){
      return
    }
    if (!searching){
      console.log('handleOnSearch')
      setSearching(true);
      loadTodayForecast(city);
    }
  }

  function handleOnChangeText(value: string) {
    console.log('handleOnChangeText');
    setItemSearch(value);
  }

  function handleOnSelectItem(item: WeatherForecast){
    console.log('item '+ item.dt_txt + ' selecionado')
    setMainForecast(item);
  }

  function handleOnOpenHistory() {
    console.log('handleOnOpenHistory')

    // dropDatabase();
  }

  function dropDatabase(){
    console.log('Excluindo banco de dados... ');
    db.dropTables();
  }


  return (
    <Container>
      <Header>
        <HeaderTitle>Seja Bem Vindo</HeaderTitle>
        <ButtonHistoric
          onPress={handleOnOpenHistory}
        >
          <IconHistoric name='history'/>
        </ButtonHistoric>
      </Header>
      {!mainForecast ? <AppLoading/> :
        <MainForecastContainer>
          <MainForecastHeader>
            <MainForecastHeaderTitle>
              <WeekDay>{moment.unix(mainForecast.dt).format('dddd')}</WeekDay>
              <MainCity>{mainForecast.city_name}</MainCity>
            </MainForecastHeaderTitle>
            <ImageContent>
              <MainImage source={urlImage} />
            </ImageContent>
          </MainForecastHeader>
          <MainForecastContent> 
            <TemperatureContent>
              <Temperature>
                {mainForecast.temp ? mainForecast.temp : 0}
              </Temperature>
              <TemperatureUnit>
                C
              </TemperatureUnit>
            </TemperatureContent>
            <MainDescriptionContent>
              <MainDescription>
                {mainForecast.description}
              </MainDescription>
              <MainDescription>
                {moment.unix(mainForecast.dt).format('ddd, DD MMM YYYY, HH:mm')}
              </MainDescription>
            </MainDescriptionContent>
          </MainForecastContent>
        </MainForecastContainer>
      }
      <Search
        onSearch={() => handleOnSearch(itemSearch)} 
        editable={!searching}
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
