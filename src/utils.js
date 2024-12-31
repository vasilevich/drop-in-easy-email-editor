import {JsonToMjml} from "easy-email-core";
import mjml from "mjml-browser";

export const objToMjml = (values) => {
    try {
        return JsonToMjml({
            data: values.content
        });
    }catch (e){
        console.log('JsonToMjml error', e);
    }
    return '';
};

export const mjmlToHtml = (mjmlStr) => {
    try {
        return mjml(mjmlStr).html;
    }catch (e){
        console.log('mjmlToHtml error', e);
    }
    return '';
};


export const objToEmailValidHtml = (values) => {
    return mjmlToHtml(objToMjml(values));
};