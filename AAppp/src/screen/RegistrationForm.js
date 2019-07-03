import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
export default class RegistrationForm extends Component {
  static navigationOptions = {
    header: null
  };
  onPress = () => {
    this.props.navigation.navigate("Login");
  };
  onPress1 = () => {
    this.props.navigation.navigate("Registration");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this.onPress}>
            <Image
              style={styles.img1}
              source={require("../img/211686-512.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contai}>
          <Text style={{ color: "#929292", fontSize: 16 }}>
            Bạn vui lòng chọn một
          </Text>
          <Text style={{ color: "#929292", fontSize: 16 }}>
            trong hai hình thức dưới đây
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.onPress1}>
              <Text style={{ color: "white",  fontSize:16}}>
                Đăng kí bằng Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.onPress1}>
              <Text style={{ color: "white", fontSize:16}}>
                Đăng kí bằng số điện thoại
              </Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 5 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img1: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 10
  },
  contai: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FFC411",
    width: 300,
    padding: 15,
    marginTop:20
  }
});
