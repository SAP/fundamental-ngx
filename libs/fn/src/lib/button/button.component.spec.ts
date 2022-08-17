import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
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

    it('should set proper fnType classes', () => {
        component.fnType = 'secondary';
        fixture.detectChanges();
        return fixture.whenRenderingDone().then(() => {
            expect(component.elementRef().nativeElement.classList.contains('fn-button--secondary')).toBeTrue();
        });
    });

    it('should set proper selected class and aria-selected', () => {
        component.selected = true;
        fixture.detectChanges();
        return fixture.whenRenderingDone().then(() => {
            expect(component.elementRef().nativeElement.classList.contains('fn-button--selected')).toBeTrue();
            expect(component.elementRef().nativeElement.getAttribute('aria-selected')).toEqual('true');
        });
    });

    it('should set emphasized classname', () => {
        component.emphasized = true;
        fixture.detectChanges();
        return fixture.whenRenderingDone().then(() => {
            expect(component.elementRef().nativeElement.classList.contains('fn-button--emphasized')).toBeTrue();
        });
    });

    it('should disable', () => {
        component.disabled = true;
        fixture.detectChanges();
        return fixture.whenRenderingDone().then(() => {
            expect(component.elementRef().nativeElement.classList.contains('is-disabled')).toBeTrue();
            expect(component.elementRef().nativeElement.getAttribute('aria-disabled')).toEqual('true');
            expect(component.elementRef().nativeElement.getAttribute('disabled')).toEqual(null);
        });
    });
});
