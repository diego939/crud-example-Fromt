export class Experiencia {
    id?: number;
    nombreTrabajo: string;
    descripcionPuesto: string;

    constructor(nombreTrabajo: string, descripcionPuesto: string){
        this.nombreTrabajo = nombreTrabajo;
        this.descripcionPuesto = descripcionPuesto;
    }
}
