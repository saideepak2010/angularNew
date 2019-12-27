import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, AbstractControl,ControlContainer, FormGroupDirective, FormArray } from '@angular/forms';
import { of,Observable,Subscription} from 'rxjs'
import { NewserviceService } from '../newservice.service';
@Component({
  selector: 'app-subform',
  templateUrl: './subform.component.html',
  styleUrls: ['./subform.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SubFormComponent implements OnInit {
    @Input() parentGroup:FormGroup;
    @Input() mandatoryStatus;
    newFormGroup:FormGroup;
    field1: AbstractControl;
    field2: AbstractControl;
    field3: AbstractControl;
    field4: AbstractControl;
    myTest: Observable<any>;
    subscription: Subscription;
    mandatoruStatusUpdate:any=this.mandatoryStatus;
  constructor(private fb: FormBuilder,private messageService: NewserviceService) {
   }

  ngOnInit() {
    console.log(this.mandatoryStatus);
    const creds = this.parentGroup.controls.subFormsArray as FormArray;
    this.newFormGroup = this.fb.group({
        field1: [''], //null, [Validators.required]
        field2: [''],
        field3: [''],
        field4: ['']
      });
      creds.push(this.newFormGroup);
      // this.parentGroup.addControl('subFormsArray', this.newFormGroup);
      // this.parentGroup.addControl('fields', this.newFormGroup);
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field1)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field2)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field3)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field4)
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.mandatoruStatusUpdate = message.text;
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field1)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field2)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field3)
      this.updateValidators(this.mandatoruStatusUpdate,this.newFormGroup.controls.field4)
    });
  }
  updateValidators(status,field){
    console.log(field);
    if(status == true){
      field.setValidators([Validators.required]);
      field.updateValueAndValidity();
    }
    else{
      field.setValidators("");
      field.updateValueAndValidity();
    }
  }
}
