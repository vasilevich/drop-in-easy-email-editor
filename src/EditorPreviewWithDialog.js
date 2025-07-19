import React, {useCallback, useEffect, useState} from 'react';
import EditorDialog from "./EditorDialog";
import EmailPreview from "./EditorPreview";


const EditorPreviewWithDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        html: (props.editorCommunication.data && props.editorCommunication.data.html) || '',
        values: props.editorCommunication.data && props.editorCommunication.data.values
    });

    const onChangeHandler = useCallback((data) => {
        if (typeof props.onChange === 'function') {
            props.onChange(data);
        }
        setData(data);
    }, [props.onChange, setData]);

    useEffect(() => {
        if (!data) {
            onChangeHandler({
                html: (props.editorCommunication.data && props.editorCommunication.data.html) || '',
                values: props.editorCommunication.data && props.editorCommunication.data.values
            });
        }
    }, [data, onChangeHandler, props.editorCommunication.data]);

    return (
        <>
            <EmailPreview html={data?.html}
                          subject={data?.values?.subject}
                          subTitle={data?.values?.subTitle}
                          onClick={() => setOpen(true)}
            />
            <EditorDialog {...props}
                          open={open}
                          onClose={() => setOpen(false)}
                          onChange={onChangeHandler}
                          initialValues={data?.values}
            />
        </>

    );
}

export default EditorPreviewWithDialog;