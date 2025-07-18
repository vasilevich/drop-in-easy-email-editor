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
const onChange = ({values, html}, {editorCommunication, onChange}) => {
    const subject = values.subject || initialValues.subject;
    const subTitle = values.subTitle || initialValues.subTitle;
    if (editorCommunication) {
        if (editorCommunication.data &&
            editorCommunication.data.html === html &&
            editorCommunication.data.values &&
            editorCommunication.data.values.subject === subject &&
            editorCommunication.data.values.subTitle === subTitle
        ) {
            return;
        }
        editorCommunication.data = {values: values, html: html};
        if (typeof editorCommunication.onChange === 'function') {
            editorCommunication.onChange(editorCommunication.data);
        }
        if (typeof onChange === 'function') {
            onChange(editorCommunication.data);
        }
    }
}

const parseInitialDataState = props => {
    let data = {...initialValues};

    if (props.editorCommunication.data && props.editorCommunication.data.values) {
        data = {...data, ...props.editorCommunication.data.values};
    }

    if (props.initialValues) {
        data = {...data, ...props.initialValues};
    }
    return data;
}

const Editor = (props) => {
    const [data, setData] = useState(parseInitialDataState(props));
    useEffect(() => {
        // Expose a global object for communication
        props.editorCommunication.setData = (data) => {
            if (data.values) {
                setData(data.values);
            } else {
                setData(data);
            }
        };
        // cleanup
        return () => {
            props.editorCommunication.setContent = () => {
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
                onChange({values, html: objToEmailValidHtml(values)}, props);
                return (
                    <StandardLayout
                        showSourceCode={false}
                    >
                        <EmailEditor/>
                    </StandardLayout>
                );
            }}
        </EmailEditorProvider>
    );
}

export default Editor;