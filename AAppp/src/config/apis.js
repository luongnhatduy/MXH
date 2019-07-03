import axios from "axios";
import { AsyncStorage } from "react-native";

var instance = axios.create({
  baseURL: "http://kinhdoanhquanao.yez.vn/api",
  timeout: 10000
});

fetch = async (url, isAuth) => {
  let id = await AsyncStorage.getItem("TOKEN");
  console.log(id, "id tokennnnn");
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`
    };
  }

  return instance
    .get(url, {
      headers
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

async function post(url, data, isAuth) {
  let id = await AsyncStorage.getItem("TOKEN");
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
      // 'Content-Type': 'multipart/form-data'
    };
  }

  return instance
    .post(
      url,
      { ...data },
      {
        headers
      }
    )
    .then(response => {
      console.log("object", response);
      return response.data;
    })
    .catch(error => {
      //console.log(`erorr, response`, error.response)
      return error;
    });
}

async function postUploadImg(image, typeUpload, isAuth) {
  let id = await AsyncStorage.getItem("TOKEN");
  console.log(image, typeUpload, isAuth);
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
      "Content-Type": "multipart/form-data"
    };
  }
  const formData = new FormData();
  if (!Array.isArray(image)) image = [image];
  image.map(item => {
    formData.append("image[]", {
      uri: item.uri || item.path,
      name: item.fileName,
      type: "image/jpeg"
    });
    formData.append("type", typeUpload);
  });

  return instance
    .post(`/upload/image`, formData, {
      headers
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

export default (apis = {
  PATH: {
    LOGIN: "/login",
    CREATE_CATEGORY: "/create-category",
    CREATE_POST: "/create-post",
    UPLOAD_IMAGE: "/upload/image",
    COMMENT: "/comment",
    NOTIFICATION0: "/list-notification?page=",
    CHAT: "/get-list-chat",
    Messages: "/messages/",
    SENT: "/messages",
    DELETE_CHAT: "/delete-message",
    LIST_CATEGORY_FOLLOW: "/list-category-follow",
    LIST_POSTS_FOLLOW: "/list-posts-follow",
    LIST_CATEGORY_LIKE: "/list-category-like",
    LIST_POSTS_LIKE: "/list-posts-like",
    CATEGORY_LIKE: "/category-like",
    HOMENEW: "/home?type=new&page=",
    HOMEOLD: "/home?type=old&page="
  },
  fetch,
  post,
  postUploadImg
});
