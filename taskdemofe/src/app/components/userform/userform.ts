import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { userServices, User } from '../../api/services/user/user.services';

@Component({
  selector: 'app-userform',
  imports: [ReactiveFormsModule],
  templateUrl: './userform.html',
  styleUrl: './userform.css',
})
export class Userform implements OnInit {
  readonly user = input<User | null>(null);
  readonly cancel = output<void>();
  readonly saved = output<void>();

  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly isEditing = computed(() => this.user() !== null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    confirmPassword: [''],
  });

  // constructor() {
  //   // Keep the form in sync if the modal is reused for another record.
  //   this.form.controls.name.addValidators(Validators.minLength(2))
  // }

  ngOnInit(): void {
    // Keep the form in sync if the modal is reused for another record.
    this.form.controls.password.addValidators(Validators.minLength(8));
  }

  ngOnChanges(): void {
    const user = this.user();
    this.errorMessage.set('');
    this.form.reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      confirmPassword: '',
    });
    if (user) {
      this.form.controls.password.clearValidators();
      this.form.controls.password.addValidators(Validators.minLength(8));
    } else {
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.form.controls.password.updateValueAndValidity();
  }

  submit(): void {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password, confirmPassword } = this.form.getRawValue();
    if (password && password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    const payload: { name: string; email: string; password?: string } = {
      name: name.trim(),
      email: email.trim(),
    };
    if (password) payload.password = password;

    const user = this.user();
    this.saving.set(true);
    const request = user
      ? userServices.updateUser(this.http, user.id, payload)
      : userServices.createUser(this.http, payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.saved.emit();
      },
      error: (error: { error?: { message?: string } }) => {
        this.saving.set(false);
        this.errorMessage.set(error.error?.message ?? 'Could not save the user. Please try again.');
      },
    });
  }
}
