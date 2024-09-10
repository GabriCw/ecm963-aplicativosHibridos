import { StyleSheet, TextInput, View, Text, Pressable, FlatList} from 'react-native';
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

interface Lembrete{ 
  id?: string;
  texto: string;
}

export default function HomeScreen() {
  const [lembrete, setLembrete] = useState<Lembrete>({texto: ''})
  const [lembretes, setLembretes] = useState<Lembrete[]>([])
  const [emModoDeEdicao, setEmModoDeEdicao] = useState(false)

  const adicionar = () => {
    //construir um objeto Lembrete com id igual à data atual e o texto igual o que o usuário digitou
    const novoLembrete : Lembrete = {
      id: Date.now().toString(),
      texto: lembrete.texto
    }
    //atualizar a lista, incluindo esse novo lembrete
    setLembretes((estadoAnterior) =>{
      //limpar o campo de lembrete
      setLembrete({texto: ''});
      return [novoLembrete, ...estadoAnterior]
    })
  }

  const remover = (lembrete: Lembrete) => {
    //antes de prosseguir, ela exibe um Alert (observe, que o Alert regular do React Native, não vai funcionar na web. Tente encontrar algum que funciona no npmjs.com)
    //buscar o lembrete a ser removido na lista, usando o seu id
    //remover ele da lista
    //atualizar a variável de estado lembretes, causando nova atualização gráfica na tela
    setLembretes(lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id));      
  }

  const atualizar = () => {
    //para cada lembrete, verifica se o id é igual ao id do lembrete
    //em edição
    //se for, retorna o lembrete em edição, senão, retorna o lembrete
    //original
    const lembretesAtualizados = lembretes.map(item => {
      if(item.id === lembrete.id){
      return lembrete
      }
      return item
    })
    //atualiza a lista de lembretes
    setLembretes(lembretesAtualizados)
    //aplicação em modo de adição
    setEmModoDeEdicao(false)
    //limpa o campo em que o usuário digita o lembrete
    setLembrete({texto: ''})
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Digite um lembrete'
        value={lembrete.texto}
        onChangeText={(novoTexto) => setLembrete({id: lembrete.id, texto: novoTexto})}
      />
      <Pressable style={styles.pressable} onPress={emModoDeEdicao ? atualizar : adicionar}>
        <Text style={styles.pressableText}>
          {emModoDeEdicao ? 'Atualizar lembrete' : 'Salvar lembrete'}
        </Text>
      </Pressable>
      <FlatList 
        keyExtractor={(l) => l.id!}
        style={styles.list}
        data={lembretes}
        renderItem={
          l => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                {l.item.texto}
              </Text>
              <View style={styles.listItemButtons}>
                <Pressable onPress={() => remover(l.item)}>
                  <AntDesign name="delete" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => {setLembrete({id: l.item.id, texto: l.item.texto}), setEmModoDeEdicao(true)}}>
                  <AntDesign name="edit" size={24} color="black"/>
                </Pressable>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center', // Opera na horizontal
    justifyContent: 'center',//Opera na vertical
    paddingVertical: 20,
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
  },
  list:{
    width: '80%',
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 12,
    borderRadius: 4,
    padding: 8,
  },
  listItem:{
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemText:{
    textAlign: 'center',
    width: '70%',
  },
  listItemButtons:{
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});