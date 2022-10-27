const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Idziesz sobie korytarzem, jak gdyby nigdy nic, kabanosa jesz, nie stresujesz się, kupa czasu jeszcze jest, gdy nagle...',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Słyszysz syk płomienia. Przed Tobą rozpala się coraz większy ogień, ale nie czujesz gorąca. Płomień sięga aż do sufitu.',
        tlo: 'url("img/Ogień.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Z ognia wyłania się dumny Qilin, a ogień znika!',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: '"Kim jesteś?" (rozmowa)',
                nextText: "Kim_jestes"
            },
            {
                text: '"Co to było?! W ogóle nie czułem gorąca!" (rozmowa)',
                nextText: "Ogień"
            },
            {
                text: '"O kurde, jaki ogień! Masz ochotę zapalić fajkę na dworze?" (flirt)',
                nextText: "Papieros"
            },
            {
                text: '"Normalna jesteś?! Mogłaś spalić całą szkołę! Już ja Ci pokażę!" (walka)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Kim_jesteś",
        text: '"Jestem Zuzilin - dumną jednorożec, która potrafi spojrzeć w Twoją duszę. Przybyłam Cię ocenić!"',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: '"Jestem obrońcą tej szkoły! Próbuję odczarować zły urok!" (rozmowa)',
                nextText: "Wiem_kim_jesteś"
            },
            {
                text: '"Na czym polega ta ocena?" (rozmowa)',
                nextText: "Ocena"
            },
            {
                text: '"Oooo nie, lekcje się skończyły, nikt nie będzie mnie oceniać!" (rozmowa)',
                nextText: "Protest"
            },
            {
                text: '"Spadaj na bambus, moja dusza jest czysta jak łza i nie obchodzi mnie co powiesz!" (rozmowa)',
                nextText: "Protest"
            }
        ]
    },
    {
        id: "Wiem_kim_jesteś",
        text: '"Wiem kim jesteś i czego próbujesz dokonać. Muszę mieć pewność, że jesteś odpowiednią osobą, inaczej możesz tylko pomóc Dy-Roo."',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Jestem czysty jak łza, oceń mnie!" (test)',
                nextText: "Test1"
            },
            {
                text: '"Na czym polega ta ocena?" (rozmowa)',
                nextText: "Ocena"
            },
            {
                text: '"Oooo nie, lekcje się skończyły, nikt nie będzie mnie oceniać!" (rozmowa)',
                nextText: "Protest"
            },
            {
                text: '"Spadaj na bambus, moja dusza jest czysta jak łza i nie obchodzi mnie co powiesz!" (rozmowa)',
                nextText: "Protest"
            }
        ]
    },
    {
        id: "Ocena",
        text: 'Zadam Ci pytania, jeśli odpowiesz prawidłowo możesz iść dalej, jeśli nie, spalę Cię żywcem!',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Jestem czysty jak łza, oceń mnie!" (test)',
                nextText: "Test1"
            },
            {
                text: '"Spalisz żywcem?! Nie ma opcji!" Zaatakuj Qilina! (walka)',
                nextText: "Walka"
            },
            {
                text: '"Tak? Ciekawe jak mnie podpalisz hahaha?" Polej Qilina wodą z butelki! (akcja)',
                nextText: "Woda"
            },
            {
                text: '"Spadaj na bambus, moja dusza jest czysta jak łza i nie obchodzi mnie co powiesz!" (rozmowa)',
                nextText: "Protest"
            }
        ]
    },
    {
        id: "Protest",
        text: '"Niestety, decyzja nie należy do Ciebie!"',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: '"Dobra, dobra. Oceń mnie!" (test)',
                nextText: "Test1"
            },
            {
                text: '"Tak tylko Ci się wydaje" Zaatakuj Qilina! (walka)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Protest",
        text: '"Nie podoba mi się Twój ton wypowiedzi, lepiej uważaj!"',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: '"Dobra, dobra. Oceń mnie!" (test)',
                nextText: "Test1"
            },
            {
                text: '"Sama uważaj!" Zaatakuj Qilina! (walka)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Ogień",
        text: 'Władam ogniem jak Lewandowski piłką. Potrafię stworzyć każdy rodzaj ognia, palący w skórę i grzejący w serduszko.',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: '"Co za moc! Poddaje się Twojej próbie o Pani! (test)',
                nextText: "Test1"
            },
            {
                text: '"O kurde, jaki ogień! Masz ochotę zapalić fajkę na dworze?" (flirt)',
                nextText: "Papieros"
            },
            {
                text: '"Z taką mocą pokonamy Dy-Roo z łatwością! Po co próba, jak możesz to zrobić za mnie?" (rozmowa)',
                nextText: "Leniwość"
            },
            {
                text: '"Tyle rodaków będzie marznąć zimą w 2k22 z powodu podwyżek cen prądu, a Ty nic nie robisz?! Zniewolę Cię i pomogę ludziom!" (walka)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Leniwość",
        text: '"Przykro mi, ale prawdziwy bohater nie wyręcza się innymi. Nie trzeba Cię poddawać próbie, Twój los może być tylko jeden..."',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Ojej, nie to miałem na myśli! Przepraszam!" (rozmowa)',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Woda",
        text: 'Oblany wodą Qilin przybiera wściekły wyraz twarzy! "JAK ŚMIESZ OBLEWAĆ WODĄ QILINA? NAWET NIE MA CO CIĘ TESTOWAĆ, WIEM, ŻE NIE JESTEŚ GODNY TEJ MISJI!"',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: '"Nie nie nie! Przepraszam! It is a prank!" (rozmowa)',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Papieros",
        text: '"OOOO MATKO, serio? Papierosy? Nie wstyd Ci? W takim wieku? Wiesz co, bohatera z Ciebie nie bedzie, przykro mi."',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Chciałem być tylko miły, przepraszam!" (rozmowa)',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Walka",
        text: 'Rzucasz się z bronią na Qilina. "JAK ŚMIESZ!" Zanim dobiegasz do majestatycznej istoty zaczynasz się palić. Od początku nie miałeś szans...',
        tlo: 'url("img/Ogień.png")',
        options: [
            {
                text: 'Zagraj jeszcze raz',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Spalenie",
        text: 'Jedyne co widzisz to ogień, jedyne co czujesz to ból. Umierasz',
        tlo: 'url("img/Ogień.png")',
        options: [
            {
                text: 'Zagraj jeszcze raz',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Test1",
        text: 'Co robisz?',
        tlo: 'url("img/Test.png")',
        options: [
            {
                text: '"Idę do sklepu!" Babuszka da sobie radę sama, okazja może się nie powtórzyć!" (odpowiedź)',
                nextText: "Test11"
            },
            {
                text: '"Pomagam babuszce, to tylko chrupki i soczek, przeżyję bez nich!" (odpowiedź)',
                nextText: "Test12"
            },
            {
                text: 'Przeprowadzam babuszkę przez ulicę, a następnie z całych sił biegnę do sklepu. Sprintem jestem w stanie pokonać trasę w 2 min!" (odpowiedź)',
                nextText: "Test13"
            },
            {
                text: 'Jakie chrupki są w promocji... Najbardziej lubię Nachosy, a Ty? (rozmowa)',
                nextText: "Test14"
            }
        ]
    },
    {
        id: "Test11",
        text: '"Przykro mi, jesteś egoistyczny, nie zdajesz próby..."',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Ale promocja!" (rozmowa)',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Test12",
        text: '"Pomożesz babuszce, ale nie zjesz chrupek i soczku! Pomoc jest ważna, ale nie można przesadzać w drugą stronę... Przykro mi..."',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Czekaj, to nie była dobra odpowiedź? Bez jaj..."',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Test13",
        text: '"Prawdziwy bohater nie boi się wysiłku! Gratuluję, zdałeś próbę! Masz wszystko, czego trzeba, mogę uciekać."',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: '"Czekaj! Zanim odejdziedz musisz wiedzieć, że masz piękne łuski!" (komplement)"',
                nextText: "Komplement_zły"
            },
            {
                text: '"Czekaj! Zanim odejdziedz musisz wiedzieć, że masz piękne szpony!" (komplement)',
                nextText: "Komplement_zły"
            },
            {
                text: '"Czekaj! Zanim odejdziedz musisz wiedzieć, że masz piękne kopyta!" (komplement)',
                nextText: "Komplement_dobry"
            },
            {
                text: '"Czekaj! Zanim odejdziedz musisz wiedzieć, że masz piękne pazury!" (komplement)',
                nextText: "Komplement_zły"
            }
        ]
    },
    {
        id: "Test14",
        text: '"Jezuuuu, tak bardzo uwielbiam krakersy... Czekaj, próba! Bohater musi być skupiony i podejmować szybkie decyzje! Przykro mi..."',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: '"No ej, ale jest różnica czy nachosy serowe czy chrupki orzecho..."',
                nextText: "Spalenie"
            }
        ]
    },
    {
        id: "Komplement_zły",
        text: '"Mmmm, dziękuję, chyba? Uciekam, powodzenia!" Qilin znika tak samo magicznie jak się pojawił, a Ty kontynuujesz swoją misję.',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Komplement_dobry",
        text: '"OJEJU, DZIĘKUJĘ, UWIELBIAM MOJE KOPYTKA, TO MOJA ULUBIONA CZĘŚĆ CIAŁA! NIE DOŚĆ, ŻE BOHATER TO JESZCZE TAKI MIŁY! UCIEKAM, ALE BĘDĘ O TOBIE PAMIĘTAĆ!" Qilin znika tak samo magicznie jak się pojawił, a Ty kontynuujesz swoją misję.',
        tlo: 'url("img/Zadowolona.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    }
]

startGame()