import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/*import { Ejemplo1Component } from "./formularios/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from './formularios/zodiaco/zodiaco.component';*/
/*import { Resistencias2Component } from './formularios/resistencias2/resistencias2.component';
import { EmpleadosComponent } from './formularios/empleados/empleados.component';*/


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, /*Ejemplo1Component, ZodiacoComponent, Resistencias2Component, EmpleadosComponent*/ ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
