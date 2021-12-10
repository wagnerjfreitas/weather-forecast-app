import React, { useEffect, useState } from 'react';

import { WeatherForecast } from '../../database/models';
import DAO from '../../database/sqlite/DAO';
import { Refresh, WeekForecasts } from '../../screens/Dashboard/styles';
import { WeekForecastItem } from '../WeekForecastItem';

type HistoryProps = {
  handleOnSelectHistoryItem: (item: WeatherForecast) => void;
  }
 
 export function History({handleOnSelectHistoryItem}: HistoryProps){
  
  const [listHistory, setListHistory] = useState<WeatherForecast[]>([] as WeatherForecast[]);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    getHistoryList()
  },[])

  async function getHistoryList(){
    const history = await DAO.WeatherForecastDAO.findAll();
    if(!!history && history.length > 0){
      setListHistory(history)
    } 
    setSearching(false)
  }

    return(
        <WeekForecasts
          refreshControl={
            <Refresh 
                refreshing={searching} 
                onRefresh={() => getHistoryList()} 
              />
            }
        >
          {listHistory.map((item, index) =>          
            <WeekForecastItem 
              isHistory
              key={index} 
              item={item} 
              onPress={ () => handleOnSelectHistoryItem(item)}  
            /> 
          )}
        </WeekForecasts>          
    )
 }
