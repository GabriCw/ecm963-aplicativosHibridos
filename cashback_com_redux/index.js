//função criadora de ação: ela cria novos contratos
const criarContrato = (nome, taxa) => {
    //ela devolve uma ação, ou seja, um objeto JS
    return {
        type: 'CRIAR_CONTRATO',
        payload: {
            // nome: nome,
            // taxa: taxa
            nome, taxa
        }
    }
}

//escrever a criadora de ação para cancelamento de contrato
const cancelarContrato = (nome) => {
    return {
        type: 'CANCELAR_CONTRATO',
        payload: {
            nome
        }
    }
}

//escrever a criadora de ação para pedido de cashback
const solicitarCashback = (nome, valor) => {
    return {
        type: 'CASHBACK',
        payload: {
            nome, valor
        }
    }
}

//reducer para lidar com as solicitações de cashback
const historicoDePedidosDeCashback = (historicoDePedidosDeCashbackAtual = [], acao) => {
    if (acao.type === 'CASHBACK') {
        return [
            ...historicoDePedidosDeCashbackAtual, 
            acao.payload
        ]
    }
    return historicoDePedidosDeCashbackAtual
}