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
import apis from "../config/apis";
class FlatListItem1 extends Component {
  render() {
    if (this.props.index < 3) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFA53F",
              fontSize: 30,
              lineHeight: 20
            }}
          >
            .
          </Text>
          <Text style={{ color: "black" }} numberOfLines={1}>
            {this.props.item.title}
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  }

  onPress1 = () => {
    this.props.navigation.navigate("PostsDetails");
  };
}
export default class ListHome2 extends Component {
  state = {
    item: this.props.item
  };
  editcolor1 = () => {
    let newItem = { ...this.state.item };
    console.log(newItem, "newitem");

    switch (this.state.item.check_like) {
      case 0:
        console.log("ok1");
        newItem = {
          ...newItem,
          like: this.state.item.like - 1,
          check_like: 2
        };
        break;
      case 1:
        newItem = {
          ...newItem,
          like: this.state.item.like + 1,
          check_like: 0,
          unlike: this.state.item.unlike - 1
        };
        break;
      case 2:
        console.log("ok");
        newItem = {
          ...newItem,
          like: this.state.item.like + 1,
          check_like: 0
        };
        break;
      default:
        break;
    }
    this.setState({ item: newItem }, () => {
      this.props.onCheckLike1(newItem, this.props.index)
     this.postLike('0');
    });
  };

  editcolor2 = () => {
  let newItem = { ...this.state.item };
  switch (this.state.item.check_like) {
      case 0:
          newItem = { ...newItem, unlike: this.state.item.unlike + 1, check_like: 1, like: this.state.item.like - 1 }
          break;
      case 1:
          newItem = { ...newItem, unlike: this.state.item.unlike - 1, check_like: 2 }
          break;
      case 2:
          newItem = { ...newItem, unlike: this.state.item.unlike + 1, check_like: 1 }
          break;
      default:
          break;
  }
  this.setState({ item: newItem }, (() => {
    this.props.onCheckLike1(newItem, this.props.index)
    this.postLike('1');
  }))
  };

  postLike = statuss => {
    apis
      .post(
        apis.PATH.CATEGORY_LIKE,
        {
          id: this.props.item.id,
          status: statuss
        },
        true
      )
      .then(res => {
        console.log(res, "like");
      })
      .catch(err => {
        console.log("loi", err);
      });
  };
  onPress = () => {
    this.props.navigation.navigate("Catalogdetails");
    AsyncStorage.setItem("IDDM", `${this.props.item.id}`);
  };
  render() {
   
    let colorr = this.state.item.check_like === 0 ? "#FFC411" : "gray";
    let colorr2 = this.state.item.check_like === 1 ? "#FFC411" : "gray";

    console.log(this.state.item,this.state.item.check_like, "rendder");
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 4,
          borderColor: "#ddd",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
          flex: 1,
          marginTop: 20,
          margin: 15
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            margin: 15
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.onPress}>
              <Image
                source={{ uri: this.state.item.image }}
                style={{
                  width: 100,
                  height: 100
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.onPress}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 15,
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  {this.state.item.title}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-around"
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={this.editcolor1}
                  style={{ flexDirection: "row" }}
                >
                  <Image
                    source={require("../img/iconfinder_like_support_centre_3200444.png")}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: colorr
                    }}
                  />
                  <Text style={{color : colorr}}>{this.state.item.like}</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={this.editcolor2}
                  style={{ flexDirection: "row" }}
                >
                  <Image
                    source={require("..//img/iconfinder_dislike_support_centre_3200439.png")}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: colorr2
                    }}
                  />
                  <Text style={{color:colorr2}}>{this.state.item.unlike}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "gray" }}>
                  {this.state.item.count_posts}
                </Text>
                <Text style={{ color: "gray" }}>bài viết</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{ flex: 1, marginLeft: 15, marginRight: 15, marginBottom: 15 }}
          onPress={this.loadData}
        >
          <FlatList
            data={this.state.item.posts}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => {
              return <FlatListItem1 item={item} index={index} />;
            }}
          />
        </View>
      </View>
    );
  }
}
