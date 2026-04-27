import { ActivityIndicator, StyleSheet, Text, View, FlatList,Image, Touchable, TouchableOpacity, Alert } from "react-native";
import Header from "../Header";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { baseURL } from "../_layout";

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
                `${baseURL}/cart/getCart/${userId}`,
            );
            setCart(response.data);
            // console.log("Cart data:", response.data);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };
    const removeItem = async (id:number)=>{
        try{
            await axios.delete(`${baseURL}/cart/deleteCart/${id}`);
            Alert.alert("Removed", "Item removed from cart");
            fetchCart();
        }
        catch(error){
            console.error(error);
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
    if(cart.length===0){
        return(
            <>
            <Header/>
            <View style={styles.center}>
                <Text>Your cart is Empty</Text>
            </View>
            </>
        );
    }

    const updateQuantity=async (cartId: number,newQty:number)=>{
        try{
            if(newQty<=0){
                await axios.delete(`${baseURL}/cart/deleteCart/${cartId}`,);
            }
            else{
                await axios.put(`${baseURL}/cart/updateQuantity/${cartId}`,{
                    quantity:newQty,

                },);
            }
            fetchCart();
        }
        catch(error){
            console.error(error);
        }
    };

    const grandTotal=cart.reduce((total,item)=>{
        return total+parseInt(item?.product?.price || "0") * item.quantity;
    }, 0);

    const handleCheckout= async()=>{
        try{
            const userId=await SecureStore.getItemAsync("userId");

            const response=await axios.post(
                `${baseURL}/order/checkout/${userId}`
            );

            Alert.alert("Success", "Order placed successfully");

            setCart([]);
        }

        catch(error){
            Alert.alert("Error", "Chechout failed");
            console.error(error);
        }
    };


    return (
        <>
        <Header/>
        <View style={styles.container}>
            <FlatList
            data={cart}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({ item })=>(
                
                <View style={styles.card}>
                    <Image source={{
                uri:`${baseURL}/products/GetImage/${item?.product?.image}`,
            }}
            style={styles.image}
            />
                    <View style={styles.detailesSection}>
                        

                        <View style={styles.qytContainer}>
                            <View>
                            <Text style={styles.productName}>{item?.product?.name}</Text>
                            <Text style={styles.productName}>{item?.product?.description}</Text>
                            </View>
                       
                            <View style={styles.plusminus}>
                                <TouchableOpacity style={styles.qytButton} onPress={()=> updateQuantity(item.id, item.quantity-1)}>
                                <Text style={styles.qytText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.qytNumber}>{item.quantity}</Text>

                            <TouchableOpacity style={styles.qytButton} onPress={()=> updateQuantity(item.id,item.quantity+1)}>
                                <Text style={styles.qytText}>+</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                         <View style={styles.trash}>
                            
                            <Text style={styles.priceText}><FontAwesome name="rupee" size={13} color="black" /> {item?.product?.price}</Text>
<TouchableOpacity onPress={()=>{ removeItem(item.id)}}
                        style={styles.deleteIcon}>
                            <Ionicons name="trash" size={24} color="red"/>
                    </TouchableOpacity>
                         </View>
                        <Text style={styles.itemTotal}>
                            Total: Rs{" "}
                            {parseInt(item?.product?.price || "0") * item.quantity}
                        </Text>
                    </View>

                    
                </View>
            )}
            />
        </View>
        <View style={styles.totalConatiner}>
            <Text style={styles.totalText}>Grand Total: Rs. {grandTotal}</Text>

            <TouchableOpacity style={styles.checkoutButton} onPress={()=>handleCheckout()}>
                <Text style={styles.checkoutText}>Proceed to checkout</Text>
            </TouchableOpacity>
        </View>
        </>
    );
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
    },
    detailesSection:{
        flex:1,
        marginLeft:12,
    },
    productName:{
fontSize:16,
fontWeight:"bold",
    },
    priceText:{
fontSize:14,
color:"#000000",
marginVertical:4,
fontWeight:"bold"
    },
    qytContainer:{
flexDirection:"row",
alignItems:"center",
marginVertical:8,
justifyContent:"space-between",
    },
    qytButton:{
borderColor:"red",
borderWidth:1,
paddingHorizontal:6,
paddingVertical:0,
borderRadius:5,
    },
    qytText:{
color:"fff",
fontSize:18,
fontWeight:"bold"
    },
    qytNumber:{
marginHorizontal:15,
fontSize:16,
fontWeight:"bold",
    },
    itemTotal:{
fontSize:14,
fontWeight:"bold",
marginTop:5,
    },
    deleteIcon:{
padding:8,
marginLeft:250

    },
    totalConatiner:{
borderWidth:1,
borderColor:"#ddd",
paddingTop:10,
marginTop:10,
    },
    totalText:{
fontSize:18,
fontWeight:"bold",
marginBottom:10,
    },
    checkoutButton:{
backgroundColor:"#B80047",
padding:12,
borderRadius:8,
alignItems:"center",
    },
    checkoutText:{
color:"#fff",
fontSize:16,
fontWeight:"bold",
    },
    plusminus:{
        flexDirection:"row",
    },
    trash:{
        flexDirection:"row",
    }
});