import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';



export const ButtomBack = styled.TouchableOpacity`
  height: ${RFValue(150)}px;
  background-color: ${({ theme}) => theme.colors.shadow};
  margin-bottom: -20px;
`;

export const Container = styled.View`
  /* width: 95%; */
  /* padding: 3px; */
  /* background-color: ${({ theme}) => theme.colors.primary}; */
  /* border-radius: 25px 25px 0 0;  */
`;

export const Content = styled.View`
  flex: 1;
  border-radius: 25px;
  background-color: ${({ theme}) => theme.colors.secondary_90};
`;

export const Header = styled.View`
  align-items: center;
`;

export const Bar = styled.View`
  width: 39px;
  height: ${RFValue(5)}px;
  border-radius: 2px;
  background-color: ${({ theme}) => theme.colors.primary};
  margin-top: 13px;
  margin-bottom: 25px;
`;

export const ContentTitle = styled.View`
  padding: 10px 0 10px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme}) => theme.colors.text};
  font-family: ${({ theme}) => theme.fonts.text_500};
`;