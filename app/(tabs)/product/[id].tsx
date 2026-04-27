import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {  ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Header from '../../Header';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { baseURL } from "@/app/_layout";
import {
  useFonts,
  Judson_400Regular,
  Judson_700Bold,
} from "@expo-google-fonts/judson";
interface Product{
    name:string,
    price:number,
    description:string,
    image:string
}
import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProductDetails=()=>{

    const {id} = useLocalSearchParams();
    const [fontsLoaded] = useFonts({
    Judson_400Regular,
    Judson_700Bold,
  });

    const [product,setProduct]=useState<Product | null>();
    const [loading, setLoading]=useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
        if(id){
            fetchProductById();
        }
    }, [id]);

    const addToCart = async () => {
        const userId=await SecureStore.getItemAsync("userId");
        try{
            await axios.post(`${baseURL}/cart/addCart`,{
                userId:userId,
                product:{id:id},
                quantity:1,
            });
            Alert.alert("Success", "Product added to cart");
            router.replace("/(user)/Cart");
        }

        catch(error){
            console.error("Error adding to cart: ", error);
            Alert.alert("Error","Failed to add to cart");
        }
    };
    

    const fetchProductById = async () =>{
        try{
            const response=await 
            axios.get(`${baseURL}/products/getProductsByID/${id}`);
            setProduct(response.data);
        }
        catch(error){
            console.error("Error fetching product:", error);
        }
        finally{
            setLoading(false);
        }
    };

    if(loading){
        return(
            <View style={styles.center}>
                <ActivityIndicator size="large"/>
                <Text>Loading.....</Text>
            </View>
        );
    }
    if(!product){
        return (
            <View style={styles.center}>
                <Text>Not found ☹️</Text>

            </View>
        )
    }
    return(
        <>
        <Header/>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-backspace"
          size={34}
          color="black"
          style={styles.topArrow}
        />
      </TouchableOpacity>
        <ScrollView style={styles.container}>
            <Image
            source={{
                uri:`${baseURL}/products/GetImage/${product.image}`,
            }}
            style={styles.image}
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>MRP: <FontAwesome name="rupee" size={16} color="black" /> {product.price}</Text>

            <Text style={styles.title}>Select Size</Text>
            <View style={styles.SizeView}>
                <TouchableOpacity style={styles.Sizebutton}>
                <Text style={styles.SizebuttonText}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Sizebutton}
            onPress={()=> styles.SizeButtonClicked}>
                <Text style={styles.SizebuttonText}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Sizebutton}>
                <Text style={styles.SizebuttonText}>L</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Sizebutton}>
                <Text style={styles.SizebuttonText}>XL</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={addToCart}>
                <Text style={styles.buttonText}><AntDesign name="shopping-cart" size={24} color="white" /> Add to cart</Text>
            </TouchableOpacity>
        </ScrollView>
        </>
    )
}
export default ProductDetails;

const styles=StyleSheet.create({
container:{
    flex:1,
    padding:20,
    marginBottom:1,
    marginTop:-20,
},
center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
},
SizeView:{
    flexDirection:"row",
    gap:20,
},
 topArrow: {
    marginTop: 50,
    marginRight: 320
  },
  arrow:{
marginTop: -50,
  },
image:{
    width:"100%",
    height:350,
    borderRadius:10,
    marginBottom:20,
},
button: {
    backgroundColor: "#B80047",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
    marginBottom:20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize:22
  },
  Sizebutton:{
    borderWidth:2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width:50,
    marginTop: 20,
    borderRadius: 10,
  },
  SizeButtonClicked:{
backgroundColor:"black",
    paddingHorizontal: 10,
    paddingVertical: 6,
    width:50,
    marginTop: 20,
    borderRadius: 10,
  },
  SizebuttonText:{
    color: "black",
    fontWeight: "bold",
    alignSelf:"center"
  },
title:{
fontFamily:"Judson_700Bold",
      fontSize:30,
      
    },
price:{
    fontSize:18,
    color:"black",
    fontWeight:"bold",
    marginVertical:10,
},
description:{
    fontSize:16,
    color:"#444"
}
})