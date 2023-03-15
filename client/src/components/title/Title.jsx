import React from 'react'
import {Helmet} from 'react-helmet'

const Title = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

Title.defaultProps = {
    title: "E-store",
    description: "We offer The best and Quality Products",
    keywords:'Electronics, Clothes, Jewellery'
}
export default Title
