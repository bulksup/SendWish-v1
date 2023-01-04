import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: ${({theme}) => theme.BoxBackgroud};
  padding: 10px;
  margin: 10px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const Title = styled.Text`
  margin: 10px 0;
  font-size: 24px;
  color: ${({theme}) => theme.btnTitle};
`;

const ProductImage = styled.Image`
  background-color: ${({theme}) => theme.imgBackGround};
  width: 60px;
  height: 60px;
  border-radius: 20px;
`;

const Box = ({
  productName,
  productPrice,
  onPress,
  containerSytle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row'}}>
      <Container style={containerSytle}>
        <ProductImage />
        <Title style={textStyle}>
          {productName} / {productPrice}
        </Title>
      </Container>
    </TouchableOpacity>
  );
};

Box.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerSytle: PropTypes.object,
  textSytle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Box;
