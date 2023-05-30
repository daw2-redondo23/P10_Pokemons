
import Swal from 'sweetalert2';
import { Perfil } from '../bd/perfiles';
import { User } from '../bd/user';
import { Partida } from '../bd/partidas';
import { PokemonBD } from '../bd/pokemons';
import { Pokemon } from '../clases/Pokemon';

export const pokemonSupabase  ={
    template: `
    <div class="row mt-2">
        <div id="tableroPartida" class="container-fluid col-8" style="border: 4px solid black; height: 620px;"></div>
        <div class="col-4">
            <h5>Puntuación</h5>
            <p>Puntos: <span id="puntos">0</span></p>
            <p>Tiempo: <span id="tiempo">0</span></p>
            <button id="inicioPartida" class="btn btn-primary">Iniciar Partida</button>
            <button id="guardarPartida" class="btn btn-secondary">Guardar Partida</button>
        </div>
    </div>
        
    
    `,
    script: async () => {
        console.log('Cargamos vista pokemon');

        let datos = await Perfil.getAll();
        const pokemonsBD = await PokemonBD.getAll()
        console.log(pokemonsBD);
        console.log(datos);
        const pokemons = [];
            for (let i = 1; i <= 20; i++) {
              let pokemonPeticion = await new Pokemon();
              let pokemon = await pokemonPeticion.insertaPokemon();
              let pokemonData = {
                nombre: pokemon.nombre,
                tipo: pokemon.tipo,
                imagen: pokemon.imagen,
                pokedex: pokemon.id,
              }
              for(let i = 0; i< pokemonsBD.length; i++){
                let pokedexBaseDeDatos = parseInt(await pokemonsBD[i].pokedex)
                let pokedexClase = parseInt(pokemonData.pokedex)
                if(pokedexClase === pokedexBaseDeDatos){
                    console.log("Pokemon ya introducido");
                }
                else{
                    await PokemonBD.añadir(pokemonData)
                }
            
              }
              pokemons.push(pokemon);
            }
        async function iniciarPartida() {
            
    
            console.log(pokemons);

            await insertarPokemons(pokemons)

            async function insertarPokemons(pokemonsApintar){
                console.log("Hola");
                pokemonsApintar.forEach(element => {
                    document.querySelector('#tableroPartida').innerHTML += element.html
                    console.log(element);
                    element.observadores()
                });
                const tiempoElemento = document.getElementById("tiempo");
                let contador = 0;

                const intervalo = setInterval(() => {
                
                if(document.querySelector('#puntos').textContent == 2000){
                    clearInterval(intervalo)
                }
                else{
                    contador++;
                tiempoElemento.textContent = contador;

                
                if (contador === 10) {
                    clearInterval(intervalo);
                    let puntosJugador = document.querySelector('#puntos').textContent          

                    Swal.fire({
                        icon: 'error',
                        title: 'Finalizado',
                        html: `<p>El tiempo ha finalizado</p><br>
                        <p>Tu puntuación es: ${puntosJugador}</p> `,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Guardar Partida',
                        denyButtonText: `No guardarla`,
                      }).then(async (result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            try {
                            const usuario = await User.getUser()
                            if(usuario){
                                let partida = {
                                    puntos: puntosJugador,
                                    tiempo: contador,
                                    usuario_id: usuario.id
                                }
                                console.log(partida);
                                await Partida.create(partida)
                                Swal.fire('Guardado !', '', 'success')
                            }
                            } catch (error) {
                                Swal.fire({
                                    title: 'Error !',
                                    html: `<p>Necesitas loggearte para poder guardar partidas</p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Loggeate</button>`
                                })
                            }
                            
                            
                                
                            
                        } else if (result.isDenied) {
                          Swal.fire('La partida no se ha guardada', '', 'info')
                        }
                    })
                }
                }
                
                }, 1000);
            }

        }
        
        document.querySelector('#inicioPartida').addEventListener("click", async(e)=>{
            await iniciarPartida()
        })

        document.querySelector('#guardarPartida').addEventListener("click", async(e)=>{
            try {
                const usuarioLoggeado = await User.getUser()

                    let partida = {
                        puntos: parseInt(document.querySelector('#puntos').textContent),
                        tiempo: parseInt(document.querySelector('#tiempo').textContent),
                        usuario_id: usuarioLoggeado.id
                    }
                    console.log(partida);
                    await Partida.create(partida)
                    Swal.fire('Guardado !', '', 'success')
                
                } catch (error) {
                    Swal.fire({
                        title: 'Error !',
                        html: `<p>Necesitas loggearte para poder guardar partidas</p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Loggeate</button>`
                    })
                }
        })
        
      }
      
}