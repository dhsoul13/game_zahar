let person = '';
let zaharAchiv = {
    userName:["Захар Авдеев", "Захар", "Авдеев", "Захарунька"],
    zaharName:false,
} 
const form = document.forms[0];
const section = document.querySelectorAll('section');
section.forEach((el)=>{
    el.classList.add('hidden')
});
const filebutton = document.querySelector('.form__file');
filebutton.addEventListener('change', ()=>{
    const reader = new FileReader();
    reader.onload = function () {
       document.querySelector('.press-name__left').innerHTML = `
       <img src="${reader.result}" alt="">
       `;
       document.querySelector('.first-block__left').innerHTML = `
       <img src="${reader.result}" alt="">
       `;

    }
    reader.readAsDataURL(filebutton.files[0]);
})
form.addEventListener("submit", clickForm)
const listEl = document.querySelectorAll('.style__el');
listEl.forEach((el)=>{
    el.addEventListener('click', showClothes)
})
let sortVb = document.querySelector('.second-block__sort-from-type');
let sortEl = document.querySelector('.second-block__sort');
let threeBlock = document.querySelector('.three-block');
let deleteClothest = document.querySelector('.three-block__button');
deleteClothest.addEventListener('click', deleteEL);
let mas = clothes;
let objPut = {
    shoes: null,
    trousers:null,
    jacket:null,
};
let sum = 0;
let sumEl = document.querySelector('.three-block__title-sum span');


let activeBlock = document.querySelectorAll('.achive');


for (let i = 0; i < activeBlock.length; i++) {
    activeBlock[i].addEventListener('click', activeShow);
}

let imgCar = document.querySelectorAll('.four-block__img');

for (let i = 0; i < imgCar.length; i++) {
    imgCar[i].addEventListener('click',imgCarFum);
}


// let count = 0;
///////////////////////////////////////

function clickForm (e){
    e.preventDefault();
    if (form.name.value){
        person = new Person(form.name.value);
        let formDiv = document.querySelector('.body__press-name ');
        formDiv.classList.add('hidden');;
        section.forEach((el)=>{
            el.classList.remove('hidden')
        });
        printEl(document.querySelector(".first-block__title").children[0], person.userName);
        if(zaharAchiv.zaharName){
            activeBlock[0].classList.add('active');
        } 

    } else{
        form.name.classList.add('red');
    }
};
function showClothes(e){
    const index = e.target.dataset.plase;
    const elements = document.querySelector('.second-block__elements');
    elements.innerHTML='';
    if (index == 0){
        sortEl.classList.remove('active');
        sortVb.classList.remove('active');
        elements.innerHTML=`
        <div class="second-block__element-arm">Какой стиль ты в армии</div>
        `
    };
    if (index == 3){
        sortEl.classList.remove('active')
        sortVb.classList.remove('active')
        elements.innerHTML=`
        <div class="second-block__element-arm">Какой стиль московский ты в нищеброд</div>
        `
    }
    if (index == 1){
        sortEl.classList.add('active');
        sortVb.classList.add('active');
        mas = clothes.filter((el)=>{
            return (el.id == index) ? el : "";
        });
        for (let i = 0; i < mas.length; i++) {
            let el = new Create(mas[i]);
            el.createElem(elements);
        }
      
        const sortVbEL = document.querySelectorAll('input[type="radio"]');
        sortVbEL.forEach((el)=>{
            el.addEventListener('click', sortVbElFun)
        })
        
        const sortHow = document.querySelector('.second-block__sort-el');
        sortHow.addEventListener('change', sortElFun);
        
        const addButton = document.querySelectorAll('.element__button');
        addEL(addButton);
        
        
    }
}
class Person{
    constructor(name){
    this.userName = name;
    this.personCar = '';
    this.shoes = '';
    this.trousers = '';
    this.jacket = '';
    this.unEl = '';
    }

};
function printEl(from, that){
    if (zaharAchiv.userName.find((el)=>{
        return (el.toLowerCase() == that.toLowerCase()) ? true : false;
    })){
        from.innerHTML = that + ")";
        from.style.color = "green";
        zaharAchiv.zaharName =  true;
        console.log(from)
        from.addEventListener('click', ()=>{
            activeBlock[1].classList.add('active');
            document.querySelector('.four-block').classList.add('active')
        })
    } else {
        from.innerHTML = that;
    }

}

