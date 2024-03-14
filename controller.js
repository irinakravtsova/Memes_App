class Controller {
  constructor() {
    this.model = new Model({
      onMemesChange: this.handlerModelMemesChange, //модели добавь метод, который описывается функцией
      onCurrentMemeIdChange: this.handlerModelCurentMemeIdChange,
      onTextTopChange: this.handlerModelTextTopChange,
      onTextBottomChange: this.handlerModelTextBottomChange,
    });
    this.view = new View({
      onMemeChange: this.handlerViewMemeChange,
      onTextTopChange: this.handlerViewTextTopChange,
      onTextBottomChange: this.handlerViewTextBottomChange,
    });
    this.api = new API();
  }
  init() {
    this.api
      .getMemes() //когда делаем инициализацию приложения, на старте получаем мемы из API
      .then((data) => {
        //+ограничение по величине массива
        const memes = data.data.memes;  //только так удалось добраться до массива
     
        if (memes.length > 100) {
          memes.length = 100;
        }
        
        this.model.setMemes(memes); //сеттим мемы в модель (устанавливаем значение) сохраняем в модели
      });
  }
  handlerModelMemesChange = () => {//вызови рендер, когда произошли изменения в модели
    this.view.renderMemesSelect(
      this.model.getMemes(), 
      this.model.getCurrentMemeId()
    ); //отрисуй
  };

  handlerViewMemeChange = (id) => {
    //когда меняется мем во вью
    this.model.setCurrentMemeId(id); //передай в модель id выбранного мема
  }; 
  //и следовательно запустится изменения во вью:

  handlerModelCurentMemeIdChange = () => {
    //когда в модели меняется выбранный мем (меняется currentId),
    this.view.renderPreview(this.model.getPreview()); //вызови рендер
  };

  handlerViewTextTopChange = (text) => {
        //проверка на количество символов
    this.model.setTextTop(text);
  };

  handlerViewTextBottomChange = (text) => {
    //проверка на количество символов
    this.model.setTextBottom(text);
  };

  handlerModelTextTopChange = () => {
    this.view.renderPreview(this.model.getPreview());
  };

  handlerModelTextBottomChange = () => {
    this.view.renderPreview(this.model.getPreview());
  };
}
