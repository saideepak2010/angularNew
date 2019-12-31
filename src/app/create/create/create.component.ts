import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { of,Observable, from} from 'rxjs';
import {scan,reduce} from 'rxjs/operators';
import { ButtonComponent } from '../../commonComponents/button/button.component';
import { NewserviceService } from '../../newservice.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  profileForm:FormGroup;
  formGroup:FormGroup;
  firstname:AbstractControl;
  lastname:AbstractControl;
  age:AbstractControl;
  buttonName = "Save";
  mandatory: AbstractControl;
  passMandatoryRequest: any = false;
  text: any = "";
  n = [];
  length = [];
  totalLength = 1;
  removeAction:boolean = false;
  totalRows: number = 1;
  constructor(private fb: FormBuilder,private messageService: NewserviceService) { }
  ngOnInit() {
    this.getInit();
    this.totalLengthArray()
    this.observablesFctn()
  }

  getInit(){
    this.profileForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      mandatory:[""],      
      subFormsArray: this.fb.array([]),
    });
  }
  totalLengthArray(){
    
    for(let j=1;j<=this.totalLength;j++){
      this.n.push(j);
    }
    this.length = this.n;
    this.totalRows = this.length.length;
    this.profileForm.updateValueAndValidity();
  }
  newFctn(value){
    console.log(this.profileForm);
  }
  passValue(){
    this.passMandatoryRequest = this.profileForm.value.mandatory;
    this.messageService.sendMessage(this.passMandatoryRequest);
  }
  addMoreRow(){
    this.totalLength = 1;
    this.totalLengthArray();
  }
  newValue(newValueUpdate){
    this.totalLength = newValueUpdate;
  }
  removePosition(elementLength){
    var newLength = this.length;
    var getElem = newLength.findIndex(function(element,indexPos){
      return indexPos === elementLength;
    });
    const creds = this.profileForm.controls.subFormsArray as FormArray;
    creds.removeAt(getElem);
    this.length.splice(getElem,1);

    
    creds.controls.forEach(function(value,index){
      console.log(value.value);
      value.setValue({field1: value.value.field1,field2: value.value.field2,field3: value.value.field3,field4: value.value.field4});
      // value.setValue({field1: "Sai",field2: "Deepak",field3: "Bala",field4: "Subramanian"});
    });
    this.profileForm.updateValueAndValidity();
  }

  observablesFctn(){
    var obsScan = from([1,2,3,4,5,6]);
    var count1 = obsScan.pipe(scan((acc, one) =>  acc + one, 0));
    count1.subscribe(x => {
        console.log('scan shows incremental total', x);
    });

    var obsReduce = from([1,2,3,4,5,6]);
    var count2 = obsReduce.pipe(reduce((acc, one) => acc + one, 0));
    count2.subscribe(x => {
        console.log('reduce shows only total', x);
    });
  }
}
