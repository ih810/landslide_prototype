import React from 'react';

//reactstrap
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function ComponentModal (props) {
    
    return (
        <div>
        <Modal centered isOpen={props.control}>
            <ModalHeader>
                <h1>{props.type}</h1>
            </ModalHeader>
            <ModalBody>
            <p>This action cannot be undone, are you sure?</p>                
            </ModalBody>
            <ModalFooter>
                <button onClick={props.remove} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">{props.type}</button> 
                <button onClick={props.toggle} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Cancel</button>
            </ModalFooter>
        </Modal>

    </div>
    )
}