import React , {useState,useEffect} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'

function Card({name,img,plays,artist,artist_id,id,target}) {
      const imgStyle = {height:'180px',width:'180px'};
    return (
        <div key={id} className={'card'} >
            <Link to={`/${target}/${id}`}>
                {img!=='0'
                    ?<img className={`${target}Img`} style={imgStyle} src={img}/>
                    :<div style={{background:'red',...imgStyle}} className={`${target}Img`} /> }
                <h3>{name.length<30
                ?name
                :name.slice(0,29).trim()+'...'
                }</h3>
               </Link>
                {artist&&<p>by: {
                    <Link to={`/artist/${artist_id}`}>
                        {artist}
                    </Link>
                    }</p>}
            <p>{plays||0} plays</p>
        </div>
        )
}

export default Card;
