import React , {useState,useEffect} from 'react';
import axios from 'axios';
import ItemLine from './ItemLine.js'

function ItemList({target}) {
    const [list,setList] = useState([])
    const getData= async (target_str,page_number=0) => {
        const {results:newList} = (await axios.get(`/${target_str}?page=${page_number}`)).data;
        setList(newList);

    }
    useEffect(()=>{
        getData(target)
    },[])

    return (
        <table id={`top_${target}s`}>
        <tr>
            <th>name</th>
            <th>total plays</th>
        </tr>
        <tbody>
            {list.map(ele =>{
            return <tr>
             <td>{ele.name}</td>
             <td>{ele.artist}</td>
            </tr>
            })}
        </tbody>
        
      </table>
  )
}

export default ItemList;
