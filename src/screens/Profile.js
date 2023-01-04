import React, {useContext, useState, useEffect} from 'react';
import {ThemeContext} from 'styled-components/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Collection, Box, Button, StyledModal, Input} from '../components';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, View} from 'react-native';
import {onChange} from 'react-native-reanimated';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  padding: 0 20px;
  padding-top: ${({insets: {top}}) => top}px;
  padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

const Profile = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const name = route.params;
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState('');

  // useEffect(() => {
  //   fetch(`https://api.sendwish.link:8081/collections/${name}`, {
  //     method: 'GET',
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setCollections(data);
  //       console.log(data);
  //     });
  // }, []);

  // const _pressNewCollectionBtn = () => {
  //   fetch('https://api.sendwish.link:8081/item/parsing', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       url: 'https://m.11st.co.kr/products/m/2218563579',
  //     }),
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log('press button : ', data);
  //     });
  // };

  const _handleCollectionNameChange = collectionName => {
    // useEffect(() => {
    //   const changedCollectionName = collectionName;
    //   setCollectionName(changedCollectionName);
    // }, [collectionName]);

    const changedCollectionName = collectionName;
    setCollectionName(changedCollectionName);
  };

  const _pressNewCollectionBtn = async () => {
    try {
      fetch('https://api.sendwish.link:8081/collection', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          memberId: name,
          title: collectionName,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('press button : ', data)
         
        }) .then(()=>_getCollections());
    } catch (e) {
      Alert.alert('error!!');
    }
  };

  const _getCollections = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/collections/${name}`, {
        method: 'GET',
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setCollections(data);
          console.log(data);
        });
    } catch (e) {
      Alert.alert('error!!');
    }
  };

  useEffect(()=>{
    console.log("렌더");
    _getCollections();
  }, []);

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container insets={insets}>
        <Button
          title="로그아웃"
          onPress={() => navigation.navigate('Signin')}
        />

        <Input
          label="컬렉션 이름"
          placeholder="컬렉션 이름"
          returnKeyType="done"
          value={collectionName}
          onChangeText={setCollectionName}
          // onSubmitEditing={_pressNewCollectionBtn()}
        />
        <Button
          title="새 컬렉션 추가하기"
          onPress={() => _pressNewCollectionBtn()}
        />

        {collections.map(item => (
          <Collection
            key={item?.collectionId}
            collectionId={item?.collectionId}
            collectionTitle={item?.title}
            memberId={item?.memberId}
            onPress={() =>
              navigation.navigate('Collection', {
                collectionId: item?.collectionId,
                collectionTitle: item?.collectionTitle,
                memberId: item?.memberId,
              })
            }
          />
        ))}
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
