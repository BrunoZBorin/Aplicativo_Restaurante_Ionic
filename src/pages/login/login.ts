import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Iusuario } from '../../interfaces/Iusuario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:Iusuario = {name:'',password:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuariosProvider: UsuariosProvider, public menuCtrl: MenuController, public toastController: ToastController) {
  }

  ionViewDidLoad() {
  
  }
  
  cancela(){
    this.navCtrl.setRoot(HomePage);
  }
  menuLogin() {
    this.menuCtrl.enable(true, 'usuarioComLogin');
    this.menuCtrl.enable(false, 'usuarioSemLogin');
  }
  loginUsuario(){
    
    this.usuariosProvider.loginUsuario(this.usuario).subscribe( res =>{
      
      if(res){
        if(res.token){
          this.usuariosProvider.setStorage("usuario",res);
          
          this.menuLogin();  
          this.navCtrl.setRoot(HomePage);
          console.log(res);
          alert("Usuario logado");
          this.exibeMensagem('top', 'Bem vindo ao app');
        }else{
          console.log(res); //validação
          let erros="";
          if(res.name){
            for(let erro of res.name){
              erros+= erro + " "; 
            }
          }
          if(res.email){
            for(let erro of res.email){
              erros+= erro + " "; 
            }
          }
          if(res.password){
            for(let erro of res.password){
              erros+= erro + " "; 
            }
          }
          this.exibeMensagem('top', erros);
        }
      }else{
        //login com
      }

     
    },
      erra =>{
        console.log("Erro: "+ erra.message);
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

