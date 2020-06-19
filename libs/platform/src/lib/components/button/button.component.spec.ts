import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from '@fundamental-ngx/core';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('button onclick should be called', () => {
        spyOn(component, 'onBtnClick');
        component.onBtnClick(event);
        expect(component.onBtnClick).toHaveBeenCalled();
    });

    it('should have a content disabled button', () => {
        const element = fixture.debugElement.nativeElement.querySelector('button');
        component.disabled = true;
        fixture.detectChanges();
        expect(element.disabled).toBeTruthy();
    });

});
