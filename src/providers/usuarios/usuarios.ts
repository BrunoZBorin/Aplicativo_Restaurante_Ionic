import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iusuario } from '../../interfaces/Iusuario';
import { Icompra } from '../../interfaces/Icompra';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  //url:string = 'http://localhost:3000/'
  url:string = 'http://127.0.0.1:8000/api/';
  headers:any;
  constructor(public http: HttpClient, private storage: Storage) {
    
  }


  addUsuario(data:Iusuario){
    return this.http.post<Iusuario>(this.url+'cadastro', data);
  }
  editUsuario(usuario:Iusuario){
    return this.http.put<Iusuario>(this.url+'usuario', usuario, {"headers":{"authorization": "Bearer "+usuario.token}});
  }
  showUsuario(usuario:Iusuario){
    return this.http.get<Iusuario>(this.url+'usuario', {"headers":{"authorization": "Bearer "+usuario.token}} );
  }
  loginUsuario(data:Iusuario){
    return this.http.post<Iusuario>(this.url+'login', data);
  }
  setStorage(chave, valor){
    return this.storage.set(chave, valor);
  }
  getStorage(chave){
    return this.storage.get(chave);
  }
  listaCompras(usuario:Iusuario){
    return this.http.get<Icompra[]>(this.url+'compras', {"headers":{"authorization": "Bearer "+usuario.token}});
  }
}
