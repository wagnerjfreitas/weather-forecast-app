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
  ListForecasts,
  ImageContent,
  EmptyList,
  EmptyListTitle,
} from './styles';

import { WeekForecastItem } from '../../components/WeekForecastItem';
import { Search } from '../../components/Search';
import { api } from '../../services/api';
import { WeatherForecast } from '../../database/models';
import { Alert, Text, View } from 'react-native';
import DAO from '../../database/sqlite/DAO';
import db from '../../database/sqlite/db';
import { isNetworkAvailable } from '../../utils/network';
import { ModalView } from '../../components/ModalView';
import { Load } from '../../components/Load';

type ImageUri = {
  uri: string;
}

export function Dashboard(){
  const [listForecast, setListForecast] = useState<WeatherForecast[]>([] as WeatherForecast[]);
  const [mainForecast, setMainForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [urlImage, setUrlImage] = useState<ImageUri>({} as ImageUri);
  const [itemSearch, setItemSearch] = useState('');
  const [searching, setSearching] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [listHistory, setListHistory] = useState<WeatherForecast[]>([] as WeatherForecast[]);

  useEffect(() => {
    loadTodayForecast('Viçosa');
  },[]);

  useEffect(() => {
    moment.updateLocale('pt-br', {
      weekdays: [
        "Domingo","Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
      ]
  });
    if (mainForecast.dt){
      setUrlImage({uri:`http://openweathermap.org/img/wn/${mainForecast.icon}@2x.png`})
    }
  }, [mainForecast]);

  async function loadTodayForecast(city: string){
    const isConnected = await isNetworkAvailable();
    if (!city){
      return
    }
    if (isConnected) {
      loadWebWeatherForecast(city)
    } else {
      loadLocalWeatherForecast(city)      
    }
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
      setSearching(true);
      loadTodayForecast(city);
    }
  }

  function handleOnChangeText(value: string) {
    setItemSearch(value);
  }

  function handleOnSelectItem(item: WeatherForecast){
    setMainForecast(item);
    setItemSearch('');
  }

  function handleOnOpenHistory() {
    setIsVisibleModal(true);    
    getHistoryList();
    setItemSearch('');

    // dropDatabase();
  }

  function dropDatabase(){
    console.log('Excluindo banco de dados... ');
    db.dropTables();
  }

  async function getHistoryList(){
    const history = await DAO.WeatherForecastDAO.findAll();
    if(!!history && history.length > 0){
      setListHistory(history)
    }
  }

  function handleOnCloseModal(){
    setIsVisibleModal(false);
  }

  function handleOnSelectHistoryItem(item: WeatherForecast){
      setSearching(true);
      loadLocalWeatherForecast(item.city_name); 
      setMainForecast(item);
      setIsVisibleModal(false);
  }

  async function loadLocalWeatherForecast(city: string){
    const response = await DAO.WeatherForecastDAO.findByCityName(city);
    if (response && response.length > 0){
      setMainForecast(response.length > 0 ? response[0] : []);         
      setListForecast(response.length > 0 ? response : []);
    }
    setSearching(false)
  }

  async function loadWebWeatherForecast(city: string){
    const response = await api.get5Days(city);
    if (response && response.length > 0){
      await saveWeatherForecast(response);
      setMainForecast(response.length > 0 ? response[0] : []);      
      setListForecast(response.length > 0 ? response : []);
    } else {
      loadLocalWeatherForecast(city)
      Alert.alert("Aviso", "Previsão não encontrada para " + city);
    }
    setSearching(false);
  }

  function renderEmptyList() {
    return (
      <EmptyList>
        <EmptyListTitle > Nenhum item encontrado. </EmptyListTitle>
      </EmptyList>
    );
  }

  return (
    searching    
    ? <Load /> 
    : <Container>
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
                °C
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

      {listForecast.length > 0
      ?
      <WeekForecasts>
        {listForecast.map((item, index) => 
          <WeekForecastItem 
            key={index} 
            item={item} 
            onPress={ () => handleOnSelectItem(item)}/> 
        )}
      </WeekForecasts>
      : renderEmptyList()
      }

      <ModalView
        visible={isVisibleModal} 
        closeModal={handleOnCloseModal} 
        title={'Selecione a cidade'}
      >
        {listHistory.length > 0
        ?
        <WeekForecasts>
          {listHistory.map((item, index) =>          
            <WeekForecastItem 
              isHistory
              key={index} 
              item={item} 
              onPress={ () => handleOnSelectHistoryItem(item)}/> 
          )}
        </WeekForecasts>
        : renderEmptyList()
      }

      </ModalView> 
      
    </Container>     
  );
}