function sortElFun(e){
    const elements = document.querySelector('.second-block__elements');
    if (e.target.value == 1){
        elements.innerHTML='';
        mas = mas.sort((el1,el2)=>{
            if (el1.price > el2.price) return 1;
            if (el1.price  == el2.price) return 0;
            if (el1.price  < el2.price) return -1;
        });
        for (let i = 0; i < mas.length; i++) {
            let el = new Create(mas[i]);
            el.createElem(elements);
            
        }
        const addButton = document.querySelectorAll('.element__button');
        addEL(addButton);
    };
    if (e.target.value == 2){
        elements.innerHTML='';
        mas = mas.sort((el1,el2)=>{
            if (el1.price < el2.price) return 1;
            if (el1.price  == el2.price) return 0;
            if (el1.price  > el2.price) return -1;
        });
        for (let i = 0; i < mas.length; i++) {
            let el = new Create(mas[i]);
            el.createElem(elements);
        }

        const addButton = document.querySelectorAll('.element__button');
        addEL(addButton);
        
    }
}
function sortVbElFun(e){
    mas = clothes;
    const elements = document.querySelector('.second-block__elements');
    let id = e.target.id;
    if(id == 'all'){
        for (let i = 0; i < mas.length; i++) {
            let el = new Create(mas[i]);
            el.createElem(elements);
        };
        return
    };
    mas = mas.filter((el)=>{
        return (el.type == id) ? el : false;
    });
    elements.innerHTML='';
    for (let i = 0; i < mas.length; i++) {
        let el = new Create(mas[i]);
        el.createElem(elements);
    };

    const addButton = document.querySelectorAll('.element__button');
    addEL(addButton);
    
}
function addEL(el){
    for (let i = 0; i < el.length; i++) {
        el[i].addEventListener('click', (e)=>{
        threeBlock.classList.add('active');
        let id = e.target.dataset.id;
        let obj = clothes.find((el)=>{
            return (id == el.idArt) ? el : "";
        });
        if(obj.type == 'shoes'){
            person.shoes = obj;
        };
        if(obj.type == 'trousers'){
            person.trousers = obj
        };
        if(obj.type == 'jacket'){
            person.jacket= obj
        };
        if(obj.unEl){
            person.unEl = obj.unEl;
        }
        pushClothes(person, document.querySelector('.three-block__right'));
    });
}
}
function pushClothes(person, el){
    pushClothesCheck(person, objPut);
    count = 1;
    let unElCount = 0;
    el.innerHTML = "";
    sum = 0;
    for(let i in objPut){
       if(objPut[i]){
            let elem = new CreatePutClothest(objPut[i]);
            elem.createElem(el);
            sum += elem.price;
            sumEl.innerHTML = sum;
            if (elem.unEl){
                unElCount++;
            };
            
       }
        let check = zaharAchiv.userName.find((el)=>{
        return (el.toLowerCase() == person.userName.toLowerCase()) ? true : false;
        });
       if(unElCount == 3 && person.userName == check ){
            activeBlock[3].classList.add('active');
            checkSum(sum)
       }
    }
   ;
}
function pushClothesCheck(person,obj){
    obj.shoes = person.shoes
    obj.jacket = person.jacket 
    obj.trousers = person.trousers
}
class Create{
    constructor(el){
        this.price = el.price;
        this.nameBrand = el.nameBrand;
        this.textBrand = el.textBrand;
        this.img = el.img;
        this.id = el.idArt;
        this.type = el.type
    }
    
    createElem(selector){
        const div = `<div class="element">
            <div class="wrapper__element">
                <div class="element__img">
                <img src="${this.img}"></img> 
                </div>
                <div class="element__title">
                ${this.nameBrand}
                 </div>
                <div class="element__text">
                ${this.textBrand}
                </div>
                <div class="element__price">
                ${this.price}
             </div>
             <div class="element__button" data-id="${this.id}">
                    Добавить
             </div>
            </div>
        </div>`;

        selector.insertAdjacentHTML('afterBegin', div);

    }
}
class CreatePutClothest{
    constructor(el){
        this.price = el.price;
        this.nameBrand = el.nameBrand;
        this.textBrand = el.textBrand;
        this.img = el.img;
        this.id = el.idArt;
        this.type = el.type;
        this.unEl = el.unEl;
    }   
    createElem(selector){
        const div = `<div class="three__element">
            <div class="wrapper__three__element">
                <div class="three__element__img">
                <img src="${this.img}"></img> 
                </div>
                <div class="three__element__title">
                ${this.nameBrand}
                 </div>
            </div>
        </div>`;

        selector.insertAdjacentHTML('afterBegin', div);

    } 
}
function deleteEL(){
    document.querySelector('.three-block__right').innerHTML="";
    let objPut = {
        shoes: null,
        trousers:null,
        jacket:null,
    };
    person.shoes = '';
    person.trousers= '';
    person.jacket= '';
    person.unEl = '';
    person.unEl = '';
    sumEl.innerHTML = 0;
}
function checkSum(sum){
    activeBlock[4].classList.add('active');
}

function activeShow(e){
    let overlay = document.querySelector('.achive__overlay');
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    let idE = e.target.dataset.id;
    achiveMas.forEach((el)=>{
        if (el.id == idE){
            overlay.innerHTML = `
            <div class="achive__overlay-img">
                <img src="${el.img}" alt="">
            </div>
            <div class="achive__overlay-text title">
                ${el.text}
            </div>
        `;
    
        }
    })
    overlay.addEventListener('click', ()=>{
        setTimeout(()=>{
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }, 1000)
       
    });
    
}
function imgCarFum(e){
    if(e.target.dataset.id == 1){
        activeBlock[2].classList.add('active');
    }
}
