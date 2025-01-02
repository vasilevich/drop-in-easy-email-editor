import React from 'react';
import ReactDOM from 'react-dom';
import EditorDialog from './EditorDialog';
import Editor from "./Editor";
import EditorPreviewWithDialog from "./EditorPreviewWithDialog";

/**
 * Expose a global object to allow communication with the editor and to attach the editor to the DOM
 * @type {{init: (function({id?: *, onChange?: *, data?: *}): *)}}
 */
window.emailEditor = {
    init: (props = {}) => {
        const {id, onChange, data, inline} = props;
        let idWasGenerated = false;
        // if id is not set, generate a random id and a div element and push it inside body
        let generatedId;
        if (!inline && !id) {
            generatedId = `email-editor-${Date.now()}`;
            const div = document.createElement('div');
            div.id = generatedId;
            // set display to none
            div.style.display = 'none';
            document.body.appendChild(div);
            idWasGenerated = true;
        }

        const editorCommunication = {
            onChange: onChange,
            data: data,
        };

        const modalInitializedPromise = new Promise((resolve) => {
            // if id is set, initialize immediatly
            if (!idWasGenerated) {
                resolve();
                return;
            }
            const interval = setInterval(() => {
                if (typeof editorCommunication.openModal === 'function') {
                    clearInterval(interval);
                    resolve(editorCommunication);
                }
            }, 1000);
        });
        editorCommunication.modalInitializedPromise = modalInitializedPromise;
        const editorInitializedPromise = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (typeof editorCommunication.setData === 'function') {
                    clearInterval(interval);
                    resolve(editorCommunication);
                }
            }, 1000);
        });
        editorCommunication.editorInitializedPromise = editorInitializedPromise;
        editorCommunication.initializedPromise = Promise
            .all([modalInitializedPromise, editorInitializedPromise])
            .then(() => editorCommunication);
        if (!inline) {
            if (idWasGenerated === false) {
                ReactDOM.render(
                    <EditorPreviewWithDialog editorCommunication={editorCommunication}/>
                    , document.getElementById(id));
            } else {
                ReactDOM.render(
                    <EditorDialog {...props} editorCommunication={editorCommunication}/>
                    , document.getElementById(generatedId));
            }


        } else {
            ReactDOM.render(
                <Editor {...props} editorCommunication={editorCommunication}/>
                , document.getElementById(id));
        }


        return editorCommunication;
    }
};

