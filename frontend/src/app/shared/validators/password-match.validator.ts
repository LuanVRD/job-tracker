import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (!password || !passwordConfirm) return null;

    if (password === passwordConfirm) return null;

    return { mismatch: true };
}