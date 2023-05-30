import Swal from "sweetalert2"

export class Pokemon {
    constructor(){
        this.id = null
        this.nombre = null
        this.imagen = null
        this.x = null
        this.y = null
        this.velocidad = null
        this.tamaño = null
        this.html = null
        this.tipo
    }

    cargaDatosPokemon = async()=>{

        const peticion =  await fetch('https://pokeapi.co/api/v2/pokemon/' + this.id)
        let pokemon = await peticion.json()
        this.nombre = pokemon.name
        this.imagen = pokemon.sprites.front_default;
        this.tipo = pokemon.types[0].type.name
    }

    generaDatosAleatorios = async()=>{
        const idAleatorio = Math.floor(Math.random() * (1010 - 1 + 1)) + 1;
        const tamañoAleatorio = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        const xAleatorio = Math.floor(Math.random() * (825 - 1 + 1)) + 1;
        const yAleatorio = Math.floor(Math.random() * (450 - 100 + 1)) + 100;
        const velocidadAleatorio = Math.floor(Math.random() * (10 - (-10) + 1)) - 10;
        this.id = idAleatorio
        this.tamaño = tamañoAleatorio
        this.x = xAleatorio
        this.y = yAleatorio
        this.velocidad = velocidadAleatorio
        
    }

    insertaPokemon = async() => {
        await this.generaDatosAleatorios();
        await this.cargaDatosPokemon();
      
        const div = `<div class="divPokemon" style="position: absolute; width: ${this.tamaño}px; top: ${this.y}px; left: ${this.x}px !important;" data-id="${this.id}" data-nombre="${this.nombre}" data-imagen="${this.imagen}" data-x="${this.x}" data-y="${this.y}"
          data-velocidad="${this.velocidad}" data-tamaño="${this.tamaño}">
          <img src="${this.imagen}" style="width: 100%; height: 100%;" class="img-fluid">
          </div>`;
      
        this.html = div;
        //document.querySelector('#tableroPartida').innerHTML = this.html;
       // this.observadores();
      
        return this; // Devuelve el objeto pokemon actual
      };
      

    mataPokemon = async(id)=>{
        const divAeliminar = document.querySelector(`div[data-id = "${id}"]`);
        if (divAeliminar) {
            console.log("Borrando");
            divAeliminar.remove();
            let puntos = document.querySelector('#puntos').textContent
            console.log(puntos);
            
            puntos = parseInt(puntos) + 100
            document.querySelector('#puntos').innerHTML = puntos
          }
    }
    observadores = async() => {
        const divPokemons = document.querySelectorAll('.divPokemon');
        for (const pokemonAmatar of divPokemons) {
          pokemonAmatar.addEventListener("click", (event) => {
            let idDiv = pokemonAmatar.dataset.id
            console.log(idDiv);
            let tiempo = document.querySelector('#tiempo').textContent
            let puntosJugador = document.querySelector('#puntos').textContent          

            if(tiempo < 10){
                if(puntosJugador == 1900){
                    this.mataPokemon(idDiv);
                    Swal.fire({
                        icon: 'success',
                        title: 'Has ganado !!',
                        html: `<p>Lo has logrado en: ${tiempo} segundos</p><br>`,
                        showDenyButton: true,
                        confirmButtonText: 'Guardar Partida',
                        denyButtonText: `No guardarla`,
                      }).then(async(result) => {
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
                          Swal.fire('Changes are not saved', '', 'info')
                        }
                    })

                }
                this.mataPokemon(idDiv);

            }
            
          });
        }
      };
      
}