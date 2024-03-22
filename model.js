// const PREVIEW_MOCK = { //моковое превью (потом заменяется)
//   textTop: 'Верхняя надпись',
//   textBottom: 'Нижняя надпись'
// }

class Model {
  constructor({ //у модели есть методы:
    onCurrentMemeIdChange,
    onMemesChange,
    onTextTopChange,
    onTextBottomChange,
    onStateTopChange,
    onStateBottomChange,
    onTextTopClear,
    onTextBottomClear,
    onTopColor,
    onBottomColor
   
  }) {
    this.memes = []; //хранилка для мемов
    this.currentMemeId = null; //храни индекс выбранного мема по умолчанию значение null
    this.textTop = " ";
    this.textBottom = " ";
    this.error = " ";
    this.topColor = "#ffffff";
    this.bottomColor = "#ffffff";

    
    this.onMemesChange = onMemesChange;//когда меняется то или иное, запускаются обработчики событий
    this.onCurrentMemeIdChange = onCurrentMemeIdChange;
    this.onTextTopChange = onTextTopChange;
    this.onTextBottomChange = onTextBottomChange;
    this.onStateTopChange = onStateTopChange;
    this.onStateBottomChange = onStateBottomChange;
    this.onTextTopClear = onTextTopClear;
    this.onTextBottomClear = onTextBottomClear;
    this.onTopColor = onTopColor;
    this.onBottomColor = onBottomColor;
  }

  getMemes() {
    //геттер - получи мемы
    return this.memes;
  }

  setMemes(memes) {
    //сеттер - установи/измени значения сущностям из хранилки
    this.memes = memes; //измени мемы
    this.currentMemeId = memes[28].id; //измени выбранный id, выбери из массива, который пришел из бекэнда первый мем и сохрани его id

    this.onMemesChange();
    this.onCurrentMemeIdChange();
  }

  setCurrentMemeId(currentMemeId) {
    this.currentMemeId = currentMemeId;
    this.onCurrentMemeIdChange(); //каждый раз, как происходит изменение id (выбранного мема), вызывается функция
  }

  getCurrentMemeId() {
    return this.currentMemeId;
  }

  setTextTop(text) {
      this.textTop = text;
      this.onTextTopChange();
  }
   
  setTopError() {
    this.error ='error';
    this.onStateTopChange(this.error);
  }

  setTextBottom(text) {
    this.textBottom = text;
    this.onTextBottomChange();
  }
  setBottomError() {
    this.error = "много букв";
    this.onStateBottomChange(this.error);
     }
     
  getPreview = () => {//напрямую из модели получить нельзя, пишем отдельный метод
    return {
      textTop: this.textTop,
      textBottom: this.textBottom,
      url: this.getCurrentMeme().url,
      topColor: this.topColor,
      bottomColor: this.bottomColor,
    };
  };
  getCurrentMeme() {  //достань текущий мем/объект
    let currentMeme = null;

    this.memes.forEach((meme) => {
      if (meme.id === this.getCurrentMemeId()) {
        currentMeme = meme;
      }
    });

    return currentMeme;
  }

  setTextTopClear() {
      this.onTextTopClear();
  }

  setTextBottomClear() {
     this.onTextBottomClear();
  }

  setTopColor(color) {
    this.topColor = color;
    this.onTopColor();
  }

  setBottomColor(color) {
    this.bottomColor = color;
    this.onBottomColor()
  }
}
