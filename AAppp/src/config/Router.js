import { createStackNavigator, createAppContainer ,createBottomTabNavigator } from "react-navigation";
import ForgetLogin from "../screen/ForgetLogin";
import Login from "../screen/Login";
import OTP from "../screen/OTP";
import Registration from "../screen/Registration";
import RegistrationForm from "../screen/RegistrationForm";
import Welcome from "../screen/Welcome";
import Account from '../screen/TabBar/Account';
import Home from '../screen/TabBar/Home';
import Follow from '../screen/TabBar/Follow';
import Notification from '../screen/TabBar/Notification';
import Chat from '../screen/TabBar/Chat';
import CreateCategories from '../component/createCategories';
import Post from '../component/Post';
import Catalogdetails from '../component/catalogdetails';
import UpdateInfo from '../component/UpdateInfo';
import PostsDetails from '../component/postsdetails';
import Messages from '../component/messages';
import Favorite from '../component/favorite';
import Member from '../component/Member'
const TabBar = createBottomTabNavigator(
  {
    
      Home: { screen: Home },
      'Theo dõi': { screen: Follow },
      'Tin nhắn': { screen: Chat },
      'Thông báo': { screen: Notification }, 
      'Tài khoản': { screen: Account },
      
  },
  {
      tabBarPosition :'top',
      tabBarOptions: {
          activeTintColor: '#FFC411',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 14
          },
      },
      swipeEnabled: false,
      
  }
)
const AppNavigator = createStackNavigator({
  // Welcome: {
  //   screen: Welcome
  // },
  
  
  TabBar :{
    screen :TabBar,
    navigationOptions :{
      header:null
    }
  },
  Login: {
    screen: Login
  },
  Registration: {
    screen: Registration
  },
  RegistrationForm: {
    screen: RegistrationForm
  },
  
  
  OTP: {
    screen: OTP
  },
  ForgetLogin: {
    screen: ForgetLogin
  },
  create :{
    screen : CreateCategories,
    navigationOptions :{
         header:null
    }     
  },
  Post :{
    screen : Post,
    navigationOptions :{
              header:null
    }  
  },
  Catalogdetails:{
    screen : Catalogdetails,
    navigationOptions :{
      header:null
    }
  },
  UpdateInfo :{
    screen :UpdateInfo,
    navigationOptions :{
      header:null
    }
  },
  PostsDetails : {
    screen : PostsDetails,
    navigationOptions :{
      header :null
    }
  },
  Messages : {
    screen : Messages,
    navigationOptions :{
      header :null
    }
  },
  Favorite : {
    screen : Favorite,
    navigationOptions :{
      header :null
    }
  },
  Member : {
    screen : Member,
    navigationOptions :{
      header :null
    }
  },

  
  
},
  
);

export default createAppContainer(AppNavigator);
