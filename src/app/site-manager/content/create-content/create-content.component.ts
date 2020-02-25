import { element } from 'protractor';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { IContentModel, ContentSetting } from '../content.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor, Validator } from '@angular/forms';
import { ContentService } from '../content.service';
import { MatSnackBar } from '@angular/material';
import { LookUpModel, LookUpCodes } from '../../../core/lookUpCodes';
import { LookUpService } from '../../../core/services/look-up.service';
import { UploadService } from '../../../core/services/upload.service';
import { SlugService } from '../../../core/services/slug.service';
import { environment } from '../../../../environments/environment';
import { fuseAnimations } from '@fuse/animations';
import { TaskLookupService } from 'app/task/service/task-lookup.service';
import { UserService } from 'app/users-new/user/user.service';
import { AuthenticationService } from 'app/auth/athentication.service';
@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss'],
  animations: fuseAnimations
})
export class CreateContentComponent implements OnInit{
  jsonContentTypeId:number=200;//need global setting for this.
  pageType: string;
  jsonParseBody:any;
  public result:{"Hello":"Word"};
  defaultContent:any;
  defaultTemplate:any;
  content: IContentModel;
  contentForm: FormGroup;
  contentTypes: LookUpModel[];
  contentTemplates: LookUpModel[];
  contentSections: LookUpModel[];
  imageUrl: string;
  jsonEditor:boolean=false;
  jsonContentType:any[];
  attachments: any[];
  pdfAttachments:any[];
  videoAttachments:any[];
  userList:any[]=[];
  ckeConfig: any;
  selected:any;
  planModel: any = {start_time: new Date() };
  @ViewChild('myckeditor') ckeditor: any;
  config = {
    height:'250px',
    uploadImagePath: '/api/upload'
  };
  public get settings(): FormArray {
    return <FormArray>this.contentForm.get('setting');
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contentSvc: ContentService,
    private snackBar: MatSnackBar,
    private lookUpSvc: LookUpService,
    private uploadService: UploadService,
    private slug: SlugService,
    private userServc:AuthenticationService,
    private taskLookupServie:TaskLookupService,
    private router: Router
  ) {
    this.imageUrl = environment.ImageApiUrl;
    this.attachments = [];
    this.pdfAttachments=[];
  }

  createContentForm(): FormGroup {
    if(this.content.contentTypeId==this.jsonContentTypeId){
      this.jsonParseBody= JSON.parse(this.content.body);
      console.log("#contentType",this.content);
    }
    else 
    {
      this.jsonParseBody=this.content.body;
    }
    return this.formBuilder.group({
      id: [this.content.id],
      name: [this.content.name, Validators.required],
      title: [this.content.title],
      contentTypeId: [this.content.contentTypeId, Validators.required],
      slug: [{ value:this.content.slug, disabled: true }],
      body: [this.jsonParseBody],
      attachments: [this.content.attachments],
      datePublished: [this.content.datePublished],
      pageId: [this.content.pageId],
      author:[this.userServc.getUserToken().userId],//updated this [this.content.author],
      sectionId: [this.content.sectionId],
      templateId: [this.content.templateId],
      linkURL: [this.content.linkURL],
      sortOrder: [this.content.sortOrder],
      setting: this.formBuilder.array([this.buildContentSettings()])
    });
  }

