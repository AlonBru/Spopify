import React from 'react' 
import {useHistory,useLocation,NavLink} from 'react-router-dom' 

function SearchButtons() {
  const history = useHistory()
  const location = useLocation()
  const goTo = ({target:{value}}) => {
    // console.log(value+ location.search)
    history.push()
  }
  return <div className='searchButtons'>
  find:
  <NavLink 
  to={`/search${location.search}`}
  activeClassName='selected'
  exact>
    all
  </NavLink>
  <NavLink 
  to={`/search/artist${location.search}`} 
  activeClassName='selected'>
    artists
  </NavLink>
  <NavLink 
  to={`/search/album${location.search}`} 
  activeClassName='selected'>
    albums
  </NavLink>
  <NavLink 
  to={`/search/song${location.search}`} 
  activeClassName='selected'>
    songs
  </NavLink>
  <NavLink 
  to={`/search/playlist${location.search}`} 
  activeClassName='selected'>
    playlists
  </NavLink>
  </div>
} 
export default SearchButtons; 