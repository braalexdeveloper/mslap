import React from 'react'

export const Form = ({handleChange,handleSubmit,input,action,errors}) => {
    return (
        <div className="modal fade" id="verticalycentered" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{action && action==="create" ? "Agregar Cargo" :"Editar Cargoo"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <form className="row g-3" onSubmit={(e) => handleSubmit(e)} >
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Nombre<span className='text-danger'>*</span></label>
                                <input type="text" onChange={(e) => handleChange(e)} className="form-control" name='name' value={input.name}   />
                                {errors.name && (
                                <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                    <span>{errors.name}</span> 
                                    </div>
                                )}
                                </div>
                            
                            <div className="text-center">

                                <button type="submit" className="btn btn-success mr-2" disabled={Object.keys(errors).length>0 || input.name === '' ? true:false} data-bs-dismiss="modal">Guardar</button>
                                <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal" >Close</button>
                            </div>

                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}
