import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisarAsistenciasPage } from './revisar-asistencias.page';

describe('RevisarAsistenciasPage', () => {
  let component: RevisarAsistenciasPage;
  let fixture: ComponentFixture<RevisarAsistenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
