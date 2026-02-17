import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";
import Header from "../Header";
import * as ImagePicker from 'expo-image-picker';


const Dashboard = () => {
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [search,setsearch] = useState("");
  // const [image,setimage]=useState<string | null>(null);
  const [productImage,setproductImage] = useState("");

const pickImage= async ()=>{
  let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status!=="granted") return ;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect:[9,16],
    quality:0.5,
    base64:true
  });
  if (!result.canceled){
    const asset =result.assets[0];
      const base64Image = `data:image/jpeg;base64,${asset.base64}`;
      setproductImage(base64Image);

      // const selectedAsset=result.assets[0];
      // setimage(selectedAsset.uri);
      // console.log(image);
      // setimage(result.assets[0].uri);
      // console.log(result.assets[0].uri);
    }
}

//to capture the image through the phone camera
const captureImage= async ()=>{
  let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status!=="granted") return ;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect:[4,3],
    quality:0.5,
    base64:true
  });
  if (!result.canceled){
    const asset =result.assets[0].uri;
    setproductImage(asset);
    //this is for base64
    //  const asset =result.assets[0];
      // const base64Image = `data:image/jpeg;base64,${asset.base64}`;
      // setimage(base64Image);
    //base64 ends
      // const selectedAsset=result.assets[0];
      // setimage(selectedAsset.uri);
      // console.log(image);
      // setimage(result.assets[0].uri);
      // console.log(result.assets[0].uri);
    }
}

  const fetchProducts = () => {
    console.log("inside fetchproducts");
    axios.get("http://10.50.15.134:8080/products/getProducts")
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

  

  const handleSubmit = () => {
    // console.log("submit button clciked");
    // if (!name) {
    //   Alert.alert("Error", "Please enter name");
    //   return;
    // }
    // if (!price) {
    //   Alert.alert("Error", "Please enter price");
    //   return;
    // }
    // if (!description) {
    //   Alert.alert("Error", "Please enter description");
    //   return;
    // }

    const formData= new FormData;

    formData.append("name",name);
    formData.append("price",price);
    formData.append("description",description);

    formData.append("image",{
      uri:productImage,
      name:"photo.jpeg",
      type:"image/jpeg",
    } as any);

    axios.post("https://spring-api-production-e27e.up.railway.app/products/ProductRegistration", formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response)=>{
      Alert.alert(response.data);
      setname("");
      setprice("");
      setdescription("");
      setproductImage("");
      
    })
    .catch((error)=>{
      console.log(error.response.data.message)
    })

    // axios.post("http://10.50.15.134:8080/products/ProductRegistration", {
    //   name,
    //   price,
    //   description,
    //   image
    // })
    //   .then((response) => {
    //     console.log("Inside Then");
    //     Alert.alert("Success", response.data);
    //     fetchProducts();
    //     setdescription("");
    //     setname("");
    //     setdescription("");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error", error.response.data.message);
    //     console.log("Inside catch");
    //   })
  }

  const filteredData=products.filter((item:any)=>
    item.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <Text>Name : {item.name}</Text>
      <Text>Price : {item.price}</Text>
      <Text>Description : {item.description}</Text>
    </View>
  )


  return (
    <>
    <Header/>
      <View style={styles.container}>
        <Text style={styles.heading}>Dashboard</Text>
        <Text style={styles.para}>Welcome {userName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          style={styles.input}
          placeholder="Product price"
          value={price}
          onChangeText={setprice}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Product description"
          value={description}
          onChangeText={setdescription}
        />
         <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload a Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Text style={styles.buttonText}>Capture a Image</Text>
        </TouchableOpacity>
        {/* {image && (
          <Image source = {{ uri:image }} style = {styles.imageUploaded}/>
        )} */}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Save Product</Text>
        </TouchableOpacity>
        {productImage && (
          <Image source = {{ uri:productImage }} style = {styles.imageUploaded}/>
        )}


{/*         
          <Text>Product List</Text>
          <FlatList
            data={products}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={renderItem}
          /> */}
          {/* <TextInput
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
                <Text style={styles.heading}>No product found for "{search}"</Text>
            )} */}


        
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
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 8,
    width: 200,
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
  imageUploaded:{
    width:200,
    height:200,
    marginTop:20,
    borderRadius:10,
    borderColor:"black",
    borderWidth:4
  }
});