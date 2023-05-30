import { Partida } from "../bd/partidas"
import { Perfil } from "../bd/perfiles"
import { User } from "../bd/user"
import { partidas } from "../vistas/partidas"
import { pokemonsTabla } from "../vistas/pokemonsTabla"
import { formEditarUsuario } from "./formEditarUsuario"


export const header = {
    template: `
        
    <!-- Navbar -->
    <div class="container-fluid">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="row justify-content-between w-100">
      <div class="col-2">
        <a class="navbar-brand d-flex">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="Logo" width="70" height="30" class="d-inline-block align-text-top me-2"/>
          <span class="ms-5">Practica 10</span>
        </a>
      </div>
      <div class="col-6 d-flex">
        <ul class="d-flex list-unstyled">
          <li class="px-3 py-3"><a id="home">Home</a></li>
          <li class="px-3 py-3"><a id="partidas">Partidas</a></li>
          <li class="px-3 py-3"><a id="pokemons">Pokemons</a></li>
          <li class="px-3 py-3"><a id="perfiles">Perfiles</a></li>
        </ul>
      </div>
      <div class="col-2 text-end">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse me-5" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown d-flex">
              <span id="nickUsuario" class="mt-3 me-4"></span>
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png" width="40"/>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="opcionesMenu">
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#registroModal">Registrarse</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</div>
  
  <!-- Modal Login-->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="ps-5 ">
          <div class="me-5 pt-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" class="form-control" id="emailLogin">
          </div>
          <div class="me-5 pt-3">
              <label for="pass" class="form-label">Contrasenya:</label>
              <input type="password" class="form-control" id="passLogin">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="login" data-bs-dismiss="modal">Login</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>    
      </div>
    </div>
  </div>
</div>
  </div>

  <!-- Modal Registro-->
<div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Registro del Usuario</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="ps-5 ">
          <div class="me-5 pt-3">
              <label for="nick" class="form-label">Nick:</label>
              <input type="text" class="form-control" id="nick">
          </div>
          <div class="me-5 pt-3">
              <label for="nombre" class="form-label">Nombre:</label>
              <input type="text" class="form-control" id="nombre">
          </div>
          <div class="me-5 pt-3">
              <label for="apellidos" class="form-label">Apellidos:</label>
              <input type="text" class="form-control" id="apellidos">
          </div>
          <div class="me-5 pt-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" id="email">
          </div>
          <div class="me-5 pt-3">
              <label for="pass" class="form-label">Contrasenya:</label>
              <input type="password" class="form-control" id="pass">
          </div>
      </form>
      </div>
      <div class="modal-footer">
        <button id="registroPerfil" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Registrarse</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>

</nav>`,
script: async () => {

  //opciones del usuario
  
  try {
    const usuario = await User.getUser()
    console.log(usuario);
    document.querySelector('#opcionesMenu').innerHTML = `
          <li><a class="dropdown-item" id="logout">logout</a></li>
    `
    document.querySelector('#nickUsuario').innerHTML = `${(await Perfil.getByUserId(usuario.id)).nick}`

    document.querySelector('#logout').addEventListener("click", async(e)=>{
      await User.logout()
      document.querySelector('#nickUsuario').innerHTML = ``
      location.reload()
    })

  } catch (error) {
    
  }
 
  //Registro
  document.querySelector('#registroPerfil').addEventListener("click", async(e)=>{
    alert("Tienes que confirmar el correo para poder loggearte")
    let emailUsuario = document.querySelector('#email').value
    let nickUsuario = document.querySelector('#nick').value 
    let nombreUsuario = document.querySelector('#nombre').value 
    let apellidosUsuario = document.querySelector('#apellidos').value 
    let passUsuario = document.querySelector('#pass').value 

   //console.log(emailUsuario, nickUsuario, nombreUsuario, apellidosUsuario, passUsuario);
    try {
     const usuarioAcrear = {
         email: emailUsuario,
         password: passUsuario
        }
     const usuario = await User.create(usuarioAcrear)

     const perfilAcrear = {
         nick: nickUsuario,
         nombre: nombreUsuario,
         apellidos : apellidosUsuario,
         usuario_id: usuario.id
     }
     
     const perfilCreado = await Perfil.create(perfilAcrear)
     console.log("Este es el perfil creado: ",perfilCreado);

    } catch (error) {
     
    }
  })

  //login
  document.querySelector('#login').addEventListener("click", async(e)=>{
    const usuarioAloggear = {
      email: document.querySelector('#emailLogin').value,
      password: document.querySelector('#passLogin').value
    }

    try {
      
      let usuarioLoggeado =  await User.login(usuarioAloggear)
      document.querySelector('#nickUsuario').innerHTML = `${(await Perfil.getByUserId(usuarioLoggeado.id)).nick}`
      document.querySelector('#opcionesMenu').innerHTML = `
          <li><a class="dropdown-item" id="logout">logout</a></li>
    `
    document.querySelector('#logout').addEventListener("click", async(e)=>{
      await User.logout()
      document.querySelector('#nickUsuario').innerHTML = ``
      location.reload()
    })

    } catch (error) {
      alert(error)
    }

   
  })
 
  document.querySelector('#home').addEventListener("click", async(e)=>{
  })
  
  document.querySelector('#partidas').addEventListener("click", async(e)=>{
    document.querySelector('main').innerHTML = partidas.template
    partidas.script()
  }) 

  
  document.querySelector('#pokemons').addEventListener("click", async(e)=>{
    document.querySelector('main').innerHTML = pokemonsTabla.template
    pokemonsTabla.script()
  }) 
  
  document.querySelector('#perfiles').addEventListener("click", async(e)=>{
    
  })
  }
}