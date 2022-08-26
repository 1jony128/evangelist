import React, { useEffect, useState, FC } from 'react'
import { Map } from 'typescript';
import { ObjectManager } from 'yandex-maps';
import Dialog from '../components/Dialog/Dialog';
import Form from '../components/Form/Form';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { IPoint } from '../models/point';

interface PropsMap {

}



const MapWrapper:FC<PropsMap> = () => {

    const [map, setMap] = useState<ymaps.Map | null>(null); // карта
    const [geo, setGeo] = useState<number[][]>(); 
    const [center, setCenter] = useState<number[]>(); 
    const [objectManager, setObjectManager] = useState<ObjectManager | null>(null); 
    const [points, setPoints] = useState<IPoint[]>([]);
    const [selectId, setSelectId] = useState<string | undefined>();
    const [coords, setCoords] = useState()
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [currentPoint, setCurrentPoint] = useState<IPoint | null>(null)

    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if(points.length){
            if(objectManager){
                objectManager.removeAll();
                objectManager.add({
                    "type": "FeatureCollection",
                    "features": points
                })
            }
           
        }
    },[points])

    useEffect(() => {
    //   console.log(selectId)
    if(points.length > 0){
        const current = points.find((item: IPoint) => item.id === selectId)
        if(!current) return

        const clonePoints = JSON.parse(JSON.stringify(points))
        current.options.preset = 'islands#greenCircleDotIconWithCaption'
        const newPoints = clonePoints.map((item: IPoint) => {
            if(item.id === selectId){
                return current
            } else {
                item.options.preset = 'islands#blueCircleDotIconWithCaption'
                return item
            }
        })
        setPoints([])
        setPoints(newPoints)
        setCurrentPoint(current)
    }
    
    }, [selectId])

    useEffect(() => {
    //   console.log(coords)
    }, [coords])

    useEffect(() => {
        const loadScript = (src: string, onLoad: any) => {
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
                    // @ts-ignore
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
                    // @ts-ignore
                    clusterIconPieChartRadius: 17,
                    clusterIconPieChartCoreRadius: 13,
                    clusterIconPieChartStrokeWidth: 0,
                    hasBalloon: true
                })

                objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

                myMap.geoObjects.add(objectManager);
                myMap.options.set('minZoom', 12);
                myMap.options.set('maxZoom', 20);
                setMap(myMap);
                // @ts-ignore
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
                    mode={mode}
                    setMode={setMode}
                    currentPoint={currentPoint}
                />
            }
            {
                selectId &&
                <Dialog 
                    setMode={setMode}
                    selectId={selectId}
                    setSelectId={setSelectId}
                    setPoints={setPoints}
                    points={points}
                    setCoords={setCoords}
                    setCurrentPoint={setCurrentPoint}
                    currentPoint={currentPoint}
                />
            }
        </div>
    )
}

export default MapWrapper
