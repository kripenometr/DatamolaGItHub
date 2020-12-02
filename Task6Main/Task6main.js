class Message{
    constructor(msg){
        this._id = msg.id;
        this._text = msg.text;
        if(msg.createdAt)
            this._createdAt = new Date(msg.createdAt);  //// переделанно из-за localstorage
        else
            this._createdAt = new Date();

        this._author = msg.author;
        this._isPersonal = msg.isPersonal || !!msg.to;
        this._to = msg.to;
    }

    get getId(){
        return this._id;
    }

    get getCreatedAt(){
        return this._createdAt;
    }

    get getAuthor(){
        return this._author;
    }        

    get getText(){
        return this._text;
    }   
    
    set setText(text){
        this._text = text;
    }   
    
    get getIsPersonal(){
        return this._isPersonal;
    }

    set setIsPersonal(isPersonal){
        this._isPersonal = isPersonal;
    }
    
    get getTo(){
        return this._to;
    }    

    set setTo(to){
        this._to = to;
    }
}

class MessageList{    
    _user;
    _arr = [];

    constructor(){
        let arrLocaleStorage = this.restore();
        if(arrLocaleStorage){
            for(let i = 0; i < arrLocaleStorage.length; ++i){
                let counter = arrLocaleStorage[i];
                const newMess = new Message({text: counter._text, id: counter._id, createdAt: counter._createdAt, author: counter._author, isPersonal: counter._isPersonal, to: counter._to });
                this._arr.push(newMess);
            }
        }
    }

    get getUser(){
        return this._user;
    }

    set setUser(user){
        this._user = user;
    }

    get getArrCollection(){
        return this._arr;
    }

    lengthArr(){
        let size = 0;
        for(let i of this.getArrCollection){
            if(i !== undefined) ++size;
        }

        return size;
    }

    add(msg){
        if(this.getUser !== undefined && this.getUser !== ""){
            const newMessage = new Message(msg);
            if(MessageList.validate(newMessage)){
                this._arr.push(newMessage);
                this.save(this.getArrCollection);
                return true;
            }
        }

        return false;    
    }

    get(id){
        return this._arr.find(counter => counter.getId === id);  
    }

    remove(id){
        let message = this.get(id);

        if(message.getAuthor === this.getUser) {
            this._arr.splice(this._arr.indexOf(message), 1);
            this.save(this.getArrCollection);
            return true;
        }

        return false;
    }

    edit(id, msg){
        let message = this.get(id);

        if(message.getAuthor === this.getUser) {
            let check, check1, check2;

            if(check = msg.hasOwnProperty("text") && typeof(msg.text) === "string" && msg.text.length <= 200) 
                message.setText = msg.text;

            if(check1 = msg.hasOwnProperty("isPersonal") && typeof(msg.isPersonal) === "boolean")
                message.setIsPersonal = msg.isPersonal;

            if(check2 = msg.hasOwnProperty("to") && typeof(msg.to) === "string" && msg.to !== "")                        
                message.setTo = msg.to;

            this.save(this.getArrCollection);

            return Boolean(check + check1 + check2);
        }

        return false;
    }

    static validate(msg){
        return msg.hasOwnProperty("_id")
            && msg.hasOwnProperty("_text")
            && msg.hasOwnProperty("_createdAt")
            && msg.hasOwnProperty("_author")
            && msg.getText.length <= 200                      
            && msg.getAuthor !== ""
            && typeof(msg.getId) === "string"
            && typeof(msg.getText) === "string"
            && typeof(msg.getAuthor) === "string"
            && typeof(msg.getCreatedAt) === "object";
    }

    addAll(arr){
        let noValidateMessages = [];

        for(let counter of arr)
            MessageList.validate(counter) ? this._arr.push(counter) : noValidateMessages.push(counter);

        return noValidateMessages;
    }

    clear(){
        this.getArrCollection = [];
        this.save(this.getArrCollection);
    }

