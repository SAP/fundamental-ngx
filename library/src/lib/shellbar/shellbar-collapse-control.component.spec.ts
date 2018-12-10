import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarCollapseControlComponent } from './shellbar-collapse-control.component';

describe('ShellbarCollapseControlComponent', () => {
    let component: ShellbarCollapseControlComponent;
    let fixture: ComponentFixture<ShellbarCollapseControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarCollapseControlComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarCollapseControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
