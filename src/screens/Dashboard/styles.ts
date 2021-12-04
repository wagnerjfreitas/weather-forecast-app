import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: flex-end;
  padding: 0 20px;
  /* align-items: center;  */
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${( {theme} ) => theme.fonts.text_400};
  font-size: 20px;
`;

export const TodayForecastContainer = styled.View`
  width: 97%;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
`;

export const TodayForecastHeader = styled.View`
  flex-direction: row;
  margin: 10px;
  justify-content: space-between;
`;

export const TodayForecastHeaderTitle = styled.View`

`;

export const Today = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_400};
`;

export const TodayCity = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_700};
`;

export const ImageContent = styled.View`
  background-color: ${({ theme }) => theme.colors.description};
  width: 60px;
  border-radius: 5px;
  align-items: center;
  padding-bottom: 6px;
`;

export const TodayImage = styled.Image`
  width: 90px;
  height: 60px;
`;

export const TodayForecastContent = styled.View`
  align-items: center;
`;

export const TemperatureContent = styled.View`
  flex-direction: row;
  margin-bottom: -15px;
`;

export const Temperature = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_500};
  font-size: 50px;
`;

export const TemperatureUnit = styled.Text`

`;

export const TodayDescriptionContent = styled.View`
  align-items: center;
`;

export const TodayDescription = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_500};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const WeekForecasts = styled.ScrollView`
  width: 97%;
`;
