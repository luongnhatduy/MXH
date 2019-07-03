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
  onPress1 = () => {
    this.props.navigation.navigate("PostsDetails");
    AsyncStorage.setItem("IDCTBV", `${this.props.item.id}`);
    console.log("chuyen trang");
  };
  state = {
    kt: true
  };
  render() {
    return (
      <View style={styles.content}>
        <View style={{ margin: 10, flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../img/avarta.png")}
            />
          </View>
          <View style={{ flex: 10 }}>
            <TouchableOpacity onPress={this.onPress1}>
              <Text style={{ color: "black", fontSize: 16 }}>
                {this.props.item.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ margin: 10, flexDirection: "row", marginTop: -10 }}>
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
          <Text style={{ fontSize: 14 }} numberOfLines={3}>
            {this.props.item.content}
          </Text>
          <FlatList
            data={this.props.item.image}
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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

                <Text style={{ color: "gray", fontSize: 16, marginLeft: 2 }}>
                  {this.props.item.like}
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
                <Text style={{ color: "gray", fontSize: 16, marginLeft: 2 }}>
                  {this.props.item.unlike}
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
                  {this.props.item.comment}
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
                  {this.props.item.share}
                </Text>
                )
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default class Catalogdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      mem: ""
    };
  }

  componentDidMount() {
    this.getData();
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
          products: res.data.data,
          loading: false
        });
        this.getMember();
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

  member = () => {
    this.props.navigation.navigate("Member");
  };
  dangbai = async() => {
    const id = await AsyncStorage.getItem("IDDM");
    alert(id);
    this.props.navigation.navigate("create",{id},{...this.props});
  }
  render() {
    const { products, loading } = this.state;

    return (
      <ScrollView>
        <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#FFC63F",
              margin: 0,
              height: 140,
              flex: 1
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
                Chi tiết danh mục
              </Text>
            </View>
          </View>
          <View style={styles.header}>
            <View
              style={{
                backgroundColor: "#F6E2B2",
                height: 150,
                margin: 0,
                borderRadius: 10
              }}
            >
              <Image
                source={{ uri: products.image }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 10
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ color: "black", fontSize: 20 }}>
                {products.title}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    borderColor: "#FFB300",
                    borderWidth: 0.7,
                    borderRadius: 4,
                    width: 100,
                    justifyContent: "space-around",
                    marginTop: 5
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20, tintColor: "#FFB300" }}
                    source={require("../img/followers.png")}
                  />
                  <Text style={{ color: "#FFB300" }}>Theo dõi</Text>
                </View>
                <View
                  style={{ flexDirection: "row", marginLeft: 5, marginTop: 10 }}
                >
                  <Text style={{ color: "gray", fontSize: 14 }}>
                    {products.count_posts}
                  </Text>
                  <Text style={{ color: "gray", fontSize: 14 }}>bài viết</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.member}>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Image
                    style={{ width: 15, height: 15, tintColor: "#FFB300" }}
                    source={require("../img/team-member.png")}
                  />
                  <Text
                    style={{ fontSize: 14, marginLeft: 5, marginBottom: 10 }}
                  >
                    {this.state.mem}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: -30
                }}
              >
                <TouchableOpacity style={styles.button}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: "white",
                      marginRight: 2
                    }}
                    source={require("../img/iconfinder_like_support_centre_3200444.png")}
                  />

                  <Text style={{ color: "white", fontSize: 14, marginLeft: 2 }}>
                    {products.like}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: "white",
                      marginRight: 2
                    }}
                    source={require("../img/iconfinder_dislike_support_centre_3200439.png")}
                  />
                  <Text style={{ color: "white", fontSize: 14, marginLeft: 2 }}>
                    {products.unlike}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Image
                    style={{ width: 15, height: 15, tintColor: "white" }}
                    source={require("../img/share-512.png")}
                  />
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Chia sẻ(
                    <Text style={{ color: "white", fontSize: 14 }}>
                      {products.share}
                    </Text>
                    )
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.dangbai}>
          <View style={{justifyContent:'center'}}>
            <Text style={styles.TextInput} placeholderTextColor="#929292">
              Đăng bài viết...
            </Text>
          </View>
          </TouchableOpacity>
          <View>
            <FlatList
              data={products.posts}
              keyExtractor={this.keyExtractor}
              refreshing={loading}
              onRefresh={this.getData}
              renderItem={({ item, index }) => {
                return (
                  <FlatListItem item={item} index={index} {...this.props} />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: "#ECECEC"
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
    flex: 1,
    borderRadius: 7,
    height: 40,
    backgroundColor: "white",
    margin: 15,
    marginTop: 25,
    padding: 10,
    shadowColor: "#000",
    elevation: 3,
    justifyContent:'center'
  },
  content: {
    margin: 0,
    backgroundColor: "white",
    marginTop: 10
  }
});
