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
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import axios from "axios";
import moment from "moment";
import apis from "../config/apis";

class FlatListItem1 extends Component {
  render() {
    return (
      <View style={{}}>
        <Image
          source={{ uri: this.props.item.full_name }}
          style={{
            width: "100%",
            height: 200
          }}
        />
      </View>
    );
  }
}
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
      kc: ""
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
  render() {
    console.log(this.state.kc, this.state.moment, "kc");
    return (
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <Image
          source={{ uri: this.props.item.user_image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20
          }}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#E6E4E4",
              padding: 5,
              borderRadius: 10,
              marginLeft: 10
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>
              {this.props.item.user_name}
            </Text>
            <Text style={{ fontSize: 14, color: "black" }}>
              {this.props.item.comment}
            </Text>
          </View>
          <Text style={{ marginLeft: 10, color: "gray" }}>
            {this.state.kc}
            {this.state.moment}
          </Text>
        </View>
      </View>
    );
  }
}

export default class PostsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      products1: [],
      products2: [],
      myDay: new Date(),
      cmt: "",
      load: true
    };
  }

  componentDidMount() {
    this.getData();
    this.getData1();
    this.getData2();
  }

  getData = async () => {
    const id = await AsyncStorage.getItem("IDCTBV");

    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/post-detail/${id}`
    })
      .then(res => {
        console.log(res.data.data);
        this.setState({
          products: res.data.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("loi", err);
      });
    if (id == 25) {
      console.log("dkmm");
    }
  };
  getData1 = async () => {
    const id2 = await AsyncStorage.getItem("IDUSER");
    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/user/${id2}`
    })
      .then(res => {
        console.log(res.data.user, "user");
        this.setState({
          products1: res.data.user
        });
      })
      .catch(err => {
        console.log("loi", err);
      });
  };
  getData2 = async () => {
    const id = await AsyncStorage.getItem("IDCTBV");

    axios({
      method: "GET",
      url: `http://kinhdoanhquanao.yez.vn/api/comment/${id}`
    })
      .then(res => {
        console.log(res.data.data, "comment");

        this.setState({
          products2: res.data.data,
          loading: false
        });
        // res.data.data.forEach(function(item) {
        //   console.log(item.updated_at);
        // });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        console.log("loi", err);
      });
  };

  handleSearch = text => {
    this.setState({
      cmt: text
    });
  };

  onPress = () => {
    this.props.navigation.goBack(null);
  };
  comment = async () => {
    const id = await AsyncStorage.getItem("IDCTBV");

    apis
      .post(
        apis.PATH.COMMENT,
        {
          post_id: id,
          comment: this.state.cmt
        },
        true
      )
      .then(res => {
        console.log(res, "dang bai");

        this.getData2();
      })
      .catch(err => {
        console.log("loi", err);
      });
  };
  render() {
    const { products, loading, products1, products2 } = this.state;

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
              Chi tiết bài viết
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 , marginBottom: 60}}>
         
            <ScrollView>
              <View style={styles.content}>
                <View style={{ margin: 10, flexDirection: "row" }}>
                  <View style={{ flex: 2 }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require("../img/avarta.png")}
                    />
                  </View>
                  <View style={{ flex: 10 }}>
                    <Text style={{ color: "black", fontSize: 16 }}>
                      {products.title}
                    </Text>
                  </View>
                </View>

                <View
                  style={{ margin: 10, flexDirection: "row", marginTop: -10 }}
                >
                  <View style={{ flex: 2 }} />
                  <View style={{ flex: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        borderColor: "#FFB300",
                        borderWidth: 0.7,
                        borderRadius: 4,
                        width: 100,
                        justifyContent: "space-around"
                      }}
                    >
                      <Image
                        style={{ width: 20, height: 20, tintColor: "#FFB300" }}
                        source={require("../img/followers.png")}
                      />
                      <Text style={{ color: "#FFB300" }}>Theo dõi</Text>
                    </View>
                  </View>
                </View>
                <View style={{ margin: 10, marginTop: 0 }}>
                  <Text style={{ fontSize: 14, color: "black", margin: 5 }}>
                    {products.content}
                  </Text>
                  <FlatList
                    data={products.image}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item, index }) => {
                      return <FlatListItem1 item={item} index={index} />;
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: "gray",
                            marginRight: 2
                          }}
                          source={require("../img/iconfinder_like_support_centre_3200444.png")}
                        />

                        <Text
                          style={{ color: "gray", fontSize: 16, marginLeft: 2 }}
                        >
                          {products.like}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: "gray",
                            marginRight: 2,
                            marginLeft: 10
                          }}
                          source={require("../img/iconfinder_dislike_support_centre_3200439.png")}
                        />
                        <Text
                          style={{ color: "gray", fontSize: 16, marginLeft: 2 }}
                        >
                          {products.unlike}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: "gray",
                          marginTop: 2
                        }}
                        source={require("../img/comment.png")}
                      />
                      <Text style={{ color: "gray", fontSize: 16 }}>
                        Đánh giá(
                        <Text style={{ color: "gray", fontSize: 16 }}>
                          {products.comment}
                        </Text>
                        )
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                      <Image
                        style={{ width: 20, height: 20, tintColor: "gray" }}
                        source={require("../img/share-512.png")}
                      />
                      <Text style={{ color: "gray", fontSize: 16 }}>
                        Chia sẻ(
                        <Text style={{ color: "gray", fontSize: 16 }}>
                          {products.share}
                        </Text>
                        )
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  margin: 10,
                  borderTopColor: "#CDCDCD",
                  borderTopWidth: 0.2,
                  marginTop: 0
                }}
              >
                <View style={{ flex: 1, marginBottom: 60 }}>
                  <View>
                    <FlatList
                      inverted
                      data={products2}
                      extraData={this.state}
                      refreshing={false}
                      onRefresh={this.getData2}
                      keyExtractor={this.keyExtractor}
                      renderItem={({ item, index }) => {
                        return (
                          <FlatListItem
                            item={item}
                            index={index}
                            {...this.setState}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            margin: 15
          }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: products1.image }}
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Thêm một bình luận..."
            placeholderTextColor="#929292"
            autoCapitalize="none"
            onChangeText={this.handleSearch}
          />
          <TouchableOpacity onPress={this.comment}>
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
  container: {
    flex: 1,
    
  },
  img1: {
    width: 30,
    height: 30,
    tintColor: "white"
  },
  header: {
    margin: 15,
    backgroundColor: "white",
    marginTop: -90,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3
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
  TextInput: {
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,

    marginLeft: 10,
    marginRight: -35
  },
  content: {
    margin: 0,
    backgroundColor: "white",
    marginTop: 10
  }
});
