import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Header } from "../Components";
export const HomeScreen = () => {
  return (
    <Container>
      <Header />
      <Text>Hello world</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
