import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//-----------------------------------------------------------------------------------------
interface Banda {
  nombre: string;
  valor: number;
  multiplicador: number;
  color: string;
}

interface Resultado {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
  //resistencia: number;
  //resistenciaMinima: number;
  //resistenciaMaxima: number;
}

//-----------------------------------------------------------------------------------------
@Component({
  selector: 'app-resistencias2',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './resistencias2.component.html',
  styles: ``
})


//-----------------------------------------------------------------------------------------
export default class Resistencias2Component implements OnInit {
  formGroup2!: FormGroup;

  // select
  color1: string = '';
  color2: string = '';
  color3: string = '';
  tolerancia: string = 'plata'; 

  // resultados
  resistencia: number = 0;
  resistenciaMinima: number = 0;
  resistenciaMaxima: number = 0;

  // colores 
  color1Code: string = '';
  color2Code: string = '';
  color3Code: string = '';

  // Arreglo con colores
  coloresBanda: Banda[] = [
    { nombre: 'negro', valor: 0, multiplicador: 1, color: '#000000' },
    { nombre: 'cafe', valor: 1, multiplicador: 10, color: '#8B4513' },
    { nombre: 'rojo', valor: 2, multiplicador: 100, color: '#FF0000' },
    { nombre: 'naranja', valor: 3, multiplicador: 1000, color: '#FFA500' },
    { nombre: 'amarillo', valor: 4, multiplicador: 10000, color: '#FFFF00' },
    { nombre: 'verde', valor: 5, multiplicador: 100000, color: '#008000' },
    { nombre: 'azul', valor: 6, multiplicador: 1000000, color: '#0000FF' },
    { nombre: 'violeta', valor: 7, multiplicador: 10000000, color: '#EE82EE' },
    { nombre: 'gris', valor: 8, multiplicador: 100000000, color: '#808080' },
    { nombre: 'blanco', valor: 9, multiplicador: 1000000000, color: '#FFFFFF' }
  ];

  resultadosGuardados: Resultado[] = []; // almacenar resultados guardados

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup2 = this.initForm();
    //this.cargaResultados(); // cargar resultados
  }

  initForm(): FormGroup {
    return this.fb.group({});
  }

//---------------------------------------------------------------------------------
//------------------------------Resistencia----------------------------------------

  calcularResistencia(): number {
    const banda1 = this.coloresBanda.find(b => b.nombre === this.color1)?.valor ?? 0; //función de find para buscar un objeto dentro del arreglo que coincida con el valor de color.
    const banda2 = this.coloresBanda.find(b => b.nombre === this.color2)?.valor ?? 0;
    const multiplicador = this.coloresBanda.find(b => b.nombre === this.color3)?.multiplicador ?? 1;

    return (banda1 * 10 + banda2) * multiplicador;
  }
//-------------------------Tolerancia--------------------------------------------

  calcularTolerancia(resistencia: number): void {
    let toleranciaValor = 0;

    if (this.tolerancia === 'oro') {
      toleranciaValor = 5;
    } else if (this.tolerancia === 'plata') {
      toleranciaValor = 10;
    }

    const factor = toleranciaValor / 100;

    this.resistenciaMinima = resistencia * (1 - factor);
    this.resistenciaMaxima = resistencia * (1 + factor);
  }
  
//---------------------Limpiar registros------------------------------------------

  limpiarRegistro(): void {
    this.resultadosGuardados = [];
    localStorage.removeItem('resultados');
  }


  //------------------------Imprimir Calculo--------------------------------------

  subImprimeCalculo(): void {
    this.resistencia = this.calcularResistencia();
    this.calcularTolerancia(this.resistencia);

    // guardar los resultados en e; objeto
    const resultado: Resultado = {
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
      tolerancia: this.tolerancia,
      //resistencia: this.resistencia,
      //resistenciaMinima: this.resistenciaMinima,
      //resistenciaMaxima: this.resistenciaMaxima,
    };


    // agregar resultado al arreglo
    this.resultadosGuardados.push(resultado);
    // guardar el arreglo
    localStorage.setItem('resultados', JSON.stringify(this.resultadosGuardados));
  }



  cargaResultados(): void {
    const guardadosResultados = localStorage.getItem('resultados');
    if (guardadosResultados) {
      this.resultadosGuardados = JSON.parse(guardadosResultados);
    }
  }

  // obtener colores para depues usarlos en la tabla
  getColor1(resultado: Resultado): string {
    return this.coloresBanda.find(b => b.nombre === resultado.color1)?.color || '';
  }

  getColor2(resultado: Resultado): string {
    return this.coloresBanda.find(b => b.nombre === resultado.color2)?.color || '';
  }

  getColor3(resultado: Resultado): string {
    return this.coloresBanda.find(b => b.nombre === resultado.color3)?.color || '';
  }


  //mostrarResultados: boolean = true;
  mostrarResultadosGuardados(): void {
    const guardadosResultados = localStorage.getItem('resultados');
    if (guardadosResultados) {
      // recupera los guardados
      this.resultadosGuardados = JSON.parse(guardadosResultados);
      
      // los procesa para sacarle los resultados otra vez
      this.resultadosGuardados.forEach((resultado) => {
        // Asignar los colores recuperados
        this.color1 = resultado.color1;
        this.color2 = resultado.color2;
        this.color3 = resultado.color3;
        this.tolerancia = resultado.tolerancia;
        
        // cálculos
        this.resistencia = this.calcularResistencia();
        this.calcularTolerancia(this.resistencia);
      });
    }
  }

}