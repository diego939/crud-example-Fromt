import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../modelos/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  URLexp = "http://localhost:8080/experiencia/"

  constructor(private httpExp: HttpClient) { }

  public mostrarExperiencias(): Observable<any>{
    return this.httpExp.get(this.URLexp+'listar');
  }

  public crearExperiencia(experiencia: Experiencia): Observable<any>{
    return this.httpExp.post<any>(this.URLexp+'new',experiencia)
  }

  public editarExperiencia(experiencia: Experiencia): Observable<any>{
    return this.httpExp.put<any>(this.URLexp+'editar',experiencia)
  }

  public buscarExperiencia(id: number): Observable<any>{
    return this.httpExp.get<any>(this.URLexp+`buscar/${id}`);
  }

  public borrarExperiencia(id: number): Observable<any> {
    return this.httpExp.delete<any>(this.URLexp + `delete/${id}`);
  }

}
