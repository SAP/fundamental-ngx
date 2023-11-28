import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsGeneratorService } from '../settings-generator.service';

import { SettingsGeneratorContentComponent } from './settings-generator-content.component';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';

class SettingsGeneratorServiceStub {
    _addFormGenerator(): void {}
    _removeFormGenerator(): void {}
}

describe('SettingsGeneratorContentComponent', () => {
    let component: SettingsGeneratorContentComponent;
    let fixture: ComponentFixture<SettingsGeneratorContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformFormGeneratorModule, SettingsGeneratorContentComponent],
            providers: [
                {
                    provide: SettingsGeneratorService,
                    useClass: SettingsGeneratorServiceStub
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
