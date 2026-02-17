import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { router } from "expo-router";
import axios from "axios";

function LoginPage() {
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");

  const handleRegister = () => {
    console.log("Register button clicked");

    if (!name) {
      Alert.alert("Error", "Please enter name");
      return;
    }

    if (!mobile) {
      Alert.alert("Error", "Please enter mobile number");
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert("Error", "Mobile number must be 10 digits");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    axios
      .post("https://spring-api-production-e27e.up.railway.app/users/UserRegistration", {
        name: name,
        mobile: mobile,
        password: password,
      })
      .then((response) => {
        Alert.alert("Success", response.data);
        console.log("Inside then()")
        setName("");
        setmobile("");
        setpassword("");
      })
      // .catch((error) => {
      //   console.log(error.response.data);
      //   Alert.alert("Error", error.response.data.message);
      // });
      .catch((error) => {
         console.log("Inside catch()")
  console.log("AXIOS ERROR:", error.message);
  console.log("RESPONSE:", error.response);

  Alert.alert(
    "Error",
    error.response?.data?.message || "Network / server error"
  );
});

  };

  return (
    <View style={style.container}>
      <FontAwesome name="user-circle-o" size={70} color="#0cbfebff" />

      <Text style={style.heading}>Registration Page</Text>

      <TextInput
        placeholder="Enter Name"
        style={style.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter Mobile"
        style={style.input}
        value={mobile}
        onChangeText={setmobile}
        maxLength={10}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Enter Password"
        style={style.input}
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />

      <TouchableOpacity style={style.button} onPress={handleRegister}>
        <Text style={style.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/Login")}>
        <Text style={style.outerText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginPage;

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
  }
});