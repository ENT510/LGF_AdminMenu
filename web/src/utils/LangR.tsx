import { useState, useEffect } from "react";
import { fetchNui } from "./fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

interface LangData {
    [key: string]: string;
}

const defaultLangData: LangData = {
    test: "Esto es un test de LANG, Toca ESC para cerrar",

};



const Lang = () => {
    const [lang, setLang] = useState<LangData>(defaultLangData);

    useNuiEvent<LangData>('ui:Lang', (data) => {
        setLang(data);
    });

    useEffect(() => {
        fetchNui<LangData>('ui:Lang')
            .then(data => {
                setLang(data);
            })
            .catch(error => {
                console.error('Error fetching language data:', error);
            });
    }, []);

    return lang;
};

export default Lang;
