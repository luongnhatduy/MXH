import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  FlatList,
  AsyncStorage
} from "react-native";
import RNRestart from "react-native-restart";
import axios from "axios";
import { connect } from "react-redux";
import Login from "../Login";
class Account extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//img//icon/iconfinder_m-41_4230520.png")}
        style={{
          width: 26,
          height: 26,
          tintColor
        }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      id: null,
      token :null
    };
  }
  onPress = () => {
    this.props.navigation.navigate("UpdateInfo");
  };
  onPress2 = () => {
    this.props.navigation.navigate("Favorite");
  };
  dangxuat = async () => {
    AsyncStorage.setItem("IDUSER", `no`);
    AsyncStorage.setItem("TOKEN", `no`);
    RNRestart.Restart();
  };

  componentDidMount() {
    this.getData();
    this.getid();
  }
  getid = async () => {
    this.setState({
      id: await AsyncStorage.getItem("IDUSER")
    });
  };
  getData = async () => {
    const id = await AsyncStorage.getItem("IDUSER");
    console.log("id user", id);
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
        this.setState({ loading: false, id: "no" });
        console.log(this.props.taskId, err);
      });
  };

  render = () => {
    const { products, loading } = this.state;
    console.log(this.state.id, "idrender");
    if (this.state.id === null) {
      return <View />;
    } else {
      if (this.state.id !== "no") {
        console.log(
          this.state.id,
          "idrendesssssssssssssssssssssssssssssssssssssssssssssssssssr"
        );
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
            <View
              style={{
                backgroundColor: "#FFC63F",
                margin: 0,
                height: 160
              }}
            >
              
              <View style={{ margin: 0, alignItems: "center", marginTop: 10 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                  }}
                >
                  Tài khoản
                </Text>
              </View>
            </View>
            <View style={styles.box}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginTop: 35
                }}
                source={{ uri: products.image }}
              />
              <Text style={{ fontSize: 27, color: "#444444", marginTop: 10 }}>
                {products.name}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={this.onPress}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: "#FFF8E3",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 15 }}
                      source={require("..//..//img/Ellipse129.png")}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HK Nova",
                        color: "#FFC411",
                        marginLeft: 10
                      }}
                    >
                      Thông tin cá nhân
                    </Text>
                  </View>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Image
                      style={{ width: 20, height: 20, tintColor: "gray" }}
                      source={require("..//..//img/130884.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: "white",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 15 }}
                      source={require("..//..//img/Ellipse129.png")}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HK Nova",
                        color: "#444444",
                        marginLeft: 10
                      }}
                    >
                      Bài đăng
                    </Text>
                  </View>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Image
                      style={{ width: 20, height: 20, tintColor: "gray" }}
                      source={require("..//..//img/130884.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPress2}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: "#FFF8E3",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 15 }}
                      source={require("..//..//img/Ellipse129.png")}
                    />

                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HK Nova",
                        color: "#444444",
                        marginLeft: 10
                      }}
                    >
                      Yêu thích
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={this.onPress2}
                  >
                    <Image
                      style={{ width: 20, height: 20, tintColor: "gray" }}
                      source={require("..//..//img/130884.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: "white",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 15 }}
                      source={require("..//..//img/Ellipse129.png")}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HK Nova",
                        color: "#444444",
                        marginLeft: 10
                      }}
                    >
                      Đổi mật khẩu
                    </Text>
                  </View>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Image
                      style={{ width: 20, height: 20, tintColor: "gray" }}
                      source={require("..//..//img/130884.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.dangxuat}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: "#FFF8E3",
                    height: 50,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 15 }}
                      source={require("..//..//img/Ellipse129.png")}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HK Nova",
                        color: "#444444",
                        marginLeft: 10
                      }}
                    >
                      Đăng xuất
                    </Text>
                  </View>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Image
                      style={{ width: 20, height: 20, tintColor: "gray" }}
                      source={require("..//..//img/130884.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return <Login {...this.props} />;
      }
    }
  };
}

mapStatetoProps = state => {
  return {
    taskId: state.taskReducers.taskId
  };
};
export default connect(mapStatetoProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  img1: {
    width: 30,
    height: 30,
    tintColor: "white",
    position: "absolute",
    margin: 10
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
  }
});
