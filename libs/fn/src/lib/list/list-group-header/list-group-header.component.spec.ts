import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupHeaderComponent } from './list-group-header.component';

describe('ListGroupHeaderComponent', () => {
    let component: ListGroupHeaderComponent;
    let fixture: ComponentFixture<ListGroupHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListGroupHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListGroupHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
