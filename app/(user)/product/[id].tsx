import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {  ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Header from '../../Header';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
interface Product{
    name:string,
    price:number,
    description:string,
    image:string
}

const ProductDetails=()=>{

    const {id} = useLocalSearchParams();

    const [product,setProduct]=useState<Product | null>();
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        if(id){
            fetchProductById();
        }
    }, [id]);
    

    const fetchProductById = async () =>{
        try{
            const response=await 
            axios.get(`https://spring-api-production-e27e.up.railway.app/products/getProductsByID/${id}`);
            setProduct(response.data);
            console.log(response.data);
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
        <ScrollView style={styles.container}>
            <Image
            source={{
                uri:`https://spring-api-production-e27e.up.railway.app/products/GetImage/${product.image}`,
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
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}><AntDesign name="shopping-cart" size={24} color="white" />  Add to cart</Text>
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
image:{
    width:"100%",
    height:350,
    borderRadius:10,
    marginBottom:20,
},
button: {
    backgroundColor: "rgb(202, 38, 158)",
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
      fontSize:23,
      fontWeight:"bold",
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