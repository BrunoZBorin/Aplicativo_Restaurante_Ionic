import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduto } from '../../interfaces/Iproduto';

/*
  Generated class for the ProdProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProdProvider Provider');
  }

  listaProdutos(){
    return this.http.get<Iproduto[]>('http://localhost:8000/api/produtos');
  }

  addProdutos(data:Iproduto){
    return this.http.post<Iproduto>('http://localhost:3000/produtos', data);
  }

  editProdutos(data:Iproduto){
    return this.http.put<Iproduto>('http://localhost:3000/produtos/'+data.id, data);
  }
  
  deleteProdutos(data:Iproduto){
    return this.http.delete<Iproduto>('http://localhost:3000/produtos/' +data.id);
  }
  showProdutos(data:Iproduto){
    return this.http.get<Iproduto>('http://localhost:3000/produtos');
  }

  /*all(){   const lista:Iproduto[]=[{
    "id":1,
    "nome":"Xsalada",
    "tipo":"Hamburguer",
    "valor":10,
    "valortxt":"10,00",
    "dia":"todos",
    "imagem":"http://www.adjorisc.com.br/polopoly_fs/1.1945058.1478708338!/imagens/14787083657160.jpg"},
{
    "nome":"Pastelão",
    "tipo":"Presunto e queijo",
    "id":2,
    "valor":3.9,
    "valortxt":"3,90",
    "dia":"todos",
    "imagem":"http://www.euamoarrozefeijao.com.br/wp-content/uploads/2015/03/pastel.png"}
];

return lista;}




  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }
*/
}
