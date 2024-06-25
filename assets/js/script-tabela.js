let cont = 0;
let tabelas = [];
let colunas = [];

function criarTabela() {
    const divTabela = document.querySelector("#tabelas");
    let nomeTabela;
    
    if (cont === 0) {
        nomeTabela = document.querySelector("#nomeTabela").value.trim().replace(/\s+/g, "_");
        cont++;
    } else {
        nomeTabela = document.querySelector("#select").value.trim().replace(/\s+/g, "_");
    }

    const cabecalho = document.querySelector("#cabecalhoTabela").value.trim();

    if (nomeTabela === "") {
        window.alert("Por favor, preencha todos o nome da tabela.");
        return;
    }

    if (hasTable(divTabela, nomeTabela)) {
        const tabela = divTabela.querySelector("#" + nomeTabela);
        if (!headerExists(tabela, cabecalho)) {
            addHeaderCell(tabela, cabecalho);
            return;
        } 
    } else {
        if (!cabecalho.includes('id')) {
            const newCabecalho = 'id-' + nomeTabela.replace(/s\b/g, "") + ' ';
            createNewTable(divTabela, nomeTabela, newCabecalho);

            const tabela = divTabela.querySelector("#" + nomeTabela);
            if (!headerExists(tabela, cabecalho)) {
                addHeaderCell(tabela, cabecalho);
                
            } 

        } else {
            createNewTable(divTabela, nomeTabela, cabecalho);
        }

        // Adicionar o nome da nova tabela ao select
        const tabelaSelect = document.getElementById('select');
        const option = document.createElement("option");
        option.value = nomeTabela;
        option.text = nomeTabela;
        option.selected = true;
        tabelaSelect.appendChild(option);
    }

    const nome = document.querySelector("#nomeTabela");
    if (nome) nome.remove();

    const divNomeTabela = document.querySelector("#divNomeTabela");
    divNomeTabela.style.width = "0%";
    divNomeTabela.style.border = "none";
}


function hasTable(div, tableId) {
    return div.querySelector(`#${tableId}`) !== null;
}

function headerExists(tabela, cabecalho) {
    const headerCells = tabela.querySelectorAll("thead th");
    for (const th of headerCells) {
        if (th.textContent === cabecalho) {
            window.alert("Nome do cabeçalho já existe");
            return true;
        }
    }
    return false;
}

function addHeaderCell(tabela, cabecalho) {
    const thead = tabela.querySelector("thead tr");
    const th = document.createElement("th");
    if (cabecalho.includes(' ')) {
        cabecalho = cabecalho.replace(/\s+/g, "-");
    }

    th.textContent = cabecalho;
    thead.appendChild(th);
}

function createNewTable(divTabela, nomeTabela, cabecalho) {
    const headerDiv = document.createElement("header");
    headerDiv.id = `${nomeTabela}-header`;
    divTabela.appendChild(headerDiv);

    const label = document.createElement("label");
    label.textContent = `Tabela: ${nomeTabela}`;
    headerDiv.appendChild(label);

    const buttonDel = document.createElement("input");
    buttonDel.type = "button";
    buttonDel.value = "Deletar Planilha";
    buttonDel.onclick = deletarTabela;
    buttonDel.id = `${nomeTabela}-button`;
    buttonDel.className = "delete";
    headerDiv.appendChild(buttonDel);

    const tabela = document.createElement("table");
    tabela.id = nomeTabela;
    tabela.name = "table";
    tabela.className = "table table-bordered table-hover";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = cabecalho;
    headerRow.appendChild(th);

    const divTh = document.createElement("div");
    divTh.id = `div-th`; ;
    divTh.className = `div-th-${nomeTabela}`;
    th.appendChild(divTh);

    thead.appendChild(headerRow);

    const cmdSelect = document.createElement("select");
  
    const options = [
        { text: "SERIAL UNIQUE NOT NULL", selected: true },
        { text: "SERIAL UNIQUE", selected: false },
        { text: "SERIAL NOT NULL", selected: false },
        { text: "SERIAL", selected: false }
    ];
    
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.textContent = options[i].text;
        cmdSelect.appendChild(option);
    }
    
    divTh.appendChild(cmdSelect);

    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    divTabela.appendChild(tabela);
}

function deletarTabela() {
    const divTabela = document.querySelector("#tabelas");
    const nome = this.previousSibling.textContent.split(": ")[1];
    const headerDiv = divTabela.querySelector(`#${nome}-header`);
    const tabela = divTabela.querySelector(`#${nome}`);
    if (headerDiv && tabela) {
        headerDiv.remove();
        tabela.remove();

        // Remover o nome da tabela do select
        const tabelaSelect = document.getElementById('select');
        for (const option of tabelaSelect.options) {
            if (option.value === nome) {
                option.remove();
                break;
            }
        }
    } else {
        window.alert("Tabela não existe");
    }
}

