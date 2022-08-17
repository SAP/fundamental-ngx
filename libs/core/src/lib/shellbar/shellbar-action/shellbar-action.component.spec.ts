import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarActionComponent } from './shellbar-action.component';
import { ButtonModule } from '../../button/button.module';

describe('ShellbarActionComponent', () => {
    let component: ShellbarActionComponent;
    let fixture: ComponentFixture<ShellbarActionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ShellbarActionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
