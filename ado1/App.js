import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';


const ShowDetalhes = ({display,toogleModal,mensagem,timeImg}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >
        <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text style={styles.timeView}> Time: {mensagem}</Text>
                      <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: timeImg,
                      }}
                    />
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const Jogador = ({nome,time,link,timeImg}) => {
    
    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={time} timeImg={timeImg}/>
      <Text style={styles.paragraph}>{nome}</Text>
      <Pressable onPress={mudaModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: link,
          }}
        />
      </Pressable>
      <View
        style={{
          marginTop:20,
          marginBottom:10,
          borderBottomColor: '#8be9fd',
          borderBottomWidth: 1,
        }}
      />
    </View>
    )
}


const DATA = [
        {
            "id": 1,
            "time": "Paris Saint‑Germain",
            "timeImg": "https://cdn.freelogovectors.net/wp-content/uploads/2018/08/Paris-Saint-Germain-Logo.png",
            "first_name": "Neymar",
            "last_name": "Junior",
            "avatar": "https://tntsports.com.br/__export/1570897128625/sites/esporteinterativo/img/2019/10/12/gettyimages-1172846416.jpg_423682103.jpg"
        },
        {
            "id": 2,
            "time": "Paris Saint‑Germain",
            "timeImg": "https://cdn.freelogovectors.net/wp-content/uploads/2018/08/Paris-Saint-Germain-Logo.png",
            "first_name": "Lionel",
            "last_name": "Messi",
            "avatar": "https://tntsports.com.br/__export/1625764603446/sites/esporteinterativo/img/2021/07/08/gettyimages-1325998783.jpg_1899331843.jpg"
        },
        {
            "id": 3,
            "time": "Manchester United",
            "timeImg": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
            "first_name": "Cristiano",
            "last_name": "Ronaldo",
            "avatar": "https://p2.trrsf.com/image/fget/cf/1200/1200/filters:quality(85)/images.terra.com/2020/09/08/2020-09-08t194527z2097967582rc2jui91sh3frtrmadp3soccer-uefanations-swe-por-report.JPG"
        },
        {
            "id": 4,
            "time": "Paris Saint‑Germain",
            "timeImg": "https://cdn.freelogovectors.net/wp-content/uploads/2018/08/Paris-Saint-Germain-Logo.png",
            "first_name": "Kylian",
            "last_name": "Mbappé",
            "avatar": "https://tntsports.com.br/__export/1630953509001/sites/esporteinterativo/img/2021/09/06/gettyimages-1325967699.jpg_2047212627.jpg"
        },
        {
            "id": 5,
            "time": "Chelsea F.C.",
            "timeImg": "https://1.bp.blogspot.com/-0oa9EtRDhwg/YDYNKk-Iv1I/AAAAAAAC5TA/8wr-e7py2E8wrJOoukbcNi8473L0CZRTgCNcBGAsYHQ/s1000/chelsea-fc-logo-2021-cocneot%2B%25285%2529.png",
            "first_name": "N'Golo",
            "last_name": "Kanté",
            "avatar": "https://i2.wp.com/www.chelseafcbrasil.com/wp-content/uploads/2018/07/tweeten-1531737025483.jpg?fit=2048%2C1955&ssl=1"
        },
        {
            "id": 6,
            "time": "Barcelona",
            "timeImg": "https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/2020px-FCBarcelona.svg.png",
            "first_name": "Sergio",
            "last_name": "Agüero",
            "avatar": "https://bolavip.com/__export/1618353336045/sites/bolavip/img/2021/04/13/gettyimages-1157831439_crop1618353335520.jpg_423682103.jpg"
        },
        {
            "id": 7,
            "time": "Borussia Dortmund",
            "timeImg": "https://logodownload.org/wp-content/uploads/2017/02/bvb-borussia-dortmund-logo-1.png",
            "first_name": "Erling",
            "last_name": "Haaland",
            "avatar": "https://pbs.twimg.com/media/E-dbSJuWUAQJPLU.jpg"
        },
    ];



//item com uma arrow function
/*const meuItemObj = ({item}) => (
  <View>
      <Text style={styles.paragraph}>{item.title}</Text>
    </View>
)*/



export default function App() {

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    let nomeCompleto = item.first_name + " " + item.last_name
    
    return(
      
      <Jogador nome={nomeCompleto} 
              link={item.avatar}
              time={item.time}
              timeImg={item.timeImg}
      />
    )
  }
  

  return (
    
    <View style={styles.container}>
      <Text style={styles.tituloView}>JOGADORES - ADO1</Text>
      <FlatList
        data={DATA}
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
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#f8f8f2"
  },
  tinyLogo: {
    marginBottom:10,
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#bd93f9",
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
  timeView: {
    color:"white",
    marginBottom: 20
  },
  tituloView: {
    padding:12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"white",
    backgroundColor: '#f48f57'
  }
});
