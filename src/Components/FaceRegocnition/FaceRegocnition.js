import React from 'react'


const FaceRegocnition = ({imageUrl}) => {
    return (
        <div className='center'>
            <img alt='' src={imageUrl} width='500px' height='auto'></img>
        </div>
    );
}

export default FaceRegocnition;