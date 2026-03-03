import { StyleSheet, Text, View } from "react-native";
import Header from "../Header";

const history=()=>{

    return(
        <>
        <Header/>
        <View style={styles.container}>
            <Text style={styles.heading}>Order History</Text>
        </View>
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

})