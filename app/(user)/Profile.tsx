import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";

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
    axios.get(`https://spring-api-production-e27e.up.railway.app/users/GetUsersByMobile/${mobileNo}`)
      .then((response) => {
        console.log(response.data.name);
        console.log("Inside then()")
        setName(response.data.name);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // const handleUpdate=()=>{
  //   const obj={
  //     name,
  //     mobile,
  //     password,
  //   };
  //   axios.post("http://10.50.15.134:8080/users/UpdateProfile/",obj)
  //   .then((response)=>{
  //     Alert.alert("Sucess",response.data.message);
  //     console.log(response);
  //   })
  //   .catch((error)=>{
  //     if(error.response?.data?.message){
  //       Alert.alert("Error",error.response.data.message);
  //     }
  //     else{
  //       Alert.alert("Error","Unable to connect to server. Please try again");
  //     }
  //   });
  // };

  const handleUpdate= async ()=>{
    if(!name|| !mobile){
      Alert.alert("Error","Name and mobile required")
      return;
    }
    const obj={
      name, mobile, password
    };

    try{
      const response=await axios.put("http://10.50.15.134:8080/users/UpdateProfile/",obj,);
      Alert.alert("Success",response.data.message || "Profile updated");
    }
    catch(error:any){
      Alert.alert("Error",error.response?.data?.message || "Server error");
    }
  }
    return(
        <>
        <Header/>
        <View style={style.container}>
            <Text style={style.heading}>Profile Screen</Text>
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
    color: "#0cbfebff",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0cbfebff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
});