import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  AsyncStorage
} from "react-native";
import axios from "axios";
import RNRestart from 'react-native-restart';

import {connect} from 'react-redux';
import {user_id} from '../redux/action/index';

class Login extends Component {
  static navigationOptions = {
    header: null,
    id: ''
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  login = async() => {
    axios
      .post("http://kinhdoanhquanao.yez.vn/api/login", {
        phone: this.state.email,
        password: this.state.password
      })
      .then(response => {
       
        if (response.data.code == 200) {
         // this.props.navigation.navigate("TabBar");
          AsyncStorage.setItem('IDUSER', `${response.data.user.id}`);
          AsyncStorage.setItem('TOKEN', `${response.data.token}`);
          RNRestart.Restart();
        } else {
          console.log('ko thuc hien')
        }
      })
      .catch(err => {
        console.log("loi", err);
      });
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      products: []
    };
  }
  onPress = () => {
    this.props.navigation.navigate("ForgetLogin");
  };
  onPress1 = () => {
    this.props.navigation.navigate("RegistrationForm");
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
        <View style={styles.container}>
          <Text style={{ color: "#FFC411", fontWeight: "bold", fontSize: 20 }}>
            Đăng nhập
          </Text>

          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={{ color: "#929292", fontSize: 16 }}>
              {" "}
              Quên mật khẩu{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 8 }}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email hoặc số điện thoại"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
            keyboardType="default"
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handlePassword}
            secureTextEntry={true}
            keyboardType="default"
          />

          <TouchableOpacity style={styles.submitButton} onPress={this.login}>
            <Text style={styles.submitButtonText}> Đăng nhập </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={{ color: "#929292", fontSize: 16 }}>
            Bạn chưa có tài khoản?
          </Text>

          <TouchableOpacity style={styles.button} onPress={this.onPress1}>
            <Text style={{ color: "#FFC411", fontSize: 16 }}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
  }
}
const mapDispatToProps = dispatch => {
  return {
    user_id: (taskId) => dispatch(user_id(taskId))
  }
}
export default connect(mapStateToProps, mapDispatToProps)(Login)

const styles = StyleSheet.create({
  contai: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "center"
  },
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  submitButtonText: {
    color: "white",
    fontSize: 20
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    height: 30
  }
});