    getPage(skip = 0, top = 10, filterConfig = undefined){
        let author, text, dateTo, dateFrom;

        if(filterConfig != undefined){
            if(filterConfig.hasOwnProperty("author") && filterConfig.author !== "")
                author = filterConfig.author;

            if(filterConfig.hasOwnProperty("text") && filterConfig.text.length <= 200)
                text = filterConfig.text;

            if(filterConfig.hasOwnProperty("dateTo"))
                dateTo = filterConfig.dateTo;

            if(filterConfig.hasOwnProperty("dateFrom"))
                dateFrom = filterConfig.dateFrom; 
        }

        return ((substringText = "", substringAuthor = "", dateTo = new Date(), dateFrom = 0) => {
            let arrMessages1 = [];
            
            for(let counter of this._arr){
                if(counter.getIsPersonal && counter.getAuthor !== this.getUser && counter.getTo !== this.getUser) continue;
                if(    counter.getText.includes(substringText) 
                    && counter.getAuthor.includes(substringAuthor) 
                    && counter.getCreatedAt <= dateTo 
                    && counter.getCreatedAt >= dateFrom)  
                    arrMessages1.push(counter);
            }

            return arrMessages1;
        })(text, author, dateTo, dateFrom).sort(function (a, b) { return a.getCreatedAt - b.getCreatedAt;}).slice(-10); // .slice(skip, skip + top)
    }

    save(arr){
        localStorage.setItem("ArrayMessages", JSON.stringify(arr));
    }

    restore(){
        return JSON.parse(localStorage.getItem("ArrayMessages"));
    }
}


class UserList{
    _users = [];
    _activeUsers = [];

    constructor(){
        this._users = this.restore();
        this._activeUsers = this.restore();
    }

    get getUsers(){
        return this._users;
    }

    get getActiveUsers(){
        return this._activeUsers;
    }

    newUser(name){
        this._users.push(name);
        this._activeUsers.push(name);
        
        this.save(this.getUsers);
    }

    save(arr){
        localStorage.setItem("ArrayUsers", JSON.stringify(arr));
    }

    restore(){
        return JSON.parse(localStorage.getItem("ArrayUsers"));
    }
}

class HeaderView{
    constructor(containerId){
        this._id = containerId;
    }
    
    get getId(){
        return this._id;
    }

    display(params) {
        const insertName = document.getElementById(this.getId);
        const insertInput = document.getElementById("writeMessage");
        const iconExit = document.querySelector(".icon_entrance");

        insertName.innerText = "";
        insertName.innerText = params;

        insertInput.innerHTML = `<input name="textInputMessage" type="text" id="textInput" placeholder="Написать сообщение" class="inputMessageStyle">`;

        iconExit.innerText = "";
        iconExit.classList.remove("icon_entrance");
        iconExit.classList.add("icon_exit");
        iconExit.innerHTML = `<span class="iconify" data-inline="false" data-icon="fa-solid:sign-out-alt" style="width: 35px; height: 33px; color: #606d7d;"></span>
                              <p id="textExitEntrance">Выйти</p>`;
        
        
    }
}

class MessagesView{
    constructor(containerId){
        this._id = containerId;
        this._arrDate = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    }
    
    get getId(){
        return this._id;
    }

    get getArrDate(){
        return this._arrDate;
    }

