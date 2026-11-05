import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userstatistics } from './userstatistics';

describe('Userstatistics', () => {
  let component: Userstatistics;
  let fixture: ComponentFixture<Userstatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userstatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userstatistics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
