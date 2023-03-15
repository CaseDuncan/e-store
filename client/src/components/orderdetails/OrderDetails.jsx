import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getOrderDetails} from '../../features/order/PlaceOrderSlice'

const OrderDetails = () => {
    const { id } = useParams();
    let dispatch = useDispatch()
    const{orderDetails} = useSelector((state)=>state.OrderDetails)

    useEffect(() => {
        dispatch(getOrderDetails(id))
    },[dispatch])
    return (
        <div>
            orderDetails {id}
        </div>
    )
}

export default OrderDetails
