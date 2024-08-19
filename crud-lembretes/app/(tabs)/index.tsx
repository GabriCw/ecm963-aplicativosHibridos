import { StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import { useState } from 'react'

interface Lembrete{ 
  id: string;
  texto: string;
}

export default function HomeScreen() {
  const [lembrete, setLembrete] = useState('')
  const [lembretes, setLembretes] = useState<Lembrete[]>([])

  const adicionar = () => {
    //construir um objeto Lembrete com id igual à data atual e o texto igual o que o usuário digitou

    //atualizar a lista, incluindo esse novo lembrete

    //limpar o campo de lembrete
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Digite um lembrete'
        value={lembrete}
        onChangeText={setLembrete}
      />
      <Pressable style={styles.pressable}>
        <Text style={styles.pressableText}>
          Ola
        </Text>
      </Pressable>
      {/* <Text>{lembrete}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center', // Opera na horizontal
    justifyContent: 'center'//Opera na vertical
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius:8,
  },
  pressable:{
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 8,
  },
  pressableText:{
    color: 'white',
    textAlign: 'center',
  }

});