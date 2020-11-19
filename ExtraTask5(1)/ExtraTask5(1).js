function createCalendar(elem, year, month){
    elem = new DocumentFragment();
    let newTable = document.createElement("table");
    let newTr = document.createElement("tr");
    newTable.appendChild(newTr);
    elem.appendChild(newTable); 

    let arr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

    for(let i = 0; i < 7; ++i){
        let newTh =  document.createElement("th");
        newTh.innerText = arr[i];
        newTr.appendChild(newTh);
    }

    let numberDays =  32 - new Date(year, (month - 1), 32).getDate();
    let dayWeek = new Date(year, month - 1).getDay();
    let skipEnd = 1, skipStart, newTd;

    !dayWeek ? skipStart = 6 : skipStart = dayWeek - 1;

    while(skipEnd <= numberDays){
        newTr =  document.createElement("tr");
        for(let j = 0; j < 7; ++j){
            if(skipStart){
                newTd = document.createElement("td");
                newTr.appendChild(newTd);
                --skipStart;
            }
            else if(skipEnd <= numberDays){
                let newTd = document.createElement("td");
                newTd.innerText = String(skipEnd);
                newTr.appendChild(newTd);
                ++skipEnd;
            }
            else{
                newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
        }
        newTable.appendChild(newTr);
    }
    
    return elem;
}

let a;
let b = createCalendar(a, 2020, 10); 
const c = document.querySelector(".bod");
c.appendChild(b);