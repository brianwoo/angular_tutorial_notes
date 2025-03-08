import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding-ngmodel',
  imports: [FormsModule],
  templateUrl: './two-way-binding-ngmodel.component.html',
  styleUrl: './two-way-binding-ngmodel.component.scss'
})
export class TwoWayBindingNgModelComponent {
  inputValue = '';
}
