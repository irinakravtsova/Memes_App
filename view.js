class View {
  constructor({ onMemeChange, onTextTopChange, onTextBottomChange }) { //методы/обработчики, которые сообщают контроллеру о событиях
    this.selectNode = document.querySelector("#mem");
    this.inputTopTexttNode = document.querySelector("#textTop");
    this.inputBottomTextNode = document.querySelector("#textBottom");
    this.previewImageNode = document.querySelector("#image");
    this.previewTopTextNode = document.querySelector("#top");
    this.previewBottonTextNode = document.querySelector("#bottom");

    this.errorNode = document.getElementById("error");
    this.errorBottom = document.getElementById("errorBottom")

    this.onMemeChange = onMemeChange;    //ты умеешь в случае изменения мема, вызвать функцию, передав в нее id выбранного мема
    this.onTextTopChange = onTextTopChange;
    this.onTextBottomChange = onTextBottomChange;

    this.selectNode.addEventListener("change", this._handlerSelectChange);
    this.inputTopTexttNode.addEventListener("change", this._handlerTextTopChange);
    this.inputBottomTextNode.addEventListener("change", this._handlerTextBottomChange);
  
    // this.inputTopTexttNode.addEventListener("focus", this.clearView);
  }
  renderPreview(preview) { //отобрази превью
    const {url, textTop, textBottom} = preview; // из объекта взять отдельные поля в отдельные переменные
   
    this.previewTopTextNode.innerText = textTop;
    this.previewBottonTextNode.innerText = textBottom;
    this.previewImageNode.src = url;
  }
  
  renderTopError() {
    this.errorNode.innerText += `Слишком много букав, убавь до 140 шт.`;
   }

  renderBottomError() {
      this.errorBottom.innerText += `Слишком много букав, убавь до 140 шт.`; 
   
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

}
