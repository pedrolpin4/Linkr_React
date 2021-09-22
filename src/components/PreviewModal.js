import styled from "styled-components";
import {useState, useEffect, useRef} from 'react';


function PreviewModal ({showModal, setShowModal}){
    return(
        <>
            {   showModal 
                ?   
                <div>Oiii</div>
                :
                null
            }
        </>
    )
}

export default PreviewModal

//href={link} target="_blank"