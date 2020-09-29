import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { SubmenuComponent } from './menu-item.component';

describe('SubmenuComponent', () => {
    let component: SubmenuComponent;
    let fixture: ComponentFixture<SubmenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
