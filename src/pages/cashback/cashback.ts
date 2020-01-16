import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iusuario } from '../../interfaces/Iusuario';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CompileMetadataResolver } from '@angular/compiler';
import { ToastController } from 'ionic-angular';

import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the CashbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cashback',
  templateUrl: 'cashback.html',
})
export class CashbackPage {

  usuario:Iusuario;
  cashback=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoProvider: CarrinhoProvider, public usuariosProvider: UsuariosProvider, public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashbackPage');
    this.usuariosProvider.getStorage("usuario").then(usuario =>{
      console.log(usuario);
      if(usuario){
        this.usuario = usuario;
        this.cashback=this.usuario.cashback;
        this.cashback.toFixed(2).replace('.',',');
      }
    });  
  }

}
