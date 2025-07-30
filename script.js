document.addEventListener('DOMContentLoaded', () => {
    //seleciona elementos do DOM
    const valorInput = document.getElementById('valor');
    const informarDadosBtn = document.getElementById('informarDados');
    const pagarPixBtn = document.getElementById('pagarPix');
    const pagarCreditBtn = document.getElementById('pagarCredit');
    const pixPanel = document.getElementById('pixPanel');
    const creditPanel = document.getElementById('creditPanel');
    const parcelasSelect = document.getElementById('parcelas');
    const iconvisa = document.getElementById('iconvisa');
    const iconmaster = document.getElementById('iconmaster');
    const iconaura = document.getElementById('iconaura');
    const icondiners = document.getElementById('icondiners');
    const icondiscover = document.getElementById('icondiscover');
    const iconenroute = document.getElementById('iconenroute');
    const iconhipercard = document.getElementById('iconhipercard');
    const iconjcb = document.getElementById('iconjcb');
    const iconVoyager = document.getElementById('iconVoyager');
    const iconamericanexpress = document.getElementById('iconamericanexpress');

    let painelAtual = null;

    //configuração inicial: adicionar eventos aos botões radio (pix/cc)
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (painelAtual) {
                esconderTodosPaineis();
            }
        });
    });
    informarDadosBtn.addEventListener('click', () => {
        const valor = parseFloat(valorInput.value); //converte valor p/ numero
        if (!valor || valor <= 0) {
            mostrarMensagem('Preencha o valor corretamente!');
            return;
        }
        const isPix = document.getElementById('pix').checked;
        mostrarPainelPagamento(isPix ? 'pix' : 'credito', valor);
    });


    pagarPixBtn.addEventListener('click', () => {
        const cpf = document.getElementById("cpf").value;
        if (cpf.length !== 11) {
            mostrarMensagem("Informe CPF válido, por favor!");
            return;
        }
        const valor = parseFloat(valorInput.value);
        if (!valor || valor <= 0) {
            mostrarMensagem("Preencha o valor corretamente!");
            return;
        }

        mostrarMensagem("Pagamento com Pix realizado com sucesso!");
    });

    pagarCreditBtn.addEventListener('click', () => {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardName = document.getElementById('cardName').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || cardNumber.length < 16) {
            mostrarMensagem("Número do cartão inválido!");
            return;
        }
        if (!cardName) {
            mostrarMensagem("Informe o nome do titular!");
            return;
        }
        if (!expiry) {
            mostrarMensagem("Informe a data de vencimento!");
            return;
        }
        if (!cvv || cvv.length < 3) {
            mostrarMensagem("Informe o código de segurança (CVV) válido!");
            return;
        }

        mostrarMensagem("Pagamento com Cartão realizado com sucesso!");
    });


    function mostrarPainelPagamento(tipo, valor) {
        esconderTodosPaineis();
        if (tipo === 'pix') {
            pixPanel.style.display = 'block';
            document.getElementById('totalPix').textContent = formatarMoeda(valor * 0.9);
            painelAtual = 'pix';
        } else {
            creditPanel.style.display = 'block'; //mostra painel do credito
            atualizarParcelas(valor);
            painelAtual = 'credito';
        }
    }
    //função p/ atualizar opções parcelamento
    function atualizarParcelas(valor) {
        //limpa opções existentes
        parcelasSelect.innerHTML = '';

        for (let i = 1; i <= 5; i++) { //cria novas opções parcelamento
            let valorTotal = valor;
            //aplicação juros
            if (i === 4) valorTotal = valor * 1.05; // 5%juros
            if (i === 5) valorTotal = valor * 1.10; // 10%juros
            const valorParcela = valorTotal / i;//calculo de cada parcela 
            const option = document.createElement('option'); // cria nova opção
            option.value = i; //define valor da opção
            option.textContent = `${i}x de ${formatarMoeda(valorParcela)}`; // define texto da opção
            parcelasSelect.appendChild(option); //adiciona opção ao seletor
        }
        //atualiza valor total exibido
        const valorTotal = calcularValorTotal(valor, parseInt(parcelasSelect.value));
        document.getElementById('totalCredit').textContent = formatarMoeda(valorTotal);
        parcelasSelect.addEventListener('change', (event) => {
            const parcelas = parseInt(event.target.value);
            const valorTotal = calcularValorTotal(valor, parcelas);
            document.getElementById('totalCredit').textContent = formatarMoeda(valorTotal);
        });
    }
    function calcularValorTotal(valor, parcelas) {
        let valorTotal = valor;
        //aplicação juros conforme a parcela
        if (parcelas === 4) valorTotal = valor * 1.05; // 5%juros
        if (parcelas === 5) valorTotal = valor * 1.10;

        return valorTotal;
    }
    // Seleciona todos os ícones de bandeira (ajustado para IDs corretos do HTML)
    const icons = {
        Visa: iconvisa,
        MasterCard: iconmaster,
        'Diners Club': document.getElementById('icondiners'),
        'American Express': document.getElementById('iconamericanexpress'),
        'Discover': document.getElementById('icondiscover'),
        Hipercard: iconhipercard,
        'Voyager': document.getElementById('iconVoyager'),
        JCB: iconjcb,
        Aura: iconaura,
        Enroute: iconenroute
    };

    // Função para identificar a bandeira (igual ao index.js)
    function identificarBandeira(numeroCartao) {
        const numero = numeroCartao.replace(/\D/g, '');
        if (/^4\d{15}$/.test(numero)) return 'Visa';
        if (/^(5[1-5]|2221|222[2-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(numero)) return 'MasterCard';
        if (/^(36|38|30[0-5])/.test(numero)) return 'Diners Club';
        if (/^3[47]/.test(numero)) return 'American Express';
        if (/^(6011|65|64[4-9])/.test(numero)) return 'Discover';
        if (/^6062/.test(numero)) return 'Hipercard';
        if (/^8699/.test(numero)) return 'Voyager';
        if (/^35/.test(numero)) return 'JCB';
        if (/^50/.test(numero)) return 'Aura';
        if (/^(2014|2149)/.test(numero)) return 'Enroute';
        return 'Bandeira não identificada';
    }

    document.getElementById('cardNumber').addEventListener('input', function (e) {
        const num = e.target.value.replace(/\D/g, '');
        const errorMsg = document.getElementById('cardError');
        // Esconde todos os ícones
        Object.values(icons).forEach(icon => { if (icon) icon.style.display = 'none'; });
        errorMsg.textContent = '';
        const bandeira = identificarBandeira(num);
        if (icons[bandeira]) {
            icons[bandeira].style.display = 'inline';
        }
        if (bandeira === 'Bandeira não identificada' && num.length > 0) {
            errorMsg.textContent = 'Bandeira não identificada!';
        } else if (bandeira === 'Visa' && num.length !== 16) {
            errorMsg.textContent = 'Cartão Visa deve ter 16 dígitos!';
        } else if (num.length < 13) {
            errorMsg.textContent = 'Número de Cartão Inválido!';
        } else {
            errorMsg.textContent = '';
        }
    });

    function esconderTodosPaineis() {
        pixPanel.style.display = 'none'; //esconde o painel
        creditPanel.style.display = 'none';
    }
    function formatarMoeda(valor) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }
    function mostrarMensagem(texto) {
        alert(texto);
    }

});
 document.getElementById("limparFormulario").addEventListener("click", function() {
    // Seleciona o formulário e reseta todos os campos
    document.getElementById("creditPanel").querySelectorAll("input, select").forEach(element => {
      element.value = "";
    });

    // Reseta o valor total
    document.getElementById("totalCredit").textContent = "R$ 0,00";
  });