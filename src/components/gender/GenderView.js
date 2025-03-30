import React, { useState, useEffect } from 'react';
import { createGender, getGenders, updateGender } from '../../services/genderServices';
import Swal from 'sweetalert2';
const moment = require( 'moment' );

export const GenderView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ gender, setGender ] = useState([]);
  const { name= '', description = '', state= '' } = valuesForm;
  const [ genderSelect, setGenderSelect ] = useState(null);

  const listGenders = async () => {
    try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargado...'
    });
    Swal.showLoading();
    const resp= await getGenders();
    setGender(resp.data);
    Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
      
    }
  }

  useEffect(() => {
    listGenders();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateGender = async (e) => {
    e.preventDefault();
    try{
      Swal.fire({
      allowOutsideClick: false,
      text: 'Cargado...'
    });
    Swal.showLoading();
    if (genderSelect) {
      await updateGender(valuesForm, genderSelect);
      setGenderSelect(null);
    } else {
      await createGender(valuesForm);
    }
    setValuesForm({ name:'', description:'', state:'' });
    listGenders();

    Swal.close();
    }catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateGender = async (e, gender) => {
    e.preventDefault();
    setValuesForm({ name: gender.name, description: gender.description, state: gender.state });
    setGenderSelect(gender._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateGender(e)} >
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input required name='description' value={description} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)} >
              <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-3">
        <button className="btn btn-primary mb-3">Guardar</button>
        </div>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            gender.length > 0 && gender.map((gender, index) => {
              return (
              <tr key={gender._id}>
                <th scope='row'> {index + 1} </th>
                <td>{gender.name}</td>
                <td style={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '300px' }}>{gender.description}
                </td>
                <td>{gender.state}</td>
                <td> {moment(gender.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(gender.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateGender(e, gender)}>Actualizar</button>
                <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
              </tr>
              );
            })
          }
        </tbody>
      </table>
      
    </div>
  )
}



