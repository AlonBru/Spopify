import React, {useState,useEffect,} from 'react';
import {Link,useLocation,NavLink} from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
// import play from './play.svg'
// import pause from './pause.svg'

function Artist({match}) { 
    const [artist,setArtist] = useState()
    const [hover,setHover] = useState(false)
    const [isPlaying,setIsPlaying] = useState(false)
    useEffect(getArtist,[])
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const queries=useQuery()
    function getArtist(){
        axios.get(`/artist/${match.params.id}`)
        .then(({data})=>{
            console.log(data)
            if(Array.isArray(data)){data=data[0]}
            setArtist(data)
        }) 
        .catch(e=>console.error(e)) 
    }
    if(!artist){return <Loading />}
    return (
        <div>
            <div className='cover'>
                <p>{artist.name}</p> 
                <button>Follow</button>
            </div>
            <div id='app'>
            <Router>
            
                <Nav/>
                <main>
                    <Search />
                    <Switch>
                        {/* <Route path="/adder" component={Adder} /> */}
                        <Route path="/song/:id" component={Song} />
                        <Route path="/Artist/:id" component={Artist} />
                        <Route exact path="/"  component={Home} />
                        <Route component={error404} />
                        
                    </Switch>
                </main>
            </Router>
            </div>
            </div>
    )
}
export default Artist;