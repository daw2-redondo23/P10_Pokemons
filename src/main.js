// Import our custom CSS
import './scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { footer } from "./componentes/footer";
import { header } from "./componentes/header";
import { home } from "./vistas/home";
import { pokemonSupabase } from './vistas/pokemonSupabase';


document.querySelector('main').innerHTML = pokemonSupabase.template;
pokemonSupabase.script()

document.querySelector('header').innerHTML = header.template;
header.script()

document.querySelector('footer').innerHTML = footer.template;

