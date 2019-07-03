import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,FlatList
} from "react-native";
import TabFollow from '../../component/TabFollow'
import { TabView } from "react-native-tab-view";
  
export default class Follow extends Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Danh mục" },
      { key: "second", title: "Bài viết" }
    ],
    products: [],
    loading: true,
    page: "0",
  };
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//img//icon/iconfinder_follow_2199095.png")}
        style={{
          width: 26,
          height: 26,
          tintColor
        }}
      />
    )
  };
 
  renderTabBar = (props) => {
    return (
        <View style={[styles.tabBar]}>
            {props.navigationState.routes.map((route, i) => {
                return (
                    <TouchableOpacity                    
                        style={[styles.tabItem,{ borderBottomColor: this.state.index === i ? '#FFC411' : '#FFF1C5',
                        borderBottomWidth: 1}]}
                        onPress={() => this.setState({ index: i })}>
                        <View style={ {                                                  
                        }}>
                            <Text style={{  fontSize: 16,color:'black' }} >{(route.title)}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
  
  
  renderScene = ({ route }) => {
    switch (route.key) {
        case "first":
            return <TabFollow routeKey={route.key} {...this.props} />;
        case "second":
            return <TabFollow routeKey={route.key} {...this.props} />;
        default:
            return null;
    }
}
  render() {
   
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 20 }}>Theo dõi</Text>
        </View>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}  
          renderScene={this.renderScene}
          onIndexChange={(index) => 
            this.setState({ index },
            
          )}
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
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor:'#FFF1C5'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
