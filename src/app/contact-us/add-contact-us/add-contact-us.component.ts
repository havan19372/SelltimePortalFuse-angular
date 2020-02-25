import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { ApiService } from "../../core/services/api.service";
import { MatSnackBar } from "@angular/material";
import { fuseAnimations } from "@fuse/animations";

@Component({
  selector: "app-add-contact-us",
  templateUrl: "./add-contact-us.component.html",
  styleUrls: ["./add-contact-us.component.scss"],
  animations: fuseAnimations
})
export class AddContactUsComponent implements OnInit {
  contactUsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.initilizeForm();
  }

  ngOnInit() {}

  onSubmitForm() {
    if (!this.contactUsForm.valid) {
      this.validateForm(this.contactUsForm);
    } else if (this.contactUsForm.valid) {
      this.api
        .post("Contactus", this.contactUsForm.value)
        .subscribe(response => {
          this.snackBar.open("Record saved", "OK", {
            verticalPosition: "bottom",
            duration: 2000
          });
          this.router.navigate(["contact-us"]);
          console.log(response.message);
        });
    }
  }

  onCancelClick(){
    this.contactUsForm.reset();
  }

  get name() {
    return this.contactUsForm.get("name");
  }
  get surname() {
    return this.contactUsForm.get("surname");
  }
  get tel() {
    return this.contactUsForm.get("tel");
  }
  get email() {
    return this.contactUsForm.get("email");
  }
  get mobile() {
    return this.contactUsForm.get("mobile");
  }
  get notes() {
    return this.contactUsForm.get("notes");
  }

  private initilizeForm() {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      surname: '',
      email: ['', Validators.required],
      tel: '',
      mobile: '',
      notes: ''
    });
  }

  private validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(filed => {
      const control = formGroup.get(filed);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
