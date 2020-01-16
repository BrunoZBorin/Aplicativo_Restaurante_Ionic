import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Iusuario } from '../../interfaces/Iusuario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario:Iusuario = {name:'',endereco:'', cpf:'', password:'', email:'', password_confirmation:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuariosProvider: UsuariosProvider, public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cancela(){
    this.navCtrl.setRoot(HomePage);
  }
  addUsuario(){
    
    this.usuariosProvider.addUsuario(this.usuario).subscribe( res =>{
      if(res){
        if(res.token){
          this.usuariosProvider.setStorage("usuario",res);
          this.navCtrl.setRoot(HomePage);
          console.log(res);
          alert("Usuario logado");
          this.exibeMensagem('top', 'Cadastro realizado');
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
      erro =>{
        console.log("Erro: "+ erro.message);
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
