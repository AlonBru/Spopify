import React from 'react';
import { NavLink } from "react-router-dom";
import Loading from './Loading';
function SongList({list}){
    if(!list){return <Loading/>}
    console.log('songlist')
    return(
        <div className='songlist'>
        <div className='song header'>
                    <span></span>
                    <span>#</span>
                    <span></span>
                    <span style={{textAlign:'start'}}>TITLE</span>
                    <span>length</span>
                    <span>PLAYS</span>
                </div>
        {list.map((song,i)=>{
            return (
                <div className='song'>
                    <img src={song.album_cover} alt='' />
                    <span>{i+1}</span>
                    <button className='like'>like</button>
                    <span style={{textAlign:'start'}}>{song.title}</span>
                    <span>{song.length.slice(0,2)==='00'
                    ?song.length.slice(3)
                    :song.length
                    }</span>
                    <span>{song.plays||0}</span>

                </div>
            )
        })}
        </div>
    )
}
export default SongList;
