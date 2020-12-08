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
        document.getElementById(this.getId).innerText = ""; 
        
        const newMessageBox = new DocumentFragment();
        const insert = document.getElementById(this.getId);

        if(filterBoolean){
            clearInterval(viewMess);
            insert.innerHTML = `<div class="breakMessList" id="breakMessageList"><p>Вернуться к списку сообщений</p></div> <div class="loadMore1" id="loadMoreMess1"><p>Загрузить ещё</p></div>`;

            const mesListBreak =  document.getElementById("breakMessageList");

            const loadMore1 = document.getElementById("loadMoreMess1");

            loadMore1.addEventListener("click", event => {

                topPag += 10;
                chatController.showMessages(filterConfigLoadMore, true);

            });

            mesListBreak.addEventListener("click", event => {
                topPag = 10;
                document.getElementById("breakMessageList").remove();
                chatController.showMessages();

                viewMess = setInterval(() =>{
                    chatApiService.getMessages().then((res) => {
                        if(lastMess.id !== res[0].id || lastMess.text !== res[0].text){
                            chatController.showMessages();
                        }
                    })
                }, 5000);
            });
        }
        else{
            insert.innerHTML = `<div class="loadMore" id="loadMoreMess"><p>Загрузить ещё</p></div>`;

            const loadMore =  document.getElementById("loadMoreMess");

            loadMore.addEventListener("click", event => {

                document.getElementById("loadMoreMess").remove();
                topPag += 10;
                chatController.showMessages();
            });
        }

        lastMess = params[0];
        params.reverse();
        params.forEach(item =>{
            if(item.author === chatController.userName){
                let maxDate = new Date(item.createdAt);
                let isoDate = maxDate.toISOString(); 
                item.createdAt = new Date(isoDate);


                let newDiv = document.createElement("div");
                newDiv.classList.add("message_my");
                newDiv.id = item.id;
                newMessageBox.appendChild(newDiv);

                const newDiv1 = document.createElement("div");
                newDiv1.classList.add("user_messages_my");
                newDiv.appendChild(newDiv1);
    

                let newDiv2 = document.createElement("div");
                newDiv2.classList.add("color_name_my");
                newDiv1.appendChild(newDiv2);

                let newP = document.createElement("p");
                item.isPersonal ? newP.innerText = `Я для ${item.to}` :  newP.innerText = `Я`;
                newDiv2.appendChild(newP);
                
                
                newDiv2 = document.createElement("div");
                newDiv2.classList.add("icon_editing");
                newDiv2.innerHTML = `<span class="iconify" data-inline="false" data-icon="entypo:pencil" style="width: 35px; height: 20px; color:  #606d7d;"></span>`;
                newDiv1.appendChild(newDiv2);

                newDiv2 = document.createElement("div");
                newDiv2.classList.add("icon_delete");
                newDiv2.id = "delete12";
                newDiv2.innerHTML = ` <span class="iconify" data-inline="false" data-icon="ic:baseline-delete" style="width: 35px; height: 20px; color:  #606d7d;"></span>`;
                newDiv1.appendChild(newDiv2);
                
                newP = document.createElement("p");
                newP.innerText = item.text;
                newP.classList.add("text_my");
                newDiv.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = `${item.createdAt.getHours()}:${item.createdAt.getMinutes() < 10 ? "0" + item.createdAt.getMinutes() : item.createdAt.getMinutes()}, ${item.createdAt.getDate()} ${this.getArrDate[item.createdAt.getMonth()]}`;
                newP.classList.add("time_data_my");
                newDiv.appendChild(newP);
            }
            else{
                let maxDate = new Date(item.createdAt);
                let isoDate = maxDate.toISOString(); 
                item.createdAt = new Date(isoDate);

                const newDiv = document.createElement("div");
                newDiv.classList.add("message");
                newDiv.id = item.id;
    
                const newDiv1 = document.createElement("div");
                newDiv1.classList.add("icon_user_at_message");
                newDiv1.innerHTML = `<span class="iconify" data-inline="false" data-icon="fa-solid:male" style="width: 20px; height: 35px; color: #606d7d;"></span>`;

                const newDiv2 = document.createElement("div");
                if(item.isPersonal && item.to === chatController.userName)
                    newDiv2.classList.add("UserMessagesBackColorIsPersonal");
                else
                    newDiv2.classList.add("user_messages");
    
                newMessageBox.appendChild(newDiv);
                newDiv.appendChild(newDiv1);
                newDiv.appendChild(newDiv2);

                let newP = document.createElement("p");
                if(item.isPersonal && item.to === chatController.userName){
                    newP.innerText = `Мне, от ${item.author}`;
                    newP.classList.add("colorNameIsPesonal");        
                }
                else{
                    newP.innerText = item.author;
                    newP.classList.add("color_name");
                }
                newDiv2.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = item.text;
                newP.classList.add("text");
                newDiv2.appendChild(newP);

                newP = document.createElement("p");
                newP.innerText = `${item.createdAt.getHours()}:${item.createdAt.getMinutes() < 10 ? "0" + item.createdAt.getMinutes() : item.createdAt.getMinutes()}, ${item.createdAt.getDate()} ${this.getArrDate[item.createdAt.getMonth()]}`;
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
        insert.innerHTML = "";

        for(let item of params){
            if(item.name === chatController.userName) continue;

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
            newP.innerText = item.name;
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
        this.headerView = new HeaderView("nameUser");
        this.messagesView = new MessagesView("messageBox");
        this.activeUsersView = new ActiveUsersView("listOfUsers");

        this.userName = "";
        this.userToken = "";
        this.arrUsers = [];
        this.arrMess = [];
    }

    get getUserToken(){
        return this._userToken;
    }

    set setUserToken(userTok){
        this._userToken = userTok;
    }

    setCurrentUser(userNameView){
        body.innerHTML = pageMain;
        this.headerView.display(userNameView);
        this.showUsers();
        this.showMessages();
        main();
    }

    addMessage(msg){
        msg.author = chatController.userName;
        
        chatApiService.postMessages(msg)
        .then(() => {
            return chatApiService.getMessages()
        })
        .then((resArrMessages) => {
            this.arrMess = [];  
            for(let counter of resArrMessages){
                this.arrMess.push({id: counter.id, text: counter.text, createdAt: counter.createdAt, author: counter.author, isPersonal: counter.isPersonal, to: counter.to});
            }
        })
        .then(() => {
            this.showMessages();
        })

    }

    editMessage(id, msg){
        chatApiService.putMessages(id, msg).then(() => {
            this.showMessages();
        });
    }

    removeMessage(id){
        chatApiService.delMessages(id).then(() => {
            this.showMessages();
        });  
    }

    showMessages(filterConfig, filterBoolean){
        chatApiService.getMessages(filterConfig)
        .then((resArrMessages) => {
            this.arrMess = [];  
            for(let counter of resArrMessages){
                this.arrMess.push({id: counter.id, text: counter.text, createdAt: counter.createdAt, author: counter.author, isPersonal: counter.isPersonal, to: counter.to});
            }
        })
        .then(() => {
            this.messagesView.display(this.arrMess, filterBoolean);
        });
    }

    showUsers(){
        chatApiService.getUserses()
        .then(resArrUsers => {
            this.arrUsers = [];
            for(let item of resArrUsers){
                if(item.isActive) 
                    this.arrUsers.push(item);
            }
        
            if(this.arrUsers.length !== lengthUsers){
                lengthUsers = this.arrUsers.length;
                return true;
            }
            
            return false;
        })
        .then((Bool) => {
            if(Bool)
                this.activeUsersView.display(this.arrUsers); 
        });
    }

    authorization(){
        body.innerHTML = pageEntrance;

        const home = document.getElementById("iconBreakEntrance");
        home.addEventListener("click", event => {
            document.location.reload();
        });

        const submitEntrance = document.getElementById("submitEntrance");
        submitEntrance.addEventListener("click", event => {
            event.preventDefault();

            let login = document.querySelector(".loginStyle").value;
                                                                        //if(!login) return; Здесь доделать вид "Введенные данные не корректны"
            let password = document.querySelector(".passwordStyle").value;

            chatApiService.postLogin(login, password)
            .then(res => {
                if(res.token){
                    chatController.userName = login;
                    chatController.setUserToken = res.token;
                    chatController.setCurrentUser(login);   
                }
                else{
                    body.insertAdjacentHTML("afterbegin", ` <div class="backgroundLogPass">
                                                                <div class="breakIcon" id="conteinerDel">
                                                                <div class="iconCross" id="crossIcon">
                                                                    <span class="iconify" data-inline="false" data-icon="raphael:cross" style="font-size: 24px; color: #606D7D;"></span>
                                                                </div>
                                                                
                                                                <div class="textLogPass">
                                                                    <p>Введенные вами данные некорректны</p>
                                                                </div>
                                                        
                                                            </div>`);   
                    document.getElementById("crossIcon").addEventListener("click", event =>{
                        chatController.authorization();
                    })
                }
            }); 
            
        });

        const checkIn = document.getElementById("buttonCheckIn");
        checkIn.addEventListener("click", chatController.checkIn);
    }

    checkIn(){
        body.innerHTML = pageCheckIn;
        

        const home = document.getElementById("iconBreakEntrance");
        home.addEventListener("click", event => {
            chatController.authorization();
        });

        const buttonCheckIn = document.getElementById("checkIn");
        buttonCheckIn.addEventListener("click", event =>{
            event.preventDefault();

            let login = document.getElementById("loginCheckIn").value;
            let password1 = document.getElementById("password1CheckIn").value;
            let password2 = document.getElementById("password2CheckIn").value;
            if(password1 === password2){
                chatApiService.postRegister(login, password1).then(res => {

                    if(res === "OK"){
                        chatController.authorization();
                    }
                    else{
                        body.insertAdjacentHTML("afterbegin", ` <div class="backgroundLogPass">
                                                                    <div class="breakIcon" id="conteinerDel">
                                                                    <div class="iconCross" id="crossIcon">
                                                                        <span class="iconify" data-inline="false" data-icon="raphael:cross" style="font-size: 24px; color: #606D7D;"></span>
                                                                    </div>
                                                                    
                                                                    <div class="textLogPass">
                                                                        <p>Введенный вами логин или пароль уже существует</p>
                                                                    </div>
                                                                
                                                                </div>`);   
                        document.getElementById("crossIcon").addEventListener("click", event =>{
                            chatController.checkIn();
                        })
                        
                    }
                });
           }
           else{
                body.insertAdjacentHTML("afterbegin", ` <div class="backgroundLogPass">
                                                            <div class="breakIcon" id="conteinerDel">
                                                            <div class="iconCross" id="crossIcon">
                                                                <span class="iconify" data-inline="false" data-icon="raphael:cross" style="font-size: 24px; color: #606D7D;"></span>
                                                            </div>
                                                            
                                                            <div class="textLogPass">
                                                                <p>Пароли не совпадают</p>
                                                            </div>
                                                    
                                                        </div>`);   
                document.getElementById("crossIcon").addEventListener("click", event =>{
                    chatController.checkIn();
                })
            }
        });
    }
}

class ChatApiService{
    constructor(url){
        this.url = url;
    }
    
    get getUrl(){
        return this.url;
    }

    getMessages(filterConfig){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        let typeFilterConfig1, typeFilterConfig2;
        let valueFilterConfig1, valueFilterConfig2;
        let variable;

        if(filterConfig){
            if(Object.keys(filterConfig).length === 1){
                typeFilterConfig1 = String(Object.keys(filterConfig));
                valueFilterConfig1 = String(Object.values(filterConfig));
                variable = 1;
            }
            else{
                typeFilterConfig1 = Object.keys(filterConfig)[0];
                typeFilterConfig2 = Object.keys(filterConfig)[1];
                valueFilterConfig1 = String(Object.values(filterConfig)[0]);
                valueFilterConfig2 = String(Object.values(filterConfig)[1]);
                variable = 0;
            }     
        }
        
        return fetch(`${this.getUrl}messages?skip=${skipPag}&top=${topPag}${variable === 1 ? `&${typeFilterConfig1}=${valueFilterConfig1}` : variable === 0 ? `&${typeFilterConfig1}=${valueFilterConfig1}&${typeFilterConfig2}=${valueFilterConfig2}` : ""}`, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => chatApiService.errorPage(error));
    }

    postMessages(msg){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"text": msg.text,"isPersonal": msg.isPersonal,"to": msg.to,"author": msg.author});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        return fetch(`${this.getUrl}messages`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    putMessages(idMess, msg){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"text": msg.text, "isPersonal": msg.isPersonal, "to": msg.to});

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        return fetch(`${this.getUrl}messages/${idMess}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    delMessages(idMess){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        return fetch(`${this.getUrl}messages/${idMess}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    postRegister(name, pass){
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("pass", pass);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        return fetch(`${this.getUrl}auth/register`, requestOptions)
          .then(response => response.text())
          .then(result => result)
          .catch(error => console.log('error', error));
    }

    postLogin(name, pass){
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("pass", pass);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        return fetch(`${this.getUrl}auth/login`, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.log('error', error));
    }

    postLogout(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        return fetch(`${this.getUrl}auth/logout`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    getUserses(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chatController.getUserToken}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        return fetch("https://jslabdb.datamola.com/users", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.log('error', error));
    }

    errorPage(error){
       
    }
}

let chatApiService = new ChatApiService("https://jslabdb.datamola.com/");

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
            </footer>`;

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

let pageError = `<header class="headerPageEntrance">
                        <div class="iconBreak" id="iconBreakEntrance"> 
                            <span class="iconify" data-inline="false" data-icon="fa-solid:home" style="font-size: 45px; color: #606D7D;"></span>
                        </div>
                        <div class="nameChat">
                            <p>Datamola Chat</p>
                        </div>
                    </header>
                    <div class="form1">
                        <div class="conteinerCircleError">
                            <div class="iconErr">
                                <span class="iconify" data-inline="false" data-icon="si-glyph:document-error" style="font-size: 100px; color: #606D7D;"></span>
                            </div>
                            <div class="textErr">
                                <p class="textError">НЕ УСПЕЛ ДОДЕЛАТЬ(((((</p>
                            </div>
                        
                        </div>
                    </div>

                    <footer class="footerPageEntrance">
                                <p class="styleFooter">Datamola Chat<br>
                                    Автор: Поливода Михаил<br>
                                    Email: mihail_polivoda@mail.ru<br>
                                    Версия 1.0 (09.10.2020)
                                </p>
                    </footer>`;
let lastMess, viewMess;

let skipPag = 0, topPag = 10;

let lengthUsers = 0; 

let filterConfigLoadMore;

let id;

const body = document.querySelector("body");

body.innerHTML = pageMain;

const entrance = document.querySelector(".icon_entrance");

entrance.addEventListener("click", chatController.authorization);

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
                chatApiService.postLogout().then(() => {
                    
                    document.location.reload(); 
                })
                 
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
            document.getElementById("textFilter").innerHTML = `<input type="date" value="2020-12-01" min="2020-12-01" class="date" id="dateInput">`;


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

            topPag = 10;
            
            if(filter11.classList.contains("displayNone1")){
                filterConfigLoadMore = {author: textFilter};
                chatController.showMessages({author: textFilter}, true);
            }
            
            if(filter22.classList.contains("displayNone2")){
                filterConfigLoadMore = {dateFrom: textFilter, dateTo: textFilter};
                chatController.showMessages({dateFrom: textFilter, dateTo: textFilter}, true);
            }

            if(filter33.classList.contains("displayNone3")){
                filterConfigLoadMore = {text: textFilter};
                chatController.showMessages({text: textFilter}, true);
            }
            
        
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
                
                if(document.getElementById(id).children[0].children[0].children[0].innerText === "Я")
                    chatController.editMessage(id, {text: textMess, isPersonal: false});
                else
                    chatController.editMessage(id, {text: textMess, isPersonal: true, to: document.getElementById(id).children[0].children[0].children[0].innerText.slice(6)});
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
                event.preventDefault();
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

            document.getElementById("crossEdit").addEventListener("click", event =>{
                document.getElementById("newEditIcon").remove();
                textEdit.value = "";
                document.getElementById("crossEdit").remove();
            });
        }

    });

    viewMess = setInterval(() =>{
        chatApiService.getMessages().then((res) => {
            if(lastMess.id !== res[0].id || lastMess.text !== res[0].text){
                chatController.showMessages();
            }
        })
    }, 5000);

    setInterval(() => {
        chatController.showUsers();
    }, 60000)

}
