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
export default class CreateCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      avatarSource: null,
      data: null,
      source: null,
      uriimg: null,
      newImage :[]
    };
  }
  handleTitle = text => {
    this.setState({ title: text });
  };
  handleContent = text => {
    this.setState({ content: text });
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

        this.setState(
          {
            avatarSource: response,
            data: response.data,
            source: response.uri
          },
          () => {
            console.log(this.state.avatarSource, "avatar");
            apis
              .postUploadImg(this.state.avatarSource, "posts", true)
              .then(res => {
                console.log(res, "data");
                this.setState({
                  uriimg: res.data[0],
                  newImage : this.state.newImage.concat(res.data[0])
                }); 
              })
              .catch(err => {
                console.log(err, "loi");
              });
          }
        );
      }
    });
  }
  postdm = () => {
    
    console.log(this.props.navigation.state.params.id, "id");
    apis
      .post(
        apis.PATH.CREATE_POST,
        {
          title: this.state.title,
          description: this.state.content,
          image: this.state.newImage,
          category_id: this.props.navigation.state.params.id
        },
        true
      )
      .then(res => {
        console.log(res, "dang bai");

        alert("Đăng thành công");
        this.props.navigation.goBack(null);
      })
      .catch(err => {
        console.log("loi", err);
        alert("Đăng thất bại");
      });
  };
  onPress = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    console.log(this.state.newImage,'newIMG');
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
              Đăng bài viết
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Tiêu đề
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập tiêu đề"
              placeholderTextColor="#929292"
              autoCapitalize="none"
              onChangeText={this.handleTitle}
              multiline={true}
              numberOfLines={4}
            />
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Nội dung
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập nội dung...."
              placeholderTextColor="#929292"
              autoCapitalize="none"
              onChangeText={this.handleContent}
              multiline={true}
              numberOfLines={7}
            />
            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
              Hình ảnh hoặc Video
            </Text>
            <View style={styles.add}>
              <TouchableOpacity onPress={this.show.bind(this)}>
                <Image
                  style={styles.img2}
                  source={require("../img/iconfinder_14_Add_106230.png")}
                />
              </TouchableOpacity>
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
    tintColor: "gray"
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
    borderWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    height: 280,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 4,
    borderStyle: "dashed"
  }
});
