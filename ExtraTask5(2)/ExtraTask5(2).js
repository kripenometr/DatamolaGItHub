function createList(title, list){
    const frag = new DocumentFragment();
    const el = document.querySelector(".bod");

    let newEl = document.createElement("h2");
    newEl.innerText = title;
    frag.appendChild(newEl);
    el.appendChild(frag);

    newEl = document.createElement("ul");
    newEl.classList.add("sizeText1", "styleMarker1");
    frag.appendChild(newEl);

    let styleNumberText = 2;
    let styleNumberMarker = 2;

    el.appendChild((function reka(list, topEl){
        
        for(let counter of list){
            if(counter.children === null){
                newEl = document.createElement("li");
                newEl.classList.add("li");
                newEl.innerText = counter.value;
                topEl.appendChild(newEl);

            }
            else{
                newEl = document.createElement("li");
                newEl.classList.add("li");
                newEl.innerText = counter.value;
                topEl.appendChild(newEl);

                let newEl1 = document.createElement("ul");
                newEl1.classList.add(`sizeText${styleNumberText}`, `styleMarker${styleNumberMarker}`);
                newEl.appendChild(newEl1);
                ++styleNumberText;
                if(styleNumberMarker === 3) styleNumberMarker = 0;
                ++styleNumberMarker;

                reka(counter.children, newEl1);
            }
        }

        return topEl;

    })(list, newEl));

}