import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarCollapseComponent } from './shellbar-collapse.component';

describe('ShellbarCollapseComponent', () => {
    let component: ShellbarCollapseComponent;
    let fixture: ComponentFixture<ShellbarCollapseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarCollapseComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarCollapseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
