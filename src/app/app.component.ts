import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { EditarPage } from '../pages/editar/editar';
import { LoginPage } from '../pages/login/login';
import { CompraPage } from '../pages/compra/compra';
import { CashbackPage } from '../pages/cashback/cashback';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages1: Array<{title: string, component: any}>;
  pages2: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public usuariosProvider: UsuariosProvider, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages1 = [
      
      { title: 'Cadastro', component: CadastroPage },
      { title: 'Login', component: LoginPage }

    ];
    this.pages2 = [
      
      { title: 'Editar cadastro', component: EditarPage },
      { title: 'Compras', component: CompraPage },
      { title: 'Cashback', component: CashbackPage }
    ];

    this.usuariosProvider.getStorage("usuario").then(usuario =>{
      if(usuario){
        this.menuCtrl.enable(true, 'usuarioComLogin');
        this.menuCtrl.enable(false, 'usuarioSemLogin');    
      }
      else{
        this.menuCtrl.enable(false, 'usuarioComLogin');
        this.menuCtrl.enable(true, 'usuarioSemLogin');
      }
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  abreHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
  }
  abrePagina(p){
    this.nav.push(p.component);

  }
  sair(){
    this.usuariosProvider.setStorage("usuario",null);
    this.menuCtrl.enable(false, 'usuarioComLogin');
    this.menuCtrl.enable(true, 'usuarioSemLogin');

  }
}
