import { Perfil } from "../bd/perfiles";
import { User } from "../bd/user";
export const formEditarUsuario = {
    template: `
      
  <!-- Modal -->
  <div class="modal fade" id="editar">
  <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title">Editar usuario</h5>
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          >
          <span aria-hidden="true"></span>
          </button>
      </div>
      <form id="formEditarUsuario" class="p-3">
        <div class="modal-body">
          
          <label class="mt-3 form-label" for="nick">Nombre: </label>
          <input id="nombre" type="text" class="form-control" value="" />
  
          <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
          <input id="apellidos" type="text" class="form-control" value="" />
  
          <label class="mt-3 form-label" for="email">Email</label>
          <input
              id="email"
              type="email"
              class="form-control"
              value="email@gmail.com"
              disabled
          />
  
          
        </div>
        <div class="modal-footer">
          <button id="actualizar" type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
          <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          >
          Cerrar
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
    `,
    script: async () => {
      // Código de validación

      // Seleccionamos el formulario de editar usuario
      const formulario = document.querySelector('#formEditarUsuario')
      // Capturamos los datos del usuario logueado
      const usuarioLogueado = await User.getUser()
      console.log(usuarioLogueado);
      // Si el usuario logeado existe
      if (usuarioLogueado) {
        
        const userId = usuarioLogueado.id
        // Capturamos los datos del perfil del usuario logueado
        const datosUsuario = await Perfil.getByUserId(userId)
        console.log(datosUsuario);
        // Insertamos los datos en el formulario para editar el usuario
        formulario.nombre.value = datosUsuario.nombre
        formulario.apellidos.value = datosUsuario.apellidos
        formulario.email.value = datosUsuario.email   

        document.querySelector('#actualizar').addEventListener("click", (e)=>{
            datosUsuario.nombre = formulario.nombre.value
            datosUsuario.apellidos = formulario.apellidos.value

            datosUsuario.update(datosUsuario)

        })

      }    
  }
}