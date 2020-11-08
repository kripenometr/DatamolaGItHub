const messages =  [
    {
        id: "b2c125c0-4d1e-4053-a6ec-ec12c75498d0",         // Все id генерил на сайте "https://www.uuidgenerator.net/version4"
        text: "Привет всем!!!",
        createdAt: new Date("2020-10-10T13:40:00"),
        author: "Саша Петров",
        isPersonal: false
    },

    {
        id: "4bce6883-ece4-4c95-9ea2-74feb450bc4c",
        text: "Привет)",
        createdAt: new Date("2020-10-10T13:42:00"),
        author: "Катя Смирнова",
        isPersonal: true,
        to: "Ваня Козлов"
    },

    {
        id: "f3995ca2-2315-4ee4-8190-47e899dc5f2a",
        text: "Приветики)",
        createdAt: new Date("2020-10-10T13:45:00"),
        author: "Коля Сидоров",
        isPersonal: false
    },

    {
        id: "f59aeec5-be08-4cbf-996a-f47bf5c2af94",
        text: "Доброе утро",
        createdAt: new Date("2020-10-10T13:50:00"),
        author: "Ваня Козлов",
        isPersonal: false
    },

    {
        id: "8d638c7e-6d75-4eaf-a401-c0958b916bfc",
        text: "Начинаем работать",
        createdAt: new Date("2020-10-10T13:55:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "9c45fc5d-f3bb-4858-b1ab-85dff5896463",
        text: "Что будем делать?",
        createdAt: new Date("2020-10-10T14:00:00"),
        author: "Ваня Козлов",
        isPersonal: false
    },

    {
        id: "1f0725aa-281b-4220-a38c-3a95f7ea368d",
        text: "Сегодня будем создавать калькулятор на JS)",
        createdAt: new Date("2020-10-10T14:10:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "ae7eab8d-37ef-4412-84a1-cac615ff3f77",
        text: "Вау!!",
        createdAt: new Date("2020-10-10T14:15:00"),
        author: "Коля Сидоров",
        isPersonal: false
    },

    {
        id: "162dd124-69e2-4da0-bec9-0905d45bb344",
        text: "Ничего себе, класс!",
        createdAt: new Date("2020-10-10T14:25:00"),
        author: "Саша Петров",
        isPersonal: false
    },

    {
        id: "eddf7979-0765-4edc-8178-987f93cd35b0",
        text: "Давайте быстрее начнем!",
        createdAt: new Date("2020-10-10T14:30:00"),
        author: "Настя Иванова",
        isPersonal: false
    },

    {
        id: "16f847e2-9303-4623-a3d3-a911c5e67885",
        text: "Итак, функционал нашего калькулятора, он должен уметь складывать, вычитать, умножать и делить)",
        createdAt: new Date("2020-10-10T14:40:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "896ace15-cc4c-4e6a-ad4b-652a5d431967",
        text: "Начинаем делать!",
        createdAt: new Date("2020-10-10T14:50:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "e9e7d878-fd31-4a6a-a983-eefb8e4e0e50",
        text: "У меня вопрос: переменные делать локальными или глобальными?",
        createdAt: new Date("2020-10-10T14:55:00"),
        author: "Коля Сидоров",
        isPersonal: false
    },

    {
        id: "def993b6-5e37-4621-be9d-3ed3304d15a9",
        text: "На ваш выбор, но я бы посоветовала локальные)",
        createdAt: new Date("2020-10-10T15:00:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "38315e39-1e4d-4ac6-8391-23e37896f68a",
        text: "Понял, спасибо",
        createdAt: new Date("2020-10-10T15:10:00"),
        author: "Коля Сидоров",
        isPersonal: false
    },

    {
        id: "ec5313c0-b287-4c98-af40-242114934bac",
        text: "У меня ничего не выходит(",
        createdAt: new Date("2020-10-10T15:20:00"),
        author: "Настя Иванова",
        isPersonal: false
    },

    {
        id: "f1a21bbb-0d5c-41f4-8d4e-3970f5af520a",
        text: "Заходи в ZOOM, сейчас будем разбираться)",
        createdAt: new Date("2020-10-10T15:30:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "edc4466b-7aeb-4d0e-b5ce-e73f76b425eb",
        text: "Я все сделал, залил на Github, жду оценки",
        createdAt: new Date("2020-10-10T15:40:00"),
        author: "Саша Петров",
        isPersonal: false
    },

    {
        id: "8cc14da6-cecf-41c9-bc77-dbac895ca45d",
        text: "Поняла, сейчас закончим с Настей и проверю",
        createdAt: new Date("2020-10-10T15:50:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

    {
        id: "1fc1c0b7-5410-4b00-b2b7-121b2f64524d",
        text: "Все оценки выставлены, смотрите свои результаты)",
        createdAt: new Date("2020-10-10T16:00:00"),
        author: "Катя Смирнова",
        isPersonal: false
    },

];

(function () {
    function getMessages(skip = 0, top = 10, filterConfig){
        let arrMessages = messages.slice(); // Сделаем копию нашего основного массива, чтобы не менять его при сортировке)))

        let author, text, dateTo, dateFrom;

        if(filterConfig != undefined){
            if(filterConfig.hasOwnProperty("author") && filterConfig.author !== "")
                author = filterConfig.author;
                
            if(filterConfig.hasOwnProperty("text") && filterConfig.text <= 200)
                text = filterConfig.text;

            if(filterConfig.hasOwnProperty("dateTo"))
                dateTo = Date.parse(filterConfig.dateTo);

            if(filterConfig.hasOwnProperty("dateFrom"))
                dateFrom = Date.parse(filterConfig.dateFrom);
        }

        return (function arrSort(substringText = "", substringAuthor = "", dateTo = Date.parse(new Date()), dateFrom = 0) {
                    let arrMessages1 = [];
                    
                    for(counter in arrMessages){
                        if(    arrMessages[counter].text.includes(substringText) 
                            && arrMessages[counter].author.includes(substringAuthor) 
                            && arrMessages[counter].createdAt <= dateTo 
                            && arrMessages[counter].createdAt >= dateFrom)
                            arrMessages1.push(arrMessages[counter]);
                    }
            
                    return arrMessages1;
                })(text, author, dateTo, dateFrom).sort(function (a, b) { return a.createdAt - b.createdAt;}).slice(skip, skip + top);// я не знаю, как тут красиво оформить)))))))))))))))))
    }

    function getMessage(id) {
        for (counter in messages)
            if(id === messages[counter].id)
                return messages[counter];
    }

    function validateMessage(msg){
        return msg.hasOwnProperty("id")
            && msg.hasOwnProperty("text")
            && msg.hasOwnProperty("createdAt")
            && msg.hasOwnProperty("author")
            && msg.text.length <= 200
            && msg.author !== ""
            && typeof(msg.id) === "string"
            && typeof(msg.text) === "string"
            && typeof(msg.author) === "string"
            && typeof(msg.createdAt) === "object";
    }

    function addMessage(msg){
        if(validateMessage(msg)){
            messages.push(msg);
            return true;
        }

        return false;
    }

    function editMessage(id, msg){
        let counter = 0;

        while(counter < messages.length){ // Пр
            if(id === messages[counter].id)
                break;

            ++counter;
        }
        /* Это проверка на существоваеие сообщения с данным id в messages, если id не может на входе быть несуществующим, тогда эти 4 строчки, можно удалить
            if(counter === messages.length) 
                return false;
        */
        let check, check1, check2;

        if(check = msg.hasOwnProperty("text") && typeof(msg.text) === "string" && msg.text.length <= 200)
            messages[counter].text = msg.text;

        if(check1 = msg.hasOwnProperty("isPersonal") && typeof(msg.isPersonal) === "boolean")
            messages[counter].isPersonal = msg.isPersonal;

        if(check2 = msg.hasOwnProperty("to") && typeof(msg.to) === "string" && msg.to !== "")
            messages[counter].to = msg.to;

        return Boolean(check + check1 + check2);
    }

    function removeMessage(id){
        for (counter in messages){
            if(id === messages[counter].id){
                messages.splice(counter, 1);
                return true;
            }
        }

        return false;
    }
})();