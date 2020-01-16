import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompraPage } from '../compra/compra';
import { Icoffee } from '../../interfaces/Icoffee';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the NatalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-natal',
  templateUrl: 'natal.html',
})
export class NatalPage {

      coffee:Icoffee;
      coffeebreak: Icoffee[] =[

      {id:1,nome:"Apas",descricao:"Feito com muito carinho ",numeroPessoas:10,
       valor:60.00, endereco:"Rua Dom Pedro", dia:"segunda", horario:"15:00",
        video:"https://www.youtube.com/embed/17hi7LdOopE", valortxt:"60.00"},
      {id:2,nome:"Sescon",descricao:"Prato de inox",numeroPessoas:10,
         valor:80.00, endereco:"Rua Taquaritinga", dia:"Terça", horario:"18:00",
          video:"www.youtube.com/embed/hi6b5LU4mmY",valortxt:"60.00"},
      {id:3,nome:"Acim",descricao:"Isopor",numeroPessoas:10,
           valor:80.00, endereco:"Rua 24 de dezembro" , dia:"Quarta", horario:"17:00",
            video:"https://www.youtube.com/embed/17hi7LdOopE",valortxt:"60.00"},

          ]


  constructor(public navCtrl: NavController, public navParams: NavParams, public domSanitizer: DomSanitizer) {
    this.coffee=this.navParams.get('dados');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NatalPage');
  }
  abreCompra(coffee)
  {
      this.navCtrl.push ( CompraPage, {dados:coffee} );
  }

}
