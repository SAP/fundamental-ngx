import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
    let component: FormGroupComponent;
    let fixture: ComponentFixture<FormGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply fd-form-group--with-spacing when withSpacing is true', () => {
        component.withSpacing = true;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-form-group--with-spacing')).toBe(true);
    });

    it('should not apply fd-form-group--with-spacing when withSpacing is false', () => {
        component.withSpacing = false;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-form-group--with-spacing')).toBe(false);
    });
});
