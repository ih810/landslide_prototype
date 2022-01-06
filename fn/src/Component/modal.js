import React from 'react';

//reactstrap
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function ComponentModal (props) {
    
    return (
        <>
        <Modal centered isOpen={props.control}>
            <ModalHeader>
                {props.type +' '+ props.name}
            </ModalHeader>
            <ModalBody>
            <p>This action cannot be undone, are you sure?</p>                
            </ModalBody>
            <ModalFooter>
                <button onClick={props.remove} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">{props.type}</button> 
                <button onClick={props.toggle} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Cancel</button>
            </ModalFooter>
        </Modal>

    </>
    )
}