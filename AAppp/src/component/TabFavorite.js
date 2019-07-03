import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  AsyncStorage
} from "react-native";
import apis from "../config/apis";
class FlatListItem extends Component {
  onPress = () => {
    const { item, routeKey } = this.props;
    switch (routeKey) {
      case "first":
        this.props.navigation.navigate("Catalogdetails");
        AsyncStorage.setItem("IDDM", `${this.props.item.id}`);
        break;
      case "second":
        this.props.navigation.navigate("PostsDetails");
        AsyncStorage.setItem("IDCTBV", `${this.props.item.id}`);
        break;
      default:
        break;
    }
  };
  state = {
    contentt: ""
  };
  componentDidMount() {
    this.check();
  }
  check = () => {
    if (
      this.props.item &&
      this.props.item.member &&
      this.props.item.member.length > 0
    ) {
      console.log("length", this.props.item.member.length);
      this.setState({
        contentt:
          this.props.routeKey === "first"
            ? this.props.item.member[0].name + " là thành viên"
            : ""
      });
    } else {
      this.setState({
        contentt: this.props.routeKey === "first" ? " chưa có thành viên" : ""
      });
    }
  };
  render() {
    const url =
      this.props.routeKey === "first"
        ? this.props.item.image
        : this.props.item.images.thumbnail;
    const cmt = this.props.routeKey === "first" ? "" : this.props.item.comment;
    const urlimg = this.props.routeKey === "first" ? "" : require("../img/comment.png");
    const txt = this.props.routeKey === "first" ? "" : "Đánh giá("+  cmt +")";

    
    return (
      <View>
        <View style={{ margin: 10 }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={this.onPress}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginBottom: 0
              }}
              source={{ uri: url }}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ flex: 1, color: "black", fontSize: 16 }}>
                {this.props.item.title}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 5,
                  color: "#B3B3B3",
                  fontSize: 14
                }}
              >
                {this.state.contentt}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            justifyContent: "space-around"
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
              source={urlimg}
            />
            <Text style={{ color: "gray", fontSize: 16 }}>
               {txt}
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
        <View style={{backgroundColor:"#EFEFEF",margin:0,height:7}}></View>
      </View>
    );
  }
}
export default class TabFavorite extends Component {
  state = {
    dataCategory: [],
    dataPosts: [],
    page: 0,
    loading: true,
    data: ""
  };

  componentDidMount() {
    this.getData(0);
  }
  getData(page) {
    const { routeKey } = this.props;
    switch (routeKey) {
      case "first":
        this.getCategory(page);
        break;
      case "second":
        this.getPosts(page);
        break;
      default:
        break;
    }
  }

  getCategory(page) {
    apis.fetch(apis.PATH.LIST_CATEGORY_LIKE, { page }, true).then(res => {
      console.log(res, "danh muc theo doi");
      if (res.code === 200) {
        this.setState({ dataCategory: res.data, loading: false, page: 0 });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  getPosts(page) {
    apis.fetch(apis.PATH.LIST_POSTS_LIKE, { page }, true).then(res => {
      console.log(res, "bai viet theo doi");
      if (res.code === 200) {
        this.setState({ dataPosts: res.data, loading: false, page: 0 });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  _keyExtractor = (item, index) => index.toString();

  _render_FlasList() {
    const { routeKey } = this.props;
    let data =
      routeKey === "first" ? this.state.dataCategory : this.state.dataPosts;
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <FlatListItem
              item={item}
              index={index}
              {...this.props}
              routeKey={routeKey}
            />
          );
        }}
        keyExtractor={this._keyExtractor}
        refreshing={this.state.loading}
        onRefresh={this._onRefresh}
      />
    );
  }
  _onRefresh = () => {
    this.getData(0);
  };
  onEndReached = () => {
    const { routeKey } = this.props;
    let data =
      routeKey === "first" ? this.state.dataCategory : this.state.dataPosts;
    if (data.length < 10) return;
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.getData(this.state.page);
      }
    );
  };
  render() {
    return <View style={styles.container}>{this._render_FlasList()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
