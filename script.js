let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

const modalButtons = document.querySelectorAll("button[data-id]");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeModal = modal.querySelector(".close");

const checkAnswersBtn = document.getElementById("check-answers");

// CONFIG
let countItem = items.length;
let itemActive = 0;
// NEXT CLICK
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}
// PREV CLICK
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}
// AUTO RUN SLIDER
let refreshInterval = setInterval(() => {
    next.click();
}, 8000)
function showSlider() {
    // REMOVE ITEM ACTIVE OLD
    let itemActiveOld = document.querySelector(".slider .list .item.active");
    let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
    itemActiveOld.classList.remove("active");
    thumbnailActiveOld.classList.remove("active");

    // ACTIVE NEW ITEM
    items[itemActive].classList.add("active");
    thumbnails[itemActive].classList.add("active");
    setPositionThumbnail();

    // CLEAR AUTO TIME RUN SLIDER
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail() {
    let thumbnailActive = document.querySelector(".thumbnail .item.active");
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
}

// CLICK THUMBNAIL
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        itemActive = index;
        showSlider();
    })
})

// SWIPER JS
const swiper = new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// MODAL
const data = {
    1: {
        title: "Martin Luther King Jr.",
        description: "Martin Luther King Jr. foi um líder fundamental na luta pelos direitos civis nos Estados Unidos. Com sua filosofia de resistência não violenta, ele inspirou milhares a lutar contra a segregação racial. Seu famoso discurso 'I Have a Dream' se tornou um símbolo de esperança e de um futuro com igualdade racial. King foi uma das figuras principais na conquista de leis que garantiram direitos civis para os negros, deixando um legado de paz e justiça.",
        image: "assets/modalMartinLutherKing.jpg"
    },
    2: {
        title: "Nelson Mandela",
        description: "Nelson Mandela foi o principal líder na luta contra o apartheid na África do Sul. Preso por 27 anos, ele se tornou um símbolo de resistência e, após sua libertação, trabalhou para promover a reconciliação nacional e a igualdade racial. Em 1994, tornou-se o primeiro presidente negro da África do Sul, criando um país mais democrático e livre da segregação racial. Seu compromisso com a paz e a justiça o fez receber o Prêmio Nobel da Paz.",
        image: "assets/modalNelsonMandela.webp"
    },
    3: {
        title: "Carolina Maria de Jesus",
        description: "Carolina Maria de Jesus foi uma escritora brasileira que documentou sua vida na favela através de seus diários, resultando no livro 'Quarto de Despejo'. Sua obra é um poderoso testemunho sobre a pobreza, a luta pela sobrevivência e o racismo, especialmente a realidade das mulheres negras nas favelas. Seu livro foi um marco na literatura brasileira e continua a inspirar reflexões sobre desigualdade social.",
        image: "assets/modalCarolinaMariaDeJesus.jpg"
    },
    4: {
        title: "Zumbi dos Palmares",
        description: "Zumbi dos Palmares foi o líder do Quilombo dos Palmares, um dos maiores focos de resistência à escravidão no Brasil. Ele lutou pela liberdade dos negros escravizados e pela preservação da cultura africana no Brasil. Sua morte, em 1695, simboliza a resistência contra a opressão. O 20 de novembro, data de sua morte, foi escolhido como o Dia da Consciência Negra no Brasil.",
        image: "assets/zumbiDosPalmares.jpg"
    },
    5: {
        title: "Elizabeth Eckford",
        description: "Elizabeth Eckford foi uma das Little Rock Nine, nove estudantes negras que, em 1957, enfrentaram violência e racismo para integrar uma escola segregada no Arkansas, EUA. Ela foi fotografada caminhando sozinha em meio a uma multidão hostil, tornando-se um ícone da luta pela integração escolar e pelos direitos civis. Sua coragem ajudou a abrir portas para a educação igualitária nos Estados Unidos.",
        image: "assets/modalElizabethEckford.jpg"
    },
    6: {
        title: "Djamila Ribeiro",
        description: "Djamila Ribeiro é uma filósofa e ativista brasileira que se destaca pela defesa dos direitos das mulheres negras. Ela é autora de obras como 'O que é lugar de fala?', nas quais aborda questões de racismo, feminismo e a importância de dar voz às pessoas negras. Djamila é uma das principais representantes do feminismo negro no Brasil, lutando por mais igualdade e visibilidade para as mulheres negras em diversas áreas da sociedade.",
        image: "assets/modalDjamilaRibeiro.jpg"
    }
};

const openModal = (id) => {
    const info = data[id];
    modalTitle.textContent = info.title;
    modalDescription.textContent = info.description;
    modalImage.src = info.image;
    modal.style.display = "flex";
}

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        openModal(id);
    });
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

const checkAnswers = () => {
    const answers = {
        q1: "certo",
        q2: "certo",
        q3: "certo",
        q4: "certo",
        q5: "certo",
        q6: "certo",
        q7: "certo",
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let question in answers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    const resultDiv = document.getElementById("result");
    if (score === totalQuestions) {
        result.style.display = "flex";
        resultDiv.innerHTML = `Parabéns! Você acertou todas as ${totalQuestions} perguntas! 🎉`;
    } else {
        result.style.display = "flex";
        resultDiv.innerHTML = `Você acertou ${score} de ${totalQuestions} perguntas. Continue aprendendo!`;
    }
}

checkAnswersBtn.addEventListener("click", checkAnswers)
