import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-two-way-binding',
  imports: [],
  templateUrl: './two-way-binding.component.html',
  styleUrl: './two-way-binding.component.scss'
})
export class TwoWayBindingComponent {
  startFrom = input<number>(0);
  startFromChange = output<number>();

  onInputChange(event: KeyboardEvent): void {
    console.log(event);
  }

}
