import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessageComponent } from './form-message.component';

describe('FormMessageComponent', () => {
    let component: FormMessageComponent;
    let fixture: ComponentFixture<FormMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should append the proper class name --text', () => {
        const type = 'text';
        component.type = type;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').classList).toContain('fd-form__message--' + type);
    });

    it('should append the proper class name --help', () => {
        const type = 'help';
        component.type = type;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').classList).toContain('fd-form__message--' + type);
    });

    it('should append the proper class name --error', () => {
        const type = 'error';
        component.type = type;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').classList).toContain('fd-form__message--' + type);
    });

    it('should append the proper class name --warning', () => {
        const type = 'warning';
        component.type = type;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').classList).toContain('fd-form__message--' + type);
    });
});
