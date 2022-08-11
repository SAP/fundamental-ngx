import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarTitleComponent } from './shellbar-title.component';

describe('ShellbarTitleComponent', () => {
    let component: ShellbarTitleComponent;
    let fixture: ComponentFixture<ShellbarTitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
