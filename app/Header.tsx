
// npm install react-native-swiper
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Header = () => {

  const [showSettings, setshowSettings] = useState(false);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("mobile");
    router.replace("/");
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>React Native</Text>

          <View style={styles.rightSection}>
            <TouchableOpacity onPress={()=> setshowSettings(true)}>
              <MaterialCommunityIcons name="cog" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              {/* <Text style={styles.buttonText}>Logout</Text> */}
              <MaterialCommunityIcons name="logout" size={24} color="white"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
      visible={showSettings}
      transparent={true}
      animationType="fade"
      onRequestClose={()=> setshowSettings(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.closeIcon}  onPress={()=> setshowSettings(false)}>
              <MaterialCommunityIcons name="close" size={24} color="black"/>
            </TouchableOpacity>

            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.option}> Change Theme</Text>
            <Text style={styles.option}> Update Profile</Text>
            <Text style={styles.option}> App Version 1.0</Text>
          </View>
        </View>

      </Modal>
    </>
  );
}
export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#160a9a',
    height: 120,
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  button: {
    backgroundColor: "rgb(233, 14, 54)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 20,
    width: 100,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 25

  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rightSection:{
    marginTop:50,
    marginRight:20,
     flexDirection:"row",
     alignItems:"center",
     gap:20
  },
  row:{
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center"
  },
  overlay:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  card:{
    width:"85%",
    backgroundColor:"white",
    padding:40,
    borderRadius:15,
    elevation:6,
    height:300
  },
  cardTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:15
  },
  option:{
    fontSize:16,
    marginBottom:10
  },
  closeIcon:{
    position:"absolute",
    right:10,
    top:10
  }
})