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
    @Input() passValue;
    @Input() indexValue;
    @Input() removeAction = false;
    @Output() passValueEmit = new EventEmitter();
    @Output() removePosition = new EventEmitter();
    @Input() totalRows: number = 1;
    newFormGroup:FormGroup;
    field1: AbstractControl;
    field2: AbstractControl;
    field3: AbstractControl;
    field4: AbstractControl;
    myTest: Observable<any>;
    subscription: Subscription;
  constructor(private fb: FormBuilder,private messageService: NewserviceService) {
   }

  ngOnInit() {
    const creds = this.parentGroup.controls.subFormsArray as FormArray;
    this.newFormGroup = this.fb.group({
        field1: [''], //null, [Validators.required]
        field2: [''],
        field3: [''],
        field4: ['']
      });
      this.addRowMand(creds,this.newFormGroup);
  }

  addRowMand(creds,newFormGroup){
    creds.push(newFormGroup);
      // this.parentGroup.addControl('subFormsArray', newFormGroup);
      // this.parentGroup.addControl('fields', newFormGroup);
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field1)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field2)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field3)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field4)
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.mandatoryStatus = message.text;
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field1)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field2)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field3)
      this.updateValidators(this.mandatoryStatus,newFormGroup.controls.field4)
      
    });
  }
  updateValidators(status,field){
    if(status == true){
      field.setValidators([Validators.required]);
      field.updateValueAndValidity();
    }
    else{
      field.setValidators("");
      field.updateValueAndValidity();
    }
    // field.setValidators([Validators.required]);
    //   field.updateValueAndValidity();
  }
  
  removeRow(index){
    const creds = this.parentGroup.controls.subFormsArray as FormArray;
    var getElem = creds.value.findIndex(function(element,indexPos){
      return indexPos === index;
    });
    this.removePosition.emit(getElem);
  }

}
