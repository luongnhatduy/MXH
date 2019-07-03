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
  CheckBox
} from "react-native";
import axios from "axios";
import apis from "../config/apis";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Chọn ảnh hoặc video",
  takePhotoButtonTitle: "camera",
  chooseFromLibraryButtonTitle: "Thư viện"
  // storageOptions: {
  //   skipBackup: true,
  //   path: "images"
  // }
};

export default class Post extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      OTP: "",
      check1: true,
      check2: false,
      type: "0",
      title: "",
      avatarSource: null,
      data: null,
      source :null,
      uriimg :null
    };
  }

  checkBoxText = () => {
    this.setState({
      check1: !this.state.check1,
      check2: !this.state.check2
    });
    if (this.state.check1 === true) {
      this.setState({ type: "1" });
    } else {
      this.setState({ type: "0" });
    }
  };
  show() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        //const source = { uri: response.uri };
        
        this.setState({
          avatarSource: response,
          data: response.data,
          source : response.uri
        },() =>{
          console.log(this.state.avatarSource,'avatar');
          apis
            .postUploadImg(this.state.avatarSource, "category", true)
            .then(res => {
              console.log(res, "data"); 
              this.setState({
                uriimg: res.data[0]
              })
            })
            .catch(err => {
              console.log(err, "loi");
            });
        }
        );
      }
    });
  }
  handleTitle = text => {
    this.setState({ title: text });
  };

  postdm = () => {
    apis
      .post(
        apis.PATH.CREATE_CATEGORY,
        {
          title: this.state.title,
          image: this.state.uriimg,
          type : this.state.type
        },
        true
      )
      .then(res => {
        console.log(res, "dang bai");
        alert('Đăng thành công');
        this.props.navigation.goBack(null);
      })
      .catch(err => {
        console.log("loi", err);
        alert('Đăng thất bại');
      });
  };
  onPress = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <StatusBar backgroundColor="#FFC63F" barStyle="light-content" />
          <View style={styles.container}>
            <TouchableOpacity onPress={this.onPress}>
              <Image
                style={styles.img1}
                source={require("../img/211686-512.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                marginRight: 30
              }}
            >
              Tạo danh mục
            </Text>
            <Text />
          </View>

          <View>
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Tình trạng
            </Text>
            <View
              style={{
                margin: 15,
                height: 130,
                borderColor: "#929292",
                borderWidth: 0.5,
                borderRadius: 4
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderBottomColor: "#929292",
                  marginLeft: 20,
                  marginRight: 20,
                  borderBottomWidth: 0.5,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <CheckBox
                  value={this.state.check1}
                  onChange={this.checkBoxText}
                />

                <Text style={{ fontSize: 22, marginLeft: 10 }}>Đồ mới</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 20,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <CheckBox
                  value={this.state.check2}
                  onChange={this.checkBoxText}
                />
                <Text style={{ fontSize: 22, marginLeft: 10 }}>Đồ cũ</Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Tiêu đề danh mục
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập tiêu đề"
              placeholderTextColor="#929292"
              autoCapitalize="none"
              onChangeText={this.handleTitle}
              multiline={true}
              numberOfLines={7}
            />
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Hình ảnh hoặc Video
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.add}>
                <TouchableOpacity onPress={this.show.bind(this)}>
                  <Image
                    style={styles.img2}
                    source={require("../img/iconfinder_14_Add_106230.png")}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 120,
                  width: 120,
                  marginTop: 10,
                  marginLeft: 15
                }}
              >
                <Image
                  style={{ height: 120, width: 120 }}
                  source={{ uri: this.state.source }}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={this.postdm}>
              <Text style={styles.submitButtonText}> Đăng bài</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  img1: {
    width: 30,
    height: 30,
    tintColor: "white"
  },
  img2: {
    tintColor: "gray",
    width: 50,
    height: 50
  },
  contai: {
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFC63F",
    padding: 10
  },
  input: {
    margin: 15,
    paddingHorizontal: 10,
    borderColor: "#929292",
    borderWidth: 0.5,
    borderRadius: 4
  },
  submitButton: {
    backgroundColor: "#FFC411",
    padding: 10,
    margin: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  submitButtonText: {
    color: "white",
    fontSize: 20
  },
  bottom: {
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "flex-end",
    flex: 1
  },
  form: {
    justifyContent: "space-between",
    height: 30
  },
  add: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    height: 120,
    width: 120,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 4,
    borderStyle: "dashed"
  }
});
