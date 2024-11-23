// screens/BackgroundChangeScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Array of background images
const backgrounds = [
  { id: 1, src: require("../assets/msjbg.png") },
  { id: 2, src: require("../assets/pbg.png") },
  { id: 3, src: require("../assets/MoonBG.png") },
  { id: 6, src: require("../assets/background.png") },
  { id: 4, src: require("../assets/background (1).png") },
  { id: 5, src: require("../assets/background (2).png") },
  { id: 7, src: require("../assets/background (4).png") },
  { id: 8, src: require("../assets/background (5).png") },
  { id: 9, src: require("../assets/background (6).png") },
  { id: 10, src: require("../assets/background (7).png") },
  { id: 11, src: require("../assets/background (8).png") },
  { id: 12, src: require("../assets/background (9).png") },
  { id: 13, src: require("../assets/background (10).png") },
  { id: 14, src: require("../assets/background (11).png") },
];
const BackgroundChangeScreen = ({ navigation, setBgImage }) => {
    const handleBgSelect = (bg) => {
      setBgImage(bg.src); // Directly use setBgImage from props
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={26} color="#ffffff" />
    </TouchableOpacity>
        <Text style={styles.title}>Select Background</Text>
        <FlatList
          data={backgrounds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBgSelect(item)}>
              <Image source={item.src} style={styles.backgroundImage} />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 10,
    },
    title: {
      fontSize: 30,
      color: "#ffffff",
      marginTop: 80,
      marginBottom: 20,
      textAlign: "center",
      fontFamily: "UnicaOne_400Regular",
    },
    backgroundImage: {
      width: 180,
      height: 250,
      margin: 5,
      borderRadius: 8,
    },
    backButton: {
        position: "absolute",
        top: 95,
        left: 30,
        zIndex: 1, // Ensures the back button is above other elements
      },
  });
  
  export default BackgroundChangeScreen;


//   /// // screens/BackgroundChangeScreen.js
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const accessToken = "sl.CAGnCsJDyS_JxsMt451DUoylq5A3hZZ3LqzUFWgnxcu8gJOZ1kc90J2dMSfIDNjZPotqC0x-wL4srVewIoy_WFPmGfwSMlAKHAEAKxspiTFzV7V0OhQa73kcsAMeI-sHiQxklJSHZrsU";

// const BackgroundChangeScreen = ({ navigation, setBgImage }) => {
//   const [backgrounds, setBackgrounds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch images from Dropbox "All files" folder
//   const fetchDropboxImages = async () => {
//     try {
//       // List files in the "All files" folder
//       const listResponse = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${accessToken}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           path: "/images",
//         })
//       });

//       const listData = await listResponse.json();
//       if (listData.error) {
//         console.error("Error listing files:", listData.error);
//         return;
//       }

//       // Generate temporary links for each image
//       const files = listData.entries;
//       const images = await Promise.all(
//         files.map(async (file) => {
//           const linkResponse = await fetch("https://api.dropboxapi.com/2/files/get_temporary_link", {
//             method: "POST",
//             headers: {
//               "Authorization": `Bearer ${accessToken}`,
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               path: file.path_lower,
//             })
//           });

//           const linkData = await linkResponse.json();
//           return { id: file.id, src: { uri: linkData.link } };
//         })
//       );

//       setBackgrounds(images);
//     } catch (error) {
//       console.error("Error fetching images from Dropbox:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDropboxImages();
//   }, []);

//   const handleBgSelect = (bg) => {
//     setBgImage(bg.src); // Set the selected background image
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <MaterialIcons name="arrow-back-ios" size={26} color="#ffffff" />
//       </TouchableOpacity>
//       <Text style={styles.title}>Select Background</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={backgrounds}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleBgSelect(item)}>
//               <Image source={item.src} style={styles.backgroundImage} />
//             </TouchableOpacity>
//           )}
//           numColumns={2}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     padding: 10,
//   },
//   title: {
//     fontSize: 30,
//     color: "#ffffff",
//     marginTop: 80,
//     marginBottom: 20,
//     textAlign: "center",
//     fontFamily: "UnicaOne_400Regular",
//   },
//   backgroundImage: {
//     width: 180,
//     height: 250,
//     margin: 5,
//     borderRadius: 8,
//   },
//   backButton: {
//     position: "absolute",
//     top: 95,
//     left: 30,
//     zIndex: 1, // Ensures the back button is above other elements
//   },
// });

// export default BackgroundChangeScreen;
