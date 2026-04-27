import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";
import Header from "../Header";
import * as ImagePicker from 'expo-image-picker';
import { baseURL } from "../_layout";
import Feather from "@expo/vector-icons/Feather";


const Dashboard = () => {
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [search,setsearch] = useState("");
  // const [image,setimage]=useState<string | null>(null);
  const [productImage,setproductImage] = useState("");
  const[imagePicked,setimagePicked]= useState(false);

const pickImage= async ()=>{
  let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status!=="granted") return ;
  setimagePicked(true);

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
    aspect:[93,4],
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
    axios.get(`${baseURL}/products/getProducts`)
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

    axios.post(`${baseURL}/products/ProductRegistration`, formData,{
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

  


  return (
    <>
     <Header/>
     <Text style={styles.heading}>  Admin Dashboard</Text>
    <ScrollView>
   
      <View style={styles.container}>
       <View style={styles.inputContainer}>
        <Text>Product Name : </Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setname}
        />
        </View>

<View style={styles.inputContainer}>
 <Text>Product Price : </Text>
        <TextInput
          style={styles.input}
          placeholder="Product price"
          value={price}
          onChangeText={setprice}
          keyboardType="numeric"
        />
</View>

<View style={styles.inputContainer}>
 <Text>Product description : </Text>
        <TextInput
          style={styles.input}
          placeholder="Product description"
          value={description}
          onChangeText={setdescription}
        />
        </View>
        {imagePicked ? (
  // {productImage && (
  <>
          <Image source = {{ uri:productImage }} style = {styles.imageUploaded}/>
          <TouchableOpacity style={styles.button} onPress={()=>setimagePicked(false)}>
            <Text style={styles.buttonText}>Change Image</Text>
          </TouchableOpacity>
          </>
        // )}
        ):(
          <>
<View style={{flexDirection:"row",gap:20}}>
  <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload a Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Text style={styles.buttonText}>Capture a Image</Text>
        </TouchableOpacity>
  </View>
        </>
        )}
         
        {/* {image && (
          <Image source = {{ uri:image }} style = {styles.imageUploaded}/>
        )} */}

        <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
        <Text style={styles.buttonText}><Feather name="save" size={15} color="white" /> Save </Text>
        </TouchableOpacity>
      


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
      </ScrollView>
    </>
  )

}

export default Dashboard;
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#B80047",
    marginTop: 20,
  },
  input: {
    // borderColor: "grey",
    // borderWidth: 2,
    // borderRadius: 10,
    // paddingHorizontal: 28,
    // paddingVertical: 8,
    // width: 200,
    // textAlign: "center",
    // marginTop: 20,
    // color: "black",
     borderBottomWidth: 1,
  
  padding: 5,
  width:200,
  },
  inputContainer:{
  flexDirection: "row",
  alignItems: "center",
  gap:20,
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
    backgroundColor: "#B80047",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
  },
  button1: {
    backgroundColor: "#B80047",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
    marginLeft:200,
    width:100
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  outerText: {
    color: "#B80047",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  imageUploaded:{
    // width:200,
    // height:200,
    marginTop:20,
    // borderRadius:10,
    borderColor:"black",
    borderWidth:4,
    width: 180,
    height: 240, // 3:4 ratio
    borderRadius: 12
  }
});