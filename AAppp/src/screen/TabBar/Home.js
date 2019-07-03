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
  AsyncStorage,
  RefreshControl
} from "react-native";
import axios from "axios";
import apis from "..//..//config//apis";
import OneSignal from "react-native-onesignal";
import ListHome from "../../component/ListHome";
import ListHome2 from "../../component/ListHome2";

class Banner extends Component {
  render() {
    return (
      <View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("..//..//img//FashionAnStyleBanner4.png")}
            style={{
              width: "92%",
              height: 160,
              top: 10,
              borderRadius: 10
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.props.navigation.navigate("Post");
          }}
        >
          <Text style={{ color: "#FFC63F", fontSize: 20 }}>Tạo danh mục</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//img//icon//iconfinder_Streamline-18_185038.png")}
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
      products2: [],
      products1: [],
      loading: true,
      search: "",
      postdata: [],
      bg1: "#FFC63F",
      bg2: "white",
      txt1: "white",
      txt2: "#FFC63F",
      page: 0,
      page1: 0,
      type: "new"
    };
  }
  handleSearch = text => {
    this.setState({ search: text });
  };
  
  componentDidMount() {
    this.getData();
    this.getData1();
    // OneSignal.sendTag('user_id', JSON.stringify(database.user.id));
    OneSignal.sendTag("user_id", "91");
  }
  onPress2 = () => {
    //console.log(this.state.products1)\
    this.setState({
      bg1: "#FFC63F",
      bg2: "white",
      txt1: "white",
      txt2: "#FFC63F",
      type: "new"
    });
  };
  onPress3 = () => {
    //console.log(this.state.products2)
    this.setState({
      bg2: "#FFC63F",
      bg1: "white",
      txt2: "white",
      txt1: "#FFC63F",
      type: "old"
    });
  };
  getData = () => {
    apis
      .fetch(apis.PATH.HOMENEW + this.state.page, true)
      .then(res => {
        
          this.setState(
            {
              products1: this.state.products1.concat(res.data),
              loading: false
            },
            console.log(res, "lol1")
          );
       
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };
  getData1 = () => {
    apis
      .fetch(apis.PATH.HOMEOLD + this.state.page1, true)
      .then(res => {
       
          this.setState(
            {
              products2: this.state.products2.concat(res.data),
              loading: false
            },
            console.log(res, "lol2")
          );
      
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };
  loadmorenew = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      this.getData
    );
  };
  loadmoreold = () => {
    this.setState(
      {
        page1: this.state.page1 + 1
      },
      this.getData1
    );
  };
  render() {
    console.log(this.state.page, "pageggggggggggggggggggggggggggggggggggggg");
    console.log(this.state.page1, "pageghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhg");


    const { loading, type, products1, products2 } = this.state;
    let item_render = type === "new" ? this._renderItem : this._renderItemOLD;
    let products = type === "new" ? products1 : products2;
    let loadmore = type === "new" ? this.loadmorenew : this.loadmoreold;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />

        <View
          style={{
            backgroundColor: "#FFC63F",
            margin: 0,
            height: 60,
            flexDirection: "row"
          }}
        >
          <Image
            source={require("..//..//img/iconfinder_icon-111-search_314478.png")}
            style={{
              width: 25,
              height: 25,
              tintColor: "gray",
              position: "absolute",
              left: 20,
              top: 47,
              zIndex: 999
            }}
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Tìm kiếm"
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleSearch}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            style={[styles.textType, { backgroundColor: this.state.bg1 }]}
            onPress={this.onPress2}
          >
            <Text style={{ fontSize: 16, color: this.state.txt1 }}>Mới</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.textType, { backgroundColor: this.state.bg2 }]}
            onPress={this.onPress3}
          >
            <Text style={{ fontSize: 16, color: this.state.txt2 }}>Cũ</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={this.keyExtractor}
          refreshing={loading}
          onRefresh={this.getData}
          renderItem={item_render}
          onEndReached={loadmore}
          onEndReachedThreshold={1}
        />

        <View />
      </View>
    );
  }

  onCheckLike = (item, index) => {
    let newData = [...this.state.products1];
    newData[index] = item;
    this.setState({ products1: newData });
  };
  onCheckLike1 = (item, index) => {
    let newData = [...this.state.products2];
    newData[index] = item;
    this.setState({ products2: newData });
  };

  _renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          <Banner  {...this.props}/>
          <ListHome
            item={item}
            {...this.props}
            onCheckLike={this.onCheckLike}
            index={index}
          />
        </View>
      );
    } else {
      return (
        <ListHome
          item={item}
          {...this.props}
          onCheckLike={this.onCheckLike}
          index={index}
        />
      );
    }
  };

  _renderItemOLD = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          <Banner {...this.props}/>
          <ListHome2
            item={item}
            {...this.props}
            onCheckLike1={this.onCheckLike1}
            index={index}
          />
        </View>
      );
    } else {
      return (
        <ListHome2
          item={item}
          {...this.props}
          onCheckLike1={this.onCheckLike1}
          index={index}
        />
      );
    }
  };

  keyExtractor = (item, index) => index.toString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ECECEC"
  },
  TextInput: {
    flex: 1,
    borderRadius: 7,
    height: 40,
    backgroundColor: "white",
    top: 25,
    margin: 15,
    paddingHorizontal: 40
  },
  Button: {
    backgroundColor: "white",
    margin: 15,
    marginBottom: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#FFC63F",
    borderWidth: 1,
    marginTop: 30
  },
  content: {
    margin: 15,
    //backgroundColor:this.props.index % 2 ==0 ? 'red' : 'green' ,
    height: 280,
    borderRadius: 10
  },
  textType: {
    borderColor: "#FFC63F",
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    width: 80,
    justifyContent: "center",
    alignItems: "center"
  }
});
