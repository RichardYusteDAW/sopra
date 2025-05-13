// no-special-chars.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharsValidator(): ValidatorFn {
  const regex = /^[a-zA-Z0-9\s]+$/;

  const validator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return regex.test(control.value) ? null : { specialChars: true };
  };

  return validator;
}
