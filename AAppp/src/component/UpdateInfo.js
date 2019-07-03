import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar,
  AsyncStorage
} from "react-native";
import axios from "axios";
export default class UpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true
    };
  }
  onPress = () => {
    this.props.navigation.goBack(null);
  };

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
     const id = await AsyncStorage.getItem("IDUSER");
    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/user/${id}`
    })
      .then(res => {
        console.log(res.data.user);
        this.setState({
          products: res.data.user,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
        <ImageBackground
          source={require("../img//1234567890-01.png")}
          style={{ width: "100%", height: 180 }}
        >
          <TouchableOpacity
            onPress={this.onPress}
            style={{ position: "absolute", margin: 10 }}
          >
            <Image
              style={styles.img1}
              source={require("../img/211686-512.png")}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: products.image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ fontSize: 27, color: "#444444", marginTop: 10 }}>
              {products.name}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,

            height: 50,
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../img/Ellipse129.png")}
          />
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#DFDFDF",
              height: 50,
              justifyContent: "center"
            }}
          >
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={products.name}
              placeholderTextColor="#444444"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,

            height: 50,
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../img/Ellipse129.png")}
          />
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#DFDFDF",
              height: 50,
              justifyContent: "center"
            }}
          >
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={products.birthday}
              placeholderTextColor="#444444"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,

            height: 50,
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../img/Ellipse129.png")}
          />
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#DFDFDF",
              height: 50,
              justifyContent: "center"
            }}
          >
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={products.phone}
              placeholderTextColor="#444444"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,

            height: 50,
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../img/Ellipse129.png")}
          />
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#DFDFDF",
              height: 50,
              justifyContent: "center"
            }}
          >
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={products.address}
              placeholderTextColor="#444444"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-end'}}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin:15,
            marginBottom: 20,
            height: 50,
            borderRadius: 10,
            backgroundColor: "#FFC411"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Lưu</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  img1: {
    width: 30,
    height: 30,
    tintColor: "white"
  },
  box: {
    margin: 20,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
    marginTop: -100,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    marginLeft: 10,
    fontSize: 18,
    height: 40,
    width: "90%"
    // borderRadius: 10,
    // borderWidth: 1,
    // borderStyle: "dashed",
    // borderColor:'#FFC411',
  }
});
