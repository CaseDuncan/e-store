import React from 'react'

const CartItem = ({item}) => {
  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-2 my-3">
          <h5>product Image</h5>
            <img src={item.image} alt={item.name} />
          </div>

          <div className="col-md-2 my-3">
            <h5>price</h5>
            <p>{item.price}</p>
          </div>
          <hr />

        </div>
    </div>
  )
}

export default CartItem