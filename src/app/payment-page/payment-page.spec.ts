import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPageComponent } from './payment-page.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule, Router } from '@angular/router';
import { PaymentPageService } from '../services/payment-page.service';

describe('Component: Payment Page', () => {
    let component: PaymentPageComponent;
    let fixture: ComponentFixture<PaymentPageComponent>;

    let de: DebugElement;
    let nxtBtn: HTMLElement;
    let el: HTMLElement;
    let inputEl: HTMLInputElement;
    let insCode;
    let navSpy: jasmine.Spy;
    beforeEach(() => {

        class RouterStub {
            navigate(params: any) { }
        }
        class FakePayService {
            constructor() { }
            processPay(code: any): Promise<any> {
                let data = {
                    cardNo: "1234567812345678",
                    cvv: 123,
                    expiryMonth: 12,
                    expiryYear: 2020,
                    name: "test test",
                }
                return Promise.resolve({
                    "success": true,
                    "data": { "requestId": 56635, "name": "test test", "requestDate": 1532624568497 }
                });
            }
        }
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterModule.forRoot([]), ReactiveFormsModule, FormsModule, HttpClientModule],
            declarations: [PaymentPageComponent],
            providers: [
                { provide: PaymentPageService, useClass: FakePayService },
                { provide: Router, useClass: RouterStub }
            ]
        });


        // create component and test fixture
        fixture = TestBed.createComponent(PaymentPageComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

    });

    it('should display original title', () => {
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('h5'));
        el = de.nativeElement;
        console.log(el)
        expect(el.textContent).toContain('Payment Details');
    });

    it('should enter correct field details', () => {

        let errors = {};

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#nameId'));
        inputEl = de.nativeElement;
        inputEl.value = 'Saraswati Bailwal';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['name'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#cardNoId'));
        inputEl = de.nativeElement;
        inputEl.value = '5206989067899090';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['cardNo'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#expiryMonthId'));
        inputEl = de.nativeElement;
        inputEl.value = '12';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['expiryMonth'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#expiryYearId'));
        inputEl = de.nativeElement;
        inputEl.value = '2030';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['expiryYear'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#cvvId'));
        inputEl = de.nativeElement;
        inputEl.value = '123';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['cvv'].value)
        expect(inputEl).toBeTruthy();

        var btn = fixture.debugElement.queryAll(By.css('button'));
        nxtBtn = btn[0].nativeElement;
        nxtBtn.click();

        fixture.detectChanges();
        
        expect(nxtBtn.className).toContain('btn-primary');
    });

    it('process button is disabled if any one field except name has wrong data entered', () => {

        let errors = {};

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#nameId'));
        inputEl = de.nativeElement;
        inputEl.value = 'Saraswati Bailwal';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['name'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#cardNoId'));
        inputEl = de.nativeElement;
        inputEl.value = '5206989067899';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['cardNo'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#expiryMonthId'));
        inputEl = de.nativeElement;
        inputEl.value = '12';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['expiryMonth'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#expiryYearId'));
        inputEl = de.nativeElement;
        inputEl.value = '2030';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['expiryYear'].value)
        expect(inputEl).toBeTruthy();

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#cvvId'));
        inputEl = de.nativeElement;
        inputEl.value = '23';
        inputEl.dispatchEvent(new Event('input'));
        console.log(component.fG.controls['cvv'].value)
        expect(inputEl).toBeTruthy();

        var btn = fixture.debugElement.queryAll(By.css('button'));
        nxtBtn = btn[0].nativeElement;
        
        nxtBtn.click();
        expect(nxtBtn.className).toContain('btn-secondary');
        

    });

});

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}