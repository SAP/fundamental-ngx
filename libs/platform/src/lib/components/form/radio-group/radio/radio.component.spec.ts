import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio.component';
import { RadioModule, FormModule, FormGroupComponent } from '@fundamental-ngx/core';

describe('RadioButtonComponent', () => {
    let component: RadioButtonComponent;
    let fixture: ComponentFixture<RadioButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RadioModule, FormModule],
            declarations: [RadioButtonComponent, FormGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('radio button with default property should be created', () => {
        component.id = 'id1';
        component.name = 'radio1';
        component.value = 'radio1';

        // forceRendere must be true for component creation
        component.forceRender = true;
        fixture.detectChanges();

        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.type).toEqual('radio');
        expect(inputElem.nativeElement.getAttribute('id')).toBeTruthy();
        expect(inputElem.nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(inputElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('radio1');
        expect(inputElem.nativeElement.getAttribute('ng-reflect-value')).toEqual('radio1');

        expect(inputElem.nativeElement.classList.contains('fd-radio')).toBeTruthy();
    });

    it('radio button should be compact, valid state and disable', () => {
        component.id = 'id1';
        component.name = 'radio1';
        component.value = 'radio1';
        component.contentDensity = 'compact';
        component.disabled = true;

        // forceRendere must be true for component creation
        component.forceRender = true;

        fixture.detectChanges();

        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.type).toEqual('radio');
        expect(inputElem.nativeElement.getAttribute('id')).toBeTruthy();
        expect(inputElem.nativeElement.getAttribute('ng-reflect-is-disabled')).toBeTruthy();
        expect(inputElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('radio1');
        expect(inputElem.nativeElement.getAttribute('ng-reflect-value')).toEqual('radio1');

        expect(inputElem.nativeElement.classList.contains('fd-radio')).toBeTruthy();
        // currently failing because of core style handling issue.
        // expect(inputElem.nativeElement.classList.contains('fd-radio--compact')).toBeTruthy();
    });

    it('radio click should be called', () => {
        component.id = 'id1';
        component.name = 'radio1';
        component.value = 'radio1';
        component.contentDensity = 'compact';
        component.disabled = true;

        // forceRendere must be true for component creation
        component.forceRender = true;
        fixture.detectChanges();

        const radioElem = fixture.debugElement.query(By.css('fd-radio-button'));

        spyOn(component, 'onClick');
        radioElem.triggerEventHandler('click', null);
        expect(component.onClick).toHaveBeenCalled();
    });
});
