import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarSubtitleComponent } from './shellbar-subtitle.component';

describe('ShellbarSubtitleComponent', () => {
    let component: ShellbarSubtitleComponent;
    let fixture: ComponentFixture<ShellbarSubtitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarSubtitleComponent ]
        })
            .compileComponents();
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
