import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { SettingsGeneratorService } from '../settings-generator.service';
import { SettingsGeneratorSectionComponent } from './settings-generator-section/settings-generator-section.component';

import { SettingsGeneratorContentComponent } from './settings-generator-content.component';

class SettingsGeneratorServiceStub {
    _addFormGenerator(_: string[]): void {}
    _removeFormGenerator(_: string[]): void {}
}

describe('SettingsGeneratorContentComponent', () => {
    let component: SettingsGeneratorContentComponent;
    let fixture: ComponentFixture<SettingsGeneratorContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorContentComponent, SettingsGeneratorSectionComponent],
            imports: [PipeModule, SkeletonModule, PlatformFormGeneratorModule],
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
