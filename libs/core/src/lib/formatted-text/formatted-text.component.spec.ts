import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedTextComponent } from './formatted-text.component';

describe('FormattedTextComponent', () => {
    let component: FormattedTextComponent;
    let fixture: ComponentFixture<FormattedTextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormattedTextComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormattedTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
