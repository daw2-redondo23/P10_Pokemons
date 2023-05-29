
import { Perfil } from '../bd/perfiles';
import { User } from '../bd/user';
import { Pokemon } from '../clases/Pokemon';
export const pokemonSupabase  ={
    template: `
        <div id="tableroPartida" class="container-fluid" style="border: 4px solid black; height: 620px;">
        </div>
    
    `,
    script: async()=>{
        console.log('Cargamos vista pokemon');

        let datos = await Perfil.getAll()
        console.log(datos);

        let pokemon = await  new Pokemon()
        await pokemon.insertaPokemon()
        await console.log(pokemon);
        await console.log("Nombre e imagen: ",pokemon.nombre, pokemon.imagen);
        

    }
}