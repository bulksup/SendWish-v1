import React, {useState, useRef, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils';
import {Button, Image, Input, ErrorMessage} from '../components';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  padding: 50px 20px;
`;

const DEFAULT_PHOTO =
  'https://w7.pngwing.com/pngs/441/722/png-transparent-pikachu-thumbnail.png';

const Signup = ({navigation}) => {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  // const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  useEffect(() => {
    setDisabled(!(name && password && passwordConfirm && !errorMessage));
  }, [name, passwordConfirm, password, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!name) {
      error = '별명을 입력해주세요 :)';
      // } else if (!email) {
      //   error = '이메일을 입력해주세요 :)';
      // } else if (!validateEmail(email)) {
      //   error = '이메일 형식을 다시 확인해주세요 :(';
    } else if (password.length < 6) {
      error = '비밀번호는 최소 6글자 이상이어야 해요 :)';
    } else if (password !== passwordConfirm) {
      error = '비밀번호를 다르게 입력했어요 :(';
    }
    setErrorMessage(error);
  }, [name, passwordConfirm, password, errorMessage]);

  // const _passAndGetAccount = async () => {
  // useEffect(() => {
  //   fetch('https://api.sendwish.link:8081/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       memberId: name,
  //       password: password,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(result => console.log('[test] :', result));
  // },[]);
  // };

  // _passAndGetAccount();

  const _handleSignupBtnpress = async () => {
    try {
      fetch('https://api.sendwish.link:8081/signup', {
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
        .then(navigation.navigate('Signin', {name}));
    } catch (e) {
      Alert.alert('Signup error', e.message);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
        <Input
          label="별명"
          placeholder="별명"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          // onSubmitEditing={() => refEmail.current.focus()}
          onBlur={() => setName(name.trim())}
          maxLength={12}
        />
        {/* <Input
          ref={refEmail}
          label="이메일"
          placeholder="이메일"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))}
        /> */}
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="비밀번호"
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => refPasswordConfirm.current.focus()}
          onBlur={() => setPassword(removeWhitespace(password))}
        />
        <Input
          ref={refPasswordConfirm}
          label="비밀번호 재입력"
          placeholder="비밀번호 재입력"
          returnKeyType="done"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true}
          onSubmitEditing={_handleSignupBtnpress}
          onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />

        <ErrorMessage message={errorMessage} />

        <Button
          title="회원가입"
          onPress={_handleSignupBtnpress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
