import React, {useContext, useState, useRef, useEffect} from 'react';
import {ThemeContext} from 'styled-components/native';
import {
  useSafeAreaInsets,
  useSafeAreaView,
} from 'react-native-safe-area-context';
import {Button, ErrorMessage, Image, Input} from '../components';

import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import removeWhitespace from '../utils';
import {Alert} from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  padding: 0 20px;
  padding-top: ${({insets: {top}}) => top}px;
  padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

const LOGO =
  'https://w7.pngwing.com/pngs/441/722/png-transparent-pikachu-thumbnail.png';

const Signin = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);

  useEffect(() => {
    setDisabled(!(name && password && !errorMessage));
  }, [name, password, errorMessage]);

  const _handleNameChange = name => {
    // const changedName = removeWhitespace(name);
    const changedName = name;
    setName(changedName);
  };

  const _handlePasswordChange = password => {
    // const changedPassword = removeWhitespace(password);
    const changedPassword = password;
    setPassword(changedPassword);
  };

  const _handleSigninBtnPress = async () => {
    try {
      // useEffect(() => {
        fetch('https://api.sendwish.link:8081/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberId: name,
            password: password,
          }),
        })
          .then(response => response.json())
          .then(result => console.log('[test] :', result))
          .then(() => (name === undefined ? Alert.alert('undefined!!!!!!!!!!!') : navigation.navigate('Profile', name))
          );
      // }, []);
    } catch (e) {
      Alert.alert('Signin error', e.message);
      console.log('signin');
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{flex: 1}}>
      <Container insets={insets}>
        <Image url={LOGO} />
        <Input
          label="별명"
          placeholder="별명"
          returnKeyType="next"
          value={name}
          onChangeText={_handleNameChange}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="Password"
          returnKeyType="done"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true}
          onSubmitEditing={_handleSigninBtnPress}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title="로그인"
          onPress={_handleSigninBtnPress}
          disabled={disabled}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('Signup')}
          containerSytle={{marginTop: 0, backgroundColor: 'transparent'}}
          textStyle={{color: theme.btnTextLink, fontSize: 18}}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