    display(params, filterBoolean) {
        document.getElementById(this.getId).innerText = ""; ///Доделать ещё кнопку загрузкi
        
        const newMessageBox = new DocumentFragment();
        const insert = document.getElementById(this.getId);
        if(filterBoolean)
            insert.innerHTML = `<div class="breakMessList" id="breakMessageList"><p>Вернуться к списку сообщений</p></div>`;
        
        params.forEach(item =>{
            if(item.getAuthor === chatController.getMessageList.getUser){
                let newDiv = document.createElement("div");
                newDiv.classList.add("message_my");
                newDiv.id = item.getId;
                newMessageBox.appendChild(newDiv);

                const newDiv1 = document.createElement("div");
                newDiv1.classList.add("user_messages_my");
                newDiv.appendChild(newDiv1);
                

                let newDiv2 = document.createElement("div");
                newDiv2.classList.add("color_name_my");
                newDiv1.appendChild(newDiv2);

                let newP = document.createElement("p");
                item.getIsPersonal ? newP.innerText = `Я для ${item.getTo}` :  newP.innerText = `Я`;
                newDiv2.appendChild(newP);
                
                
                newDiv2 = document.createElement("div");
                newDiv2.classList.add("icon_editing");
                newDiv2.innerHTML = `<span class="iconify" data-inline="false" data-icon="entypo:pencil" style="width: 35px; height: 20px; color:  #606d7d;"></span>`;
                newDiv1.appendChild(newDiv2);

                newDiv2 = document.createElement("div");
                newDiv2.classList.add("icon_delete");
                newDiv2.innerHTML = ` <span class="iconify" data-inline="false" data-icon="ic:baseline-delete" style="width: 35px; height: 20px; color:  #606d7d;"></span>`;
                newDiv1.appendChild(newDiv2);
                
                newP = document.createElement("p");
                newP.innerText = item.getText;
                newP.classList.add("text_my");
                newDiv.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = `${item.getCreatedAt.getHours()}:${item.getCreatedAt.getMinutes() < 10 ? "0" + item.getCreatedAt.getMinutes() : item.getCreatedAt.getMinutes()}, ${item.getCreatedAt.getDate()} ${this.getArrDate[item.getCreatedAt.getMonth()]}`;
                newP.classList.add("time_data_my");
                newDiv.appendChild(newP);
            }
            else{
                const newDiv = document.createElement("div");
                newDiv.classList.add("message");
                newDiv.id = item.getId;
    
                const newDiv1 = document.createElement("div");
                newDiv1.classList.add("icon_user_at_message");
                newDiv1.innerHTML = `<span class="iconify" data-inline="false" data-icon="fa-solid:male" style="width: 20px; height: 35px; color: #606d7d;"></span>`;

                const newDiv2 = document.createElement("div");
                if(item.getIsPersonal && item.getTo === chatController.getMessageList.getUser)
                    newDiv2.classList.add("UserMessagesBackColorIsPersonal");
                else
                    newDiv2.classList.add("user_messages");
    
                newMessageBox.appendChild(newDiv);
                newDiv.appendChild(newDiv1);
                newDiv.appendChild(newDiv2);

                let newP = document.createElement("p");
                if(item.getIsPersonal && item.getTo === chatController.getMessageList.getUser){
                    newP.innerText = `Мне, от ${item.getAuthor}`;
                    newP.classList.add("colorNameIsPesonal");        
                }
                else{
                    newP.innerText = item.getAuthor;
                    newP.classList.add("color_name");
                }
                newDiv2.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = item.getText;
                newP.classList.add("text");
                newDiv2.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = `${item.getCreatedAt.getHours()}:${item.getCreatedAt.getMinutes() < 10 ? "0" + item.getCreatedAt.getMinutes() : item.getCreatedAt.getMinutes()}, ${item.getCreatedAt.getDate()} ${this.getArrDate[item.getCreatedAt.getMonth()]}`;
                newP.classList.add("time_data");
                newDiv2.appendChild(newP);
            }
        });
        
        insert.appendChild(newMessageBox);
    }
}

class ActiveUsersView{     //Работает по сути и для не активных пользователей, сделай потом после каждого действия отображение пользователей(мол если кто-то зашел);
    constructor(containerId){
        this._id = containerId;
    }
    
    get getId(){
        return this._id;
    }

    display(params) {
        const newUsersBox = new DocumentFragment();
        const insert = document.getElementById(this.getId);
    
        for(let item of params){
            if(item === chatController.messageList.getUser) continue;

            const newDiv = document.createElement("div");
            newDiv.classList.add("user");
            newUsersBox.appendChild(newDiv);

            let newDiv1 = document.createElement("div");
            newDiv1.classList.add("icon_user");
            newDiv1.innerHTML = `<span class="iconify" data-inline="false" data-icon="fa-solid:male" style="width: 20px; height: 35px; color: #606d7d;"></span>`;
            newDiv.appendChild(newDiv1);

            newDiv1 = document.createElement("div");
            newDiv1.classList.add("name_user");
            newDiv.appendChild(newDiv1);

            const newP = document.createElement("p");
            newP.innerText = item;
            newDiv1.appendChild(newP);

            newDiv1 = document.createElement("div");
            newDiv1.classList.add("status");
            newDiv.appendChild(newDiv1);

            const newDiv2 = document.createElement("div");
            newDiv2.classList.add("circle");
            newDiv1.appendChild(newDiv2);
        }

        insert.appendChild(newUsersBox);
    }
}   

class FilterView{
    constructor(containerId){
        this._id = containerId;
    }
    
    get getId(){
        return this._id;
    }

