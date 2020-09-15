import React , {useState,useEffect} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'

function Card({name,img,plays,id,target}) {
      const imgStyle = {height:'180px',width:'180px'};
    return (
        <div key={id}>
            {img!=='0'
                ?<img style={imgStyle} src={img}/>
                :<div style={{background:'red',...imgStyle}} className='fakeAlbum'/> }
            <Link to={`/${target}/${id}?lolo=11`}>{name}</Link>
            <p>{plays||0} plays</p>
        </div>
        )
}

export default Card;
