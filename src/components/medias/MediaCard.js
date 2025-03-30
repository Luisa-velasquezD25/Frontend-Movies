import React from 'react';
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {

    const { media } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={media.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Características</h5>
                <hr/>
                <p className="card-text">{`Serial: ${media.serial}`}</p>
                <p className="card-text">{`Titulo: ${media.title}`}</p>
                <p className="card-text">{`Sipnosis: ${media.sypnosis}`}</p>
                <p className="card-text"> Url: <a href={media.url} target="_blank">Link</a></p>
                <p className="card-text">{`Fecha Creación: ${new Date(media.createdAt).toLocaleDateString()}`}</p>
                <p className="card-text">{`Fecha Actualización: ${new Date(media.updatedAt).toLocaleDateString()}`}</p>
                <p className="card-text">{`Año de estreno: ${media.yearPremiere}`}</p>
                <p className="card-text">{`Género: ${media.gender.name}`}</p>
                <p className="card-text">{`Director principal: ${media.director.name}`}</p>
                <p className="card-text">{`Productora: ${media.producer.name}`}</p>
                <p className="card-text">{`Tipo: ${media.type.name}`}</p>
                <p className="card-text">
                  <Link to= {`medias/edit/${media._id}`}>Ver más...</Link>
                </p>
            </div>
        </div>
    </div>
  );
};

