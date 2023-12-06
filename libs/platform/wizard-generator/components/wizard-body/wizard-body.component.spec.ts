import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformWizardGeneratorModule } from '../../wizard-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardBodyComponent } from './wizard-body.component';

describe('WizardBodyComponent', () => {
    let component: WizardBodyComponent;
    let fixture: ComponentFixture<WizardBodyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformWizardGeneratorModule],
            providers: [WizardGeneratorService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
