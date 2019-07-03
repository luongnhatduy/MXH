import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import apis from "../../config/apis";

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDay: new Date(),
      YYYY: moment(this.props.item.created_at).format("YYYY"),
      MM: moment(this.props.item.created_at).format("MM"),
      DD: moment(this.props.item.created_at).format("DD"),
      hh: moment(this.props.item.created_at).format("hh"),
      mm: moment(this.props.item.created_at).format("mm"),
      ss: moment(this.props.item.created_at).format("ss"),
      a: moment(this.props.item.created_at).format("a"),
      moment: "",
      kc: "",
      activeRowKey: null,
      user_ID: "",
      url_delete: ""
    };
  }
  componentDidMount() {
    this.getMoment();
  }
  getMoment = () => {
    if (this.state.YYYY < moment(this.state.myDay).format("YYYY")) {
      this.setState({
        kc: moment(this.state.myDay).format("YYYY") - this.state.YYYY,
        moment: " năm trước"
      });
    } else {
      if (this.state.MM < moment(this.state.myDay).format("MM")) {
        this.setState({
          kc: moment(this.state.myDay).format("MM") - this.state.MM,
          moment: " tháng trước"
        });
      } else {
        if (this.state.DD < moment(this.state.myDay).format("DD")) {
          this.setState({
            kc: moment(this.state.myDay).format("DD") - this.state.DD,
            moment: " ngày trước"
          });
        } else {
          if (this.state.a == moment(this.state.myDay).format("a")) {
            if (this.state.hh < moment(this.state.myDay).format("hh")) {
              this.setState({
                kc: moment(this.state.myDay).format("hh") - this.state.hh,
                moment: " giờ trước"
              });
            } else {
              if (this.state.mm < moment(this.state.myDay).format("mm")) {
                this.setState({
                  kc: moment(this.state.myDay).format("mm") - this.state.mm,
                  moment: " phút trước"
                });
              } else {
                if (this.state.ss < moment(this.state.myDay).format("ss")) {
                  this.setState({
                    kc: "vừa",
                    moment: " xong"
                  });
                }
              }
            }
          } else {
            this.setState({
              kc: moment(this.state.myDay).format("hh") - this.state.hh + 12,
              moment: "giờ trước"
            });
          }
        }
      }
    }
  };
  onPress = async () => {
    const item = this.props.item;
  //  const get = this.props.parentFlatList.getData();
    this.props.navigation.navigate("Messages", { item },{...this.props});
    console.log(item, "item");
  };
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.id });
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            console.log(deletingRow);
            Alert.alert(
              "Xác nhận",
              "Bạn có chắc chắn muốn xóa tin nhắn này không?",
              [
                {
                  text: "KHÔNG",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "CÓ",
                  onPress: () => {
                    this.setState({
                      url_delete:
                        "/" +
                        this.props.item.user_send +
                        "/" +
                        this.props.item.user_receiver
                    });
                    apis
                      .fetch(
                        apis.PATH.DELETE_CHAT + this.state.url_delete,
                        true
                      )
                      .then(res => {
                        if (res.code == "200")
                          this.props.parentFlatList.getData();
                      })
                      .catch(err => {
                        console.log("loi", err);
                      });
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Xóa",
          type: "delete"
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    console.log(this.props.item.user_send);
    return (
      <View
        style={{
          margin: 15,
          marginTop: 10,
          marginBottom: 0
        }}
      >
        <Swipeout
          {...swipeSettings}
          style={{ backgroundColor: "white", borderRadius: 7 }}
        >
          <TouchableOpacity onPress={this.onPress}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
                borderBottomColor: "#E1E1E1",
                borderBottomWidth: 1
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: 0
                  }}
                  source={{ uri: this.props.item.user_image }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ flex: 1, color: "black", fontSize: 16 }}>
                    {this.props.item.user_name}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      marginTop: 5,
                      color: "#B3B3B3",
                      fontSize: 14
                    }}
                  >
                    {this.props.item.message}
                  </Text>
                </View>
              </View>
              <Text style={{ color: "#B3B3B3" }}>
                {this.state.kc}
                {this.state.moment}
              </Text>
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }
}

export default class Chat extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//img//icon/_chat_icon_1107180.png")}
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
      page: "0"
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    apis
      .fetch(apis.PATH.CHAT, true)
      .then(res => {
        this.setState({
          products: res.data.users,
          loading: false
        });
        console.log(res.data.users, "LIST CHAT");
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
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 20 }}>Tin nhắn</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
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
              top: 20,
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={products}
            refreshing={loading}
            onRefresh={this.getData}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => {
              return (
                <FlatListItem
                  item={item}
                  index={index}
                  {...this.props}
                  parentFlatList={this}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFC411",
    height: 50,
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  TextInput: {
    flex: 1,
    borderRadius: 15,
    height: 40,
    backgroundColor: "#F6F6F6",
    margin: 15,
    paddingHorizontal: 40
  }
});
