import React from 'react'
import { Map } from '../map/Map'

export const Form = ({ handleChange, handleSubmit, input, action, errors }) => {
    return (
        <div className="modal fade" id="verticalycentered" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{action && action === "create" ? "Agregar Proyecto" : "Editar Proyecto"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Nombre<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={(e) => handleChange(e)} className="form-control" id="name" value={input.name} />
                                {errors.name && (
                                    <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="col-12">
                                <label htmlFor="dateStart" className="form-label">Fecha de Inicio<span className='text-danger'>*</span></label>
                                <input type="date" name="dateStart" onChange={(e) => handleChange(e)} className="form-control" id="dateStart" value={input.dateStart} />
                                {errors.dateStart && (
                                <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                    <span>{errors.dateStart}</span> 
                                    </div>
                                )}
                            </div>
                            <div className="col-12">
                                <label htmlFor="dateEnd" className="form-label">Fecha de Finalización<span className='text-danger'>*</span></label>
                                <input type="date" name="dateEnd" onChange={(e) => handleChange(e)} className="form-control" id="dateEnd" value={input.dateEnd} />
                                {errors.dateEnd && (
                                <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                    <span>{errors.dateEnd}</span> 
                                    </div>
                                )}
                            </div>
                            <div className="col-12">
                                <label htmlFor="totalCertificates" className="form-label">N° Certificados<span className='text-danger'>*</span></label>
                                <input type="number" name="totalCertificates" onChange={(e) => handleChange(e)} className="form-control" id="totalCertificates" value={input.totalCertificates} />
                                {errors.totalCertificates && (
                                <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                    <span>{errors.totalCertificates}</span> 
                                    </div>
                                )}
                            </div>
                            <div className="col-12">

                                <label htmlFor="location" className="form-label">Ubicación<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" onChange={(e) => handleChange(e)} name="location" id="location" value={input.location} />

                                
                                {/* <input type="text" className="form-control" onChange={(e) => handleChange(e)} name="location" id="location" value={input.location} /> */}
                                <Map />

                                {errors.location && (
                                <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                                    <span>{errors.location}</span> 
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal" disabled={Object.keys(errors).length>0 || input.name === '' ? true:false}>Guardar</button>

                                <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
