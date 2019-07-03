import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity,StatusBar } from "react-native";

export default class Welcome extends Component {
  static navigationOptions = {
    header: null
  };
  onPress = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
        <View style={styles.container}>
          <Image style={styles.img1} source={require("../img/anh1.jpg")} />
          <Image style={styles.img2} source={require("../img/qưe-01.png")} />
        </View>
        <View style={{ flex: 6 }}>
          <View style={styles.contai}>
            <Text style={{ color: "#FFC411", fontSize: 16 }}>
              Chào mừng bạn đến với
            </Text>
            <Text style={{ color: "#FFC411", fontSize: 20 }}> Shopping</Text>
            <Text style={{ color: "#929292", marginTop: 10 }}>
              bạn có thể chọn cho mình những
            </Text>
            <Text style={{ color: "#929292" }}>món đồ thật ưng ý</Text>
          </View>
          <View style={styles.contai}>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {" "}
                BẮT ĐẦU NGAY{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contai: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  img1: {
    position: "absolute",
    width: 300,
    height: 240,
    top: 20
  },
  img2: {
    position: "absolute",
    width: 221,
    height: 200,
    top: 40
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFC411",
    width: 300,
    padding: 10
  }
});
