import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  padding: 20px;
`;

export const InputTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${( { theme }) => theme.fonts.text_500};
  font-size: 16px;

`;

export const InputText = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.text};
    height: 50px;
    padding: 0 5px;
    border-radius: 5px;
`;