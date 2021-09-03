import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformWizardGeneratorModule } from '../../wizard-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardGeneratorComponent } from './wizard-generator.component';

describe('WizardGeneratorComponent', () => {
    let component: WizardGeneratorComponent;
    let fixture: ComponentFixture<WizardGeneratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformWizardGeneratorModule],
            providers: [WizardGeneratorService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
