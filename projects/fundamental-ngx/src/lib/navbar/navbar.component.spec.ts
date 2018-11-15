import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

import { ModalService } from '../modal/modal.service';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let modalSpy: jasmine.SpyObj<ModalService>;

    beforeEach(async(() => {
        modalSpy = jasmine.createSpyObj('ModalService', ['open']);

        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            providers: [{ provide: ModalService, useValue: modalSpy }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
