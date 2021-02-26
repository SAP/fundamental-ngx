import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBarComponent } from './button-bar.component';
import { ButtonModule } from '../../button/button.module';

describe('ButtonBarComponent', () => {
    let component: ButtonBarComponent;
    let fixture: ComponentFixture<ButtonBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ButtonBarComponent]
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
});
