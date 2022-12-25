import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Marker } from '@react-google-maps/api';
import { renderText } from '../../../../helper/Helper'
import { useSelector } from 'react-redux'

const Maps = ({ data }) => {

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const googleSetting = info.data.setting?.google

    const MapsKey = googleSetting ? googleSetting['maps-key'] : null

    const infoWidget = data.var

    const dataMaps = {
        lat: infoWidget.lat || 44.84897660423479,
        lng: infoWidget.lng || 10.44616142821547,
        zoom: infoWidget.zoom || 18,
        width: infoWidget.w || '100%',
        height: infoWidget.h || '648px'
    }

    const mapContainerStyle = {
        width: dataMaps.width,
        height: dataMaps.height
    };

    const center = {
        lat: dataMaps.lat,
        lng: dataMaps.lng
    };

    return (
        <>
            <h2>{infoWidget?.titolo}</h2>
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            {
                infoWidget && MapsKey &&
                <LoadScript
                    googleMapsApiKey={MapsKey}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={dataMaps.zoom}
                    >
                        {
                            <Marker
                                icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                                position={center}
                            />
                        }
                    </GoogleMap>
                </LoadScript>
            }
        </>
    )
}

export default React.memo(Maps)