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
            for(let counter of arr)
                if(MessageList.validate(counter))
                    this._arr.push(counter);
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
        if(this.getUser !== undefined && this.getUser !== ""){ /// undifined or ""?
            const newMessage = new Message(msg);
            if(MessageList.validate(newMessage)){
                this._arr.push(newMessage);
                return true;
            }

            return false;
        }
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
