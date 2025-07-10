document.addEventListener("DOMContentLoaded", () => {
  const kittiesList = document.querySelectorAll(".kitty");
  const cartoesKitty = document.querySelectorAll(".cartao-kitty");

  function mostrarCartaoKitty(id) {
    // Esconde todos os cartões
    cartoesKitty.forEach((cartao) => {
      cartao.classList.remove("aberto");
    });

    const cartaoSelecionado = document.getElementById(`cartao-${id}`);
    if (cartaoSelecionado) {
      cartaoSelecionado.classList.add("aberto");
    }

    kittiesList.forEach((kitty) => {
      kitty.classList.remove("ativo");
      if (kitty.id === id) {
        kitty.classList.add("ativo");
      }
    });
  }

  kittiesList.forEach((kitty) => {
    kitty.addEventListener("click", () => {
      const idKitty = kitty.id;
      mostrarCartaoKitty(idKitty);
    });
  });

  let hoverTimer;
  kittiesList.forEach((kitty) => {
    kitty.addEventListener("mouseenter", () => {
      if (window.innerWidth > 750) {
        hoverTimer = setTimeout(() => {
          kitty.classList.add("hover-effect");
        }, 300);
      }
    });

    kitty.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      kitty.classList.remove("hover-effect");
    });
  });
});

//codigo de mudança de fundo


document.addEventListener("DOMContentLoaded", () => {
  const kittiesList = document.querySelectorAll(".kitty");
  const cartoesKitty = document.querySelectorAll(".cartao-kitty");
  const body = document.body;


  function resetBackground() {
    body.classList.remove(
      "fundo-hellokitty",
      "fundo-mymelody",
      "fundo-charmmykitty",
      "fundo-pompompurin",
      "fundo-cinnamoroll",
      "fundo-kuromi"
    );
  }

 
  function mostrarCartaoKitty(id) {
    // Esconde todos os cartões
    cartoesKitty.forEach((cartao) => {
      cartao.classList.remove("aberto");
    });


    const cartaoSelecionado = document.getElementById(`cartao-${id}`);
    if (cartaoSelecionado) {
      cartaoSelecionado.classList.add("aberto");
    }


    kittiesList.forEach((kitty) => {
      kitty.classList.remove("ativo");
      if (kitty.id === id) {
        kitty.classList.add("ativo");
      }
    });


    resetBackground();
    body.classList.add(`fundo-${id}`);
  }


  kittiesList.forEach((kitty) => {
    kitty.addEventListener("click", () => {
      const idKitty = kitty.id;
      mostrarCartaoKitty(idKitty);
    });
  });


  resetBackground();
  body.classList.add("fundo-hellokitty");
});

//-----------------------

document.addEventListener("DOMContentLoaded", () => {
  const kittiesList = document.querySelectorAll(".kitty");
  const cartoesKitty = document.querySelectorAll(".cartao-kitty");
  const body = document.body;

  // Remove todas as classes de fundo e ativo
  function resetStyles() {
    body.classList.remove(
      "fundo-hellokitty",
      "fundo-mymelody",
      "fundo-charmmykitty",
      "fundo-pompompurin",
      "fundo-cinnamoroll",
      "fundo-kuromi"
    );
    
    kittiesList.forEach(kitty => {
      kitty.classList.remove(
        "ativo",
        "hellokitty",
        "mymelody",
        "charmmykitty",
        "pompompurin",
        "cinnamoroll",
        "kuromi"
      );
    });
  }

  // Função para mostrar o cartão correspondente ao kitty clicado
  function mostrarCartaoKitty(id) {
    resetStyles();
    
    // Mostra apenas o cartão correspondente
    const cartaoSelecionado = document.getElementById(`cartao-${id}`);
    if (cartaoSelecionado) {
      cartaoSelecionado.classList.add("aberto");
    }

    // Atualiza a classe 'ativo' e a classe específica do personagem na listagem
    const kittySelecionado = document.getElementById(id);
    if (kittySelecionado) {
      kittySelecionado.classList.add("ativo", id);
    }

    // Altera o fundo conforme o personagem selecionado
    body.classList.add(`fundo-${id}`);
  }

  // Adiciona evento de clique para cada item da listagem
  kittiesList.forEach((kitty) => {
    kitty.addEventListener("click", () => {
      const idKitty = kitty.id;
      mostrarCartaoKitty(idKitty);
    });
  });

  // Inicializa com o Hello Kitty ativo
  mostrarCartaoKitty("hellokitty");
});