import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProdutosPage } from '../produtos/produtos';
import { Iproduto } from '../../interfaces/Iproduto';
import { Iusuario } from '../../interfaces/Iusuario';
import { ProdProvider } from '../../providers/prod/prod';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:Iusuario;
  produto:Iproduto;
  lista:Iproduto[];


  constructor(public navCtrl: NavController, public prodProvider: ProdProvider, public usuariosProvider: UsuariosProvider) {

  }
      
    
  abreLogin()
  {

    this.navCtrl.push ( LoginPage );
  }
  abreProdutos()
  {

    this.navCtrl.push ( ProdutosPage );
  }

}
