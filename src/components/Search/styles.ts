import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  padding: 20px 10px;
`;

export const InputTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${( { theme }) => theme.fonts.text_500};
  font-size: 16px;

`;

export const InputContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.text}; */
`;

export const InputText = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
  height: 50px;
  padding: 0 50px 0 10px;
  border-radius: 5px;
`;

export const IconSearch = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(24)}px;
  width: 48px;  
  padding: 10px;
  margin-left: -50px;
  /* background-color: aliceblue; */
`;