import React, { useState, useEffect } from 'react';

function Hookes() {
    const checkBack = ()=>{
        fetch("/check")
        .then(res => res.json())
        .then(res => console.log(res))
    }
    return (
        <>
            <button onClick={()=>checkBack()}>Test</button>
        </>
    )
}

export default Hookes;