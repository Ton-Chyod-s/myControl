let cont = 0;
let tabelas = [];
let colunas = [];
let tabelaJson = {};

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
    nomeTabela = nomeTabela.toLowerCase();

    if (nomeTabela === "") {
        window.alert("Por favor, preencha todos os campos disponiveis.");
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
        const thText = th.textContent.split(" ")[0];

        if (cabecalho.includes(' ')) {
            cabecalho = cabecalho.replace(/\s+/g, "-");
        }

        if (thText === cabecalho) {
            window.alert("Nome do cabeçalho já existe");
            return true;
        }
    }
    return false;
}

function addHeaderCell(tabela, cabecalho) {
    const nomeTabela = tabela.id;
    const thead = tabela.querySelector("thead tr");
    const th = document.createElement("th");

    cabecalho = cabecalho.toLowerCase();
    cabecalho = cabecalho.replace("/", "-")

    if (cabecalho.includes(' ')) {
        cabecalho = cabecalho.replace(/\s+/g, "-");
    } else if ( cabecalho === "" ) {
        return; 
    }

    th.id = nomeTabela + "-" + cabecalho;

    th.addEventListener("mouseenter", function() {
        
        const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);
        divTh.style.border = "1px solid #e9e9e9";
        divTh.style.boxsizing = "border-box";
        divTh.style.backgroundColor = "#fafafa";
        
        const divThs = document.createElement(`div`);
        divThs.id = `divThs`;
        th.appendChild(divThs);
        const img = document.createElement("img");
        img.src = "assets/images/icon/delete.png";

        divThs.appendChild(img);

        img.addEventListener("click", function() {
            const th = document.getElementById(nomeTabela + "-" + cabecalho);
            th.remove();
        })
    })

    th.addEventListener("mouseleave", function() {
        const divThs = document.getElementById(`divThs`);
        divThs.remove();

        const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);
        divTh.style.border = "none";
        divTh.style.boxsizing = "border-box";
        divTh.style.backgroundColor = "white";

    })

    if (cabecalho.includes(' ')) {
        cabecalho = cabecalho.replace(/\s+/g, "-");
    }

    th.textContent = cabecalho + " ";
    thead.appendChild(th);

    const divTh = document.createElement("div");
    divTh.id = `div-th`; 
    divTh.className = `div-th-${nomeTabela}`;
    th.appendChild(divTh);

    const cmdSelect = document.createElement("select");
  
    const options = [
        { text: "VACHAR(255) NOT NULL", selected: true },
        { text: "VARCHAR(255) DEFAULT NULL", selected: false },
        { text: "INT NOT NULL", selected: false },
        { text: "INT DEFAULT NULL", selected: false },
        { text: "DECIMAL(10,2) NOT NULL", selected: false },
        { text: "DATE NOT NULL", selected: false },
        { text: "DATE NOT NULL DEFAULT NOW()", selected: false },
    ];
    
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.textContent = options[i].text;
        cmdSelect.appendChild(option);
    }
    
    divTh.appendChild(cmdSelect);

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
    buttonDel.value = "Deletar Tabela";
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
        const createCMD = document.querySelector("#createCMD");
        const tabelasCMD = document.querySelector("#tabelasCMD");
        const nomeTabelaCMD = document.querySelector("#nomeTabelaCMD")

        const divTabelas = document.getElementsByClassName("table table-bordered table-hover");
        let nomeBancoDados = document.querySelector("#inputBancoDados").value;

        if (!nomeBancoDados) {
            nomeBancoDados = "generico";
        }

        let tabelas = [];
        tabelas.id = nomeBancoDados;
        tabelas.className = "table table-model"

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
                
                nomeColuna = header.split(" ")[0];
                
                if ( header.includes(nomeColuna) ) {
                    colunas.id = nomeTabela;
                    colunas.push(nomeColuna);
                    
                    // Adicionar os cmd
                    if (cmdColuna.id === undefined) {
                        cmdColuna.id = nomeColuna;
                        cmdColuna.push(cmdOptions[j].textContent);
                        colunas.push(cmdColuna);
                        cmdColuna = [];
                    }
                }
                delete nomeColuna.textContent;
            }
            tabelas.push(colunas);
        }
        console.log(tabelas);
        
        createCMD.textContent = `CREATE DATABASE ${nomeBancoDados};`;
        

        for (let i = 0; i < tabelas.length; i++) {
            const linhas = tabelas[i];
            nomeTabelaCMD.textContent = `CREATE TABLE ${linhas.id} (`;

            const div = document.createElement("div");
            div.id = `div-${i}`;
            tabelasCMD.appendChild(div);
            
            for (let j = 0; j < linhas.length; j += 2 ) {
                
                div.id = `div-${j}`;

                

                div.textContent = ` ${linhas[j]} ${ linhas[j + 1]}, `;
                
            }
        }
         
    }
}

function nomeTabela() {
    const nome = document.querySelector("#nomeTabela");
    if (!nome){
        const divNomeTabela = document.querySelector("#divNomeTabela");
        divNomeTabela.style.width = "15%";

        const inputNomeTabela = document.createElement("input");
        inputNomeTabela.id = "nomeTabela";
        inputNomeTabela.placeholder = "Nome da Tabela";

        divNomeTabela.appendChild(inputNomeTabela);

        cont = 0;
    } else {
        if (nome.value !== "") {
            window.alert("Use o botão adicionar a tabela");
        } else {
            window.alert("Preencha o nome da tabela");
        }
        
    }
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
    const tabela_Exemplo = document.querySelector("#tabelaExemplo");

    if (tabela_Exemplo) {
        window.alert("Tabela exemplo ja adicionada");
        return;
    }

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

   
function atualizarLinha() {
    window.alert("Em desenvolvimento!");
}

function deletarLinha() {
    window.alert("Em desenvolvimento!");
}

function deletarBD() {
    window.alert("Em desenvolvimento!");
}
