function createList(title, list){
    const frag = new DocumentFragment();
    const el = document.querySelector("body");

    let newEl = document.createElement("h2");
    newEl.innerText = title;
    frag.appendChild(newEl);
    el.appendChild(frag);

    newEl = document.createElement("ul");
    newEl.classList.add("sizeText1", "styleMarker1");
    newEl.id = "main";
    
    frag.appendChild(newEl);

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
                newEl1.classList.add(`sizeText2`, `styleMarker${styleNumberMarker}`);
                newEl.appendChild(newEl1);
                if(styleNumberMarker === 3) styleNumberMarker = 0;
                ++styleNumberMarker;

                reka(counter.children, newEl1);
            }
        }

        return topEl;

    })(list, newEl));
}

createList("title", [
    {
       value: 'Пункт 1.',
       children: null,
    },
    {
       value: 'Пункт 2.',
       children: [
          {
             value: 'Подпункт 2.1.',
             children: null,
          },
          {
             value: 'Подпункт 2.2.',
             children: [
                {
                   value: 'Подпункт 2.2.1.',
                   children: null,
                },
                {
                   value: 'Подпункт 2.2.2.',
                   children:  [
                    {
                       value: 'Подпункт 2.2.1.',
                       children: null,
                    },
                    {
                       value: 'Подпункт 2.2.2.',
                       children: [
                        {
                           value: 'Подпункт 2.2.1.',
                           children: null,
                        },
                        {
                           value: 'Подпункт 2.2.2.',
                           children: null,
                        }
                     ],
                    }
                 ],
                }
             ],
          },
          {
             value: 'Подпункт 2.3.',
             children:[
                {
                   value: 'Подпункт 2.2.1.',
                   children: null,
                },
                {
                   value: 'Подпункт 2.2.2.',
                   children: null,
                }
             ],
          }
       ]
    },
    {
       value: 'Пункт 3.',
       children: null,
    }
  ]
  );

let ul = document.getElementById("main");

ul.onclick = event =>{
    let target = event.target;
    let check = target.lastChild;
   
    if(check.tagName !== "UL") return;
        
    if(check.classList.contains("no-view")){
        check.classList.remove("no-view");
        target.classList.remove("style-no-view")
    }
    else{
        check.classList.add("no-view");
        target.classList.add("style-no-view");
    }
}; 