import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeModule } from '@fundamental-ngx/cdk/utils';

import { SettingsGeneratorContentComponent } from './settings-generator-content.component';

describe('SettingsGeneratorContentComponent', () => {
    let component: SettingsGeneratorContentComponent;
    let fixture: ComponentFixture<SettingsGeneratorContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorContentComponent],
            imports: [PipeModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
