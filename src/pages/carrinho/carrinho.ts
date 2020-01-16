import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { Iusuario } from '../../interfaces/Iusuario';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';

import { ToastController } from 'ionic-angular';


import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  usuario:Iusuario;
  carrinho = [];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoProvider: CarrinhoProvider, public usuariosProvider: UsuariosProvider, public toastController: ToastController) {
  }

  ionViewDidLoad(){
    
    this.usuariosProvider.getStorage("usuario").then(usuario =>{
      if(usuario){
        this.usuario = usuario;
      }
    });  
    
    }
  

  ionViewDidEnter()
  {
    
      this.carrinhoProvider.getStorage('carrinho').then(res=>{
        if(res){
          this.carrinho = res;
        }
      });
 
  }
  deletarTudo(){
    this.carrinho = [];
    this.carrinhoProvider.setStorage('carrinho',this.carrinho);
  }
  deletarItem(produto){
    let novaLista = [];
    for(let item of this.carrinho){
      if(item.id!=produto.id){
        novaLista.push(item);
      }
    }
    this.carrinho=novaLista;
    this.carrinhoProvider.setStorage('carrinho',this.carrinho);
  }
  totalCompras(){
    let total = 0;
    for(let item of this.carrinho){
      total+=parseFloat(item.valor);
    }
      return total.toFixed(2).replace('.',',');
  }
  
  compra(){
    let cash=this.totalCompras();
    console.log("COMPRA");
    this.carrinhoProvider.compra(this.carrinho, this.usuario).subscribe(res =>{
      if(res){
        this.exibeMensagem('top', 'Compra realizada com sucesso');
        this.deletarTudo();
        console.log(res);     
        
        this.usuario.cashback=parseFloat(cash);
        console.log(this.usuario);
        this.usuariosProvider.setStorage("usuario",this.usuario);
      }
    }, erro =>{
      this.exibeMensagem('top', 'ERRO NA COMPRA');
      console.log("ERRO "+erro.message)
    });
  }
  exibeMensagem(position:string, msg: string){
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: position

    });
    toast.present();
  }
  

}
