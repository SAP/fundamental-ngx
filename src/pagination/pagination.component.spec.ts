import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationModule } from './pagination.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { PaginationComponent } from './pagination.component';

describe('Pagination Test', () => {
    let fixture: ComponentFixture<PaginationComponent>;
    let component: PaginationComponent;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            imports: [ButtonModule, IconModule, PaginationModule]
        });

        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
    });

    it('GIVEN initial values for paginature THEN it should initialize the pagination object', () => {
        const pagination = { currentPage: 2, itemsPerPage: 3, totalItems: 80 };
        component.pagination = { ...pagination };

        component.ngOnChanges();
        expect(component.total).toBe(Math.ceil(pagination.totalItems / pagination.itemsPerPage));
    });
});
