import React from 'react'
import { Component, useState } from 'react'
import Stockdata from '../FetchAPI/Stockdata'
import Newsdata from '../FetchAPI/Newsdata.js'

class Category extends Component {
    render() {
        return(
            <Newsdata></Newsdata>
        )
    }
}

export default Category