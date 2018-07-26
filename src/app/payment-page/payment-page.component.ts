import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn } from "@angular/forms";
import { PaymentPageService } from '../services/payment-page.service';

@Component({
    templateUrl: './payment-page.html',
    styleUrls: ['./payment-page.css']
})

export class PaymentPageComponent implements AfterViewInit {
    fG: FormGroup;
    showSuccessResult = false;
    showFailureResult = false;
    cardReg = /^\d{16}$/;
    monthReg = /^(1[0-2]|[1-9])$/;
    yearReg = /^\d{4}$/;
    cvvReg = /^\d{3}$/;
    constructor(private fb: FormBuilder, private payService: PaymentPageService) {
        this.fG = new FormGroup({
            name: new FormControl('', Validators.required),
            cardNo: new FormControl('',Validators.compose([Validators.required, Validators.pattern(this.cardReg)])),
            cvv: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.cvvReg)])),
            expiryMonth: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.monthReg)])),
            expiryYear: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.yearReg)])),
        });
    }
    get name() { return this.fG.get('Name'); }
    get cardNo() { return this.fG.get('Card'); }
    get cvv() { return this.fG.get('Cvv'); }
    get expiryMonth() { return this.fG.get('expiryMonth'); }
    get expiryYear() { return this.fG.get('expiryYear'); }
    
    ngAfterViewInit() { }
    onSubmit() {
        console.log("Now this gets logged");
        this.payService.processPay(this.fG.getRawValue()).then((res)=> {
            console.log("Response=====", res);
            if (res.success) {
                this.showSuccessResult = true;
            } else {
                this.showFailureResult = true;
            }
        });
    }
}