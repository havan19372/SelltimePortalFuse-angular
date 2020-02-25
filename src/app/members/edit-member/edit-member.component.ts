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
import { UserModel } from "app/auth/user.model";
import { MemberModel } from "../member.model";


@Component({
  selector: "app-edit-member",
  templateUrl: "./edit-member.component.html",
  styleUrls: ["./edit-member.component.scss"],
  animations: fuseAnimations
})
export class EditMemberComponent implements OnInit {
  memberForm: FormGroup;
  memberId: number;
  userList: any[] = [];

  usersList: UserModel[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) {
    this.initilizeForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.memberId = +params["id"];
      this.getInitialData();
    });
  }

  getInitialData() {
   this.getMemberData(this.memberId);
   this.getUsers(this.memberId);

  }

  private getMemberData(memberId: number){
    const url = "Member/" + memberId;
    this.api.get(url).subscribe(response => {
      this.setFormValue(response);
    });
  }

  private getUsers(memberId: number){
    const url = "Member?PageNumber=1&PageSize=10";
    this.api.get(url).subscribe(response => {
      this.userList = response;
    });
  }

  onSubmitForm() {
    if (!this.memberForm.valid) {
      this.validateForm(this.memberForm);
    } else if (this.memberForm.valid) {
      const url = 'Member/' + this.memberId;
      this.api
        .put(url, this.memberForm.value)
        .subscribe(response => {
          this.snackBar.open("Record saved", "OK", {
            verticalPosition: "bottom",
            duration: 2000
          });
          this.router.navigate(["members"]);
          console.log(response.message);
        });
    }
  }

  onCancelClick() {
    this.memberForm.reset();
  }

  onAddUser() {
    const url = "users/add/" + this.memberId  ;
    this.routeChange(url);
  }

  onEditUser(user: UserModel) {
    const url = "users/edit/" + this.memberId + "/" + user["id"];
    this.routeChange(url);
  }

  onDeleteUser(user: UserModel) {
  }

  routeChange(path: string) {
    this.router.navigate([path]);
  }

  get name() {
    return this.memberForm.get("name");
  }
  get code() {
    return this.memberForm.get("code");
  }
  get host() {
    return this.memberForm.get("host");
  }
  get sponsorCode() {
    return this.memberForm.get("sponsorCode");
  }

  private initilizeForm() {
    this.memberForm = this.fb.group({
      name: ["", Validators.required],
      code: "",
      host: ["", Validators.required],
      sponsorCode: "",
      note: "",
      dateJoined: "2018-04-22T09:59:15.844Z",
      activeStatusId: 0,
      autoSendEmail: true
    });
  }

  private setFormValue(model: MemberModel) {
    this.memberForm.patchValue({
      name: model.name,
      code: model.code,
      host: model.host,
      sponsorCode: model.sponsorCode,
      note: "",
      dateJoined: "2018-04-22T09:59:15.844Z",
      activeStatusId: 0,
      autoSendEmail: true
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
