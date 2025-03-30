import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediasServices';
import { getGenders } from '../../services/genderServices';
import { getDirectors } from '../../services/directorServices';
import { getProducers } from '../../services/producesServices';
import { getTypes } from '../../services/typeServices';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

  const { mediaId = '' } = useParams();
  const [media, setMedias] = useState();
  const [genders, setGenders] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [valoresForm, setValoresForm] = useState([]);
  const { serial = '', title = '', sypnosis = '', url = '', image = '', yearPremiere = '',
    gender, director, producer, type } = valoresForm

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const listGenders = async () => {
    try {
      const { data } = await getGenders();
      setGenders(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listGenders();
  }, []);



  const listDirectors = async () => {
    try {
      const { data } = await getDirectors();
      setDirectors(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listDirectors();
  }, []);



  const listProducers = async () => {
    try {
      const { data } = await getProducers();
      setProducers(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listProducers();
  }, []);


  const listTypes = async () => {
    try {
      const { data } = await getTypes();
      setTypes(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listTypes();
  }, []);


  const getMedias = async () => {
    try {
      const { data } = await getMediaForId(mediaId);
      console.log(data);

      setMedias(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMedias();
  }, [mediaId]);

  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        title: media.title,
        sypnosis: media.sypnosis,
        url: media.url,
        image: media.image,
        createdAt: media.createdAt,
        updatedAt: media.updatedAt,
        yearPremiere: media.yearPremiere,
        gender: media.gender,
        director: media.director,
        producer: media.producer,
        type: media.type
      });
    }
  }, [media])


  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial, title, sypnosis, url, image, yearPremiere,
      gender: {
        _id: gender
      },
      director: {
        _id: director
      },
      producer: {
        _id: producer
      },
      type: {
        _id: type
      }
    }
    console.log(media);

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const { data } = await updateMedia(mediaId, media);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();

    }
  }


  return (
    <div className='container-fluid mt-2 mb-1'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'> Detalle Multimedia </h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4 d-flex align-items-center'>
              <img
                src={media?.image}
                alt={media?.title}
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input type="text" name='serial'
                        value={serial}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Titulo</label>
                      <input type="text" name='title'
                        value={title}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Sipnosis</label>
                      <input type="text" name='sypnosis'
                        value={sypnosis}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">URL</label>
                      <input type="url" name='url'
                        value={url}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Imagen</label>
                      <input type="url" name='image'
                        value={image}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Año de Estreno</label>
                      <input type="text" name='yearPremiere'
                        value={yearPremiere}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Genero</label>
                      <select className='form-select'
                        required
                        name='gender'
                        value={gender}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          genders.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Director</label>
                      <select className='form-select'
                        required
                        name='director'
                        value={director}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          directors.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Productora</label>
                      <select className='form-select'
                        required
                        name='producer'
                        value={producer}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          producers.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo</label>
                      <select className='form-select'
                        required
                        name='type'
                        value={type}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          types.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


