import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Header from "../Header";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { baseURL } from "../_layout";

interface Product{
    id:number;
    name:string;
    price:number;
    image:string;
}

interface OrderItem{
    id:number;
    quantity:number;
    price:number;
    product:Product;
}

interface Order{
    id:number;
    totalAmount:number;
    orderDate:string;
    items:OrderItem[];
}

const history=()=>{

    const [orders,setOrders]= useState<Order[]>([]);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        fetchOrders();
    },[]);

    const fetchOrders= async ()=>{
        try{
            const userId=await SecureStore.getItemAsync("userId");
            const response=await axios.get(
                `${baseURL}/order/history/${userId}`
            );
            setOrders(response.data);
        }
        catch(error){
            console.error(error);
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

    if(orders.length===0){
        return(
            <>
            <Header/>
            <View style={styles.center}>
                <Text> No orders found</Text>
            </View>
            </>
        )
    }

    return(
        <>
        <Header/>
        <FlatList
        data={orders}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>(
            <View style={styles.orderCard}>
                <Text style={styles.orderId}>Order # {item.id}</Text>
                <Text style={styles.date}>
                    {new Date (item.orderDate).toLocaleString()}
                </Text>

                {item?.items?.map((orderItem)=>(
                    <View key={orderItem.id} style={styles.itemRow}>
                        <Image source ={{
                            uri: `${baseURL}/products/GetImage/${orderItem.product.image}`,
                        }}
                        style={styles.image}
                        />
                       <View style={{flex:1}}>
                        <Text style={styles.productName}>
                            {orderItem.product.name}
                        </Text>
                        <Text>
                            Rs. {orderItem.price} X {orderItem.quantity}
                        </Text>
                       </View>
                    </View>
                ))}

                <Text style={styles.total}>
                    Total: Rs. {item.totalAmount}
                </Text>
            </View>
        )}
        />
        </>
    )
}
export default history;

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"

    },
    heading:{
        fontSize:16,
        fontWeight:"bold"
    },
    center:{
        flex:1,
        justifyContent:"center",
    },
    orderCard:{
        backgroundColor:"#fff",
        margin:12,
        padding:15,
        borderRadius:12,
        elevation:3,
    },
    orderId:{
        fontSize:16,
        fontWeight:"bold",
    },
    date:{
        color:"grey",
        marginBottom:10,
    },
    itemRow:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:6
    },
    image:{
        width:60,
        height:60,
        borderRadius:8,
        marginRight:10
    },
    productName:{
        fontWeight:"bold",
    },
    total:{
        marginTop:10,
        fontSize:16,
        fontWeight:"bold",
        color:"#b61717"
    }
})