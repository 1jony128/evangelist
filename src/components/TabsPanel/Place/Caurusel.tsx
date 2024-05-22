import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import ItemCaurusel from 'components/TabsPanel/Place/ItemCaurusel';
import {useStore} from 'store/useStore';
import {selectPlaces} from 'store/selectors';
import {IPhoto, IPlace} from 'types';
import review from 'components/TabsPanel/Reviews/Review';
import {useFilter} from 'components/TabsPanel/Place/useFilter';

const Caurusel = () => {

  const [filterCity, setFilterCity] = useState<IPhoto[]>([])

  const data = useStore(selectPlaces)
  const filter = useFilter(state => state.filter)

  useEffect(() => {
    if(data){
      const mapArray = [...data].map(item => {
        return item.photo
      })
      setFilterCity(mapArray.reduce((prev, current) => [...prev, ...current]))
    }
  }, [data])

  useEffect(() => {
    if(filter && data){
      const mapArray = [...data].filter(item => {
        if(filter === "all"){
          return item
        } else if(filter === item.name){
          return item
        }
      }).map(item => item.photo)

      const cities = mapArray.reduce((prev, current) => [...prev, ...current])
      setFilterCity(cities)

    }
  }, [filter])

  return (
    <Carousel>
      {
        filterCity && filterCity.map((item, i) =>
          <ItemCaurusel key={item.name} {...item}/>
        )
      }
    </Carousel>
  )
}

export default Caurusel

