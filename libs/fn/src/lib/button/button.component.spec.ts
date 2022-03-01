import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule],
                declarations: [ButtonComponent]
            }).compileComponents();
        })
    );

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

    it('should set emphasized classname', () => {
        component.emphasized = true;
        fixture.detectChanges();
        return fixture.whenRenderingDone().then(() => {
            expect(component.elementRef().nativeElement.classList.contains('fn-button--emphasized')).toBeTrue();
        });
    });
});
