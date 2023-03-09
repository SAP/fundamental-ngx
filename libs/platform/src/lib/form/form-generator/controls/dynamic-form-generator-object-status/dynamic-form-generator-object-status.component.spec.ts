import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormGeneratorObjectStatusComponent } from './dynamic-form-generator-object-status.component';

describe('DynamicFormGeneratorObjectStatusComponent', () => {
    let component: DynamicFormGeneratorObjectStatusComponent;
    let fixture: ComponentFixture<DynamicFormGeneratorObjectStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DynamicFormGeneratorObjectStatusComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicFormGeneratorObjectStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
