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
import { ContactUsModel } from "app/contact-us/contactus.model";

@Component({
  selector: "app-edit-contact-us",
  templateUrl: "./edit-contact-us.component.html",
  styleUrls: ["./edit-contact-us.component.scss"],
  animations: fuseAnimations
})
export class EditContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  contactUsModel: ContactUsModel = {};
  _contactUsModelClone: ContactUsModel = {};
  uniqueId: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.initilizeForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.uniqueId = +params["id"];
      this.getDetailById(this.uniqueId);
    });
  }

  getDetailById(id: number) {
    const url = "Contactus/" + id;
    this.api.get(url, this.contactUsForm.value).subscribe(response => {
      this.contactUsModel = response;
      this.contactUsModel.enquiryTypeId = id;
      this._contactUsModelClone = this.contactUsModel;
      this.setFormValues(this.contactUsModel);
    });
  }

  onSubmitForm() {
    if (!this.contactUsForm.valid) {
      this.validateForm(this.contactUsForm);
    } else if (this.contactUsForm.valid) {
      const url = "Contactus/" + this.uniqueId;
      this.api.put(url, this.contactUsForm.value).subscribe(response => {
        this.snackBar.open("Record updated successfully", "OK", {
          verticalPosition: "bottom",
          duration: 2000
        });
        this.router.navigate(["contact-us"]);
      });
    }
  }

  onCancelClick() {
    this.contactUsForm.reset();
    this.contactUsModel = this._contactUsModelClone;
    this.setFormValues(this.contactUsModel);
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
      enquiryTypeId: 0,
      name: ["", Validators.required],
      surname: "",
      email: ["", Validators.required],
      tel: "",
      mobile: "",
      notes: ""
    });
  }

  private setFormValues(model: ContactUsModel) {
    this.contactUsForm.setValue({
      enquiryTypeId: model.enquiryTypeId,
      name: model.name,
      surname: model.surname,
      email: model.email,
      tel: model.tel,
      mobile: model.mobile,
      notes: model.notes
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
