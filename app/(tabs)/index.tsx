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
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme, darkTheme } from "../Theme";
import { ImageBackground } from "expo-image";

// 👉 If using custom fonts, make sure you load them in your app (expo-font)

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

  return (
    <ImageBackground
      source={require("../../assets/images/wallpaper.png")}
      style={styles.container}
      contentFit="cover"
    >
      <View style={styles.overlay}>
        
        {/* Bottom Content */}
        <View style={styles.bottomContainer}>
          <Text style={[styles.heading, { color: theme.text }]}>
            SHOP AURA
          </Text>

          <Link href="/(tabs)/Login">
            <Text style={[styles.subText, { color: theme.text }]}>
              Let’s Start
            </Text>
          </Link>
        </View>

      </View>
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },

  bottomContainer: {
    alignItems: "center",
  },

  heading: {
    fontSize: 34,
    fontWeight: "700", // fallback if font not loaded
    letterSpacing: 3,
    textTransform: "uppercase",

    // ✨ soft glow effect
    textShadowColor: "rgba(255,255,255,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  subText: {
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 1,
    opacity: 0.9,
     textDecorationLine: 'underline'
  },
});