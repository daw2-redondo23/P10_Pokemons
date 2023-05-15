import { supabase } from "./supabase"


export class Partida {
    constructor(id = null, created_at = null, puntos = null, tiempo = null, usuario_id = null){
        this.id = id
        this.created_at = created_at
        this.puntos = puntos
        this.tiempo = tiempo
        this.usuario_id = usuario_id
    }

    // leer todos
  static async getAll () {
    const { data: partidas, error } = await supabase
      .from('partidas')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return partidas.map(({id, created_at, puntos, tiempo, usuario_id}) => {
      return new Partida(id, created_at, puntos, tiempo, usuario_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: partidas, error } = await supabase
      .from('partidas')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Partida(partidas.id, partidas.created_at, partidas.puntos, partidas.tiempo, partidas.usuario_id)
  }

  static async getByUserId (id) {
    const { data: partidas, error } = await supabase
      .from('partidas')
      .select('*')
      .eq('usuario_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Partida(partidas.id, partidas.created_at, partidas.puntos, partidas.tiempo, partidas.usuario_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (partidaData) {
    const { error } = await supabase
      .from('partidas')
      .insert(partidaData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('partidas')
      .update({
        puntos: this.puntos,
        tiempo: this.tiempo,
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
      .from('partidas')
      .delete()
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}