import React, { ReactNode } from 'react';

import {
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from 'react-native';

import { 
  ButtomBack,
  Container,
  Content,
  Header,
  Bar,
  ContentTitle,
  Title,
 } from './styles';

type Props = ModalProps & {
  children: ReactNode;
  title: string;
  closeModal: () => void;
}

export function ModalView({children, title, closeModal, ...rest}: Props){
  return (
    <Modal
    transparent
    statusBarTranslucent
    animationType="slide"
    {...rest}
    >
        <>
        <ButtomBack activeOpacity={0.9} onPress={closeModal}/>          
        <Content>
          <TouchableWithoutFeedback onPress={closeModal}>              
            <Header>
              <Bar/>
              <ContentTitle>
                <Title>
                  {title}
                </Title>
              </ContentTitle>
            </Header>
          </TouchableWithoutFeedback>

          {children}

        </Content> 
    </> 
      </Modal>
  );
}
