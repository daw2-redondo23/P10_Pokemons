import { PokemonBD } from "../bd/pokemons";

export const pokemonsTabla = {
    template: `<table>
    <thead>
      <tr>
        <th>Pokedex</th>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Imagen</th>
      </tr>
    </thead>
    <tbody>`,
    script: async()=>{
        const partidas = await PokemonBD.getAll()
        let filas = ''
        partidas.forEach(element => {
          filas += `
          <tr>
            <td>${element.pokedex}</td>
            <td>${element.nombre}</td>
            <td>${element.tipo}</td>
            <td><img src="url("${element.imagen}")"></td>
          </tr>`
        });
    
        filas += `</tbody></table>`
    
        document.querySelector('tbody').innerHTML = filas
      }
}