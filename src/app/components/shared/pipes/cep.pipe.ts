import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {
  transform(value: string, mask: boolean = true): string {
    if (!value) return '';
    const cleaned = value.toString().replace(/\D/g, '');

    if (mask) {
      return cleaned.length === 8
        ? `${cleaned.slice(0, 2)}***-${cleaned.slice(-3)}`
        : '***-**';
    }
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
