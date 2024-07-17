let cont = 0;
let tabelas = [];
let colunas = [];
let tabelaJson = {};

let referes = [];
let colunaUm = [];
let colunaDois = [];

function criarTabela() {
    const divTabela = document.querySelector("#corpoTabelas");
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
        cont--;
        window.alert("Por favor, preencha todos os campos disponiveis.");
        return;
    }

    if (hasTable(divTabela, nomeTabela)) {
        const tabela = divTabela.querySelector("#" + nomeTabela);
        if (!headerExists(tabela, cabecalho)) {
            addHeaderCell(tabela, cabecalho);
            document.querySelector("#divCabecalhoTabela > input").value = "";
            return;
        } 
    } else {
        if (!cabecalho.includes('id')) {
            const newCabecalho = 'id_' + nomeTabela.replace(/s\b/g, "") + ' ';
            createNewTable(divTabela, nomeTabela, newCabecalho);

            const tabela = divTabela.querySelector("#" + nomeTabela);
            if (!headerExists(tabela, cabecalho)) {
                addHeaderCell(tabela, cabecalho);
                document.querySelector("#divCabecalhoTabela > input").value = "";
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

    document.querySelector("#divCabecalhoTabela > input").value = "";

}

function hasTable(div, tableId) {
    return div.querySelector(`#${tableId}`) !== null;
}

function headerExists(tabela, cabecalho) {
    const headerCells = tabela.querySelectorAll("thead th");
    for (const th of headerCells) {
        const thText = th.textContent.split(" ")[0];

        if (cabecalho.includes(' ')) {
            cabecalho = cabecalho.replace(/\s+/g, "_");
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
    cabecalho = cabecalho.replace("/", "_")

    if (cabecalho.includes(' ')) {
        cabecalho = cabecalho.replace(/\s+/g, "_");
    } else if ( cabecalho === "" ) {
        return; 
    }

    th.id = nomeTabela + "-" + cabecalho;

    let click = false;
    let doubleClick = 0;

    th.addEventListener("mouseenter", function() {
        if (click === true) {
            return;

        } else {
            const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);
            divTh.style.border = "1px solid #e9e9e9";
            divTh.style.boxsizing = "border-box";
            divTh.style.backgroundColor = "#fafafa";
            
            const divThs = document.createElement(`div`);
            divThs.id = `divThs-${nomeTabela}-${cabecalho}`;
            divThs.className = `divThs`;
            th.appendChild(divThs);
            const img = document.createElement("img");
            img.src = "assets/images/icon/delete.png";

            divThs.appendChild(img);

            img.addEventListener("click", function() {
                const th = document.getElementById(nomeTabela + "-" + cabecalho);
                th.remove();
            })
        }
    })

    th.addEventListener("mouseleave", function() {
        if (click === true) {
            return;

        } else {
            const divThs = document.getElementById(`divThs-${nomeTabela}-${cabecalho}`);
            if (divThs) divThs.remove();

            const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);
            divTh.style.border = "none";
            divTh.style.boxsizing = "border-box";
            divTh.style.backgroundColor = "white";
        }
    })

    th.addEventListener("dblclick", function() {
        click = true;
        doubleClick++;
        const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);

        if (doubleClick === 1) {
            divTh.style.border = "3px dashed #7A7777";

            const valorColuna = divTh.textContent.split(" ")[0];

            referes.id = nomeTabela;
            referes.push(valorColuna);

            if ( colunaUm.length === 0 ) {
                colunaUm.push(referes);
                referes = [];   
            }

        } else {
            const divThs = document.getElementById(`divThs-${nomeTabela}-${cabecalho}`);
            divThs.remove();

            const divTh = document.querySelector("#" + nomeTabela + "-" + cabecalho);
            divTh.style.border = "none";
            divTh.style.boxsizing = "border-box";
            divTh.style.backgroundColor = "white";
            doubleClick = 0;
            click = false;
        }

    });
    
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
        { text: "VARCHAR(255) NOT NULL", selected: true },
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
    let click = false;
    let doubleClick = 0;
    const headerDiv = document.createElement("header");
    headerDiv.id = `${nomeTabela}-header`;
    headerDiv.className = "class-header";
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
    th.id = nomeTabela + "-" + cabecalho;
    th.textContent = cabecalho;
    headerRow.appendChild(th);

    const divTh = document.createElement("div");
    divTh.id = `div-th`; ;
    divTh.className = `div-th-${nomeTabela}`;
    th.appendChild(divTh);

    thead.appendChild(headerRow);

    const cmdSelect = document.createElement("select");
  
    const options = [
        { text: "SERIAL UNIQUE NOT NULL PRIMARY KEY", selected: true },
        { text: "SERIAL UNIQUE PRIMARY KEY", selected: false },
        { text: "SERIAL NOT NULL PRIMARY KEY", selected: false },
        { text: "SERIAL PRIMARY KEY", selected: false }
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

    th.addEventListener("dblclick", function() { 
        click = true;
        doubleClick++;

        const tabelas = document.querySelector(`#corpoTabelas`);
        const table = tabelas.querySelector(`#${nomeTabela}`);
        const trTh = table.querySelector(`tr th`);
        
        
        if (doubleClick === 1) {
            trTh.style.border = "3px dashed #7A7777";
            nomeColuna = trTh.textContent.split(" ")[0];
            referes.id = nomeTabela;
            referes.push(nomeColuna);

            if ( colunaDois.length === 0 ) {
                colunaDois.push(referes);
                referes = [];   
            }

            if ( colunaUm.length > 0 && colunaDois.length > 0 ) {
                const colUm = colunaUm[0].id
                const colDois = colunaDois[0].id

                const idUm = colunaUm[0].id;

                if (colUm !== colDois) {

                    const cmdSQL = `FOREIGN KEY (${colunaUm}) REFERENCES ${colDois}(${colunaDois})`;
                
                    const divColTh = document.querySelector(`#div-${colUm}-final`);
                    divColTh.textContent = divColTh.textContent.replace(");", "");
                
                    const divForeign = document.createElement("div");
                    divForeign.id = `colUm-FOREIGN-colDois`;
                    divForeign.textContent = `${cmdSQL} ,`;
                
                    divColTh.appendChild(divForeign);
                
                    const divSeraFinal = document.createElement("div");
                    divSeraFinal.textContent = ");";
                    divColTh.appendChild(divSeraFinal);
                
                    colunaUm = [];
                    colunaDois = [];
                    verificacao++;
                }
            }


        } else {
            trTh.style.border = "none";
            trTh.style.boxsizing = "border-box";
            trTh.style.backgroundColor = "white";

            doubleClick = 0;
            click = false;
        }
    });
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

    document.addEventListener("keydown", function(event) {
        // Verifica se a tecla pressionada é Enter (código 13)
        if (event.key === "Enter") {
            // Chama a função criarTabela()
            criarTabela();
        }
    });

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
        colunaUm = [];
        colunaDois = [];

        console.log(colunaUm);
        const corpoTabela = document.querySelector("#corpoTabelas").textContent.trim();

        if ( corpoTabela ) {
            const createCMD = document.querySelector("#createCMD");
            const tabelasCMD = document.querySelector("#tabelasCMD");
            
            if (tabelasCMD.textContent !== "") {
                tabelasCMD.textContent = "";
                createCMD.textContent = "";
            }

            const divTabelas = document.getElementsByClassName("table table-bordered table-hover");
            let nomeBancoDados = document.querySelector("#inputBancoDados").value;

            nomeBancoDados = nomeBancoDados.trim().replace(/\s+/g, "_");
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
            
            let nomeTabela;

            if (cont === 0) {
                nomeTabela = document.querySelector("#nomeTabela").value.trim().replace(/\s+/g, "_");
        
                cont++;
            } else {
                nomeTabela = document.querySelector("#select").value.trim().replace(/\s+/g, "_");
                
            }

            console.log(tabelas);

            const divFinal = document.querySelector(`div-${nomeTabela}`);
            
            console.log(divFinal);

            createCMD.textContent = `CREATE DATABASE ${nomeBancoDados};`;
            
            for (let i = 0; i < tabelas.length; i++) {
                const linhas = tabelas[i];
                
                const div = document.createElement("div");
                div.id = `div-${linhas.id}`;
                tabelasCMD.appendChild(div);

                const divName = document.createElement(`div`);
                divName.id = `div-${linhas.id}`; 
                divName.className = "table_table-name";
                    
                divName.textContent = `CREATE TABLE ${linhas.id} (`;
                div.appendChild(divName);
                
                for (let j = 0; j < linhas.length; j += 2 ) {
                    const divCMD = document.createElement("div");
                    divCMD.id = `div-${linhas[j]}`;
                    divCMD.className = "table_table-cmd";
                    div.appendChild(divCMD);

                    if (j === linhas.length - 2) {
                        const div = document.createElement("div");
                        div.id = `div-${linhas.id}-final`;
                        div.className = "table_table-final";
                        div.textContent = ");";

                        divCMD.textContent = `${linhas[j]} ${ linhas[j + 1]}`;
                        
                        divCMD.appendChild(div);
                    } else {
                        divCMD.textContent = `${linhas[j]} ${ linhas[j + 1]},`;
                    }
                }
            }
        } else {
            window.alert("Por favor, adicione uma tabela para criar o banco de dados.");
        
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
        const nomeTabela = document.querySelector("#nomeTabela").value.trim();
        if (nomeTabela) {
            criarTabela();
        } else {
            window.alert("Por favor, preencha o nome da tabela.");
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
    const existingTable = document.querySelector("#corpoTabelas");
    if (!existingTable) {
        const corpoTabelas = document.createElement("div");
        corpoTabelas.id = "corpoTabelas";
        const body_table = document.querySelector("#table body-table");
        body_table.appendChild(corpoTabelas);
    }   

    const div = document.querySelector("#corpoTabelas");

    const tabela_Exemplo = document.querySelector("#tabelaExemplo");

    if (tabela_Exemplo) {
        window.alert("Tabela exemplo ja adicionada");
        return;
    }

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

function atualizarCmd() {
    window.alert("Em desenvolvimento!");
}

function deletarCmd() {
    const CmdSQL = document.querySelector("#createCMD");
    const tabelasCMD = document.querySelector("#tabelasCMD");

    colunaUm = [];
    colunaDois = [];
    CmdSQL.textContent = "";
    tabelasCMD.textContent = "";
    document.querySelectorAll("th").style.border = "none";
    

}

function deletarBD() {
    const isClear = window.confirm("Deseja realmente limpar a planilha?");
    if (!isClear) return;

    const existingTable = document.querySelector("#corpoTabelas");
    if (existingTable) existingTable.remove();

    const divNomeTabela = document.querySelector("#divNomeTabela");
    if (divNomeTabela) {
        divNomeTabela.style.width = "15%";

        const createCMD = document.querySelector("#createCMD");
        if (createCMD) createCMD.textContent = "";

        const nomeTabela = document.querySelector("#nomeTabela");
        if (nomeTabela) nomeTabela.remove();
    }

    const select = document.querySelector("#select");
    if (select) {
        const opSelect = select.options;
        for (let i = opSelect.length - 1; i >= 0; i--) {
            opSelect[i].remove();
        }
    }

    const nomeTabelaInput = document.createElement("input");
    nomeTabelaInput.id = "nomeTabela";
    nomeTabelaInput.placeholder = "Nome da Tabela";
    nomeTabelaInput.value = "";

    const cabecalhoTabela = document.querySelector("#cabecalhoTabela");
    if (cabecalhoTabela) cabecalhoTabela.value = "";

    const header = document.createElement("header");
    const tabela = document.createElement("table");
    tabela.style.border = "none";
    tabela.id = "corpoTabelas";

    if (divNomeTabela) divNomeTabela.appendChild(nomeTabelaInput);

    const tabelas = document.querySelector("#tabelas");
    if (tabelas) {
        tabelas.appendChild(header);
        tabelas.appendChild(tabela);
    }

    const tabelasCMD = document.querySelector("#tabelasCMD");
    if (tabelasCMD && tabelasCMD.textContent !== "") {
        tabelasCMD.textContent = "";
        const createCMD = document.querySelector("#createCMD");
        if (createCMD) createCMD.textContent = "";
    }

    const headerElements = document.querySelectorAll("header");
    headerElements.forEach(headerElement => headerElement.remove());

    if (typeof cont !== 'undefined' && cont !== 0) cont--;
}

function copiarCMD() {
    const text = document.getElementById("idTabelaCMD").textContent.trim();
    try {
        navigator.clipboard.writeText(text);
        console.log("Texto copiado com sucesso!");
    } catch (err) {
        console.error("Erro ao copiar texto: ", err);
    }
}

function analisarBD() {
    const paragrafo = document.querySelector("#div-analisar");
    if (paragrafo) paragrafo.remove();

    const menu_linha = document.querySelector("#menu-linha");

    const div = document.createElement("div");
    div.id = "div-analisar";
    div.className = "div-analisar";

    // menu_linha.appendChild(div);
    // const p = document.createElement("p");
    // p.textContent = "Analisando Banco de Dados";
    // div.appendChild(p); 
}
