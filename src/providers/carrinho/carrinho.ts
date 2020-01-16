import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Iusuario } from '../../interfaces/Iusuario';
import { Iproduto } from '../../interfaces/Iproduto';
import { Icompra } from '../../interfaces/Icompra';
/*
  Generated class for the CarrinhoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrinhoProvider {
  
  url:string = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello CarrinhoProvider Provider');
  }
  setStorage(chave, valor){
    return this.storage.set(chave, valor);
  }
  getStorage(chave){
    return this.storage.get(chave);
  }
  compra(produtos:Iproduto[],usuario:Iusuario )
  {
    let lista_produtos= [];
    for (let i=0; i<produtos.length;i++){
      lista_produtos[i] = produtos[i].id;
    }
    return this.http.post<Icompra>(this.url+'compra',lista_produtos, {"headers":{"authorization": "Bearer "+usuario.token}} );
  }
}
