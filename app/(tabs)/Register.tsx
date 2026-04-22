// import {
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useState } from "react";
// import { router, useNavigation } from "expo-router";
// import axios from "axios";
// import { baseURL } from "../_layout";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// function LoginPage() {
//   const [name, setName] = useState("");
//   const [mobile, setmobile] = useState("");
//   const [password, setpassword] = useState("");
//    const navigation = useNavigation();

//   const handleRegister = () => {
//     console.log("Register button clicked");

//     if (!name) {
//       Alert.alert("Error", "Please enter name");
//       return;
//     }

//     if (!mobile) {
//       Alert.alert("Error", "Please enter mobile number");
//       return;
//     }

//     if (mobile.length !== 10) {
//       Alert.alert("Error", "Mobile number must be 10 digits");
//       return;
//     }

//     if (!password) {
//       Alert.alert("Error", "Please enter password");
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert("Error", "Password must be at least 6 characters");
//       return;
//     }
//     axios
//       .post(`${baseURL}/users/UserRegistration`, {
//         name: name,
//         mobile: mobile,
//         password: password,
//       })
//       .then((response) => {
//         Alert.alert("Success", response.data);
//         console.log("Inside then()")
//         setName("");
//         setmobile("");
//         setpassword("");
//       })
//       // .catch((error) => {
//       //   console.log(error.response.data);
//       //   Alert.alert("Error", error.response.data.message);
//       // });
//       .catch((error) => {
//          console.log("Inside catch()")
//   console.log("AXIOS ERROR:", error.message);
//   console.log("RESPONSE:", error.response);

//   Alert.alert(
//     "Error",
//     error.response?.data?.message || "Network / server error"
//   );
// });

//   };

//   return (
//     <View style={style.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <MaterialIcons
//           name="keyboard-backspace"
//           size={34}
//           color="black"
//           style={style.topArrow}
//         />
//       </TouchableOpacity>
//     <View >
       

//       <Text style={style.heading}>Registration Page</Text>

//       <TextInput
//         placeholder="Enter Name"
//         style={style.input}
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         placeholder="Enter Mobile"
//         style={style.input}
//         value={mobile}
//         onChangeText={setmobile}
//         maxLength={10}
//         keyboardType="numeric"
//       />

//       <TextInput
//         placeholder="Enter Password"
//         style={style.input}
//         value={password}
//         onChangeText={setpassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={style.button} onPress={handleRegister}>
//         <Text style={style.buttonText}>Register</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.replace("/Login")}>
//         <Text style={style.outerText}>Already have an account?</Text>
//       </TouchableOpacity>
//     </View>
//     </View>
//   );
// }

// export default LoginPage;

// const style = StyleSheet.create({
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#0cbfebff",
//     marginTop: 20,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#0cbfebff",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginTop: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   input: {
//     borderColor: "grey",
//     borderWidth: 2,
//     borderRadius: 10,
//     paddingHorizontal: 28,
//     paddingVertical: 8,
//     width: 200,
//     textAlign: "center",
//     marginTop: 20,
//     color: "black",
//   },
//   outerText: {
//     color: "#0cbfebff",
//     marginTop: 20,
//     textDecorationLine: "underline",
//   },
//   topArrow: {
//     marginTop: 0,
//     marginRight: 320
//   },
// });

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { router, useNavigation } from "expo-router";
import axios from "axios";
import { baseURL } from "../_layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import {
  useFonts,
  Judson_400Regular,
  Judson_700Bold,
} from "@expo-google-fonts/judson";

function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
      Judson_400Regular,
      Judson_700Bold,
    });
  const handleRegister = () => {
    if (!name) return Alert.alert("Error", "Enter name");
    if (!mobile) return Alert.alert("Error", "Enter mobile");
    if (mobile.length !== 10)
      return Alert.alert("Error", "Mobile must be 10 digits");
    if (!password) return Alert.alert("Error", "Enter password");
    if (password.length < 6)
      return Alert.alert("Error", "Password min 6 chars");

    axios
      .post(`${baseURL}/users/UserRegistration`, {
        name,
        mobile,
        password,
      })
      .then((res) => {
        Alert.alert("Success", res.data);
        setName("");
        setmobile("");
        setpassword("");
      })
      .catch((err) => {
        Alert.alert(
          "Error",
          err.response?.data?.message || "Server error"
        );
      });
  };

  return (
    <View style={style.container}>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-backspace"
          size={34}
          color="black"
          style={style.topArrow}
        />
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={require("../../assets/images/wallpaper.png")}
        style={style.image}
      />

      {/* Card */}
      <View style={style.container1}>
        <Text style={style.heading}>Register</Text>

        {/* Name */}
        <View style={style.inputContainer}>
          <Ionicons name="person" size={20} color="#f6f3eb" style={style.icon} fontfamily="Judson_700Bold" />
          <TextInput
            placeholder="Enter Name"
            style={style.input1}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Mobile */}
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

        {/* Password */}
        <View style={style.inputContainer}>
          <Fontisto name="locked" size={20} color="#f6f3eb" style={style.icon} />

          <TextInput
            placeholder="Enter Password"
            style={style.input1}
            value={password}
            onChangeText={setpassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#f6f3eb"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={style.button} onPress={handleRegister}>
          <Text style={style.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        {/* Login redirect */}
        <TouchableOpacity onPress={() => router.replace("/Login")}>
          <Text style={style.outerText}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontFamily:"Judson_400Regular", marginTop: 20}}>
© 2026 Shop Aura. Made with ❤️
      </Text>
    </View>
  );
}

export default RegisterPage;

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f6f3eb",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    width: 220,
    margin: 10,
  },
  icon: {
    marginRight: 8,
  },
  input1: {
    fontFamily: "Judson_700Bold",
    color: "#f6f3eb",
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#B80047",
    borderRadius: 20,
    width: 350,
    height: 520,
    marginBottom: 20,
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
  },
  buttonText: {
    color: "#B80047",
    fontSize: 16,
    fontFamily: "Judson_700Bold",
  },
  outerText: {
    color: "#f6f3eb",
    marginTop: 20,
    textDecorationLine: "underline",
    fontFamily: "Judson_700Bold",
  },
  topArrow: {
    marginTop: 70,
    marginRight: 320,
  },
});