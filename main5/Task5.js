class Message{
    constructor(msg){
        this._id = msg.id;
        this._text = msg.text;
        this._createdAt = msg.createdAt || new Date();
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

    constructor(arr){
        if(arr !== undefined)
            for(let counter of arr){
                const newMessage = new Message(counter);
                if(MessageList.validate(newMessage))
                    this._arr.push(newMessage);
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

    add(msg){
        if(this.getUser !== undefined && this.getUser !== ""){
            const newMessage = new Message(msg);
            if(MessageList.validate(newMessage)){
                this._arr.push(newMessage);
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
        this._arr = [];
    }

    getPage(skip = 0, top = 10, filterConfig){
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
        })(text, author, dateTo, dateFrom).sort(function (a, b) { return a.getCreatedAt - b.getCreatedAt;}).slice(skip, skip + top);
    }
}
// Всё что выше, прошлое задание(4)

let generator = 0;
function generatorId() {
    return ++generator;
}

class UserList{
    constructor(users, activeUsers){
        this._users = users;
        this._activeUsers = activeUsers;
    }

    get getUsers(){
        return this._users;
    }

    get getActiveUsers(){
        return this._activeUsers;
    }
}

class HeaderView{
    constructor(containerId){
        this._id = containerId;
        this.blocker = 1;
    }
    
    get getId(){
        return this._id;
    }

    display(params) {
        if(this.blocker){
            document.getElementById("writeMessage").innerText = "Написать сообщение";
            --this.blocker;
        }

        const insertName = document.getElementById(this.getId);
        insertName.innerText = params;
       
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

    display(params) {
        document.getElementById(this.getId).innerText = ""; ///Доделать ещё кнопку загрузкi
        
        const newMessageBox = new DocumentFragment();
        const insert = document.getElementById(this.getId);
        
        params.forEach(item =>{
            if(item.getAuthor === messageList.getUser){
                let newDiv = document.createElement("div");
                newDiv.classList.add("message_my");
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
    
                const newDiv1 = document.createElement("div");
                newDiv1.classList.add("icon_user_at_message");
                newDiv1.innerHTML = `<span class="iconify" data-inline="false" data-icon="fa-solid:male" style="width: 20px; height: 35px; color: #606d7d;"></span>`;

                const newDiv2 = document.createElement("div");
                if(item.getIsPersonal && item.getTo === messageList.getUser)
                    newDiv2.classList.add("UserMessagesBackColorIsPersonal");
                else
                    newDiv2.classList.add("user_messages");
    
                newMessageBox.appendChild(newDiv);
                newDiv.appendChild(newDiv1);
                newDiv.appendChild(newDiv2);

                let newP = document.createElement("p");
                if(item.getIsPersonal && item.getTo === messageList.getUser){
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

class ActiveUsersView{
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
            if(item === messageList.getUser) continue;

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

function setCurrentUser(user){
    if(user !== undefined && user !== ""){
        if(userList.getUsers.find(counter => counter === user) === undefined){  
            userList.getActiveUsers.push(user);
            userList.getUsers.push(user);
        }
        
        messageList.setUser = user;

        headerView.display(user);
        showMessages();
    }
}

function addMessage(msg){
    if(messageList.add({id: String(generatorId()), text: msg.text, author: messageList.getUser, isPersonal: msg.isPersonal, to: msg.to})){
        showMessages();
        return true;
    }
    
    return false;
}

function editMessage(id, msg){
    if(messageList.edit(id, msg)){
        showMessages();
        return true;
    }
    
    return false;
}

function removeMessage(id){
    if(messageList.remove(id)){
        showMessages();
        return true;
    }

    return false;
}

function showMessages(skip, top, filterConfig){
    messagesView.display(messageList.getPage(skip, top, filterConfig));
}

function showActiveUsers(){
    activeUsersView.display(userList.getActiveUsers); 
}

const messageList = new MessageList();

const userList = new UserList(["Masha", "Misha", "Petia", "Vasia"], ["Misha", "Petia", "Vasia"]);

const headerView = new HeaderView("nameUser");

const messagesView = new MessagesView("messageBox");

const activeUsersView = new ActiveUsersView("listOfUsers");

// По поводу пункта e.PersonalUsersView, я подразумевал, что у меня в списке пользователей будут все юзеры(активные и не активные). Я могу вместо это класса сделать класс, который будет выводить в список 
// пользователей, сначала всех активных, потом не активных, т к, я думал, что можно отправлять личные сообщения всем пользователям)