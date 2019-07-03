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
        AsyncStorage.setItem('IDCTBV', `${this.props.item.id}`)
        break;
      default:
        break;
    }
  };
  render() {
    const url =
      this.props.routeKey === "first"
        ? this.props.item.images
        : this.props.item.images.thumbnail;
    const contentt =
      this.props.routeKey === "first"
        ? this.props.item.count_posts + " bài viết"
        : this.props.item.content;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 7,
          borderBottomColor: "#E1E1E1",
          borderBottomWidth: 1
        }}
      >
        <View style={{ flex: 7 }}>
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
              <Text
                style={{ flex: 1, color: "black", fontSize: 16 }}
                numberOfLines={1}
              >
                {this.props.item.title}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 5,
                  color: "#B3B3B3",
                  fontSize: 14
                }}
                numberOfLines={1}
              >
                {contentt}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3 }}>
          <Text
            style={{
              color: "#FFC411",
              padding: 4,
              borderRadius: 4,
              borderColor: "#FFC411",
              borderWidth: 1,
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Đang theo dõi
          </Text>
        </View>
      </View>
    );
  }
}
export default class TabFollow extends Component {
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
    apis.fetch(apis.PATH.LIST_CATEGORY_FOLLOW, { page }, true).then(res => {
      console.log(res, "danh muc theo doi");
      if (res.code === 200) {
        this.setState({ dataCategory: res.data, loading: false, page: 0 });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  getPosts(page) {
    apis.fetch(apis.PATH.LIST_POSTS_FOLLOW, { page }, true).then(res => {
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
    if (data.length < 4) return;
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
