import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";
import Header from "../Header";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Swiper from 'react-native-swiper';

const Dashboard = () => {
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [search, setsearch] = useState("");

  const fetchProducts = () => {
    console.log("inside fetchproducts");
    axios.get("https://spring-api-production-e27e.up.railway.app/products/getProducts")
      .then((response) => {
        console.log("Inside then()")
        setproducts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("Inside catch ()")
        console.log("Error", error.response.data.message);
      })
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  const userName = SecureStore.getItemAsync("name");
  const router = useRouter();



  const handleSubmit = () => {
    console.log("submit button clciked");
    if (!name) {
      Alert.alert("Error", "Please enter name");
      return;
    }
    if (!price) {
      Alert.alert("Error", "Please enter price");
      return;
    }
    if (!description) {
      Alert.alert("Error", "Please enter description");
      return;
    }

    axios.post("https://spring-api-production-e27e.up.railway.app/products/ProductRegistration", {
      name,
      price,
      description
    })
      .then((response) => {
        console.log("Inside Then");
        Alert.alert("Success", response.data);
        fetchProducts();
        setdescription("");
        setname("");
        setdescription("");
      })
      .catch((error) => {
        Alert.alert("Error", error.response.data.message);
        console.log("Inside catch");
      })
  }

  const filteredData = products.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: any }) => (
    // <View style={styles.productCard}>
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => router.replace({
        pathname: "/product/[id]",
        params: { id: item.id.toString() }
      })
      }
    >
      <Image source={{ uri: `https://spring-api-production-e27e.up.railway.app/products/GetImage/${item.image}` }} style={styles.imageUploaded} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.producDescription}>{item.description}</Text>
      <Text style={styles.productPrice}><FontAwesome name="rupee" size={12} color="black" /> {item.price}</Text>

    </TouchableOpacity>
    // </View>
  )


  return (
    <>
      <Header />
      {/* z */}
      <View style={{ height: 200 }}>
        <Swiper autoplay showsPagination>
          <Image source={require("../../assets/images/myntra1.jpg")} style={{ flex: 1, width: "100%", borderRadius: 40, marginTop: 10 }} />
          <Image source={require("../../assets/images/myntra2.jpg")} style={{ flex: 1, width: "100%", borderRadius: 40, marginTop: 10 }} />
          <Image source={require("../../assets/images/myntra3.jpg")} style={{ flex: 1, width: "100%", borderRadius: 40, marginTop: 10 }} />
        </Swiper>
      </View>
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Search by name"
          value={search}
          onChangeText={setsearch}
        />

        {/* if we want 1 product per row and everything follows up, then dont mention numcolumns etc */}

        {/* this is for 2 products per row  */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}//for the image to be displayes in 2
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsHorizontalScrollIndicator={false}
        />

        {/* <FlatList
        data={filteredData}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        /> */}

        {/* <FlatList
        data={filteredData}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        /> */}



        {filteredData.length === 0 && (
          <Text style={styles.heading}>No product found for "{search}"</Text>
        )}
        <View>
        </View>
      </View>
    </>
  )

}

export default Dashboard;
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0cbfebff",
    marginTop: 20,
  },
  input: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 8,
    width: 350,
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  para: {
    fontSize: 16,
    marginBottom: 10,
    color: "rgb(7, 22, 26)",
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0cbfebff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  outerText: {
    color: "#0cbfebff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    margin: 0
  },
  productPrice: {
    fontSize: 13,
    fontWeight: "bold",
    // marginTop: 10,
    color: "#000000",
    margin: 0
  },
  producDescription: {
    fontSize: 13,
    // fontWeight: "bold",
    color: "#959595",
    margin: 0
  },
  itemCard: {
    // width:"48%", this is for when numcolumn is 2
    width: 180, //this is for horizontal scrolling
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 5
  },
  imageUploaded: {
    width: "100%",
    height: 280,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5
  }
  // productCard:{
  //   flexDirection:"row",
  //   justifyContent:"space-between"
  // }
});