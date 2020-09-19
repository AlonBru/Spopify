import React from 'react';
import Loading from './Loading';
import {Link} from 'react-router-dom'

function AlbumList({list}){
    if(!list){return <Loading/>}
    return(
        <div className='albumList'>

        {list.map((album,i)=>{
            return (
                <div key={album.album_id} className='album'>
                    <Link to={`/album/${album.album_id}`}>
                        
                    <img src={album.cover_img} alt='coverimg' />
                    <span style={{}}>{album.name.length<36
                    ? album.name
                    :album.name.slice(0,36)+'...'}</span>
                    <span className='date'>{album.released.slice(0,4)}</span>
                    </Link>

                </div>
            )
        })}
        </div>
    )
}
export default AlbumList;
