import React, {useState, useRef, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils';
import {CreateModal, Box, Button, Image, Input, ImageBox} from '../components';
import styled from 'styled-components/native';
import {Alert, Linking} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  padding: 50px 20px;
`;

const Collection = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const {collectionId, collectionTitle, memberId} = route.params;
  const [itemId, setItemId] = useState(0);
  const [products, setProducts] = useState([]);

  const _postProductUrl = async () => {
    try {
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          // url: 'https://m.11st.co.kr/products/m/2218563579',
          url: 'https://www.kurly.com/goods/5151429',
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setItemId(data);
        });
    } catch (e) {
      Alert.alert('error!!');
    }
  };

  const _addItemToCollection = async () => {
    try {
      fetch('https://api.sendwish.link:8081/item/enrollment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          memberId: memberId,
          collectionId: collectionId,
          itemId: itemId,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('Got item-info : ', data);
        });
    } catch (e) {
      Alert.alert('error!!');
    }
  };

  const _openUrl = url => {
    console.log('url', url);
    Linking.openURL(url);
  };

  useEffect(() => {
    fetch(
      `https://api.sendwish.link:8081/collection/${memberId}/${collectionId}`,
      {
        method: 'GET',
      },
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProducts(data.dtos);
      });
  });

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Button title="서버에 URL 보내기" onPress={() => _postProductUrl()} />
        {products.map(item => (
          <ImageBox
            productUrl={item?.originUrl}
            productImage={item?.imgUrl}
            productName={item?.name}
            productPrice={item?.price}
            onPress={() => {
              console.log('url있나?', item);
              _openUrl(item?.originUrl);
            }}
          />
        ))}

        <Button
          title="컬렉션에 상품 담기"
          onPress={() => _addItemToCollection()}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Collection;
