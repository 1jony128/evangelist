import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Dialog from '../components/Dialog/Dialog';
import Form from '../components/Form/Form';
import useWindowDimensions from '../hooks/useWindowDimensions';

function Map() {

    const [map, setMap] = useState(); // карта
    const [geo, setGeo] = useState(); 
    const [center, setCenter] = useState(); 
    const [objectManager, setObjectManager] = useState(); 
    const [points, setPoints] = useState([]);
    const [selectId, setSelectId] = useState();
    const [coords, setCoords] = useState()


    const { height, width } = useWindowDimensions();
    console.log(height, width)
    useEffect(() => {
        if(points.length){
            objectManager.removeAll();
            objectManager.add({
                "type": "FeatureCollection",
                "features": points
            })
        }
    },[points])

    useEffect(() => {
      console.log(selectId)
    }, [selectId])

    useEffect(() => {
      console.log(coords)
    }, [coords])

    useEffect(() => {
        const loadScript = (src, onLoad) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.id = "yandex-map"
            document.body.appendChild(script);
            script.onload = onLoad;
        };

        const init = () => {
            if(!map){
                const myMap = new window.ymaps.Map('map-id', {
                    center: [50.29693652129269, 127.53487760357913],
                    zoom: 13,
                }, {
                    searchControlProvider: 'yandex#search'
                });

                const objectManager = new window.ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 64,
                    clusterDisableClickZoom: false,
                    clusterIconLayout: "default#pieChart",
                    clusterIconContentLayout: window.ymaps.templateLayoutFactory.createClass(
                        '<div style=font-size: 33px; ">{{ properties.geoObjects.length }}</div>'
                    ),
                    clusterIconPieChartRadius: 17,
                    clusterIconPieChartCoreRadius: 13,
                    clusterIconPieChartStrokeWidth: 0,
                    hasBalloon: true
                })

                objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

                myMap.geoObjects.add(objectManager);
    
            setMap(myMap);
            setGeo(myMap.getBounds());     
            
            setObjectManager(objectManager)
            }
        };
        
        if(document.querySelector("#yandex-map") == null){
            loadScript(`https://api-maps.yandex.ru/2.1/?apikey=816a6f0e-680d-448e-a81a-3caf8c984848&lang=ru_RU`, () => {
                window.ymaps.ready(init);
            });
        } else {
            init();
        }

        
    },[])

    useEffect(() => {
        if (!map) return;
        map.events.add('boundschange', () => {
            setGeo(map.getBounds());
            setCenter(map.getCenter())
        });      
        map.events.add('click', function (e) {
            const coords = e.get('coords');
            setCoords(coords)
            
        });   
    },[map, points])


    useEffect(() => {
        if(objectManager){
            console.log(points)
            objectManager.objects.events.add('click', (e) => {              
                const selectId = e.get('objectId')
                setSelectId(selectId)
            });
        }
        
    }, [objectManager, points])
    

    return (
        <div className='map-container'>
            <div id="map-id" style={{width: width, height: height}}></div>
            {coords && 
                <Form 
                    coords={coords}
                    setPoints={setPoints}
                    points={points}
                    setCoords={setCoords}
                />
            }
            {
                selectId &&
                <Dialog 
                    selectId={selectId}
                    setSelectId={setSelectId}
                    setPoints={setPoints}
                    points={points}
                    setCoords={setCoords}
                />
            }
        </div>
    )
}

export default Map
