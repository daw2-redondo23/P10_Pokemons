import { createClient } from '@supabase/supabase-js'
import { Perfil } from '../bd/perfiles';
import { User } from '../bd/user';
export const pokemonSupabase  ={
    template: `<form class="ps-5 row g-3 d-block">
                    <div class="col-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" >
                    </div>
                    <div class="col-3">
                        <label for="nick" class="form-label">Nick:</label>
                        <input type="text" class="form-control" id="nick">
                    </div>
                    <div class="col-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombre">
                    </div>
                    <div class="col-3">
                        <label for="apellidos" class="form-label">Apellidos:</label>
                        <input type="text" class="form-control" id="apellidos">
                    </div>
                    <div class="col-3">
                        <label for="pass" class="form-label">Contrasenya:</label>
                        <input type="password" class="form-control" id="pass">
                    </div>
                    <div class="col-3">
                        <button id="registroPerfil" type="submit" class="btn btn-primary">Registrarse</button>
                    </div>
                </form>`,
    script: async()=>{
        console.log('Cargamos vista pokemon');

        User.login({
            email: 'redondobarrosoruben@fpllefia.com',
            password: "ruben892003"
        })

        let datos = await Perfil.getAll()
        console.log(datos);

        document.querySelector('#registroPerfil').addEventListener("click", (e)=>{
            e.preventDefault()
            document.querySelector('#email').value

            Perfil.create()
        })

    }
}