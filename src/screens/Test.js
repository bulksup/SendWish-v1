import React, {useContext, useState, useRef, useEffect} from 'react';
import {ThemeContext} from 'styled-components/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {
  Collection,
  Box,
  Button,
  ErrorMessage,
  Image,
  Input,
} from '../components';

import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils';
import {Alert} from 'react-native';
import {onChange} from 'react-native-reanimated';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  padding: 0 20px;
  padding-top: ${({insets: {top}}) => top}px;
  padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

const Test = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  const [collections, setCollections] = useState([]);
  useEffect(() => {
    fetch('https://api.sendwish.link:8081/collections/hcs4125', {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCollections(data);
      });
  }, []);

  return (
    <Container insets={insets}>
      <Button title="로그아웃" onPress={() => navigation.navigate('Signin')} />
      {collections.map(item => (
        <Collection
          // key={item?.collectionId}
          collectionId={item?.collectionId}
          collectionTitle={item?.title}
          memberId={item?.memberId}
          onPress={() =>
            navigation.navigate('Collection', {
              collectionId: item?.collectionId,
              collectionTitle: item?.collectionTitle,
              memberId: item?.membesagrId,
            })
          }
        />
      ))}
    </Container>
  );
};

export default Test;
