import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class OTP extends Component {
  static navigationOptions = {
    header: null
  };

  handleOTP = text => {
    this.setState({ OTP: text });
  };
  login = () => {};
  constructor(props) {
    super(props);
    this.state = {
      OTP: "",
      confirmResult: null,
    };
  }
 
  componentDidMount() {
    firebase.auth().signInWithPhoneNumber(key.phoneNumber)
    .then(confirmResult => {
        // console.log(confirmResult, 'đã gửi mã')
        this.setState({ confirmResult })
    })
    .catch(error => console.log(error, 'chưa gửi được mã'))
}


  onPress=()=>{
    this.props.navigation.goBack(null)
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <TouchableOpacity onPress={this.onPress}>
            <Image
              style={styles.img1}
              source={require("../img/211686-512.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              color: "#FFC411",
              fontWeight: "bold",
              fontSize: 20,
              margin: 15
            }}
          >
            Nhập mã OTP
          </Text>
        </View>
        <View style={styles.contai}>
          <Text style={{ color: "#929292", marginTop: 10 }}>
            Mã xác thực sẽ được gửi đến số điện
          </Text>
          <Text style={{ color: "#929292" }}>
            thoại của bạn. Vui lòng nhập mã OTP để xác thực
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Nhập mã OTP"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.OTP}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={styles.submitButtonText}> Hoàn tất </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
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
    alignItems: "flex-end",
    flex: 1
  },
  form: {
    justifyContent: "space-between",
    height: 30
  }
});
