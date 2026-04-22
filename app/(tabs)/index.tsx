// import { Link, router } from "expo-router";
// import { useEffect } from "react";
// import { StyleSheet, Text, View, useColorScheme } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import { lightTheme,darkTheme } from "../Theme";
// // import bgImage from '../../assets/images/wallpaper.png';
// import { ImageBackground } from "expo-image";
// // const bgImage = require("../../assets/images/wallpaper.png");
// const index=()=>{


//   useEffect(()=>{
//     const checkLogin=async()=>{
//       const userName = await SecureStore.getItemAsync("mobile");
//       if (userName){
//         router.replace("/(user)/Dashboard");
//       }
//     };
//     checkLogin();
//   },[]);
//   const scheme=useColorScheme();
//     const theme = scheme === "dark"? darkTheme: lightTheme;
//   return(
//     <>
//     <ImageBackground source={require('../../assets/images/wallpaper.png')} style={style.container}>
//     <View style={style.container}>
//       <Text style={[style.heading , {color:theme.text}]}>Shop Aura</Text>

//       <Link href="/(tabs)/Login" style={[style.heading , {color:theme.text}, ]}>Lets Start</Link> 
//     </View>
//       </ImageBackground>
//     </>
//   )


// }
//   export default index;

//   const style=StyleSheet.create({
//     container:{
//       flex:1,
//       alignItems:"center",
//       justifyContent:"center"

//     },
//     heading:{
//       fontSize:25,
//       fontWeight:"bold",
//       color:"#fff"
//     },
//     login:{
//       textDecorationLine:"underline",
//       marginTop:30,
//       fontSize:20

//     }
//   })

import { Link, router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme, darkTheme } from "../Theme";
import { Image, ImageBackground } from "expo-image";
import {
  useFonts,
  Judson_400Regular,
  Judson_700Bold,
} from "@expo-google-fonts/judson";


const Index = () => {
  useEffect(() => {
    const checkLogin = async () => {
      const userName = await SecureStore.getItemAsync("mobile");
      if (userName) {
        router.replace("/(user)/Dashboard");
      }
    };
    checkLogin();
  }, []);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  const [fontsLoaded] = useFonts({
  Judson_400Regular,
  Judson_700Bold,
});

if (!fontsLoaded) {
  return null; // or loading screen
}

  return (
    <View   style={styles.container}>
    <Image
      source={require("../../assets/images/wallpaper.png")}
  style={styles.image}
    />
      <View style={styles.overlay}>
        
        {/* Bottom Content */}
        <View style={styles.bottomContainer}>
          {/* <Text style={[styles.heading, { color: theme.text }]}>
            SHOP AURA
          </Text> */}
<View style={styles.button}>
          <TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/(tabs)/Login")}
>
  <Text style={styles.subText}>Let’s Start</Text>
</TouchableOpacity>
          </View>
          
        </View>

      </View>

      <Text style={{fontFamily:"Judson_400Regular"}}>
© 2026 Shop Aura. Made with ❤️
      </Text>
    
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#f6f3eb",
  },
 image: {
  marginTop:250,
    width: 300,
    height: 200,
  },
  button:{
backgroundColor:"#B80047",
borderRadius:20,
paddingHorizontal:20,
width:200,
height:50,
justifyContent:"center",
alignItems:"center",
marginBottom:0,

  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },

  bottomContainer: {
    alignItems: "center",
    marginBottom: 200,
  },

 

  subText: {
    fontFamily: "Judson_400Regular",
  fontSize: 28,
   
    opacity: 0.9,
   color:"#fff",

   
   textAlign:"center"
  },
});