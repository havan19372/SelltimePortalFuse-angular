import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  formActive = false;
  form: FormGroup;
  @Output()
  onCardAdd: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('nameInput')
  nameInputField;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  openForm() {
    this.onCardAdd.emit(null);
  }

  closeForm() {
    this.formActive = false;
  }

  focusNameField() {
    setTimeout(() => {
      this.nameInputField.nativeElement.focus();
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      const cardName = this.form.getRawValue().name;
      this.onCardAdd.next(cardName);
      this.formActive = false;
    }
  }
}