    display(params) {
    }
}

class PersonalUsersView{
    constructor(containerId){
        this._id = containerId;
    }
    
    get getId(){
        return this._id;
    }

    display(params) {
    }
}

class ChatController{
    constructor(){
        this.messageList = new MessageList();
        this.userList = new UserList();
        //||||| Модели

        this.headerView = new HeaderView("nameUser");
        this.messagesView = new MessagesView("messageBox");
        this.activeUsersView = new ActiveUsersView("listOfUsers");
        //|||||| VIEW CLASSES
    }

    get getMessageList(){
        return this.messageList;
    }

    get getUserList(){
        return this.userList;
    }

    get getHeaderView(){
        return this.headerView;
    }

    get getMessagesView(){
        return this.messagesView;
    }

    setCurrentUser(user){
        if(user !== undefined && user !== ""){
            if(this.userList.getUsers.find(counter => counter === user) === undefined){  
                this.userList.getActiveUsers.push(user);
                this.userList.getUsers.push(user);
            }
            
            this.messageList.setUser = user;
    
            this.headerView.display(user);
            this.showMessages();
        }
    }

    addMessage(msg){
        if(this.messageList.add({id: String(generatorId()), text: msg.text, author: this.messageList.getUser, isPersonal: msg.isPersonal, to: msg.to})){
            this.showMessages();
            return true;
        }
        
        return false;
    }

    editMessage(id, msg){
        if(this.messageList.edit(id, msg)){
            this.showMessages();
            return true;
        }
        
        return false;
    }

    removeMessage(id){
        if(this.messageList.remove(id)){
            this.showMessages();
            return true;
        }
    
        return false;
    }

    showMessages(skip, top, filterConfig, filterBoolean){
        
        this.messagesView.display(this.messageList.getPage(skip, top, filterConfig), filterBoolean);
        
    }

    showActiveUsers(){
        this.activeUsersView.display(this.userList.getActiveUsers); 
    }

    authorization(){
        body.innerHTML = "";
        body.innerHTML = pageEntrance;

        const home = document.getElementById("iconBreakEntrance");
        home.addEventListener("click", event => {
            
            document.location.reload();
        });

        const submitEntrance = document.getElementById("submitEntrance");
        submitEntrance.addEventListener("click", event => {
            let login = document.querySelector(".loginStyle").value;
            if(!login) return;// Здесь доделать вид "Введенные данные не корректны"
            //let password = document.querySelector(".passwordStyle").value;;
            
            body.innerHTML = "";
            body.innerHTML = pageMain;
        
            chatController.setCurrentUser(login);   
            chatController.showActiveUsers();
        
                main();
            });

        const checkIn = document.getElementById("buttonCheckIn");

        checkIn.addEventListener("click", chatController.checkIn);
    }

    checkIn(){
        body.innerHTML = "";
        body.innerHTML = pageCheckIn;

        const home = document.getElementById("iconBreakEntrance");

        home.addEventListener("click", event => {
            
            chatController.authorization();
        });

        const buttonCheckIn = document.getElementById("checkIn");

        buttonCheckIn.addEventListener("click", event =>{
            let login = document.getElementById("loginCheckIn").value;
            //let password1 = document.getElementById("password1CheckIn").value;
            //let password2 = document.getElementById("password2CheckIn").value;
        
            chatController.getUserList.newUser(login);

            chatController.authorization();
        });
    }
}

let generator = localStorage.getItem("GeneratorID");
function generatorId() {
    generator++;
    localStorage.setItem("GeneratorID", generator);
    
    return generator;
}

