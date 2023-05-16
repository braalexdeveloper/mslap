import React from 'react'

export const Search = ({handleSearch}) => {
  return (
    <div className="row">
            <form class="d-flex col-12 col-sm-12 col-md-6 mt-4 align-items-center">
              <label class="form-label fs-5">Buscar:</label>
              <input class="form-control w-60 ms-2" onChange={(e)=>handleSearch(e)} type="text" placeholder="Ingresa el DNI" />

            </form>
    </div>
  )
}
