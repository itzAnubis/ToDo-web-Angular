import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regestration } from './regestration';

describe('Regestration', () => {
  let component: Regestration;
  let fixture: ComponentFixture<Regestration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regestration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regestration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