function localeStorageAdd() {
    if(!localStorage.getItem("ArrayUsers") && !localStorage.getItem("ArrayMessages")){
        localStorage.setItem("ArrayMessages", JSON.stringify([
            {
                _id: "b2c125c0-4d1e-4053-a6ec-ec12c75498d0",
                _text: "Привет всем!!!",
                _createdAt: new Date("2020-10-10T13:40:00"),
                _author: "Саша Петров",
                _isPersonal: false
            },
        
            {
                _id: "4bce6883-ece4-4c95-9ea2-74feb450bc4c",
                _text: "Привет)",
                _createdAt: new Date("2020-10-10T13:42:00"),
                _author: "Катя Смирнова",
                _isPersonal: true,
                _to: "Ваня Козлов"
            },
        
            {
                _id: "f3995ca2-2315-4ee4-8190-47e899dc5f2a",
                _text: "Приветики)",
                _createdAt: new Date("2020-10-10T13:45:00"),
                _author: "Коля Сидоров",
                _isPersonal: false
            },
        
            {
                _id: "f59aeec5-be08-4cbf-996a-f47bf5c2af94",
                _text: "Доброе утро",
                _createdAt: new Date("2020-10-10T13:50:00"),
                _author: "Ваня Козлов",
                _isPersonal: false
            },
        
            {
                _id: "8d638c7e-6d75-4eaf-a401-c0958b916bfc",
                _text: "Начинаем работать",
                _createdAt: new Date("2020-10-10T13:55:00"),
                _author: "Катя Смирнова",
                _isPersonal: false
            },
        
            {
                _id: "9c45fc5d-f3bb-4858-b1ab-85dff5896463",
                _text: "Что будем делать?",
                _createdAt: new Date("2020-10-10T14:00:00"),
                _author: "Ваня Козлов",
                _isPersonal: false
            },
        
            {
                _id: "1f0725aa-281b-4220-a38c-3a95f7ea368d",
                _text: "Сегодня будем создавать калькулятор на JS)",
                _createdAt: new Date("2020-10-10T14:10:00"),
                _author: "Катя Смирнова",
                _isPersonal: false
            }]));
    
        localStorage.setItem("ArrayUsers", JSON.stringify(["Masha", "Misha", "Petia", "Vasia"]));

        localStorage.setItem("GeneratorID", 0);
    }
}

localeStorageAdd();

let chatController = new ChatController();

let pageEntrance = `<header class="headerPageEntrance">
            <div class="iconBreak" id="iconBreakEntrance"> 
                <span class="iconify" data-inline="false" data-icon="fa-solid:home" style="font-size: 45px; color: #606D7D;"></span>
            </div>
            <div class="nameChat">
            <p>Datamola Chat</p>
            </div>
            </header>
            <div class="form">
                <form class="styleForm" name="data">
                    <p>
                    <input name="textLogin" type="text" placeholder="Логин" class="loginStyle"><br>
                    <input name="textPassword" type="text" placeholder="Пароль" class="passwordStyle"><br>
                    
                    <input type="submit" value="Войти" class="entrance" id="submitEntrance"><br>
                    <input type="button" value="Регистрация" class="checkIn" id="buttonCheckIn"></p>
                </form>
            </div>

            <footer class="footerPageEntrance">
                        <p class="styleFooter">Datamola Chat<br>
                            Автор: Поливода Михаил<br>
                            Email: mihail_polivoda@mail.ru<br>
                            Версия 1.0 (09.10.2020)
                        </p>
                    </footer>   `;

