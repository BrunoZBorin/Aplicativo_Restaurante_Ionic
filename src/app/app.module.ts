import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NatalPage } from '../pages/natal/natal';
import { CompraPage  } from '../pages/compra/compra';
import { ProdutosPage } from '../pages/produtos/produtos';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { EditarPage } from '../pages/editar/editar';
import { LoginPage } from '../pages/login/login';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { CashbackPage } from '../pages/cashback/cashback';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProdProvider } from '../providers/prod/prod';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { CarrinhoProvider } from '../providers/carrinho/carrinho';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NatalPage,
    CompraPage,
    ProdutosPage,
    CadastroPage,
    EditarPage, 
    LoginPage,
    CarrinhoPage,
    CashbackPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NatalPage,
    CompraPage,
    ProdutosPage,
    CadastroPage,
    EditarPage,
    LoginPage,
    CarrinhoPage,
    CashbackPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdProvider,
    UsuariosProvider,
    CarrinhoProvider
  ]
})
export class AppModule {}
