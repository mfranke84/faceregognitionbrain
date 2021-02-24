import React from 'react';
import './FaceRegocnition.css';


const FaceRegocnition = ({imageUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2' >
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'></img>
                <div className='boundingBox' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    );
}

export default FaceRegocnition;