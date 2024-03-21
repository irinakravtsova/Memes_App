class View {
  constructor({ onMemeChange, onTextTopChange, onTextBottomChange, onTextTopClear, onTextBottomClear, onTopColor, onBottomColor }) { //методы/обработчики, которые сообщают контроллеру о событиях
    this.selectNode = document.querySelector("#mem");
    this.inputTopTextNode = document.querySelector("#textTop");
    this.inputBottomTextNode = document.querySelector("#textBottom");
    this.previewImageNode = document.querySelector("#image");
    this.previewTopTextNode = document.querySelector("#top");
    this.previewBottonTextNode = document.querySelector("#bottom");

    this.errorNode = document.getElementById("error");
    this.errorBottom = document.getElementById("errorBottom");

    this.collorTopNode = document.getElementById("color-top");
    this.collorBottomNode = document.getElementById("color-bottom");



    this.onMemeChange = onMemeChange;    //ты умеешь в случае изменения мема, вызвать функцию, передав в нее id выбранного мема
    this.onTextTopChange = onTextTopChange;
    this.onTextBottomChange = onTextBottomChange;
    this.onTextTopClear = onTextTopClear;
    this.onTextBottomClear = onTextBottomClear;
    this.onTopColor = onTopColor;
    this.onBottomColor = onBottomColor;

    this.selectNode.addEventListener("change", this._handlerSelectChange);
    this.inputTopTextNode.addEventListener("change", this._handlerTextTopChange);
    this.inputBottomTextNode.addEventListener("change", this._handlerTextBottomChange);
    this.inputTopTextNode.addEventListener("click", this._clearView);
    this.inputBottomTextNode.addEventListener("click", this._clearBottomView);
    this.collorTopNode.addEventListener('input', this._handlerColorTopChange);
    this.collorBottomNode.addEventListener('input', this._handlerColorBottomChange);
  }
  
  renderPreview(preview) { //отобрази превью
    this.previewTopTextNode.innerText = " ";
    this.previewBottonTextNode.innerText = " ";
    const {url, textTop, textBottom, topColor, bottomColor} = preview; // из объекта взять отдельные поля в отдельные переменные
   
    this.previewTopTextNode.innerText = textTop;
    this.previewBottonTextNode.innerText = textBottom;
    this.previewImageNode.src = url;
    this.previewTopTextNode.style.color = topColor;
    this.previewBottonTextNode.style.color = bottomColor;
   
  }
  
  renderTopError() {
    this.errorNode.innerText += `Слишком много букав, убавь до 140 шт.`;
   }

  renderBottomError() {
    this.errorBottom.innerText += `Слишком много букав, убавь до 140 шт.`; 
  }

  renderClear() {
    this.inputTopTextNode.value = ' ';
    // this.inputBottomTextNode.Node.value = ' ';
    this.errorNode.innerText = " ";  
  }
  
  renderBottomClear() {
    this.inputBottomTextNode.value = ' ';
   this.errorBottom.innerText = " "; 
  } 

   renderMemesSelect(memes, currentMemeId) {
    //отрисуй список мемов внутри тега select, нужно генерить в выпадающем списке
    //теги оption  value, а выбранный должен подсвечиваться (присваивается selected)
    memes.forEach((meme) => {
      const {
        //забери из каждого мема (он в виде объекта) его id и name
        id,
        name,
      } = meme;
      const optionNode = document.createElement("option"); //создай элемент в выпадающем списке
      optionNode.setAttribute("value", id); //присвой тегу атрибут value со значением id
      optionNode.innerText = name; //добавь в опшены имя мема

      if (id === currentMemeId) {
        //если текущий (перебираемый) мем совпадает с тем, который выбран,
        optionNode.setAttribute("selected", true); //то обозначь его как выбранный (присвой атрибут selected со значением truе
      }
      //присвой атрибут selected (значение true/false) и присвой ему значение id =currentMemeId

      this.selectNode.appendChild(optionNode); //добавь элемент к элементу selectNode
      //currentMemeId храни в model
    });
   
  }
//когда происходит событие, сообщи об этом вовне
  _handlerSelectChange = () => {
    const id = this.selectNode.value; //внутри value лежит id/ сохрани в переменную id id выбранного мема

    this.onMemeChange(id); //передай id выбранного мема
  };
  _handlerTextTopChange = (event) => {
     this.onTextTopChange(event.target.value);
  };
  _handlerTextBottomChange = (event) => {
    this.onTextBottomChange(event.target.value);
  };
  _clearView = () => {
    this.onTextTopClear();
    
  }
  _clearBottomView = () => {
     this.onTextBottomClear();
 }

 _handlerColorTopChange = (event)=> {
  
  this.onTopColor(event.target.value);
  console.log(event.target.value);
 }
 _handlerColorBottomChange = (event)=> {
   this.onBottomColor(event.target.value);
 }

}

