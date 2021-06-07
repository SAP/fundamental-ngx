import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBarComponent } from './button-bar.component';
import { ButtonModule } from '../../button/button.module';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '@fundamental-ngx/core/utils';

describe('ButtonBarComponent', () => {
    let component: ButtonBarComponent;
    let fixture: ComponentFixture<ButtonBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ButtonBarComponent],
            providers: [ContentDensityService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle content density when compact input is not provided', () => {
        component.ngOnInit();
        expect(component.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
    });
});
