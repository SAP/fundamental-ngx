import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarLogoComponent } from './shellbar-logo.component';

describe('ShellbarLogoComponent', () => {
    let component: ShellbarLogoComponent;
    let fixture: ComponentFixture<ShellbarLogoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarLogoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
