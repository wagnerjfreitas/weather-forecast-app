import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #5d3777;
`;

export const Searching = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#FF872C'
})``;
