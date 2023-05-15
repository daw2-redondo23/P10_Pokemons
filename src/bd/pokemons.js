import { supabase } from "./supabase"


export class Pokemon {
    constructor(id = null, created_at = null, nombre = null, tipo = null, imagen = null, pokedex = null){
        this.id = id
        this.created_at = created_at
        this.nombre = nombre
        this.tipo = tipo
        this.imagen = imagen
        this.pokedex = pokedex
    }

    static async getAll () {
        const { data: pokemons, error } = await supabase
          .from('pokemons')
          .select('*')
        if (error) {
          throw new Error(error.message)
        }
        // devuelve array de objetos
        return pokemons.map(({id, created_at, nombre, tipo, imagen, pokedex}) => {
          return new Pokemon(id, created_at, nombre, tipo, imagen, pokedex)
        })
      }
      static async getById (id) {
        const { data: pokemons, error } = await supabase
          .from('pokemons')
          .select('*')
          .eq('id', id)
          .single()
        if (error) {
          throw new Error(error.message)
        }
        // Devuelve un nuevo objeto con los datos del registro
        return new Pokemon(pokemons.id, pokemons.created_at,pokemons.nombre, pokemons.tipo, pokemons.imagen, pokemons.pokedex)
      }

      static async create (pokemonData) {
        const { error } = await supabase
          .from('pokemons')
          .insert(pokemonData)
          .select()
        if (error) {
          throw new Error(error.message)
        }
        return true
      }
    
      // actualizar
      async update () {
        const { error } = await supabase
          .from('pokemons')
          .update({
            nombre: this.nombre,
            tipo: this.tipo,
            imagen: this.imagen,
            pokedex: this.pokedex
          })
          .eq('id', this.id)
          .single()
        if (error) {
          throw new Error(error.message)
        }
        return true
      }
    
      // borrar
      static async delete (id) {
        const { error } = await supabase
          .from('pokemons')
          .delete()
          .eq('id', id)
        if (error) {
          throw new Error(error.message)
        }
        return true
      }

    
}