let pageMain = `<div class="main">

                <header class="header">

                    <div class="info_user">

                        <div class="icon_avatar">

                            <span class="iconify" data-inline="false" data-icon="fa-solid:male" style="width: 20px; height: 35px; color: #606d7d;"></span>

                        </div>

                        <div class="name_user">

                            <p id="nameUser">Гость</p>

                        </div>

                        <div class="icon_entrance" >

                            <span class="iconify" id="iconEntrance" data-inline="false" data-icon="fa-solid:sign-in-alt" style="width: 35px; height: 33px; color: #606d7d;"></span>
                            <p id="textExitEntrance">Войти</p>

                        </div>

                    </div>

                    <div class="info_chat">

                        <div class="icon_chat">

                            <span class="iconify" data-inline="false" data-icon="fa-solid:comment-dots" style="width: 35px; height: 35px; color: #606d7d;"></span>

                        </div>

                        <div class="name_chat">

                            <p>Datamola Chat</p>
                            <p class="number_in_the_network">** участников, ** в сети</p>

                        </div>

                        <div class="filters">

                            <div class="filter_window" id="filterWindow">

                                <div class="icon_filter_1" id="iconFilter1">

                                    <span class="iconify" data-inline="false" data-icon="fa-solid:user" style="font-size: 20px; color: #606d7d;"></span>

                                </div>

                                <div class="icon_filter_2" id="iconFilter2">

                                    <span class="iconify" data-inline="false" data-icon="cil:calendar" style="font-size: 20px; color: #606d7d;"></span>

                                </div>

                                <div class="icon_filter_3" id="iconFilter3">

                                    <span class="iconify" data-inline="false" data-icon="bi:card-text" style="font-size: 22px; color: #606d7d;"></span>

                                </div>

                                <div class="text_filters" id="textFilter">

                                    <input name="textLogin1" type="text" placeholder="Фильтры" class="filterStyle" id="filterText">

                                </div>

                                <div class="icon_filter_11" id="iconFilter11">

                                    <span class="iconify" data-inline="false" data-icon="fa-solid:user" style="font-size: 20px; color: #606d7d;"></span>

                                </div>

                                <div class="icon_filter_22" id="iconFilter22">

                                    <span class="iconify" data-inline="false" data-icon="cil:calendar" style="font-size: 20px; color: #606d7d;"></span>

                                </div>

                                <div class="displayNone3" id="iconFilter33">

                                    <span class="iconify" data-inline="false" data-icon="bi:card-text" style="font-size: 22px; color: #606d7d;"></span>

                                </div>

                                <div class="icon_search" id="iconSearch">

                                    <span class="iconify" data-inline="false" data-icon="simple-line-icons:magnifier" style="font-size: 24px; color: #606d7d;"></span>

                                </div>

                            </div>

                        </div>

                    </div>

                </header>


                <div class="main_body">

                    <div class="list_of_users" id="listOfUsers">

                    </div>

                    <div class="message_box" id="messageBox">
                        <!-- <div class="load_more">

                            <p>Загрузить ещё</p>

                        </div>  -->
                        
                    </div>

                </div>

                <footer class="footer">

                    <div class="info_creator">

                        <p>Datamola Chat</p>
                        <p>Автор: Поливода Михаил</p>
                        <p>Email: mihail_polivoda@mail.ru</p>
                        <p>Версия 1.0 (09.10.2020)</p>

                    </div>

                    <div class="sending_messages">

                        <div class="write_message" id="writeMessage">


                        </div>

                        <div class="icon_dispatch" id="dispatchIcon">

                            <span class="iconify" data-inline="false" data-icon="fa-solid:location-arrow" style="width: 35px; height: 35px; color: #606d7d;"></span>

                        </div>

                    </div>

                </footer>

                </div>`;

let pageCheckIn = `<header class="headerPageEntrance">
                    <div class="iconBreak" id="iconBreakEntrance"> 
                    <span class="iconify" data-inline="false" data-icon="fa-solid:home" style="font-size: 45px; color: #606D7D;"></span>
                    </div>
                    <div class="nameChat">
                    <p>Datamola Chat</p>
                    </div>
                    </header>
                    <div class="form">
                        <form class="styleForm" name="checkIn">
                            <p>
                            <input name="textLogin1" type="text" placeholder="Логин" class="loginStyle" id="loginCheckIn"><br>
                            <input name="textPassword1" type="text" placeholder="Пароль" class="passwordStyle" id="password1CheckIn"><br>
                            <input name="textPassword2" type="text" placeholder="Подтверждение пароля" class="passwordStyle" id="password2CheckIn"><br>
                            
                            <input type="submit" id="checkIn" value="Зарегистрироваться" class="entrance"><br></p>
                        </form>
                    </div>

                    <footer class="footerPageEntrance">
                        <p class="styleFooter">Datamola Chat<br>
                            Автор: Поливода Михаил<br>
                            Email: mihail_polivoda@mail.ru<br>
                            Версия 1.0 (09.10.2020)
                        </p>
                    </footer>`;

const body = document.querySelector("body");

body.innerHTML = pageMain;

const entrance = document.querySelector(".icon_entrance");

entrance.addEventListener("click", chatController.authorization);

let id;

