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
  Alert
} from "react-native";
import axios from "axios";
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
      activeRowKey: null
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
                    kc: 'vừa',
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
            Alert.alert(
              "Xác nhận",
              "Bạn có chắc chắn muốn xóa thông báo này không?",
              [
                {
                  text: "KHÔNG",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "CÓ", onPress: () => {} }
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
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                margin: 10,
                marginBottom: 0
              }}
              source={{ uri: this.props.item.user_image }}
            />
            <Text style={{ flex: 1, marginTop: 10, color: "#444444" }}>
              {this.props.item.content}
            </Text>
          </View>
          <Text style={{ marginLeft: 60, color: "#B3B3B3" }}>
            {this.state.kc}
            {this.state.moment}
          </Text>
        </Swipeout>
      </View>
    );
  }
}
export default class Notification extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//img//icon/iconfinder_bell_2199103.png")}
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
      page: "0",
      
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData2 = () => {
    //  this.setState({
    //    page:this.state.page + 1
    //  },
    //  alert(this.state.page)
    //  )
  };
  getData = () => {
    apis
      .fetch(apis.PATH.NOTIFICATION0 + this.state.page, true)
      .then(res => {
        console.log(res, "dang bai");
        if (res.code == 200) {
          this.setState({
            products: res.data,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({ loading: false, refreshing: false });
        console.log("loi", err);
      });
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    const { products, loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 20 }}>Thông báo</Text>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={products}
            refreshing={loading}
            onRefresh={this.getData}
            keyExtractor={this.keyExtractor}
            onEndReached={this.getData2}
            renderItem={({ item, index }) => {
              console.log(index,'index')
              return <FlatListItem item={item} index={index} {...this.props} />;
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
  }
});
