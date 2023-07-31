import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreparedNestedListComponent } from './prepared-nested-list.component';
import { CxNestedListModule } from '../nested-list.module';

describe('NestedListPopoverComponent', () => {
    let component: PreparedNestedListComponent;
    let fixture: ComponentFixture<PreparedNestedListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CxNestedListModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreparedNestedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
