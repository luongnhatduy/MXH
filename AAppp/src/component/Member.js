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
import axios from "axios";
class FlatListItem extends Component {
  render() {
    return (
      <View
        style={{
          margin: 10,
          marginBottom:0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:'center',
          borderBottomColor:'#EFEFEF',
          borderBottomWidth:1,
         paddingBottom:7
        }}
      >
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: this.props.item.image }}
          />
          <Text style={{ fontSize: 18, color: "#444444", marginLeft: 10 }}>
            {this.props.item.name}
          </Text>
        </View>
        <View style={{padding:10,backgroundColor:'#EFEFEF',height:30,borderRadius:10,justifyContent:'center'}}>
            <Text style={{ fontSize: 14, color: "#444444" }}>Gửi</Text>
        </View>
      </View>
    );
  }
}
export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      products2: [],
      loading: true,
      mem: ""
    };
  }

  componentDidMount() {
    this.getData();
    this.getData2();
  }

  getData = async () => {
    const id = await AsyncStorage.getItem("IDDM");
    console.log(id);
    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/category-detail/${id}`
    })
      .then(res => {
        this.setState({
          products: res.data.data
        });
        this.getMember();
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };
  getData2 = async () => {
    const id = await AsyncStorage.getItem("IDDM");
    console.log(id);
    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/list-member/${id}`
    })
      .then(res => {
        this.setState({
          products2: res.data.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };
  getMember = () => {
    console.log(this.state.products, "asdsadasdsad");
    switch (this.state.products.count_member) {
      case 0:
        this.setState({
          mem: "chưa có thành viên"
        });
        break;
      case 1:
        this.setState({
          mem: this.state.products.member[0].name + " là thành viên"
        });

        break;
      case 2:
        this.setState({
          mem:
            this.state.products.member[0].name +
            " và " +
            this.state.products.member[1].name +
            " là thành viên"
        });
        break;
      default:
        let k = this.state.products.count_member - 2;
        this.setState({
          mem:
            this.state.products.member[0].name +
            " , " +
            this.state.products.member[1].name +
            " và " +
            k +
            " người khác là thành viên"
        });
        break;
    }
  };

  render() {
    const { products, loading ,products2} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
        <View
          style={{
            backgroundColor: "#FFC63F",
            margin: 0,
            height: 50
          }}
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
          <View style={{ margin: 0, alignItems: "center", marginTop: 10 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              Thành viên
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <View
            style={{
              backgroundColor: "#F6E2B2",
              height: 200,
              margin: 0
            }}
          >
            <Image
              source={{ uri: products.image }}
              style={{
                width: "100%",
                height: 200
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: "#444444", fontSize: 18 }}>
              {products.title}
            </Text>

            <TouchableOpacity onPress={this.member}>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Image
                  style={{ width: 15, height: 15, tintColor: "#FFB300" }}
                  source={require("../img/team-member.png")}
                />
                <Text style={{ fontSize: 14, marginLeft: 5, marginBottom: 10 }}>
                  {this.state.mem}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ color: "#444444", margin: 15, fontSize: 18 }}>
          Thành viên
        </Text>
        <View style={{ flex: 1,backgroundColor:'white' }}>
          <FlatList
            data={products2}
            keyExtractor={this.keyExtractor}
            refreshing={loading}
            onRefresh={this.getData2}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} {...this.props} />;
            }}
          />
        </View>
      </View>
    );
  }
  keyExtractor = (item, index) => index.toString();
  onPress = () => {
    this.props.navigation.goBack(null);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  img1: {
    width: 30,
    height: 30,
    tintColor: "white"
  },
  header: {
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#FFC63F",
    height: 40,
    width: 95,
    borderRadius: 5,
    top: 29,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  content: {
    margin: 0,
    backgroundColor: "white",
    marginTop: 10
  }
});
