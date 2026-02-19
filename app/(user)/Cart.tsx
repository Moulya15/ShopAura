import { ActivityIndicator, StyleSheet, Text, View, FlatList, Touchable, TouchableOpacity } from "react-native";
import Header from "../Header";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";


interface CartItem{
    id:number;
    userId:number;
    productId: number;
    quantity: number;
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
                    <Text style={styles.text}>Product ID : {item.productId}</Text>
                    <Text style={styles.text}>Qunatity : {item.quantity}</Text>

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
},
text:{

},
button:{

},
buttonText:{

},
center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
},
card:{

},
})