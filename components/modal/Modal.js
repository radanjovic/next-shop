import React from "react";
import ReactDOM from 'react-dom';

function Backdrop(props) {
    return <div onClick={props.onHideCart} className='fixed top-0 left-0 w-full h-[100vh] overflow-auto z-20 bg-black opacity-70'></div>
}

function Overlay(props) {
    return <div className='fixed top-[5vh] bg-white p-4 lg:p-8 rounded-xl z-30 shadow-md modal cartAnimation h-fit overflow-auto'>
        <div>{props.children}</div>
    </div>
}

export default function Modal({hideCart, children}) {
    return (
        <>
           <Backdrop onHideCart={hideCart} />
           <Overlay>{children}</Overlay>
        </>
    )
}