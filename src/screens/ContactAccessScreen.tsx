// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Contacts from 'react-native-contacts';

// // Contact object eke type eka define karagannawa
// type Contact = {
//   recordID: string;
//   givenName: string;
//   familyName: string;
//   phoneNumbers: { label: string; number: string }[];
// };

// // Me component eka thamai contact list eka penwanne
// const ContactAccessScreen = () => {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [permissionGranted, setPermissionGranted] = useState(false);

//   useEffect(() => {
//     // Screen eka load weddi permission illanawa
//     requestContactsPermission();
//   }, []);

//   // Contact access karanna awasara illana function eka
//   const requestContactsPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//           {
//             title: 'Contacts Permission',
//             message: 'This app needs access to your contacts to list them.',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setPermissionGranted(true);
//           loadContacts();
//         } else {
//           setPermissionGranted(false);
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else if (Platform.OS === 'ios') {
//        // iOS permission logic sariಪಡisala ide
//        Contacts.checkPermission().then(currentPermission => {
//         if (currentPermission === 'undefined') {
//             Contacts.requestPermission().then(newPermission => {
//                 if (newPermission === 'authorized') {
//                     setPermissionGranted(true);
//                     loadContacts();
//                 } else {
//                     setPermissionGranted(false);
//                 }
//             });
//         } else if (currentPermission === 'authorized') {
//             setPermissionGranted(true);
//             loadContacts();
//         } else { // 'denied'
//             setPermissionGranted(false);
//         }
//       });
//     }
//   };

//   // Contacts load karaganna function eka
//   const loadContacts = () => {
//     setLoading(true);
//     Contacts.getAll()
//       .then(contactsResult => {
//         const sortedContacts = [...contactsResult].sort((a, b) =>
//           (a.givenName + a.familyName).localeCompare(b.givenName + b.familyName)
//         );
//         setContacts(sortedContacts as Contact[]);
//         setLoading(false);
//       })
//       .catch(e => {
//         console.log(e);
//         setLoading(false);
//       });
//   };

//   // Ek contact ekak render karana component eka
//   const renderItem = ({ item }: { item: Contact }) => (
//     <View style={styles.contactItem}>
//       <View style={styles.avatar}>
//         <Text style={styles.avatarText}>
//           {(item.givenName?.[0] || '') + (item.familyName?.[0] || '')}
//         </Text>
//       </View>
//       <View style={styles.contactInfo}>
//         <Text style={styles.contactName}>
//           {`${item.givenName} ${item.familyName}`}
//         </Text>
//         {item.phoneNumbers.map((phone, index) => (
//           <Text key={index} style={styles.phoneNumber}>
//             {phone.number}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );

//   // Mulinma permission nethnam, eka illana UI eka penwanawa
//   if (!permissionGranted) {
//     return (
//         <SafeAreaView style={styles.permissionContainer}>
//             <Text style={styles.permissionText}>App needs permission to show contacts.</Text>
//             <TouchableOpacity style={styles.button} onPress={requestContactsPermission}>
//                 <Text style={styles.buttonText}>Grant Permission</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
//   }

//   // Loading state eka penwanawa
//   if (loading) {
//       return (
//           <SafeAreaView style={styles.container}>
//               <ActivityIndicator size="large" color="#007AFF" />
//           </SafeAreaView>
//       );
//   }

//   // Awasara thiyenawanam contact list eka penwanawa
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={contacts}
//         renderItem={renderItem}
//         keyExtractor={item => item.recordID}
//         ListEmptyComponent={() => (
//           <Text style={styles.emptyText}>No contacts found.</Text>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center'
//   },
//   permissionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   permissionText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF'
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   avatarText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   contactInfo: {
//     flex: 1,
//   },
//   contactName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//     color: '#888',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

// export default ContactAccessScreen;

