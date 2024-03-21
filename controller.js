class Controller {
  constructor() {
    this.model = new Model({ //модели добавь методы, которые описываются функциями (вызов рендера, когда происходят изменения в модели)
      onMemesChange: this.handlerModelMemesChange, 
      onCurrentMemeIdChange: this.handlerModelCurentMemeIdChange,
      onTextTopChange: this.handlerModelTextTopChange,
      onTextBottomChange: this.handlerModelTextBottomChange,
      onStateTopChange: this.handlerModelStateTopChange,
      onStateBottomChange: this.handlerModelStateBottomChange,
      onTextTopClear: this.handlerModelTextTopClear,
      onTextBottomClear: this.handlerModelTextBottomClear,
      onTopColor: this.handlerModelTopColorChange,
      onBottomColor: this.handlerModelBottomColorChange,
      
    });
    this.view = new View({// вью добавь методы, которые описываются функциями сеттерами внесения изменений в данные, которые хранятся в модели)
      onMemeChange: this.handlerViewMemeChange, 
      onTextTopChange: this.handlerViewTextTopChange,
      onTextBottomChange: this.handlerViewTextBottomChange,
      onTextTopClear: this.handlerViewTextTopClear,
      onTextBottomClear: this.handlerViewTextBottomClear,
      onTopColor: this.handlerViewTopColorChange,
      onBottomColor: this.handlerViewBottomColorChange,

     
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
  handlerModelMemesChange = () => {//получил массив мемов, передай во вью и отрисуй список в поле селект, 
    this.view.renderMemesSelect(this.model.getMemes(),  this.model.getCurrentMemeId());  
   };

  handlerModelCurentMemeIdChange = () => {//получил новый id мема,  выбранный из списка, передай во вью и отрисуй его в превью
    this.view.renderPreview(this.model.getPreview()); 
  };

  handlerModelTextTopChange = () => {//получил новый текст1 от модели, передай и отрисуй в превью
    this.view.renderPreview(this.model.getPreview());
  };

  handlerModelTextBottomChange = () => {//получил новый текст2 от модели,передай и  отрисуй в превью
    this.view.renderPreview(this.model.getPreview());
   };
  
  handlerModelStateTopChange = (error)  => {
    this.view.renderTopError(error);
  }

  handlerModelStateBottomChange = (error)  => {
    this.view.renderBottomError(error);
  }

  handlerModelTextTopClear = () => {
    this.view.renderClear();
  }
  handlerModelTextBottomClear = () => {
    this.view.renderBottomClear();
  }

  handlerModelTopColorChange = () => {
    this.view.renderPreview(this.model.getPreview());
  }
  handlerModelBottomColorChange = () => {
    this.view.renderPreview(this.model.getPreview());
  }
  
  handlerViewMemeChange = (id) => {//пользователь выбрал новый мем из списка, передай в модель id выбранного мема модель изменит сеттером, передаст в контроллер изменения и следовательно запустится изменения во вью: 
    this.model.setCurrentMemeId(id); 
  }; 

  handlerViewTextTopChange = (text, error) => { //написали новый текст1, если он меньше 140 символов, то передай в модель текст, модель изменит сеттером, передаст в контроллер изменения и они запишутс в превью
        //проверка на количество символов
        if (text.length > 10) {  //если больше чем 140 символов, то скомандуй модели  изменить , потом она передаст изменения в контроллер, и контроллер скомандует вью написать сообщение об ошибке
              this.model.setTopError(error);
        
        } else {
          this.model.setTextTop(text);
        }
  };

  handlerViewTextBottomChange = (text, error) => {
    if (text.length > 10) {  //если больше чем 140 символов, то скомандуй модели  изменить состояние на true, потом она передаст изменения в контроллер, и контроллер скомандует вью написать сообщение об ошибке
      this.model.setBottomError(error);

    } else {
      this.model.setTextBottom(text);
      }
  };

  handlerViewTextTopClear = () => {
  this.model.setTextTopClear();
  }
  handlerViewTextBottomClear = () => {
  this.model.setTextBottomClear();
  }

  handlerViewTopColorChange = (color) => {
    this.model.setTopColor(color);
  }
  handlerViewBottomColorChange = (color) => {
    this.model.setBottomColor(color);
  }

}
