//add some option for adding profile picture 

import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import { baseURL } from "../_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Zocial from '@expo/vector-icons/Zocial';
import Feather from '@expo/vector-icons/Feather';

const Profile = () => {

  const loginMobile: any = SecureStore.getItemAsync("mobile");


  console.log("Mobile", loginMobile);


  //to change pw
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);
  //first we store it in the number and then we call the fetchUser
  const loadUser = async () => {
    try {
      const storedMobile = await SecureStore.getItemAsync("mobile");
      // const storedName=await SecureStore.getItemAsync("name");

      if (!storedMobile) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      setmobile(storedMobile);
      fetchUser(storedMobile);
      // setName(storedName);
    }
    catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async (mobileNo: any) => {
    // console.log("inside fetchproducts");
    axios.get(`${baseURL}/admin/GetUsersByMobile/${mobileNo}`)
      .then((response) => {
        console.log(response.data.name);
        console.log("Inside then()")
        setName(response.data.name);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleUpdate = async () => {
    if (!name || !mobile) {
      Alert.alert("Error", "Name and mobile required")
      return;
    }
    const obj = {
      name, mobile, password
    };
setIsEditing(false);
    try {
      const response = await axios.put(`${baseURL}:/admin/UpdateProfile`, obj,);
      Alert.alert("Success", response.data || "Profile updated");
       setIsEditing(false);
    }
    catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed to update profile");
      console.log("FULL ERROR:", error);
console.log("RESPONSE:", error.response);
console.log("DATA:", error.response?.data);
console.log("MESSAGE:", error.message);
    }
  }
  return (
    <>
      <Header />
      {/* <Text style={style.heading}>PROFILE </Text> */}

      {isEditing ? (
        <>
          <View style={style.container}>
            <View style={style.inputContainer}>
              <Text> Name : </Text>
              <TextInput
                style={style.input1}
                value={name}
                onChangeText={setName}
              />
            </View>
<View style={style.inputContainer}>
              <Text> Mobile : </Text>
            <TextInput
              style={style.input1}
              value={mobile}
              editable={false}
            />
             </View>
            <View style={style.inputContainer}>
              <Text> Password : </Text>
            <TextInput
              placeholder="New password (optional)"
              style={style.input1}
              value={password}
              onChangeText={setpassword}
            />
 </View>
            <TouchableOpacity style={style.button} onPress={handleUpdate} >
              <Text style={style.buttonText}>Update</Text>
            </TouchableOpacity>

          </View>
        </>
      ) : (
        <>
          <View style={style.Img_name}>
            <View>
              <Image
                source={require('../../assets/images/user_icon2.png')}
                style={style.profileImg}
              />
            </View>
            <View style={style.nameContainer}>
              <Text style={style.name}>{name}</Text>
              <Text style={style.mobile}><Ionicons name="call" size={14} color="#B80047" /> {mobile}</Text>
              <Text style={style.mobile}><Zocial name="email" size={14} color="#B80047" />  Email  </Text>
            </View>

          </View>
          <TouchableOpacity style={style.button} onPress={() => setIsEditing(true)}>
            <Text style={style.buttonText}><Feather name="edit" size={14} color="#fff" />   Edit</Text>
          </TouchableOpacity>
        </>
      )}


      {/* <View style={style.container}>
          
            
            <TextInput
            style={style.input}
            value={name}
            onChangeText={setName}
            />
            <TextInput
            style={style.input}
            value={mobile}
            editable={false}
            />
            <TextInput
            placeholder="New password (optional)"
            style={style.input}
            secureTextEntry
            value={password}
            onChangeText={setpassword}
            />

            <TouchableOpacity style={style.button} onPress={handleUpdate}>
              <Text style={style.buttonText}>Update</Text>
            </TouchableOpacity>
        </View> */}

    </>
  )
}

export default Profile;
const style = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#B80047",
    marginTop: 20,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
gap:20,
  },
  inputContainer:{
    
  flexDirection: "row",
  alignItems: "center",
  gap:20,
},
  button: {
    backgroundColor: "#B80047",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    width: 100,
    borderRadius: 8,
    marginLeft: 250,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    marginLeft: 5
  },
  input1: {
    // borderColor: "grey",
    // borderWidth: 2,
    // borderRadius: 10,
    // paddingHorizontal: 28,
    // paddingVertical: 8,
    // width: 200,
    // textAlign: "center",
    // marginTop: 20,
    // color: "black",
    borderBottomWidth: 1,
  
  padding: 5,
  width:250,

  },
  outerText: {
    color: "#0cbfebff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
    flexDirection: "row"
  },
  Img_name: {
    margin: 20,
    flexDirection: 'row',
  },
  nameContainer: {
    marginLeft: 30,
  },
  name: {
    fontSize: 30
  },
  mobile: {
    marginTop: 10,
    fontSize: 15
  }
});