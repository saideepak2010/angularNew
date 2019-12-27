import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { of,Observable } from 'rxjs'
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
  constructor(private fb: FormBuilder,private messageService: NewserviceService) { }
  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      mandatory:[""],      
      subFormsArray: this.fb.array([]),
    });
    this.totalLengthArray()
  }

  totalLengthArray(){
    for(let j=1;j<=this.totalLength;j++){
      this.n.push(j);
    }
    this.length = this.n;
    console.log(this.profileForm.controls);
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
}
