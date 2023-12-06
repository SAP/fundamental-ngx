import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardNavigationComponent } from './wizard-navigation.component';

describe('WizardNavigationComponent', () => {
    let component: WizardNavigationComponent;
    let fixture: ComponentFixture<WizardNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WizardNavigationComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