  addContent(): void {
    this.contentForm
      .get('pageId')
      .setValue(this.activatedRoute.snapshot.params.pageId);

    if (this.contentForm.valid) {
      if(this.contentForm.getRawValue().contentTypeId==this.jsonContentTypeId){
        console.log("before saved",this.contentForm.getRawValue());
        let contentForm={
          name:this.contentForm.value.name,
          title: this.contentForm.value.title,
          contentTypeId:this.contentForm.value.contentTypeId,
          body:JSON.stringify(this.contentForm.value.body),
          attachments: this.contentForm.value.attachments,
          slug:this.contentForm.value.slug,
          datePublished: this.contentForm.value.datePublished,
          pageId: this.contentForm.value.pageId,
          author:this.contentForm.value.author,//updated this [this.content.author],
          sectionId: this.contentForm.value.sectionId,
          templateId: this.contentForm.value.templateId,
          linkURL: this.contentForm.value.linkURL,
          sortOrder: this.contentForm.value.sortOrder,
          setting:this.contentForm.value.setting
          }
          this.contentSvc
        .addContent(contentForm)
        .subscribe(response => {
          this.snackBar.open('Content added', 'OK', {
            verticalPosition: 'top',
            duration: 1000,
            panelClass: 'mat-green-bg'
          });
          this.contentForm.reset();
          this.attachments = [];
          this.router.navigate(['/siteManager/websites/list']);
        });
      }
      else 
      {
        this.contentSvc
        .addContent(this.contentForm.getRawValue())
        .subscribe(response => {
          this.snackBar.open('Content added', 'OK', {
            verticalPosition: 'top',
            duration: 1000,
            panelClass: 'mat-green-bg'
          });
          this.contentForm.reset();
          this.attachments = [];
          this.router.navigate(['/siteManager/websites/list']);
        });
      }
      
    }
  }
  saveContent(): void {
    if(this.contentForm.getRawValue().contentTypeId==this.jsonContentTypeId){
      let contentForm={
        name:this.contentForm.value.name,
        title: this.contentForm.value.title,
        contentTypeId:this.contentForm.value.contentTypeId,
        body:JSON.stringify(this.contentForm.value.body),
        attachments: this.contentForm.value.attachments,
        slug:this.contentForm.value.slug,
        datePublished: this.contentForm.value.datePublished,
        pageId: this.contentForm.value.pageId,
        author:this.contentForm.value.author,//updated this [this.content.author],
        sectionId: this.contentForm.value.sectionId,
        templateId: this.contentForm.value.templateId,
        linkURL: this.contentForm.value.linkURL,
        sortOrder: this.contentForm.value.sortOrder,
        setting:this.contentForm.value.setting
        }
        this.contentForm
      .get('pageId')
      .setValue(this.activatedRoute.snapshot.params.pageId);
    if (this.contentForm.valid) {
      this.contentSvc
        .editContent(contentForm, this.content.id)
        .subscribe(response => {
          this.snackBar.open(
            `Content ${this.content.name} Edited Successfully`,
            'OK',
            {
              verticalPosition: 'top',
              duration: 1000,
              panelClass: 'mat-green-bg'
            }
          );
          this.contentForm.reset();
          this.attachments = [];
          this.router.navigate(['/siteManager/websites/list']);
        });
    }
    }
    else 
    {
      this.contentForm
      .get('pageId')
      .setValue(this.activatedRoute.snapshot.params.pageId);
    if (this.contentForm.valid) {
      this.contentSvc
        .editContent(this.contentForm.getRawValue(), this.content.id)
        .subscribe(response => {
          this.snackBar.open(
            `Content ${this.content.name} Edited Successfully`,
            'OK',
            {
              verticalPosition: 'top',
              duration: 1000,
              panelClass: 'mat-green-bg'
            }
          );
          this.contentForm.reset();
          this.attachments = [];
          this.router.navigate(['/siteManager/websites/list']);
        });
    }
    }
    
  }
  fillLookUps(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.contentTypeCode)
      .subscribe((response: LookUpModel[]) => {
        this.contentTypes = response;
        console.log("shapesOfContentTypes",this.contentTypes);
        this.contentTypes.forEach(type=>{
          if(type.text ==="Blog"){
            this.defaultContent=type.value;
          }
        });
      });
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.contentTemplate)
      .subscribe((response: LookUpModel[]) => {
        this.contentTemplates = response;
        console.log("@defaultValue",this.contentTemplates);
        this.contentTemplates.forEach(type=>{
          if(type.text ==="ParallexText"){
            this.defaultTemplate=type.value;
          }
        });
      });
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.contentSection)
      .subscribe((response: LookUpModel[]) => {
        this.contentSections = response;
      });
  }
  
  onChange(event:any) { 
    console.log("look for change here",event.target.files);
    const files: File[] = event.target.files;
    if (files) {
      const fileToUpload = files;
      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(elem => {
          console.log("filter the response",elem);
          if(elem.fileExtension===".jpeg" ||elem.fileExtension===".png" ||elem.fileExtension===".jpg" || elem.fileExtension==="gif"){
            this.attachments.push({ attachmentId:elem.id, url:elem.url});
          }
          if(elem.fileExtension===".pdf"){
            this.pdfAttachments.push({attachmentId:elem.id,url:elem.url});
          }
        });
        this.contentForm.get('attachments').setValue(this.attachments);
        console.log("@image",this.attachments);
        console.log("@pdf",this.pdfAttachments);
      });
    }
  }
