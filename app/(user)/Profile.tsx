//add some option for adding profile picture 

import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import { baseURL } from "../_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile=()=>{

  const loginMobile:any = SecureStore.getItemAsync("mobile");

  console.log("Mobile",loginMobile);

  
  //to change pw
  const [name, setName] = useState("");
    const [mobile, setmobile] = useState("");
    const [password, setpassword] = useState("");

    useEffect(()=>{
      loadUser();
    },[]);
//first we store it in the number and then we call the fetchUser
    const loadUser= async()=>{
        try{
          const storedMobile=await SecureStore.getItemAsync("mobile");
          // const storedName=await SecureStore.getItemAsync("name");

          if(!storedMobile){
            Alert.alert("Error","User not logged in");
            return;
          }

          setmobile(storedMobile);
          fetchUser(storedMobile);
          // setName(storedName);
        }
        catch(err){
            console.log(err);
        }
    };

    const fetchUser = async (mobileNo:any) => {
    // console.log("inside fetchproducts");
    axios.get(`${baseURL}/users/GetUsersByMobile/${mobileNo}`)
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



  const handleUpdate= async ()=>{
    if(!name|| !mobile){
      Alert.alert("Error","Name and mobile required")
      return;
    }
    const obj={
      name, mobile, password
    };

    try{
      const response=await axios.put(`${baseURL}:8080/users/UpdateProfile/`,obj,);
      Alert.alert("Success",response.data.message || "Profile updated");
    }
    catch(error:any){
      Alert.alert("Error",error.response?.data?.message || "Server error");
    }
  }
    return(
        <>
        <Header/>
        <Text style={style.heading}>PROFILE </Text>

        <View style={style.Img_name}>
          <View>
            <Image
          source={require('../../assets/images/user_icon2.png')} 
          style={style.profileImg}
          />
          </View>
          <View style={style.nameContainer}>
            <Text style={style.name}>{name}</Text>
            <Text style={style.mobile}><Ionicons name="call" size={14} color="#FBABFF" /> {mobile}</Text>
            <Text> </Text>
          </View>
         
        </View>
       <TouchableOpacity style={style.button} >
              <Text style={style.buttonText}>Update</Text>
            </TouchableOpacity>


        <View style={style.container}>
          
            
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
        </View>
        
        </>
    )
}

export default Profile;
const style = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgb(0, 0, 0)",
    marginTop: 20,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgb(221, 95, 215)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    width:100,
    borderRadius: 8,
    marginLeft:200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
  },
  input: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 8,
    width: 200,
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  outerText: {
    color: "#0cbfebff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  profileImg:{
    width:100, 
    height:100, 
    borderRadius:50,
    marginLeft:20,
    flexDirection:"row"
  },
  Img_name:{
flexDirection:'row',
  },
  nameContainer:{
marginLeft:30,
  },
  name:{
fontSize:30
  },
  mobile:{
    marginTop:10,
fontSize:15
  }
});