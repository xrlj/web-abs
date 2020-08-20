import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {NzSafeAny} from 'ng-zorro-antd';


// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

  /**
   * 最小长度
   * @param minLength 最小长度
   */
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  /**
   * 最大长度
   * @param maxLength 长度
   */
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  /**
   * 校验手机号码
   */
  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