onEditorChange($event): void {}

onNameChange($event): void {
    this.contentForm
      .get('slug')
      .setValue(this.slug.slugify(this.contentForm.get('title').value));
  }

  addSetting(setting?: ContentSetting): void {
    debugger;
    this.settings.push(this.buildContentSettings(setting));
  }

  removeSetting(index): void {
    this.settings.removeAt(index);
  }

  buildContentSettings(setting?: ContentSetting): FormGroup {
    setting = setting ? setting : {};
    return this.formBuilder.group({
      key: [setting.key ? setting.key : ''],
      value: [setting.value ? setting.value : '']
    });
  }
  deleteMedia(event){
    console.log("@deleteMedia",event.attachmentId);
    this.uploadService.deleteMedia(event.attachmentId).subscribe(res=>{
      this.attachments=this.attachments.filter(attacId=>attacId.attachmentId!==event.attachmentId);
      this.pdfAttachments=this.pdfAttachments.filter(attacId=>attacId.attachmentId!==event.attachmentId);
    });
  }

  ngOnInit() {
    this.fillLookUps();
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea'
    };
    setTimeout(() => {
      if (this.activatedRoute.snapshot.params.contentId === 'new') {
        //console.log("@content",this.default.text);
        this.pageType = 'new';
        this.content = {
          id: null,
          name: '',
          pageId: this.activatedRoute.snapshot.params.pageId,
          title: '',
          slug: '',
          body: '',
          contentTypeId:this.defaultContent,
          attachments: [],
          datePublished: '',
          author:this.userServc.getUserToken().userId, //'',
          templateId:this.defaultTemplate,
          sectionId: null,
          linkURL: '',
          sortOrder: null,
          setting: []
        };
        this.contentForm = this.createContentForm();
        //added
      } 
      else 
      {
        //get content by ID
        this.pageType = 'edit';
        const contentId = this.activatedRoute.snapshot.params.contentId;
        this.contentSvc.getContent(contentId).subscribe(response => {
          // debugger;
          response.attachments.forEach(elem => {
            this.attachments.push({ attachmentId: elem.id, url: elem.url });
          });
          console.log("responseInEditCase",response);
          if(response.contentTypeId==this.jsonContentTypeId){
            this.jsonEditor=true;
            JSON.parse(response.body);
          }
          this.content = response;
          this.content.id = contentId;
          this.contentForm = this.createContentForm();
          this.content.attachments = response.attachments;
          if (this.content.setting.length) {
            this.content.setting.forEach(elem => {
              this.addSetting(elem);
            });
          }
        });
      }
    },3000);
    //select the default user
    this.selectUser();
  }
  mapJSONValue($event){
    if($event.value==this.jsonContentTypeId){
      this.jsonEditor=true;
      this.contentForm.patchValue({
        body:{},
     });    
    }
    else {
      this.jsonEditor=false;
    }
  }
  selectUser(){ 
    this.taskLookupServie.onUsers.subscribe(data=>{
      this.userList=data;
    });
  }
  onBlur() {
    console.log('Blur');
  }
}
