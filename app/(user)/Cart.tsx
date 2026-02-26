import { ActivityIndicator, StyleSheet, Text, View, FlatList,Image, Touchable, TouchableOpacity } from "react-native";
import Header from "../Header";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface CartItem{
    id:number;
    userId:number;
    product: Product;
    quantity: number;
}
interface Product{
    id:number;
    name:string;
    price:string;
    description:string;
    image:any;
}


const Cart=()=>{
    const[cart, setCart]= useState<CartItem[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetchCart();
    },[]);

    const fetchCart = async () => {
        try{
            const userId = await SecureStore.getItemAsync("userId");
            const response=await axios.get(
                `https://spring-api-production-e27e.up.railway.app/cart/getCart/${userId}`,
            );
            setCart(response.data);
            console.log("Cart data:", response.data);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };
    // const removeItem = async (id:number)=>{
    //     try{
    //         await axios.delete(`https://spring-api-production-e27e.up.railway.app/cart/remove/${id}`);
    //     }
    // }
    if(loading){
            return(
                <View style={styles.center}>
                    <ActivityIndicator size="large"/>
                    <Text>Loading.....</Text>
                </View>
            );
        }
    if(cart.length===0){
        return(
            <View style={styles.center}>
                <Text>Your cart is Empty</Text>
            </View>
        );
    }
    return (
        <>
        <Header/>
        <View style={styles.container}>
            <FlatList
            data={cart}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({ item })=>(
                
                <View style={styles.card}>
                    <Text style={styles.text}>Product ID : {item.product?.id}</Text>
                    <Text style={styles.text}>Qunatity : {item.quantity}</Text>
                    <Image source={{
                uri:`https://spring-api-production-e27e.up.railway.app/products/GetImage/${item.product.image}`,
            }}
            style={styles.image}
            />
                    {/* <TouchableOpacity style={styles.button} onPress={() => removeItem(item.id)}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity> */}
                </View>
            )}
            />
        </View>
        </>
    )
}
export default Cart;

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:"#f5f5f5",
    },
    card:{
        backgroundColor:"#fff",
        padding:15,
        borderRadius:10,
        marginBottom:12,
        elevation:2,
    },
    title:{
        fontSize:16,
        fontWeight:"600",
        marginBottom:5,
    },
    text:{
        fontSize:14,
        color:"#555",
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    loadingText:{
        marginTop:10,
        fontSize:14,
    },
    emptyText:{
        fontSize:16,
        fontWeight:"500",
    },
    image:{
    width:"100%",
    height:350,
    borderRadius:10,
    marginBottom:20,
    }
});