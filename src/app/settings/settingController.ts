export class FormModel {
    inputTypeText?: string;
    inputTypeCheckBox?:boolean;
    inputTypeSlider?: string;

    constructor(formController?:FormModel){
      formController = formController? formController : {};
      this.inputTypeText = formController.inputTypeText? formController.inputTypeText : null;
      this.inputTypeCheckBox = formController.inputTypeCheckBox? formController.inputTypeCheckBox :false;
    }
  }