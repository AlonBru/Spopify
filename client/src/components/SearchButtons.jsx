import React from 'react' 
import {useHistory,useLocation} from 'react-router-dom' 

function SearchButtons() {
  const history = useHistory()
  const location = useLocation()
  const goTo = ({target:{value}}) => {
    // console.log(value+ location.search)
    history.push(`/search${value}${location.search}`)
  }
  return <div className='searchButtons'>
  <button value='' onClick={goTo}>
    all
  </button>
  <button value='/artist' onClick={goTo}>
    artists
  </button>
  <button value='/album' onClick={goTo}>
    albums
  </button>
  <button value='/song' onClick={goTo}>
    songs
  </button>
  <button value='/playlist' onClick={goTo}>
    playlists
  </button>
  </div>
} 
export default SearchButtons; 