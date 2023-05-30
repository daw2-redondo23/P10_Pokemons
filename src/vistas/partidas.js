import { Partida } from "../bd/partidas";

export const partidas = {
    template: `<table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Puntos</th>
        <th>Tiempo</th>
        <th>Usuario_id</th>
      </tr>
    </thead>
    <tbody>
  `,
  script: async()=>{
    const partidas = await Partida.getAll()
let filas = ''
    partidas.forEach(element => {
      filas += `
      <tr>
        <td>${element.id}</td>
        <td>${element.puntos}</td>
        <td>${element.tiempo}</td>
        <td>${element.usuario_id}</td>
      </tr>`
    });

    filas += `</tbody></table>`

    document.querySelector('tbody').innerHTML = filas
  }
}