import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilModalComponent } from './perfil-modal.component';

describe('PerfilModalComponent', () => {
  let component: PerfilModalComponent;
  let fixture: ComponentFixture<PerfilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
