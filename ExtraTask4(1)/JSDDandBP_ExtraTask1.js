class Node {
    constructor(value, next = null){
        this.next = next;
        this.value = value;
    }

    get getNext(){
        return this.next;
    }

    set setNext(obj){
        this.next = obj;
    }

    get getValue(){
        return this.value;
    }
}

class List {
    constructor(rootValue){
        this.root = new Node(rootValue);
        this.counter;
    }

    addNode(value, i){
        this.counter = this.root;
        
        while(i + 1){
            if(!i){
                this.counter.setNext = new Node(value, this.counter.getNext);
                return true;
            }

            if(this.counter.getNext === null) return false;

            this.counter = this.counter.getNext;
            --i;
        }

        while(true){
            if(this.counter.getNext === null){
                this.counter.setNext = new Node(value);
                return true;
            }
            this.counter = this.counter.getNext;
        }
    }

    removeNode(i){
        this.counter = this.root;
        
        if(!i && this.counter.getNext === null) return false;

        if(i === 0){ 
            this.root = this.root.getNext;
            this.counter = null; // Объект жив, пока есть хотя бы одна ссылка на него)))
            return true;
        }

        let counter1 = this.counter.getNext;
        while(i){
            if(!(i - 1)){
                this.counter.setNext = counter1.getNext;
                counter1 = null;
                return true;
            }

            if(counter1.getNext === null) return false;

            this.counter = this.counter.getNext;
            counter1 = counter1.getNext;

            --i;
        }
        
        while(true){
            if(counter1.getNext === null){
                this.counter.setNext = null;
                counter1 = null;
                return true;
            }
            this.counter = this.counter.getNext;
            counter1 = counter1.getNext;
        }

    }

    print(){
        this.counter = this.root;
        let arr = [];
        while(true){
            arr.push(this.counter.value); 
            if(this.counter.next === null) break;
            this.counter = this.counter.next;
        }
        console.log(arr.join(", "));
    }
}