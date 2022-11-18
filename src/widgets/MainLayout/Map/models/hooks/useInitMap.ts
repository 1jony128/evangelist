import {useState, useEffect} from "react";
import {ObjectManager} from 'yandex-maps';
import {IPoint} from 'widgets/MainLayout/Map/models/types/IPoint';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useSelector} from 'react-redux';
import {getScreenArea} from 'widgets/MainLayout/Map/models/selectors/map';
import {MapActions} from 'widgets/MainLayout/Map/models/slices/MapSlice';

const useInitMap = () => {

    const [map, setMap] = useState<ymaps.Map | null>(null); // карта
    const [objectManager, setObjectManager] = useState<ObjectManager | null>(null);

    const dispatch = useAppDispatch()


    useEffect(() => {
        const loadScript = (src: string, onLoad: () => void) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.id = "yandex-map"
            document.body.appendChild(script);
            script.onload = onLoad;
        };

        const init = () => {
            if(map) return
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
            dispatch(MapActions.setScreenArea(myMap.getBounds()));

            setObjectManager(objectManager)
        };

        console.log(process.env.REACT_APP_KEY)

        if(document.querySelector("#yandex-map") == null){
            loadScript(`${process.env.REACT_APP_KEY as string}`, () => {
                window.ymaps.ready(init);
            });
        } else {
            init();
        }


    },[])
    return {map, objectManager}
};

export default useInitMap;