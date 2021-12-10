import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  padding: 0 0 10px 0;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(12)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  align-items: flex-end; 
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${( {theme} ) => theme.fonts.text_400};
  font-size: 20px;
`;

export const ButtonHistoric = styled.TouchableOpacity`
  opacity: 0.95;
`;

export const IconHistoric = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(28)}px;
  width: 50px;  
  padding: 10px;
  /* background-color: aliceblue; */
`;

export const MainForecastContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainForecastHeader = styled.View`
  flex-direction: row;
  margin: 10px;
  justify-content: space-between;
`;

export const MainForecastHeaderTitle = styled.View`

`;

export const WeekDay = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_400};
`;

export const MainCity = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_700};
`;

export const ImageContent = styled.View`
  background-color: ${({ theme }) => theme.colors.description};
  width: 80px;
  border-radius: 5px;
  align-items: center;
  padding-bottom: 6px;
`;

export const MainImage = styled.Image`
  width: 80px;
  height: 60px;
`;

export const MainForecastContent = styled.View`
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
  font-weight: bold;
`;

export const MainDescriptionContent = styled.View`
  align-items: center;
`;

export const MainDescription = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_500};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const WeekForecasts = styled.ScrollView`
  width: 100%;
  padding: 10px;
`;

export const ListForecasts = styled.ScrollView`
  width: 100%;
`;

export const EmptyList = styled.View`
  flex: 1; 
  justify-content: center;
  align-content: center;
  align-items: center;  
`;

export const EmptyListTitle = styled.Text`
  font-family: ${( {theme} ) => theme.fonts.text_500};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.description};
`;

export const Refresh = styled.RefreshControl`
`;
