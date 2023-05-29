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
    }

    cargaDatosPokemon = async()=>{

        const peticion =  await fetch('https://pokeapi.co/api/v2/pokemon/' + this.id)
        let pokemon = await peticion.json()
        this.nombre = pokemon.name
        this.imagen = pokemon.sprites.front_default;
    }

    generaDatosAleatorios = async()=>{
        const idAleatorio = Math.floor(Math.random() * (1010 - 1 + 1)) + 1;
        const tamañoAleatorio = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        const xAleatorio = Math.floor(Math.random() * (1250 - 100 + 1)) + 100;
        const yAleatorio = Math.floor(Math.random() * (450 - 100 + 1)) + 100;
        const velocidadAleatorio = Math.floor(Math.random() * (10 - (-10) + 1)) - 10;
        this.id = idAleatorio
        this.tamaño = tamañoAleatorio
        this.x = xAleatorio
        this.y = yAleatorio
        this.velocidad = velocidadAleatorio
        
    }

    insertaPokemon = async()=>{
        await this.generaDatosAleatorios()
        await this.cargaDatosPokemon()

        const div = `<div id="divPokemon" style="position: relative; width: ${this.tamaño}px; top: ${this.y}px; left: ${this.x}px !important;" data-id = "${this.id}" data-nombre = "${this.nombre}" data-imagen = "${this.imagen}" data-x = "${this.x}" data-y = "${this.y}"
        data-velocidad = "${this.velocidad}" data-tamaño = "${this.tamaño}">
        <img src="${this.imagen}" style="width: 100%; height: 100%;" class="img-fluid">
        </div>`

        this.html = div
        document.querySelector('#tableroPartida').innerHTML = this.html
        this.observadores()
    }

    mataPokemon = ()=>{
        const divAeliminar = document.querySelector('#divPokemon');
        divAeliminar.remove()
    }
    observadores = ()=>{
        document.querySelector('#divPokemon').addEventListener("click", (e)=>{
            this.mataPokemon()
        })
    }
}