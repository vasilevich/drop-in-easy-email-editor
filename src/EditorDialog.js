import React, {useEffect} from 'react';
import Modal from 'react-modal';
import Editor from "./Editor";

const style = {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    inset: 0
};
const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 9999
};
export default (props) => {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        // Expose a global object for communication
        props.editorCommunication.openModal = () => {
            setOpen(true);
        };
        props.editorCommunication.closeModal = () => {
            setOpen(false);
        };
        // cleanup
        return () => {
            props.editorCommunication.openModal = () => {
            };
            props.editorCommunication.closeModal = () => {

            };
        };

    }, []);
    const handleCloseModal = () => {
        setOpen(false);
        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    }
    return (

        <Modal
            isOpen={open}
            style={{
                content: style,
                overlay: style
            }}
        >
            <button
                onClick={handleCloseModal}
                style={buttonStyle}
                aria-label="Close"
            >
                ❌
            </button>
            <Editor {...props} />
        </Modal>
    );
}

