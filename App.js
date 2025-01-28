// Versão: 26/07/24
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Modal, Image, Alert } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

//import { CorW , ola } from './cores';  (comentado em 26 07 24)
//import ImageColors from 'react-native-image-colors';
//import * as ImageColors from 'react-native-image-colors';
//var colorThief = new ColorThief();
//const img = resolve(process.cwd(), 'rainbow.png');

const Stack = createNativeStackNavigator();


/*Pacotes instalados
npx expo install expo-image-picker
npm install -g eas-cli --force
npx expo install expo-dev-client --force
*/

//Componentes Personalizados NitVision
const TextoEx = styled.Text`
  color: #rgb(5, 73, 5);
  font-size: 15px;
  font-weight: bold;
`;

const AreaPrincipal = styled.SafeAreaView`
  backgroundColor: '#rgb(49, 175, 49)',
  flex: 1
`;


//Componente Home ---------------------------------------------------------
function HomeScreen({ navigation }){
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.highText}>NitVision</Text>
      <Text style={styles.text}>Diagnóstico de testes de Nitrito com precisão.</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Button
        title="Ler Proveta" onPress={() => navigation.navigate('NitCam')} color= "rgb(68, 0, 255)" />
      <Text>{'\n'}</Text>
      <Button
        title="Escala" onPress={() => navigation.navigate('Escala')} color= "rgb(68, 0, 255)" />
      <Text>{'\n'}</Text>
      <Button
        title="Sobre" onPress={() => navigation.navigate('Sobre')} color= "rgb(68, 0, 255)" />
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <TextoEx>Jeferson Sousa - PPGESP</TextoEx>
      <TextoEx>@2022 All rights reserved.</TextoEx>
    </SafeAreaView>
  )
}

// Componente Câmera -----------------------------------------------------
function NitCam(){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    
    const camRef = useRef(null);// Referência da câmera
    const [capturedPhoto, setCapturedPhoto] = useState(null);// State da foto capturada

    const [open, setOpen] = useState(false);
    useEffect(()=> {// Hook de salvar a foto
      (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log(status);
        //setHaspermission(status === 'granted');
      })();
    },[]);
  
    if (!permission) {
      // Carregando permissões
      return <View />;
    }
  
    if (!permission.granted) {
      // Permissões não concedidas
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>Deseja permitir que o NitVision use a câmera?</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() { // Trocar câmera
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={camRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCam} onPress={toggleCameraType}>
              <FontAwesome name="repeat" size={35} color='#FFF'></FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCam} onPress={tirarFoto}>
              <FontAwesome name="camera" size={35} color='#FFF'></FontAwesome>
            </TouchableOpacity>
            { capturedPhoto &&
              <Modal      //MODAL DA FOTO ------------------
              animationType="slide"
              transparent={false}
              visible={open}
              >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 50}}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={ () => setOpen(false)}>
                    <FontAwesome name='window-close' size={50} color="#000"></FontAwesome>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonCam} onPress={salvarFoto}>
                    <FontAwesome name="upload" size={35} color='#FFF'></FontAwesome>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={diagnosticar}>
                    <Text style={styles.textButton}>Diagnosticar</Text>
                  </TouchableOpacity>

                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                <Image
                    style={{width: '100%', height: 400, borderRadius: 20}}
                    source={{ uri: capturedPhoto }}
                    />
                </View>
              </Modal>
            }

          </View>
        </Camera>
      </View>
    );    


 //alterado em 26/07/24
    async function diagnosticar() {
      const foto = { uri: capturedPhoto };
      //console.log('Endereço'+foto);
      //console.log(foto);
      console.log(capturedPhoto); // retorna a foto para o console (26/07/2024)
      alert('O nível de Nitrito é 10ppm!')
    }
    
    
    /*----------------- USANDO ImageColors -- função Diagnosticar
    async function diagnosticar() {
      const foto = { uri: capturedPhoto };
      try {
        // Get the average color from the image
        const colors = await ImageColors.getColors(foto.uri, {
          type: 'average', // get the average color
          fallback: '#000000', // Default color in case extraction fails
        });
    
        // Log the average color (RGB values)
        console.log('Average color:', colors);
    
        // Set the average color
        setAverageColor(colors);
      } catch (error) {
        console.error('Error getting average color:', error);
      }
    }



    */
      //----------------- USANDO ImageColors -- função Diagnosticar
      /*const resultado = await ImageColors.getColors(foto, {
        fallback: '#228B22',
        cache: true,
        key: 'unique_key',
      });*/
      //const corResultado = resultado.vibrant;
      //console.log(corResultado);




    /* Função Diagnosticar -------------------- old
    async function diagnosticar(){
      //const foto = require();
      const foto = {uri: capturedPhoto};

      let nivel = 10;
      console.log(foto);
      Alert.alert("Nitvision - Resultado do Teste", 'O nível de Nitrito na água é: '+nivel+' ppm.');
      //alert('O nível de Nitrito na água é: '+nivel+' ppm.');
    }
    */

    
    // Função tirarFoto
    async function tirarFoto(){
      if(camRef){
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri);
        setOpen(true);
        console.log(data);       
      }
    }
    async function salvarFoto(){
      const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(()=> {
        Alert.alert('Nitvision', 'Salvo com sucesso na galeria!');
      })
      .catch(error => {
        console.log('err', error);
      })
    }

  }

