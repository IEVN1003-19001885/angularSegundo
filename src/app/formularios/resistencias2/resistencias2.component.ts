import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-resistencias2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resistencias2.component.html',
  styleUrl: './resistencias2.component.css'
})
export default class Resistencias2Component {
  formulario!: FormGroup;
 
  colores: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Morado', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];
 
  valoresColores: { [key: string]: number } = {
    'Negro': 0,
    'Café': 1,
    'Rojo': 2,
    'Naranja': 3,
    'Amarillo': 4,
    'Verde': 5,
    'Azul': 6,
    'Morado': 7,
    'Gris': 8,
    'Blanco': 9
  };
 
  multiplicadoresColores: { [key: string]: number } = {
    'Negro': 1,
    'Café': 10,
    'Rojo': 100,
    'Naranja': 1000,
    'Amarillo': 10000,
    'Verde': 100000,
    'Azul': 1000000,
    'Morado': 10000000,
    'Gris': 100000000,
    'Blanco': 1000000000
  };
 
  toleranciasValores: { [key: string]: number } = {
    'Oro': 5,
    'Plata': 10
  };
 
  resultado: { valor: number, valorMaximo: number, valorMinimo: number, color1: string, color2: string, color3: string, tolerancia: string }[] = [];
 
  ngOnInit(): void {
    // Borrar datos de localStorage al cargar la página
    this.limpiarDatos();
 
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),
      color2: new FormControl('', Validators.required),
      color3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required)
    });
  }
 
  registrar(): void {
    if (this.formulario.valid) {
      const color1 = this.formulario.get('color1')?.value;
      const color2 = this.formulario.get('color2')?.value;
      const color3 = this.formulario.get('color3')?.value;
      const tolerancia = this.formulario.get('tolerancia')?.value;
 
      const valorBase = (this.valoresColores[color1] * 10 + this.valoresColores[color2]) * this.multiplicadoresColores[color3];
      const porcentajeTolerancia = this.toleranciasValores[tolerancia] / 100;
      const valorMaximo = valorBase + (valorBase * porcentajeTolerancia);
      const valorMinimo = valorBase - (valorBase * porcentajeTolerancia);
 
      const nuevoResultado = {
        valor: valorBase,
        valorMaximo: valorMaximo,
        valorMinimo: valorMinimo,
        color1: color1,
        color2: color2,
        color3: color3,
        tolerancia: tolerancia
      };

      this.resultado.push(nuevoResultado);
      this.guardarEnLocalStorage();
      this.formulario.reset();
    }
  }
 
 
 
 
  guardarEnLocalStorage(): void {
    localStorage.setItem('resultadosResistencias', JSON.stringify(this.resultado));
  }
 
  limpiarDatos(): void {
    // Limpiar el localStorage y la variable de resultado
    localStorage.removeItem('resultadosResistencias');
    this.resultado = [];
  }
 
  obtenerColorHex(color: string): string {
    const coloresHex: { [key: string]: string } = {
      'Negro': '#000000',
      'Café': '#8B4513',
      'Rojo': '#FF0000',
      'Naranja': '#FFA500',
      'Amarillo': '#FFFF00',
      'Verde': '#008000',
      'Azul': '#0000FF',
      'Morado': '#EE82EE',
      'Gris': '#808080',
      'Blanco': '#FFFFFF',
      'Oro': '#FFD700',
      'Plata': '#C0C0C0'
    };
    return coloresHex[color] || '#FFFFFF';
  }
}
 