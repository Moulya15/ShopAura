import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme,darkTheme } from "../Theme";
import { baseURL } from "../_layout";
import { Image, ImageBackground } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


function LoginPage() {
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const[role,setrole] = useState("");
  const scheme=useColorScheme();
  const router = useRouter();
const navigation = useNavigation();

  // const theme = scheme === "dark"? style.darkTheme : style.lightTheme;
  const theme = scheme === "dark"? darkTheme: lightTheme;

  const handleLogin=() =>{

    console.log("Login button clicked");
    if(!mobile){
      Alert.alert("Error","Please enter mobile number");
      return;
    }
    if(mobile.length!=10){
      Alert.alert("Error","Mobile number must be 10 digits");
      return;
    }
    if(!password){
      Alert.alert("Error","Please enter password");
      return;
    }
    const endpoint=
      role ==="Admin" ? "admin/Login" : "users/Login";

  axios
  .post(`${baseURL}/${endpoint}`, { 
    mobile,
    password,
  })
  .then((response) => {
    console.log("login clicked");
    Alert.alert("Success", "Login successful");
    console.log("Login Response: ",response.data);
    SecureStore.setItem("name",response.data.name);
    SecureStore.setItem("mobile",mobile);//for profile
    SecureStore.setItem("userId", response.data.id.toString());
    console.log("RESPONSE DATA:", response.data);
    if(role==="Admin"){
      router.replace("/(admin)/Dashboard");
    }
    else{
      router.replace("/(user)/Dashboard");
    }
  })
  .catch((error) => {
    console.log("INSIDE CATCH");
    console.log(error.response.data);
    Alert.alert("ERROR", error.response.data.message);
  });
  
  }
  return (
    <ImageBackground source={require('../../assets/images/login.png')} style={style.container_image}>
{/* a button to got back */}
<TouchableOpacity onPress={() => navigation.goBack()}>
  <MaterialIcons name="keyboard-backspace" size={34} color="black" style={style.topArrow} />
</TouchableOpacity>
<View style={style.userIcon}>
      <FontAwesome name="user-circle-o" size={100} color="pink" />
    </View>
      <View style={style.container}>
      
      { !role && (
        <>
        <Text style={[style.heading ]}>Choose User Type</Text>
        <View style={style.buttonContainer}>
          <TouchableOpacity style={style.button} onPress={()=>setrole("Admin")}>
            <Text style={style.buttonText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={()=>setrole("User")}>
            <Text style={style.buttonText}>User</Text>
          </TouchableOpacity>
          
        </View>
        </>
      )}

    {  role  && (
      <>
      <Text style={style.heading}> Login Page </Text>
      <Text style={style.heading}> User Type : {role} </Text>
      <TextInput
        placeholder="Enter Mobile"
        style={[style.input,{ color:theme.subText}]}
        value={mobile}
        onChangeText={setmobile}
        maxLength={10}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Enter Password"
        style={[style.input,{ color:theme.subText}]}
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={style.buttonText}>Login</Text>
      </TouchableOpacity>

    

      <TouchableOpacity onPress={() => router.replace("/Register")}>
        <Text style={style.outerText}>
          Don't you have an account?
        </Text>
      </TouchableOpacity>
      </>
    )}

    </View>
    </ImageBackground>
  );
}


export default LoginPage;

const style = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgb(239, 118, 221)",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:400
  },
  container_image: {
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
     marginLeft:20
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
  buttonContainer:{
    flexDirection:"row"//makes the buttons to be in a row, if this is not given, then they appear one after another
  },
  topArrow:{
marginTop:50,
marginRight:320
  },
  userIcon:{
    marginTop:150
  }
});