// Componente Escala
  function Escala(){
    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.aboutText}>Escala de Leitura</Text>
        <Text style={styles.descriptionText}>
        O teste de Nitrito é feito comparando a cor da solução da proveta com as cores da tabela,
         apoiando a proveta ao lado da cor que mais se pareça e observando-a de cima.</Text>
        <Text>{'\n'}</Text>
        <Image
                  style={{width: '100%', height: 400, borderRadius: 20}}
                  source={ require('./assets/scala.jpg')}
                  /*source={{ uri: 'https://www.netunoaquastore.com.br/imagem/index/28649389/G/scala_no2.jpg' }}*/
        />
        <Text>{'\n'}</Text>
        <TextoEx>Jeferson Sousa - PPGESP</TextoEx>
        <TextoEx>@2022 All rights reserved.</TextoEx>
      </SafeAreaView>
    )
  }

// Componente Sobre ------------------------------------------------------
  function Sobre(){
    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.aboutText}>NitVision</Text>
        <Text style={styles.descriptionText}>Aplicativo para diagnóstico de testes de Nitrito com precisão.</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Sobre</Text>
        <Text style={styles.descriptionText}>O NitVision é um apicativo desenvolvido para efetuar a leitura e diagnóstico de testes de Nitrito com precisão. O desenvolvimento deste aplicativo ocorre dentro do Mestrado Profissional em Engenharia de Sistemas e Produtos - PPGESP.</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Como Utilizar</Text>
        <Text style={styles.descriptionText}>Basta clicar no botão "Ler Proveta" e tirar uma foto da proveta de testes com um fundo branco atrás e boa iluminação.</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Desenvolvedor</Text>
        <Text style={styles.descriptionText}>Jeferson Sousa da Silva</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Orientador</Text>
        <Text style={styles.descriptionText}>Prof. DSc. Manoel Carvalho Marques Neto </Text>
        <Text>{'\n'}</Text>
        <TextoEx>Jeferson Sousa - PPGESP</TextoEx>
        <TextoEx>@2022 All rights reserved.</TextoEx>
      </SafeAreaView>
    )
  }
  
//Componente Principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NitCam" component={NitCam}/>
        <Stack.Screen name="Escala" component={Escala}/>
        <Stack.Screen name='Sobre'  component={Sobre}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

//Estilização NitVision
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  // Primeira Tela
  page: {
    backgroundColor: '#rgb(49, 175, 49)',
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  highText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 50,
  },
  aboutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 28,
  },
  text: {
    color: '#rgb(239, 239, 239);',
    fontSize: 15,
  },
  textButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  descriptionText: {
    color: '#rgb(245, 245, 245);',
    fontSize: 17,
  },
  buttonCam: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
  },


});







/* RODAR PELO YARN COM TUNNEL yarn start --tunnel
export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

});
*/
