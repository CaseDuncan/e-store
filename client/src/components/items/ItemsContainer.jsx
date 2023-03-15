import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getProducts} from '../../features/items/itemSlice'
import Header from '../header/Header'
import Title from '../title/Title'
import Items from './Items'



const ItemsContainer = () => {
    const{loading, success, items} = useSelector((state)=>state.items)
  const dispatch = useDispatch()
  let location = useLocation()
  console.log(location.pathname);
    
    useEffect(() => {
        dispatch(getProducts())
    },[dispatch])
    
    if(loading){
        return <h1>Loading...</h1>
    }
  return (
    <Header>
      <div className="container">
        <Title title={"Products"} />
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search product"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="row">
          {items &&
            items.map((item) => {
              return <Items key={item.id} product={item} />;
            })}
        </div>
      </div>
    </Header>
  );
}

export default ItemsContainer