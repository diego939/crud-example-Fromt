import { Component, OnInit } from '@angular/core';
//Agregamos el servicio
import { ExperienciaService } from "src/app/servicios/experiencia.service";
//Agregamos FormBilder Form -group y validators aunque este ultimo no lo usamos
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//Agregamos el modelo
import { Experiencia } from "src/app/modelos/experiencia";

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  //una variable para instanciar un objeto del tipo form builder
  formExperiencia: FormGroup;
  // Una variable del tipo any para Observar los registros 
  misExperiencias: any;
  //Variable string para el primer campo
  nombreTrabajo: string = "";
  //Variable string para el segundo campo
  descripcionPuesto: string = "";

  constructor(
              //una variable para comunicarnos con nuestro servicio
              private experienciaService: ExperienciaService, 
              //Una variable del tipo FormBuilder para crear el formulario
              private formBuilder: FormBuilder) { 
    //Dentro del constructor creamos el objeto para nuestro grupo de variables que usaremos en el fromulario
    this.formExperiencia = this.formBuilder.group({
      nombreTrabajo: '',
      descripcionPuesto:''
    })

  }

  ngOnInit(): void {
    //Inicializamos nuestro servicio para mostrar los datos al iniciar la app
    this.experienciaService.mostrarExperiencias().subscribe(
      data => {
        this.misExperiencias = data;
      }
    );
  }

  //No es necesario ya que no usamos validadores
  get NombreTrabajo(){
    return this.formExperiencia.get("nombreExperiencia");
  }

  get DescripcionPuesto(){
    return this.formExperiencia.get("descripcionPuesto");
  }


  agregarExperiencia(){
    //a la variable nombretrabajo que definimos arriba le asignamos el valor del primer campo de nuestro formulario
    this.nombreTrabajo = this.formExperiencia.value.nombreTrabajo;
    //hacemos lo mismo con la segunda variable
    this.descripcionPuesto = this.formExperiencia.value.descripcionPuesto;

    //instanciamos un objeto del tipo experiencia como lo tenemos en el modelo deben ser los nombres de las variable
    let experiencia: Experiencia = {
      "nombreTrabajo": this.nombreTrabajo,
      "descripcionPuesto": this.descripcionPuesto
    }

    //Llamamos a nuestro servicio y al metodo  crear experiencia le pasamos el objeto
    this.experienciaService.crearExperiencia(experiencia).subscribe(
      data =>{
        //mostramos una alerta
        alert("experiencia Agregada")
        //Refrescamos la pagina para que se vean los nuevos datos
        location.href="/"
      }
    );
  }

  //este auxiliar lo usaremos para recoger el elemento que vamos a selecionar
  auxId!: number;
  //con esta variable recogeremos la info de los campos
  nombreTrabajoSelect = "";
  descripcionPuestoSelect = "";
  buscarExperiencia(item: number){
    //Le pasamos los valores a las variables de arriba
    this.auxId = item;
    this.nombreTrabajoSelect = this.misExperiencias[this.auxId].nombreTrabajo;
    this.descripcionPuestoSelect = this.misExperiencias[this.auxId].descripcionPuesto;
  }

  editarExperiencia(item: number){
    //instanciamos un objeto del tipo experiencia como lo tenemos en el modelo deben ser los nombres de las variable
    //A diferencia del agregar a este metodo tenemos que pasarle el id como lo haciamos al editar
    let experiencia: Experiencia = {
      "id": this.misExperiencias[item].id,
      "nombreTrabajo": this.formExperiencia.value.nombreTrabajo,
      "descripcionPuesto": this.formExperiencia.value.descripcionPuesto
    }

    //Llamamos a nuestro servicio y al metodo  editar experiencia le pasamos el objeto
    this.experienciaService.editarExperiencia(experiencia).subscribe(
      data =>{
        //mostramos una alerta
        alert("experiencia Agregada")
        //Refrescamos la pagina para que se vean los nuevos datos
        location.href="/"
      }
    );

  }

  eliminarExperiencia(item: number){
    //El método eliminar espera recibir una id o sea que es el dato que tenemos que pasarle
    this.experienciaService.borrarExperiencia(this.misExperiencias[item].id).subscribe(
      data =>{
        //mostramos una alerta
        alert("experiencia Agregada")
        //Refrescamos la pagina para que se vean los nuevos datos
        location.href="/"
      }
    );
  }

}
