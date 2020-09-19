import React, {useState,useEffect} from 'react';
import {
    Switch,
    useLocation,
    NavLink,
    BrowserRouter as Router,
    // useRouteMatch,
     Route, useRouteMatch} from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
import SongList from '../components/SongList.js'
import AlbumList from '../components/AlbumList.js'


function Artist({match}) { 
    const [artist,setArtist] = useState()
    const [albums,setAlbums] = useState()
    const [songs,setSongs] = useState()
    useEffect(getArtist,[])
    console.log(match)
    function getArtist(){
        axios.get(`/artist/${match.params.id}`)
        .then(({data})=>{
            if(Array.isArray(data)){data=data[0]}
            setArtist(data)
            getAlbums(data)
            getSongs(data)

        }) 
        .catch(e=>console.error(e)) 
    }
    function getAlbums(artist){
        axios.get(`/getByArtist/albums?id=${artist.artist_id}`)
        .then(({data})=>{
            setAlbums(data)
        }) 
        .catch(e=>console.error(e)) 
    }
    function getSongs(artist){
        axios.get(`/getByArtist/songs?id=${artist.artist_id}`)
        .then(({data})=>{
            setSongs(data)
        }) 
        .catch(e=>console.error(e)) 
    }
    if(!artist){return <Loading />}
    return (
        <div>
            <div className='cover' 
                //implement cover for names too long for current cover
                style={{backgroundImage:`url(${artist.img})`}
                }
                >
                <h1>{artist.name}</h1> 
                <p>Play Count:{artist.play_count||0}</p> 
                <button>Follow</button>
                
            </div>
            <div className='lists'>
            <Router>
            <div className='pageNav'>
                    <NavLink to={match.url+`/songs`}
                        activeClassName='selected'
                        title='Top Songs'
                        isActive={(match,location) => {
                            return (
                                location.pathname.slice(9) ==='/songs'
                                ||
                                location.pathname.slice(9) === ''
                            )
                        }}
                    >Top Songs</NavLink>
                    <NavLink to={match.url+`/albums`}
                        activeClassName='selected'
                        replace
                    >
                        Albums
                    </NavLink>
                    <NavLink to={match.url+`playlists`}
                        activeClassName='selected'
                        replace
                    >
                        playlists
                    </NavLink>
            </div>
                    <Switch>
                        <Route path={match.url+`/songs`} component={SongList} >
                            <SongList list={songs}/>
                        </Route>
                        <Route path={match.url+"/albums"} >
                            <AlbumList list={albums}/>
                        </Route>
                        <Route path={match.url} >
                            <SongList list={songs}/>
                        </Route>
                    </Switch>
            </Router>
            </div>
            </div>
    )
}
export default Artist;