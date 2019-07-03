import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { KeyboardAvoidngView } from "react-native";
export default class Registration extends Component {
  static navigationOptions = {
    header: null
  };
  handleName = text => {
    this.setState({ name: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleEnterPassword = text => {
    this.setState({ Enterpassword: text });
  };
  login = (email, pass) => {
    alert("name" + name + "email: " + email + " password: " + pass);
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      Enterpassword: ""
    };
  }
  onPress = () => {
    this.props.navigation.navigate("RegistrationForm");
  };
  onPress1 = () => {
    this.props.navigation.navigate("OTP");
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Image
            style={styles.img1}
            source={require("../img/211686-512.png")}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text
            style={{
              color: "#FFC411",
              fontWeight: "bold",
              fontSize: 20,
              margin: 15
            }}
          >
            Đăng kí
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Họ và tên"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleName}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email hoặc số điện thoại"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handlePassword}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter the Password"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleEnterPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.submitButton} onPress={this.onPress1}>
            <Text style={styles.submitButtonText}> Đăng kí </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={{ color: "#929292", fontSize: 16, bottom: 10 }}>
            Bạn chưa có tài khoản?
          </Text>

          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={{ color: "#FFC411", fontSize: 16, bottom: 10 }}>
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center"
  },
  container: {},
  input: {
    margin: 15,
    height: 40,
    borderColor: "#929292",
    borderWidth: 1,
    borderRadius: 4
  },
  submitButton: {
    backgroundColor: "#FFC411",
    padding: 10,
    margin: 15,
    height: 40,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  submitButtonText: {
    color: "white",
    fontSize: 20
  },
  bottom: {
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  form: {
    justifyContent: "space-between",
    height: 30
  }
});
