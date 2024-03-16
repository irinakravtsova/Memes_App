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
    
  }) {
    this.memes = []; //хранилка для мемов
    this.currentMemeId = null; //храни индекс выбранного мема по умолчанию значение null
    this.textTop = " ";
    this.textBottom = " ";
    this.error = " ";
     
    this.onMemesChange = onMemesChange;//когда меняется то или иное, запускаются обработчики событий
    this.onCurrentMemeIdChange = onCurrentMemeIdChange;
    this.onTextTopChange = onTextTopChange;
    this.onTextBottomChange = onTextBottomChange;
    this.onStateTopChange = onStateTopChange;
    this.onStateBottomChange = onStateBottomChange;
   
  }

  getMemes() {
    //геттер - получи мемы
    return this.memes;
  }

  setMemes(memes) {
    //сеттер - установи/измени значения сущностям из хранилки
    this.memes = memes; //измени мемы
    this.currentMemeId = memes[0].id; //измени выбранный id, выбери из массива, который пришел из бекэнда первый мем и сохрани его id

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
      this.onTextTopChange(text);

  }
 
  
  setTopError(error) {
    this.error = error;
    this.onStateTopChange(error);
  }

  setTextBottom(text) {
    this.textBottom = text;
    this.onTextBottomChange();
  }
  setBottomError(error) {
    this.error = error;
    this.onStateBottomChange(error);
     }

  getPreview = () => {//напрямую из модели получить нельзя, пишем отдельный метод
    return {
      textTop: this.textTop,
      textBottom: this.textBottom,
      url: this.getCurrentMeme().url,
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

}
