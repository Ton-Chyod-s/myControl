var menuSite = document.getElementById("menuSite");
var buttonMenu = document.getElementById("buttonMenu");
var buttonMenu1 = document.getElementById("buttonMenu1");
var buttonMenu2 = document.getElementById("buttonMenu2");
var buttonMenu3 = document.getElementById("buttonMenu3");

function abrirMenu(td) {
    td.style.marginLeft = "-68px";
    td.style.width = "178px";
    td.style.transition = "0.1s";
}

function fecharMenu(td) {
    td.style.width = "41px";
    td.style.marginLeft = "0px";
    td.style.transition = "0.2s";
}

function corMenuEnter(td) {
    td.addEventListener("mouseenter", function() {
        td.style.backgroundColor = "#D7E5F1";
        td.style.transition = "0.3s";
    });
}

function corMenuLeave(td) {
    td.addEventListener("mouseleave", function() {
        td.style.backgroundColor = "#F6FAFF";
    });
}

function corMenuClick(td) {
    td.addEventListener("click", function() {
        td.style.backgroundColor = "#D7E5F1";
    });
}

menuSite.addEventListener("mouseenter", function() {
    menuSite.style.padding = "78px";
    menuSite.style.transition = "0.2s";
    menuSite.style.marginTop = "-72px";

    abrirMenu(buttonMenu);
    abrirMenu(buttonMenu1);
    abrirMenu(buttonMenu2);
    abrirMenu(buttonMenu3);
});

menuSite.addEventListener("scroll", function() {
    menuSite.style.display = "none";
});

menuSite.addEventListener("mouseleave", function() {
    
    menuSite.style.padding = "8px";
    menuSite.style.transition = "0.2s";
    menuSite.style.marginTop = "0px";
    
    fecharMenu(buttonMenu);
    fecharMenu(buttonMenu1);
    fecharMenu(buttonMenu2);
    fecharMenu(buttonMenu3);
});

corMenuEnter(buttonMenu);
corMenuLeave(buttonMenu);
corMenuEnter(buttonMenu1);
corMenuLeave(buttonMenu1);
corMenuEnter(buttonMenu2);
corMenuLeave(buttonMenu2);
corMenuEnter(buttonMenu3);
corMenuLeave(buttonMenu3);

corMenuClick(buttonMenu);

menuSite.addEventListener("mouseenter", function() {
    addLink(buttonMenu, "Home");
    addLink(buttonMenu1, "Analise de Dados");
    addLink(buttonMenu2, "Adicionar ao Banco");
    addLink(buttonMenu3, "Banco de Dados");
});

function addLink(button, text) {
    var newLink = document.createElement("a");
    newLink.innerText = text;
    newLink.className = "dynamicLink";  // Changed to class name
    newLink.onclick = function() {
        const iframe = document.getElementById("formulario")

        if (iframe) {
            iframe.remove();
        }

        criarIframe(text);
    };
    button.appendChild(newLink);
}

function removeLinks() {
    var links = document.querySelectorAll(".dynamicLink");
    links.forEach(function(link) {
        link.remove();
    });
}

menuSite.addEventListener("mouseleave", function() {
    removeLinks();
});

function criarIframe(text) {
    var iframe = document.createElement("iframe");
    const section = document.getElementById("formSection");

    iframe.id = "formulario";
    iframe.name = "formulario";
    
    if (text === "Home") {
        iframe.src = "";

    } else if (text === "Analise de Dados") {
        iframe.src = "analise.html";

    } else if (text === "Adicionar ao Banco") {
        iframe.src = "formulario.html";

    } else if (text === "Banco de Dados") {
        iframe.src = "tabela.html";
    }

    iframe.style.width = "100%";
    iframe.style.height = "600px";
    section.appendChild(iframe);
}
