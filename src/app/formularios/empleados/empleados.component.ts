import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  sueldo: number;
  horasPorPagar: number; 
  horasExtras: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  total: number = 0;
  mostrarTabla: boolean = false;  // Inicialmente, la tabla está oculta

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.initForm();
    this.cargarEmpleados();
    // Mostrar tabla si ya existen empleados registrados
    if (this.empleados.length > 0) {
      this.mostrarTabla = true;
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horasTrabajadas: ['']
    });
  }

  modificarEmpleado(): void {
    const matricula = this.formGroup.value.matricula;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
  
    if (empleado) {
      this.formGroup.patchValue(empleado);
    } else {
      alert('Empleado no encontrado');
    }
  }
  
  registrarEmpleado(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
    
    const horasPorPagar = horasTrabajadas > 40 ? 40 : horasTrabajadas;
    const horasExtras = horasTrabajadas > 40 ? horasTrabajadas - 40 : 0;
    const subtotal = horasPorPagar * 70 + horasExtras * 140;
  
    const nuevoEmpleado: Empleado = {
      matricula,
      nombre,
      correo,
      edad,
      horasTrabajadas,
      sueldo: subtotal,
      horasPorPagar,
      horasExtras,
      subtotal
    };
  
    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
  
    if (index !== -1) {
      this.empleados[index] = nuevoEmpleado;
    } else {
      this.empleados.push(nuevoEmpleado);
    }
  
    this.guardarEmpleados();
    this.formGroup.reset();
    this.total = this.calcularTotal();
    this.mostrarTabla = true;  // Mostrar la tabla después de registrar el primer empleado
  }

  eliminarEmpleado(): void {
    const matricula = this.formGroup.value.matricula;
    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
    this.empleados.splice(index, 1);
    this.guardarEmpleados();
    this.formGroup.reset();
    this.total = this.calcularTotal();
  }

  buscarEmpleado(matricula: string): void {
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleado) {
      this.formGroup.patchValue(empleado);
    } else {
      alert("Empleado no encontrado");
    }
  }

  imprimirEmpleados(): void {
    this.mostrarTabla = true;
    this.total = this.calcularTotal();
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }

  guardarEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }
}
