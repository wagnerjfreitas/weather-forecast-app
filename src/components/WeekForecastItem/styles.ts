
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary_dark};
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  justify-content: space-between;
`;

export const ImageContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background_light};
  width: 60px;
  border-radius: 5px;
  align-items: center;
  padding-bottom: 6px;
`;
export const Image = styled.Image`
  width: 60px;
  height: 40px;
`;
export const WeekDay = styled.Text`
  color: ${({ theme }) => theme.colors.description};
`;
export const DescriptionContent = styled.View`
  
`;
export const Description = styled.Text`
  font-family: ${({theme}) => theme.fonts.text_400};
  color: ${({theme}) => theme.colors.description};
`;






