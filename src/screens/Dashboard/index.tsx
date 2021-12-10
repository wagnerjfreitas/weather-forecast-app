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
  EmptyList,
  EmptyListTitle,
  Refresh,
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
import { History } from '../../components/History';

type ImageUri = {
  uri: string;
}

export function Dashboard(){
  const [listForecast, setListForecast] = useState<WeatherForecast[]>([] as WeatherForecast[]);
  const [mainForecast, setMainForecast] = useState<WeatherForecast>({} as WeatherForecast);
  const [urlImage, setUrlImage] = useState<ImageUri>({} as ImageUri);
  const [itemSearch, setItemSearch] = useState('');
  const [searching, setSearching] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [listHistory, setListHistory] = useState<WeatherForecast[]>([] as WeatherForecast[]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!itemSearch){
      setErrorMessage('')
    }
  },[itemSearch]);

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
      const removeOk = await DAO.WeatherForecastDAO.removeHistoryByCityId(data[0].city_id);
    }

    data?.forEach( async (item) => {
      item.id = uuidv4(); 
      await DAO.WeatherForecastDAO.create(item);
    });
    setSearching(false);
  }

  function handleOnSearch(city: string) {
    setErrorMessage('');
    if (!city.trim()){
      setItemSearch(city.trim())
      return
    }
    if (!searching){
      setSearching(true);
      loadTodayForecast(city.trim());
    }
  }

  function handleOnChangeText(value: string) {
    setItemSearch(value);
  }

  function handleOnSelectItem(item: WeatherForecast){
    setMainForecast(item);
    setItemSearch('');
    setErrorMessage('');
  }

  function handleOnOpenHistory() {
    // dropDatabase();

    setIsVisibleModal(true);    
    getHistoryList();
    setItemSearch('');
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
    setErrorMessage('')
    const response = await DAO.WeatherForecastDAO.findByCityName(city);
    if (response && response.length > 0){
      setMainForecast(response[0]);         
      setListForecast(response);
      setErrorMessage("sem conexão com a internet!");
    } else if (mainForecast.city_name){
      setErrorMessage("previsão não encontrada para " + city);
    }
    setSearching(false)
  }

  async function loadWebWeatherForecast(city: string){
    const response = await api.get5Days(city);
    if (response && response.length > 0){
      await saveWeatherForecast(response);
      setMainForecast(response[0]);      
      setListForecast(response);
    } else {
      setErrorMessage("previsão não encontrada para " + city);
      loadLocalWeatherForecast(city)
    }
    setSearching(false);
    setLoading(false);
  }

  function renderEmptyList() {
    return (
      <EmptyList>
        <EmptyListTitle > Nenhum item encontrado. </EmptyListTitle>
      </EmptyList>
    );
  }

  return (
    loading    
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
      {mainForecast && mainForecast.city_name ?
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
        :  <></>
      }
      <Search
        onSearch={() => handleOnSearch(itemSearch)} 
        editable={!searching}
        value={itemSearch} 
        errorMessage={errorMessage}
        onChangeText={handleOnChangeText}
      />

      {listForecast.length > 0
      ?
      <WeekForecasts
        refreshControl={
          <Refresh 
            refreshing={searching} 
            onRefresh={() => loadTodayForecast(itemSearch)} 
          />
        }
      >
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
        <History
          handleOnSelectHistoryItem={handleOnSelectHistoryItem}
        />
      </ModalView> 
      
    </Container>     
  );
}
