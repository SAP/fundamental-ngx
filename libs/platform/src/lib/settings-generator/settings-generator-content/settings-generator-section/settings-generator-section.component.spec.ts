import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsGeneratorService } from '../../settings-generator.service';

import { SettingsGeneratorSectionComponent } from './settings-generator-section.component';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';

class SettingsGeneratorServiceStub {
    _addFormGenerator(_: string[]): void {}
    _removeFormGenerator(_: string[]): void {}
}

describe('SettingsGeneratorSectionComponent', () => {
    let component: SettingsGeneratorSectionComponent;
    let fixture: ComponentFixture<SettingsGeneratorSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformFormGeneratorModule, SettingsGeneratorSectionComponent],
            providers: [
                {
                    provide: SettingsGeneratorService,
                    useClass: SettingsGeneratorServiceStub
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
