import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  FlatList,
  ScrollView
} from "react-native";
import apis from "../config/apis";

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      k: "",
      check: true
    };
  }
  componentDidMount() {
    this.getID();
  }
  getID = async () => {
    const id = await AsyncStorage.getItem("IDUSER");
    this.setState({
      k: id
    });
  };
  render() {
    
    if (this.state.k != this.props.item.user_send) {
      if (this.state.check === true) {
        
        return (
          <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: this.props.item.user_image }}
            />

            <View>
              <Text
                style={{
                  marginLeft: 10,
                  borderColor: "#B3B3B3",
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: "#444444",
                  fontSize: 14
                }}
              >
                {this.props.item.message}
              </Text>
            </View>
          </View>
        );
      } else {
        return(
        <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
          <View />
          <View>
            <Text
              style={{
                marginLeft: 10,
                borderColor: "#B3B3B3",
                borderWidth: 1,
                padding: 5,
                borderRadius: 15,
                paddingLeft: 10,
                paddingRight: 10,
                color: "#444444",
                fontSize: 14
              }}
            >
              {this.props.item.message}
            </Text>
          </View>
        </View>
        );
      }
    } else {
      if (this.state.check === false) {
        this.setState({
          check: !this.state.check
        });
      }
      return (
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            marginBottom: 0,
            justifyContent: "space-between"
          }}
        >
          <Text />
          <Text
            style={{
              backgroundColor: "#DFDDDD",
              marginLeft: 10,
              padding: 5,
              borderRadius: 15,
              paddingLeft: 10,
              paddingRight: 10,
              color: "#444444",
              fontSize: 14
            }}
          >
            {this.props.item.message}
          </Text>
        </View>
      );
    }
  }
}

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      products2: [],
      url: "",
      message_Sent: "",
      id:'',
      page:0
    };
  }
  onPress = () => {
    this.props.navigation.goBack(null);
    this.props.get;
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    // const id = await AsyncStorage.getItem("IDUSER_Send");
    const id2 = await AsyncStorage.getItem("IDUSER");
    if (id2 != this.props.navigation.state.params.item.user_send) {
      this.setState({
        id : this.props.navigation.state.params.item.user_send
      })
       
      } else {
        this.setState({
          id : this.props.navigation.state.params.item.user_receiver
        })
      }
    this.setState({
      url: id2 + "/" + this.state.id 
    });
    
    console.log(this.state.url);
    apis
      .fetch(apis.PATH.Messages + this.state.url, true)
      .then(res => {
        this.setState({
          products: res.data.messages,
          products2: res.data.user,
          loading: false
        });
        console.log(res.data, "messages");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
  };
  sent = async () => {
    // const id = await AsyncStorage.getItem("IDUSER_Send");
    // console.log(id)
    apis
      .post(
        apis.PATH.SENT,
        {
          user_receiver: this.state.id,
          message: this.state.message_Sent
        },
        true
      )
      .then(res => {
        console.log(res, "dang bai");
        this.getData();
      })
      .catch(err => {
        console.log("loi", err);
      });
  };
  handleSent = text => {
    this.setState({
      message_Sent: text
    });
  };
  keyExtractor = (item, index) => index.toString();
 
  render() {
    const { products, loading, products2 } = this.state;
    return (
      <View style={{ flex: 1, height: "100%" }}>
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

                fontSize: 24
              }}
            >
              {products2.name}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, marginBottom: 60 }}>
          <View>
            <FlatList
              inverted
              data={products}
              refreshing={loading}
              onRefresh={this.getData}
              keyExtractor={this.keyExtractor}
              renderItem={({ item, index }) => {
                
                return (
                  <FlatListItem item={item} index={index} {...this.props} />
                );
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",

            margin: 15,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleSent}
          />
          <TouchableOpacity onPress={this.sent}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: "#FFC411",
                marginTop: 7,
                marginRight: 10
              }}
              source={require("../img/sent-41-914875.png")}
            />
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
    tintColor: "white"
  },
  TextInput: {
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    marginLeft: 10,
    marginRight: -35
  }
});
