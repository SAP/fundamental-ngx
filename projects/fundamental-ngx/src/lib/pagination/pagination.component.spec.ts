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
});
