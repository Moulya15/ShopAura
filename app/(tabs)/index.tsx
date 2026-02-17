import { Link, router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme,darkTheme } from "../Theme";
// import bgImage from '../../assets/images/food.jpg';
import { ImageBackground } from "expo-image";

const index=()=>{


  useEffect(()=>{
    const checkLogin=async()=>{
      const userName = await SecureStore.getItemAsync("mobile");
      if (userName){
        router.replace("/(user)/Dashboard");
      }
    };
    checkLogin();
  },[]);
  const scheme=useColorScheme();
    const theme = scheme === "dark"? darkTheme: lightTheme;
  return(
    <>
    {/* <ImageBackground source={bgImage} style={style.container}> */}
    <View style={style.container}>
      <Text style={[style.heading , {color:theme.text}]}>Recipe App</Text>

      <Link href="/(tabs)/Login" style={[style.heading , {color:theme.text}, ]}>Lets Start</Link> 
    </View>
      {/* </ImageBackground> */}
    </>
  )


}
  export default index;

  const style=StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
      justifyContent:"center"

    },
    heading:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    },
    login:{
      textDecorationLine:"underline",
      marginTop:30,
      fontSize:20

    }
  })