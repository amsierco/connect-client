// Returns React style object with an img String param
const ImageFormat = (img) => {

    // Returns guest img if undefined
    if(undefined === img){
        return { 
            backgroundImage: `url(${'../../user-solid.svg'})`,
            backgroundSize: 'contain',
            backgroundPositionY: '3px',
            backgroundColor: 'var(--medium-gray)'
        }
    }

    // Determine if img type is url or base64 and return corresponding style
    if(img.substring(0,4) === 'http'){
        return { backgroundImage: `url(${img})` }
    } else {
        return { backgroundImage: `url("data:image/png;base64, ${img}")` }
    }
}

export default ImageFormat;