function main() {
    
    const exit = document.querySelector(".icon_exit");

    exit.addEventListener("click", event =>{ 
        body.insertAdjacentHTML("afterbegin", `<div class="styleDelete">
                                                    <div class = "conteinerDelete" id="conteinerDel">
                                                    <p class="textDeleteQuestion">Вы действительно хотите выйти?</p>
                                                    
                                                    <div class="conteinerDeleteBreak">
                                                        <div class="textBreak" id="noDeleteM">
                                                        Отмена
                                                        </div>
                                                        
                                                        <div class="textDelete" id="DeleteM">
                                                            Выйти         
                                                        </div>
                                                    </div>

                                                    </div>
                                                </div>`);   
        const questionDeleteMes = document.getElementById("conteinerDel");
        questionDeleteMes.addEventListener("click", event =>{
            let target = event.target;
            const question = document.querySelector(".styleDelete");
            if(target.classList.contains("textBreak")){
                question.remove();
            }
            if(target.classList.contains("textDelete")){
                question.remove();
                document.location.reload();    
            }
        });
    });

    /* ФИЛЬТРЫ  */
    const filter1 = document.getElementById("iconFilter1");
    const filter2 = document.getElementById("iconFilter2");
    const filter3 = document.getElementById("iconFilter3");

    const filter11 = document.getElementById("iconFilter11");
    const filter22 = document.getElementById("iconFilter22");
    const filter33 = document.getElementById("iconFilter33");

    filter1.addEventListener("click", event => {
        if(filter11.classList.contains("icon_filter_11")){
            filter11.classList.remove("icon_filter_11");
            filter11.classList.add("displayNone1");

            document.getElementById("textFilter").innerHTML = `<input name="textLogin1" type="text" placeholder="Фильтры" class="filterStyle" id="filterText">`;

            if(filter22.classList.contains("displayNone2")){
                filter22.classList.remove("displayNone2");
                filter22.classList.add("icon_filter_22");
            }

            if(filter33.classList.contains("displayNone3")){
                filter33.classList.remove("displayNone3");
                filter33.classList.add("icon_filter_33");
            }
        }
    });

    filter2.addEventListener("click", event => {
        if(filter22.classList.contains("icon_filter_22")){
            filter22.classList.remove("icon_filter_22");
            filter22.classList.add("displayNone2");
            document.getElementById("textFilter").innerHTML = `<input type="date" value="2020-04-10" min="2019-12-12" class="date" id="dateInput">`;


            if(filter11.classList.contains("displayNone1")){
                filter11.classList.remove("displayNone1");
                filter11.classList.add("icon_filter_11");
            }
            if(filter33.classList.contains("displayNone3")){
                filter33.classList.remove("displayNone3");
                filter33.classList.add("icon_filter_33");
            }
        }
    });

    filter3.addEventListener("click", event => {
        if(filter33.classList.contains("icon_filter_33")){
            filter33.classList.remove("icon_filter_33");
            filter33.classList.add("displayNone3");

            document.getElementById("textFilter").innerHTML = `<input name="textLogin1" type="text" placeholder="Фильтры" class="filterStyle" id="filterText">`;
    
            if(filter22.classList.contains("displayNone2")){
                filter22.classList.remove("displayNone2");
                filter22.classList.add("icon_filter_22");
            }
            if(filter11.classList.contains("displayNone1")){
                filter11.classList.remove("displayNone1");
                filter11.classList.add("icon_filter_11");
            }
        }

    });

    const filtration = document.getElementById("iconSearch");

    filtration.addEventListener("click", event =>{
            let textFilter = document.getElementById("textFilter").childNodes[0].value;
            
            if(textFilter === "" || textFilter === undefined) return;

            document.getElementById("textFilter").childNodes[0].value = "";

            
            if(filter11.classList.contains("displayNone1")){
                chatController.showMessages(0, 10, {author: textFilter}, true);
            }
            
            if(filter22.classList.contains("displayNone2")){
                chatController.showMessages(0, 10, {dateFrom: new Date(textFilter).getTime(), dateTo: new Date(textFilter).getTime() + 86400000}, true);
            }

            if(filter33.classList.contains("displayNone3")){
                chatController.showMessages(0, 10, {text: textFilter}, true);
            }

        const mesListBreak =  document.getElementById("breakMessageList");

        mesListBreak.addEventListener("click", event => {
            document.getElementById("breakMessageList").remove();
            chatController.showMessages();
        });
    });



    /*Отправка сообщений */
    const mesDispatch = document.querySelector(".icon_dispatch")

    mesDispatch.addEventListener("click", event =>{  
            let privateNameInput = document.getElementById("textInput");

            let textMess = document.getElementById("textInput").value;    
            if(textMess === "" || textMess === undefined) return;

            document.getElementById("textInput").value = "";
            
            if(privateNameInput.placeholder === "Написать сообщение" && !document.getElementById("crossEdit")){
                
                chatController.addMessage({text: textMess, isPersonal: false});
            }

            if(privateNameInput.placeholder === "Личное сообщение" && !document.getElementById("crossEdit")){
                let counter = document.getElementById("listOfUsers").childNodes, nameTo;
                for(let i = 1; i < counter.length; ++i){
                        if(counter[i].classList.contains("userPrivateStyle")){
                            nameTo = counter[i].childNodes[1].innerText;
                            counter[i].classList.remove("userPrivateStyle");
                            privateNameInput.placeholder = "Написать сообщение";
                            break;
                        }
                }
                chatController.addMessage({text: textMess, isPersonal: true, to: nameTo});
            }

            if(document.getElementById("crossEdit")){
                document.getElementById("newEditIcon").remove();
                document.getElementById("crossEdit").remove();
                chatController.editMessage(id, {text: textMess});
            }
    });
            
    const privateMess = document.getElementById("listOfUsers");

    privateMess.addEventListener("click", event =>{
        let target = event.target;
        while(true){
            if(target.classList.contains("user")){
                if(target.classList.contains("userPrivateStyle")){
                    target.classList.remove("userPrivateStyle")    
                    let privateNameInput = document.getElementById("textInput");
                    privateNameInput.placeholder = "Написать сообщение";
                    privateNameInput.value = "";

                    break;
                }
                else{
                    target.classList.add("userPrivateStyle");
                    let privateNameInput = document.getElementById("textInput");
                    privateNameInput.placeholder = "Личное сообщение";

                    break;
                }
            }
            target = target.parentNode;
        }
    }); 

    document.getElementById("messageBox").addEventListener("click", event =>{  // Логика удаления и редактирования сообщений
        if(event.target.parentNode.parentNode.classList.contains("icon_delete")){
            let target = event.target;
            
            while(true){
                if(target.classList.contains("message") || (target.classList.contains("message_my"))){
                id = target.id;
                break; 
                }
                target = target.parentNode;
            }
            const el = document.querySelector("body");
            el.insertAdjacentHTML("afterbegin", `<div class="styleDelete">
                                                    <div class = "conteinerDelete" id="conteinerDel">
                                                    <p class="textDeleteQuestion">Удалить это сообщение?</p>
                                                    
                                                    <div class="conteinerDeleteBreak">
                                                        <div class="textBreak" id="noDeleteM">
                                                        Отмена
                                                        </div>
                                                        
                                                        <div class="textDelete" id="DeleteM">
                                                            Удалить         
                                                        </div>
                                                    </div>

                                                    </div>
                                                </div>`);

            const questionDeleteMes = document.getElementById("conteinerDel");
            questionDeleteMes.addEventListener("click", event =>{
                let target = event.target;
                const question = document.querySelector(".styleDelete");
                if(target.classList.contains("textBreak")){
                    question.remove();
                }
                if(target.classList.contains("textDelete")){
                    question.remove();
                    chatController.removeMessage(id);    
                }
            });
        }

        if(event.target.parentNode.parentNode.classList.contains("icon_editing")){
            const interfaceEdit = document.getElementById("writeMessage");
            interfaceEdit.insertAdjacentHTML("afterbegin", `<div id="newEditIcon"><span class="iconify" data-inline="false" data-icon="entypo:pencil" style="font-size: 24px; color: #606d7d;"></span></div>`);
            interfaceEdit.insertAdjacentHTML("beforeend", `<div class="crossEdit" id="crossEdit"><span class="iconify" data-inline="false" data-icon="raphael:cross" style="font-size: 24px; color: #606d7d;"></span></div>`);

            const textEdit = document.getElementById("textInput");//value

            let target = event.target;
            
            while(true){
                if(target.classList.contains("message") || (target.classList.contains("message_my"))){
                id = target.id;
                break; 
                }
                target = target.parentNode;
            }

            const textEditMessage = document.getElementById(`${id}`).querySelector(".text_my").innerText;
            textEdit.value = textEditMessage;

            const exitEdit = document.getElementById("crossEdit").addEventListener("click", event =>{
                document.getElementById("newEditIcon").remove();
                textEdit.value = "";
                document.getElementById("crossEdit").remove();
            });
        }

    });
}
