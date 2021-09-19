import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            console.log('sucesso');
            response.json().then(function(result){ 

              //console.log(result);
              jsonState(result)

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }



const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>Titulo da Foto:</Text>
                  <Text>{mensagem}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const Foto = ({albumId,id,title, url}) => {
    
    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={title}/>
      
      <Pressable onPress={mudaModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: url,
          }}
        />

        <Text style={styles.paragraph}>Id Album:{albumId}</Text>
        <Text style={styles.paragraph}>Id Foto:{id}</Text>
      </Pressable>
   
    <View
        style={{
          marginTop:20,
          marginBottom:20,
          borderBottomColor: '#50fa7b',
          borderBottomWidth: 1,
        }}
      />
    </View>
    )
}

const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Header - Clique e descubra o titulo</Text>
      </View>
    );
  };
export default function App() {

  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://jsonplaceholder.typicode.com/photos",setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    //let nomeCompleto = item.first_name + " " + item.last_name
    
    return(
      <Foto albumId={item.albumId} 
              id={item.id}
              title={item.title}
              url = {item.url}
      />
    )
  }
  

  return (

    <View style={styles.container}>
      <FlatList
       ListHeaderComponent={ListHeader}
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#282a36',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#8be9fd',
    borderWidth: 2,
  },
  tinyLogo: {
    width: 400,
    height: 200,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#8be9fd",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    marginBottom: 20,
    backgroundColor: '#606070',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
});
