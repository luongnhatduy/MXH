import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList
} from "react-native";
import { TabView } from "react-native-tab-view";
import TabFavorite from './TabFavorite';
export default class Favorite extends Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Danh mục" },
      { key: "second", title: "Bài viết" }
    ],
    products: [],
    loading: true,
    page: "0"
  };
  renderTabBar = props => {
    return (
      <View style={[styles.tabBar]}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.tabItem,
                {
                  borderBottomColor:
                    this.state.index === i ? "#FFC411" : "#FFF1C5",
                  borderBottomWidth: 1
                }
              ]}
              onPress={() => this.setState({ index: i })}
            >
              <View style={{}}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  {route.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = ({ route }) => {
    switch (route.key) {
        case "first":
            return <TabFavorite routeKey={route.key} {...this.props} />;
        case "second":
            return <TabFavorite routeKey={route.key} {...this.props} />;
        default:
            return null;
    }
  };
  onPress = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
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
              Yêu thích
            </Text>
          </View>
        </View>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
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
  scene: {
    flex: 1
  },
  labelStyle: {
    color: "red"
  },
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFF1C5"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  img1: {
    width: 30,
    height: 30,
    tintColor: "white"
  }
});
