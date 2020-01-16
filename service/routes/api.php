<?php

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Produto;
use App\Compra;
use Illuminate\Validation\Rule;
header("Access-Control-Allow-Origin: *");
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/cadastro', function (Request $request) {
    $data = $request->all();

    $validacao = Validator::make($data, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
    ]);

    if($validacao->fails()){
        return $validacao->errors();
    }

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'endereco' => $data['endereco'],
        'password' => bcrypt($data['password']),
    ]);

    $user->token = $user->createToken ($user->email)->accessToken;
    return $user;
});

Route::post('/login', function (Request $request) {
    
    $validacao = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string',
    ]);

    if($validacao->fails()){
        return $validacao->errors();
    }   
    
    if (Auth::attempt(['email'=>$request->email,'password'=>$request->password,])) {
        // Authentication passed...
        $user = Auth()->user();
        $user->token = $user->createToken ($user->email)->accessToken;
        return $user;
    }else{
        return "ERRRROU";
    }
});

Route::middleware('auth:api')->get('/usuarios', function (Request $request) {
    return User::all();
});
/*Route::middleware('auth:api')->get('/usuario', function (Request $request) {
    return $request->user();
});*/
Route::middleware('auth:api')->get('/usuario', function (Request $request) {
    $user= $request->user();
    $user->token = $user->createToken ($user->email)->accessToken;
    return $user;
});


Route::middleware('auth:api')->put('/usuario', function (Request $request) {
    $user= $request->user();
    $data= $request->all();

    if(isset($data['password'])&& $data['password'] !=""){
        

        $validacao = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)],
            'password' => 'required|string|min:6',
        ]);
        
        if($validacao->fails()){
            return $validacao->errors();
        }

        $data['password'] = bcrypt($data['password']);


    }elseif (isset($data['password'])&& $data['password'] ==""){
        unset($data['password']);
        
        $validacao = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)]
        ]);
        
        if($validacao->fails()){
            return $validacao->errors();
        }
    }else{
        $validacao = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)]
        ]);
        
        if($validacao->fails()){
            return $validacao->errors();
        }

    }
    
    
    $user->update($data);
    $user->token = $user->createToken ($user->email)->accessToken;
    return $user;
});
Route::get('/admin/criar/produtos', function (Request $request) {
   /*$produto = Produto::create (
    [
        "nome"=> "Xsalada",
        "tipo"=> "Hamburguer",
        "valor"=> 10,
        "valortxt"=> "10,00",
        "dia"=> "todos",
        "imagem"=> "http://www.adjorisc.com.br/polopoly_fs/1.1945058.1478708338!/imagens/14787083657160.jpg",
        
    ]
   );
   return $produto;*/
});
Route::get('/produtos', function (Request $request) {
    $produto = Produto::all();
    return $produto;
});


Route::middleware('auth:api')->post('/compra', function (Request $request) {
    $user= $request->user();
    $data= $request->all();
    $lista_produtos_id = $data;

    $produtos = [];
    $total = 0;
    foreach ($lista_produtos_id as $key => $value)
    {
        $produto = Produto::find($value);
        if($produto){
            $produtos[$key] = $produto;
            $total+=$produto->valor;
        }
    }
    if($total){
        $compra = $user->compras()->create(
            [
                'data'=>date('Y-m-d'),
                'total'=>$total,
                'status'=>'aguardando'
            ]
        );
        return $compra;
    }
    return ['status'=> 'erro na compra'];   
});

Route::middleware('auth:api')->get('/compras', function (Request $request) {
    $user= $request->user();
    return $user->compras()->orderBy('data', 'DESC')->get();
});

Route::post('/notificacao', function (Request $request) {
  $data = $request->all();
  $compra = Compra::find($data['id_compra']);
  if($compra){
      $status = "aguardando";
      if($data['status']=="pago"){
          $status = "pago";
      }
      if($data['status']=="cancelado"){
        $status = "cancelado";
    }
    $compra->status=$status;
    $compra->save();
    return response('Pago',200);
  }
  return response('Deu ruim',404);
});
