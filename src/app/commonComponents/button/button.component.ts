import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { of,Observable,Subscription} from 'rxjs'
import { NewserviceService } from '../../newservice.service';
@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
  })
  
export class ButtonComponent implements OnInit {
    @Input() dataSave = "Output";
    @Input() disabledStatus = '';
    @Input() newPassMandatoryRequest = '';
    subscription: Subscription;
    constructor(private messageService: NewserviceService) { }
    ngOnInit(){
        console.log(this.newPassMandatoryRequest);
        this.subscription = this.messageService.getMessage().subscribe(message => {
            // console.log(message);
            // console.log(this.disabledStatus);
        });
    }
}