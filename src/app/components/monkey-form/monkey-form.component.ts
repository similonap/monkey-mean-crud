import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Monkey, Species } from '../../models/monkey.model';

export interface MonkeyFormValue {
  name: string;
  species_id: number | null;
  country: string;
  gender: string;
  weight: number | null;
  height: number | null;
  year: number | null;
  likes: number | null;
  image: string;
  personality_trait: string;
  description: string;
}

@Component({
  selector: 'app-monkey-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './monkey-form.component.html',
  styleUrl: './monkey-form.component.css',
})
export class MonkeyFormComponent implements OnChanges {
  private readonly currentYear = new Date().getFullYear();

  @Input() title = '';
  @Input() backLink: string | any[] = ['/monkeys'];
  @Input() backLabel = '← Back';
  @Input() submitLabel = 'Save';
  @Input() loading = false;
  @Input() saving = false;
  @Input() error: string | null = null;
  @Input() speciesList: Species[] = [];
  @Input() initialValue: Partial<Monkey> | null = null;

  @Output() submitForm = new EventEmitter<MonkeyFormValue>();
  @Output() cancel = new EventEmitter<void>();

  private readonly imageExistsValidator: AsyncValidatorFn = (control) => {
    const value = (control.value ?? '').trim();

    if (!value) {
      return Promise.resolve(null);
    }

    if (typeof Image === 'undefined') {
      return Promise.resolve(null);
    }

    return new Promise<ValidationErrors | null>((resolve) => {
      const preview = new Image();
      preview.decoding = 'async';
      preview.referrerPolicy = 'no-referrer';
      let settled = false;

      const finish = (errors: ValidationErrors | null) => {
        if (!settled) {
          settled = true;
          resolve(errors);
        }
      };

      const timeout = setTimeout(() => finish({ imageNotFound: true }), 4000);

      preview.onload = () => {
        clearTimeout(timeout);
        finish(null);
      };

      preview.onerror = () => {
        clearTimeout(timeout);
        finish({ imageNotFound: true });
      };

      preview.src = value;
    });
  };

  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    species_id: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gender: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weight: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    height: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    year: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currentYear),
      ],
    }),
    likes: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    image: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [this.imageExistsValidator],
      updateOn: 'blur',
    }),
    personality_trait: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      const updated = changes['initialValue'].currentValue as Monkey | null;
      if (updated) {
        this.patchForm(updated);
      } else {
        this.form.reset({
          name: '',
          species_id: null,
          country: '',
          gender: '',
          weight: null,
          height: null,
          year: null,
          likes: null,
          image: '',
          personality_trait: '',
          description: '',
        });
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue() as MonkeyFormValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private patchForm(monkey: Monkey): void {
    this.form.patchValue({
      name: monkey.name,
      species_id: monkey.species_id ?? monkey.species?.id ?? null,
      country: monkey.country,
      gender: monkey.gender,
      weight: monkey.weight,
      height: monkey.height,
      year: monkey.year,
      likes: monkey.likes,
      image: monkey.image,
      personality_trait: monkey.personality_trait,
      description: monkey.description,
    });
  }
}
