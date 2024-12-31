import React, {useEffect, useState} from 'react';
import {BasicType, BlockManager} from 'easy-email-core';
import {EmailEditor, EmailEditorProvider} from 'easy-email-editor';
import {StandardLayout} from 'easy-email-extensions';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import {objToEmailValidHtml} from "./utils";

const initialValues = {
    subject: 'Welcome to Easy-email',
    subTitle: 'Nice to meet you!',
    content: BlockManager.getBlockByType(BasicType.PAGE)?.create({}),
};

/**
 * To avoid duplicate calls to the onChange method with the same value, we will save the previous values
 * @param randomKey
 * @param values
 * @param html
 */
const onChange = ({values, html}, editorCommunication) => {
    if (editorCommunication && typeof editorCommunication.onChange === 'function') {
        if (editorCommunication.data && editorCommunication.data.html === html) {
            return;
        }
        editorCommunication.data = {values: values, html: html};
        editorCommunication.onChange(editorCommunication.data);
    }
}

export default (props) => {
    const [data, setData] = useState({...initialValues, ...(props.initialValues || {})});
    useEffect(() => {
        // Expose a global object for communication
        props.editorCommunication.setData = (data) => {
            if (data.values) {
                setData(data.values);
            } else {
                setData(data);
            }
        };
        props.editorCommunication.onChange = ({values, html}) => {
            console.log("window.emailEditor.onChange not implemented, values recieved", values, html);
        };
        // cleanup
        return () => {
            props.editorCommunication.setContent = () => {
            };
            props.editorCommunication.onChange = () => {
            };
        };

    }, []);

    return (
        <EmailEditorProvider
            data={{...initialValues, ...data}}
            height={props.height || 'calc(100vh - 72px)'}
            autoComplete
            dashed={false}
        >
            {({values}) => {
                onChange({values, html: objToEmailValidHtml(values)}, props.editorCommunication);
                return (
                    <StandardLayout
                        showSourceCode={true}
                    >
                        <EmailEditor/>
                    </StandardLayout>
                );
            }}
        </EmailEditorProvider>
    );
}

