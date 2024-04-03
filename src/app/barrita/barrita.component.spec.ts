import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarritaComponent } from './barrita.component';

describe('BarritaComponent', () => {
  let component: BarritaComponent;
  let fixture: ComponentFixture<BarritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarritaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
