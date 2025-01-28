import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();


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
      <Text style={styles.text}>Leitura de testes de Nitrito com precisão</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Button
        title="Ler Proveta" onPress={() => navigation.navigate('NitCam')} color= "rgb(68, 0, 255)" />
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
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.textButton}>Alternar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={tirarFoto}>
              <Text style={styles.textButton}>Tirar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCam} onPress={toggleCameraType}>
              <FontAwesome name="repeat" size={25} color='#FFF00F'></FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCam} onPress={tirarFoto}>
              <FontAwesome name="camera" size={25} color='#FFF00F'></FontAwesome>
            </TouchableOpacity>

          </View>
        </Camera>
      </View>
    );    
    
    // Função tirarFoto
    async function tirarFoto(){
      if(camRef){
        const data = await camRef.current.takePictureAsync();
        console.log(data);       
      }
    }

  }



// Componente Sobre ------------------------------------------------------
  function Sobre(){
    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.aboutText}>Sobre</Text>
        <Text style={styles.descriptionText}>O NitVision é um apicativo desenvolvido para efetuar a leitura de testes de Nitrito com precisão. O desenvolvimento deste aplicativo ocorre dentro do Mestrado Profissional em Engenharia de Sistemas e Produtos - PPGESP.</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Como Utilizar</Text>
        <Text style={styles.descriptionText}>Basta clicar no botão "Ler Proveta" e tirar uma foto da proveta de testes com um fundo branco atrás e boa iluminação.</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Desenvolvedor</Text>
        <Text style={styles.descriptionText}>Jeferson Sousa da Silva</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.aboutText}>Orientador</Text>
        <Text style={styles.descriptionText}>Prof. Dsc. Manoel Carvalho Marques Neto </Text>
        <Text>{'\n'}</Text>
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
    color: '#rgb(209, 209, 209);',
    fontSize: 15,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  descriptionText: {
    color: '#rgb(245, 245, 245);',
    fontSize: 19,
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
