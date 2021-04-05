import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarSubtitleComponent } from './shellbar-subtitle.component';

describe('ShellbarSubtitleComponent', () => {
    let component: ShellbarSubtitleComponent;
    let fixture: ComponentFixture<ShellbarSubtitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarSubtitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
