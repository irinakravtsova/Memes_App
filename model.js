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
  }) {
    this.memes = []; //хранилка для мемов
    this.currentMemeId = null; //храни индекс выбранного мема по умолчанию значение null
    this.textTop = "";
    this.textBottom = "";
    this.isError = false;
    
    this.onMemesChange = onMemesChange;//когда меняется то или иное, запускаются обработчики событий
    this.onCurrentMemeIdChange = onCurrentMemeIdChange;
    this.onTextTopChange = onTextTopChange;
    this.onTextBottomChange = onTextBottomChange;
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
    // if (this._isTextTopValid(text) ) {
    //   this.isError = false;

      this.textTop = text;
    // } else {
    //   this.isError = true;

    // }
      this.onTextTopChange(text);

  }
  setError(isError) {
    this.isError = true;
    this.onTextTopChange(isError);
    console.log(this.isError);
  }


  setTextBottom(text) {
    this.textBottom = text;

    this.onTextBottomChange();
  }

  getPreview = () => {
    //напрямую из модели получить нельзя, пишем отдельный метод
    return {
      textTop: this.textTop,
      textBottom: this.textBottom,
      url: this.getCurrentMeme().url,
    };
  };
  getCurrentMeme() {
    //достань текущий мем/объект
    let currentMeme = null;

    this.memes.forEach((meme) => {
      if (meme.id === this.getCurrentMemeId()) {
        currentMeme = meme;
      }
    });

    return currentMeme;
  }
  getIsError() {
    return this.isError;
    
  }
  // _isTextTopValid(textTop) {
  //   return textTop.length < 5;
  // }
}
