import { inject, Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  public valueService = inject(ValueService);

  getValue() {
    return this.valueService.getValue();
  }
}
