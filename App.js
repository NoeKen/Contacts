import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Contacts, {getCount} from 'react-native-contacts';

const App = () => {
  const [data, setData] = useState([]);

  // useEffect(()=>{
  //   getContactCount();
  // },[])
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  });

  Contacts.checkPermission().then(permission => {
    // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    if (permission === 'undefined') {
      Contacts.requestPermission().then(permission => {
        console.log('permission: ', permission);
        // ...
      });
    }
    if (permission === 'authorized') {
      // yay!
      getContacts();
      console.log('permission authorized: ', permission);
    }
    if (permission === 'denied') {
      // x.x
      console.log('permission denied: ', permission);
      alert("vous n'avez pas acces a l'application");
    }
  });

  const getContacts = async () => {
    let contactsArr = [];
    const result = await Contacts.getAll();
    console.log('Contact used data: ', result);
    result.forEach(item => {
      contactsArr = [
        ...contactsArr,
        {
          contactId: item.rawContactId,
          displayName: item.displayName,
          image: item.thumbnailPath,
          familyName: item.familyName,
          phoneNumber: item.phoneNumbers[0]?.number,
        },
      ];
    });
    setData(contactsArr);
  };
  console.log('data.phone: ', data.phoneNumbers);
  const renderItem = item => {
    // console.log("items: ",item.item);
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', width: '100%', margin: 10}}>
        {item.item.image == '' ? (
          <View
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'green',
              height: 50,
              marginEnd: 10,
              width: 50,
              backgroundColor:'aquamarine',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>
              {item.item.displayName.charAt(0).toUpperCase() +
                '' +
                item.item.familyName.charAt(0).toUpperCase()}
            </Text>
          </View>
        ) : (
          <Image
            source={{uri: item.item.image}}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'green',
              height: 50,
              marginEnd: 10,
            }}
            width={50}
          />
        )}
        <View style={{justifyContent:'space-between'}}>
          <Text style={{fontSize: 20,fontWeight:'400'}} >{item.item.displayName}</Text>
          <Text>{item.item.phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{justifyContent: 'space-between', margin: 16}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          marginVertical: 15,
          borderBottomWidth: 2,
          paddingBottom: 10,
        }}>
        FreeMMS Contacts
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.contactId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
