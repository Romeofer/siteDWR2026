document.addEventListener("DOMContentLoaded", () => {

    // ===== TEMA =====
    const botaoTema = document.getElementById("temaBtn");

    // Carregar tema salvo
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        botaoTema.textContent = "☀️"; // tema escuro ativo → mostrar sol para voltar ao claro
    } else {
        document.body.classList.remove("dark");
        botaoTema.textContent = "🌙"; // tema claro ativo → mostrar lua para ir ao escuro
    }

    // Clique no botão de tema
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("tema", "dark");
            botaoTema.textContent = "☀️"; // tema escuro → mostrar sol
        } else {
            localStorage.setItem("tema", "light");
            botaoTema.textContent = "🌙"; // tema claro → mostrar lua
        }
    });

    // ===== PALETA DE CORES =====
    document.querySelectorAll(".cor").forEach(el => {
        el.style.backgroundColor = el.dataset.cor;
    });

    // ===== DROPDOWN =====
    const btnMenu = document.getElementById("btnMenu");
    const submenu = document.getElementById("submenu");

    if (btnMenu && submenu) {
        btnMenu.addEventListener("click", (e) => {
            e.preventDefault();
            submenu.style.display =
                submenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".dropdown")) {
                submenu.style.display = "none";
            }
        });
    }

    // ===== MODAL =====
    const imagens = document.querySelectorAll(".imagem img");
    const modal = document.getElementById("modal");
    const imagemGrande = document.getElementById("imagemGrande");

    imagens.forEach(img => {
        img.addEventListener("click", () => {
            if (modal && imagemGrande) {
                modal.style.display = "flex";
                imagemGrande.src = img.src;
            }
        });
    });

    if (modal) {
        modal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // ===== COPIAR COR =====
    document.querySelectorAll(".cor").forEach(el => {
        el.addEventListener("click", () => {
            const cor = el.dataset.cor;

            navigator.clipboard.writeText(cor)
                .then(() => {
                    alert("Cor copiada: " + cor);
                })
                .catch(() => {
                    alert("Erro ao copiar");
                });
        });
    });

    // ===== FORMULÁRIO =====
    const form = document.getElementById("formContato");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            document.getElementById("msg").textContent = "Mensagem enviada com sucesso!";
            form.reset();
        });
    }

    // ===== AJAX =====
    // Busca um post de exemplo e exibe de forma estilizada na página
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => res.json())
        .then(data => {
            const div = document.createElement("div");
            div.id = "ajaxInfo";
            div.textContent = "📡 AJAX: " + data.title;
            document.querySelector("main").appendChild(div);
        })
        .catch(() => {
            // Falha silenciosa — não quebra a página
        });

});