import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme, darkTheme } from "../Theme";
import { baseURL } from "../_layout";
import { Image, ImageBackground } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Judson_400Regular,
  Judson_700Bold,
} from "@expo-google-fonts/judson";

function LoginPage() {
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("User");
  const scheme = useColorScheme();
  const router = useRouter();
  const navigation = useNavigation();

  // const theme = scheme === "dark"? style.darkTheme : style.lightTheme;
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({
    Judson_400Regular,
    Judson_700Bold,
  });



  const handleLogin = () => {

    console.log("Login button clicked");
    if (!mobile) {
      Alert.alert("Error", "Please enter mobile number");
      return;
    }
    if (mobile.length != 10) {
      Alert.alert("Error", "Mobile number must be 10 digits");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter password");
      return;
    }
    const endpoint =
      role === "Admin" ? "admin/Login" : "users/Login";

    axios
      .post(`${baseURL}/${endpoint}`, {
        mobile,
        password,
      })
      .then(async (response) => {
        console.log("login clicked");
        Alert.alert("Success", "Login successful");
        console.log("Login Response: ", response.data);
     await SecureStore.setItemAsync("name", response.data.name);
await SecureStore.setItemAsync("mobile", mobile);
await SecureStore.setItemAsync("userId", response.data.id.toString());
await SecureStore.setItemAsync("role", role);
        console.log("RESPONSE DATA:", response.data);
        if (role === "Admin") {
          router.replace("/(admin)/Dashboard");
        }
        else {
          router.replace("/(user)/Dashboard");
        }
      })
      .catch((error) => {
        console.log("INSIDE CATCH");
        console.log(error.response.data);
        Alert.alert("ERROR", error.response.data.message);
      });

    if (!fontsLoaded) {
      return null; // or loading screen
    }

  }
  //   return (
  //     <>
  // {/* a button to got back */}
  // <TouchableOpacity onPress={() => navigation.goBack()}>
  //   <MaterialIcons name="keyboard-backspace" size={34} color="black" style={style.topArrow} />
  // </TouchableOpacity>

  //       <View style={style.container}>

  //       {/* { !role && (
  //         <>
  //         <Text style={[style.heading ]}>Choose User Type</Text>
  //         <View style={style.buttonContainer}>
  //           <TouchableOpacity style={style.button} onPress={()=>setrole("Admin")}>
  //             <Text style={style.buttonText}>Admin</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity style={style.button} onPress={()=>setrole("User")}>
  //             <Text style={style.buttonText}>User</Text>
  //           </TouchableOpacity>

  //         </View>
  //         </>
  //       )} */}

  //     {  role  && (
  //       <>
  //       <Text style={style.heading}> Login Page </Text>
  //       <Text style={style.heading}> User Type : {role} </Text>
  //       <TextInput
  //         placeholder="Enter Mobile"
  //         style={[style.input,{ color:theme.subText}]}
  //         value={mobile}
  //         onChangeText={setmobile}
  //         maxLength={10}
  //         keyboardType="numeric"
  //       />

  //       <TextInput
  //         placeholder="Enter Password"
  //         style={[style.input,{ color:theme.subText}]}
  //         value={password}
  //         onChangeText={setpassword}
  //         secureTextEntry
  //       />
  //       <TouchableOpacity style={style.button} onPress={handleLogin}>
  //         <Text style={style.buttonText}>Login</Text>
  //       </TouchableOpacity>



  //       <TouchableOpacity onPress={() => router.replace("/Register")}>
  //         <Text style={style.outerText}>
  //           Don't you have an account?
  //         </Text>
  //       </TouchableOpacity>
  //       </>
  //     )}

  //     </View>
  //     </>
  //   );

  return (
    <View style={style.container}>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-backspace"
          size={34}
          color="black"
          style={style.topArrow}
        />
      </TouchableOpacity>

      {/* User Icon */}

      <Image
        source={require("../../assets/images/wallpaper.png")}
        style={style.image}
      />
      <View style={style.container1}>
        {/* Heading */}
        <Text style={style.heading}>{role === "Admin" ? "Admin Login" : "Login"} </Text>


        {/* Inputs */}
        <View style={style.inputContainer}>
          <Ionicons name="call" size={20} color="#f6f3eb" style={style.icon} />

          <TextInput
            placeholder="Enter Mobile"
            style={style.input1}
            value={mobile}
            onChangeText={setmobile}
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
        {/* <TextInput
        placeholder="Enter Password"
        style={[style.input, { color: theme.subText }]}
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      /> */}

        <View style={style.inputContainer}>
          {/* Left Icon */}
          <Fontisto name="locked" size={20} color="#f6f3eb" style={style.icon} />

          {/* Input */}
          <TextInput
            placeholder="Enter Password"
            style={[style.input1]}
            value={password}
            onChangeText={setpassword}
            secureTextEntry={!showPassword}
          />

          {/* Right Eye Icon */}
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#f6f3eb"
            />
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Register */}
        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Text style={style.outerText}>
            Don't you have an account?
            
          </Text>
        </TouchableOpacity>

        {/* 🔥 Admin Switch Button */}
        {role !== "Admin" && (
          <TouchableOpacity onPress={() => setrole("Admin")}>
            <Text style={[style.outerText, { marginTop: 30 }]}>
              Login as Admin
            </Text>
          </TouchableOpacity>
        )}

        {/* 🔥 Switch back to User */}
        {role === "Admin" && (
          <>
            <TouchableOpacity onPress={() => setrole("User")}>
              <Text style={[style.outerText, { marginTop: 30 }]}>
                Continue as User
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={{fontFamily:"Judson_400Regular"}}>
© 2026 Shop Aura. Made with ❤️
      </Text>

    </View>
  );
}


export default LoginPage;

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f6f3eb',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    width: 220,
    margin: 10
  },
  icon: {
    marginRight: 8,
  },
  input1: {
    color: "#f6f3eb",
    fontFamily: "Judson_700Bold",
    flex: 1,
    fontSize: 16,


  },
  heading: {
    fontFamily: "Judson_700Bold",
    fontSize: 40,

    marginBottom: 20,
    color: "#f6f3eb",
    marginTop: 10,

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f3eb",


  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#B80047",
    borderRadius: 20,
    width: 350,
    height: 500,
    marginBottom: 50
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#f6f3eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
    marginLeft: 20
  },
  buttonText: {
    fontFamily: "Judson_700Bold",
    color: "#B80047",
    fontSize: 18,


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
    color: "#B80047",
  },
  outerText: {
    color: "#f6f3eb",
    marginTop: 20,
    textDecorationLine: "underline",
    fontFamily: "Judson_400Regular",
  },
  buttonContainer: {
    flexDirection: "row"//makes the buttons to be in a row, if this is not given, then they appear one after another
  },
  topArrow: {
    marginTop: 50,
    marginRight: 320
  },
  userIcon: {
    marginTop: 150
  }
});
