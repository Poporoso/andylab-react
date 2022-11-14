export const languageSite = ({pathname}) => {

    /** Gestione lingua */
    const paths = pathname.split('/');
    const browserLang = (navigator.language || navigator.userLanguage).split('-'); 
    const er = /^([a-z]{2})$/;
    const pathLang = er.test(paths[1]) ? paths[1] : browserLang[0];

    console.log(paths)

    return ({lang: pathLang, path: paths[2]})
}