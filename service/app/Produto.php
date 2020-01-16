<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $fillable = [
        'nome', 'tipo', 'valor', 'valortxt' , 'dia', 'imagem', 'user_id'
    ];

    public function compra()
    {
        return $this->belongsTo('App\Compra');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
