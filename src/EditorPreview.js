import React from 'react';

// Define a simple CSS style for the scrollable container
const containerStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    width: '100%',
    maxWidth: '600px',
    height: '400px',
    overflowY: 'scroll',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};
const subjectContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    border: 1,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 25
}

const EmailPreview = ({onClick, html, subject, subTitle}) => {
    return (
        <div onClick={onClick} style={containerStyle}>
            <div style={subjectContainerStyle}>
                {typeof subject === 'string' && <span style={{width: "45%"}}>
                <label>Email subject</label>
                <br/>
                <input style={{width: "100%"}} value={subject}/>
            </span>}
                {typeof subTitle === 'string' &&
                    <span style={{width: "45%"}}>
                    <label>Email Sub title</label>
                    <br/>
                    <input style={{width: "100%"}} value={subTitle}/>
                </span>}
            </div>
            <label>Email Content</label>
            <div style={{
                border: 1,
                borderStyle: 'solid',
                minHeight: 400,
                pointerEvents: 'none'
            }}
                 dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    );
};

export default EmailPreview;