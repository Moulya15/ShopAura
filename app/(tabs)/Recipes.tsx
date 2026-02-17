import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text,TextInput, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ImageBackground } from "expo-image";

const Recipes = ()=>{
    const [data,setdata] = useState([]);
    const [search,setsearch]=useState("");


    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
            axios.get("https://dummyjson.com/recipes")
            .then((response)=>{
                setdata(response.data.recipes);
                console.log(response.data.recipe);
            })
            .catch((error)=>{
                console.log("Error fetching data",error);
            });
    };

    const renderItem=({item}: {item:any})=>(

        <View style={styles.itemCard}>
            <Image source={{uri:item.image}} style={styles.image}/>
            <Text style={styles.recipeName} > <MaterialCommunityIcons name="food" size={24} color="brown" />   {item.name}</Text>
            <Text style={styles.heading}><MaterialCommunityIcons name="notebook-edit" size={20} color="black" />  Ingredients :</Text>
            <FlatList
                data={item.ingredients}
                keyExtractor={(ingredient)=>ingredient.toString()}
                renderItem={({ item:ingredient})=>(
                    <Text style= {styles.ingredients}><FontAwesome6 name="arrow-right" size={15} color="black" />  {ingredient}</Text>
                )}
            />
            <Text style={styles.heading}>Intructions :</Text>
            
            <FlatList
                data={item.instructions}
                keyExtractor={(instructions)=>instructions.toString()}
                renderItem={({ item:instructions})=>(
                    <Text style={styles.ingredients}><Octicons name="dot-fill" size={15} color="black" /> {instructions}</Text>
                )}
            />
            <Text style={styles.ingredients}>
                <Entypo name="time-slot" size={15} color="black" />  Preparation Time:{item.prepTimeMinutes}
            </Text>
            <Text style={styles.ingredients}>
                <Entypo name="time-slot" size={15} color="black" />  Cooking time : {item.cookTimeMinutes}
            </Text>
            <Text style={styles.ingredients}>
                <FontAwesome6 name="bowl-food" size={15} color="black" />   Servings : {item.servings}</Text>
            <Text style={styles.ingredients}><MaterialIcons name="speed" size={15} color="black" />  Difficulty : {item.difficulty}</Text>
        </View>
    );
     const filteredData=data.filter((item:any)=>
    item.name.toLowerCase().includes(search.toLowerCase()));

     return(
        <>
        
        <View style={styles.container}>
            <Text style={styles.title}> Recipe screen </Text>
            <TextInput
            style={styles.input}
            placeholder="Search by name"
            value={search}
            onChangeText={setsearch}
            />
            <FlatList
            data={filteredData}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={renderItem}
            />
            {filteredData.length===0 &&(
                <Text style={styles.heading}>No recipe found for "{search}"</Text>
            )}
        </View>
      
        </>
     )
     }

     export default Recipes;

     const styles=StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            padding:20
        },
        heading:{
            fontSize:18,
            fontWeight:"bold",
            marginTop:10,
            color:"blue",

        },
        input:{
            borderColor:"black",
            borderWidth:1,
            paddingHorizontal:10,
            paddingVertical:8,
            borderRadius:10,
            width:300,
            textAlign:"center",
            marginVertical:20,
        },
        title:{
            fontSize:24,
            fontWeight:"bold",
            marginTop:40,
            color:"green"
        },
        recipeName:{
            fontSize:20,
            fontWeight:"bold",
            color:"#ff009d"
        },
        itemCard:{
            padding:20,
            marginVertical:5,
            backgroundColor:"white",
            borderRadius:5,
            borderColor:"#ccc",
            borderWidth:1
        },
        ingredients:{
            fontSize:14,
            color:"#555555"
        },
        image:{
            width:"100%",
            height:200,
            resizeMode:"cover",
            borderRadius:10,
            marginBottom:10
        }
     })

