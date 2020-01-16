import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Icompra } from '../../interfaces/Icompra';
/**
 * Generated class for the CompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {
  compras:Icompra[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public usuariosProvider: UsuariosProvider) {
    
  }
  

  ionViewDidLoad() {
    this.usuariosProvider.getStorage("usuario").then(usuario =>{
      if(usuario){
        
        this.usuariosProvider.listaCompras(usuario).subscribe( res =>{
          console.log(res);
          this.compras=res;
        },erro =>{
            console.log("Erro: "+ erro.message);
        });
      }
    });  
  }
  dataCompra(data:string){
    let aux=data.split('-');
    return aux[2]+'/'+aux[1]+'/'+aux[0];
  }
  totalCompra(total:string){
    return parseFloat(total).toFixed(2).replace('.',',');
  }
}
