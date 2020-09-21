import React , {useState,useEffect} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'

function Card({name,img,play_count,artist,user,created_by,artist_id,album_id,id,target,cover_img}) {
    return (
        <div key={id} className={'card'} >
            <Link 
            to={`/${target}/${id}`
                +(target==='song'
                ?`?from=album&id=${album_id}`
                :'')}>
                <img className={`${target}Img`} src={img||cover_img}/>
                <h3>{name.length<30
                ?name
                :name.slice(0,29).trim()+'...'
                }</h3>
               </Link>
                {artist 
                ?<p>by: {
                    <Link to={`/artist/${artist_id}`}>
                        {artist}
                    </Link>
                    }</p>
                    :undefined}
                {user
                ?<p>by: {
                    <Link to={`/user/${created_by}`}>
                        {user}
                    </Link>
                    }</p>
                    :undefined}
            <p>{play_count||0} plays</p>
        </div>
        )
}

export default Card;