function novaPlanilha() {
    cont = 0;
    const criarBtn = document.querySelector("#criar");
    const exemploBtn = document.querySelector("#exemplo");
    if (criarBtn) criarBtn.remove();
    if (exemploBtn) exemploBtn.remove();

    const div = document.querySelector("#id-tabela");

    const divNomeTabela = document.createElement("div");
    divNomeTabela.id = "divNomeTabela";
    const inputNomeTabela = document.createElement("input");
    inputNomeTabela.id = "nomeTabela";
    inputNomeTabela.placeholder = "Nome da Tabela";

    const divCabecalhoTabela = document.createElement("div");
    divCabecalhoTabela.id = "divCabecalhoTabela";
    const inputcabecalhoTabela = document.createElement("input");
    inputcabecalhoTabela.id = "cabecalhoTabela";
    inputcabecalhoTabela.placeholder = "Nome do Cabeçalho";

    const criarButton = document.createElement("input");
    criarButton.value = "Adicionar Cabeçalho";
    criarButton.type = "button";
    criarButton.id = "criar";
    criarButton.onclick = criarTabela;

    div.appendChild(divNomeTabela);
    divNomeTabela.appendChild(inputNomeTabela);

    // div.appendChild(inputNomeTabela);
    //div.appendChild(inputcabecalhoTabela);

    div.appendChild(divCabecalhoTabela);
    divCabecalhoTabela.appendChild(inputcabecalhoTabela);

    div.appendChild(criarButton);

    const adicionarTabela = document.createElement("input");
    adicionarTabela.value = "Adicionar Tabela";
    adicionarTabela.type = "button";
    adicionarTabela.id = "adicionar";
    adicionarTabela.onclick = nomeTabela;
    div.appendChild(adicionarTabela);

    const confirmarButton = document.createElement("input");
    confirmarButton.value = "Confirmar";
    confirmarButton.type = "button";
    confirmarButton.id = "confirmar";
    confirmarButton.onclick = confirmarPlanilha;
    div.appendChild(confirmarButton);

    const divSql = document.createElement("div");
    divSql.id = "divsql";

    const sql = document.createElement("input");
    sql.value = "Criar Bd";
    sql.type = "button";
    sql.id = "button-sql";
   
    div.appendChild(divSql);
    divSql.appendChild(sql);

    sql.onclick = function() {
        const divTabelas = document.getElementsByClassName("table table-bordered table-hover");
        let tabelas = [];
        for (let i = 0; i < divTabelas.length; i++) {
            let nomeTabela = divTabelas[i].id;
            let colunas = [];
            let cmdColuna = [];
            let nomeColuna;

            const tabela = divTabelas[i];
            const headers = tabela.querySelectorAll("tr th");
            const cmdOptions = tabela.querySelectorAll("tr th div select option:checked");

            for (let j = 0; j < headers.length; j++) {
            
                let header = headers[j].textContent;
              
                if (!nomeColuna) {
                    nomeColuna = header.split(" ")[0];
                }

                if ( header.includes(nomeColuna) ) {
                    colunas.id = nomeTabela;
                    colunas.push(nomeColuna);
                    
                    // Adicionar os cmd
                    if (cmdColuna.id === undefined) {
                        cmdColuna.id = nomeColuna;
                        colunas.push(cmdColuna);
                        cmdColuna = [];
                    }
                }
            }
            tabelas.push(colunas);
        }
        console.log(tabelas);
    }
}

function nomeTabela() {
    const divNomeTabela = document.querySelector("#divNomeTabela");
    divNomeTabela.style.width = "15%";

    const inputNomeTabela = document.createElement("input");
    inputNomeTabela.id = "nomeTabela";
    inputNomeTabela.placeholder = "Nome da Tabela";

    divNomeTabela.appendChild(inputNomeTabela);

    cont = 0;
}

function confirmarPlanilha() {
    const div = document.querySelector("#id-tabela");
    const divNomeTabela = div.querySelector("#divNomeTabela");
    const divCabecalhoTabela = div.querySelector("#divCabecalhoTabela");
    const divSql = div.querySelector("#divsql");

    divSql.remove();
    div.querySelector("#criar").remove();
    div.querySelector("#adicionar").remove();
    div.querySelector("#confirmar").remove();
    div.querySelector("#cabecalhoTabela").remove();

    const criarButton = document.createElement("input");
    criarButton.type = "button";
    criarButton.value = "Criar";
    criarButton.id = "criar";
    criarButton.onclick = novaPlanilha;

    const exemploButton = document.createElement("input");
    exemploButton.type = "button";
    exemploButton.value = "Exemplo";
    exemploButton.onclick = tabelaExemplo;
    exemploButton.id = "exemplo";
    div.appendChild(criarButton);
    div.appendChild(exemploButton);
    divNomeTabela.remove();
    divCabecalhoTabela.remove();

}

function tabelaExemplo() {
    const div = document.querySelector("#tabelas");
    const nomeTabela = "tabelaExemplo";
    const headers = [
        "id-exemplo",
        "nome",
        "idade",
        "sexo",
        "cidade",
        "estado",
        "pais",
    ];

    if (hasTable(div, nomeTabela)) {
        const tabela = div.querySelector("#" + nomeTabela);
        headers.forEach(header => {
            if (!headerExists(tabela, header)) {
                addHeaderCell(tabela, header);
            }
        });
    } else {
        createNewTable(div, nomeTabela, headers[0]); 
        headers.slice(1).forEach(header => { 
            addHeaderCell(div.querySelector(`#${nomeTabela}`), header);
        });

        
        const tabelaSelect = document.getElementById('select');
        const option = document.createElement("option");
        option.value = nomeTabela;
        option.text = nomeTabela;
        tabelaSelect.appendChild(option);
    }
}

function atualizarLinha() {
    window.alert("Sem planilha no banco de dados");
}

function deletarLinha() {
    window.alert("Sem planilha no banco de dados");
}

