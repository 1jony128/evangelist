import { Button, TextField, Typography } from '@mui/material'
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { alert, alertText } from '../../helpers/alertText'
import useInput from '../../hooks/useInput'
import { IPoint } from '../../models/point'


interface IForm {
    coords: [number, number]
    points: IPoint[],
    setPoints: Dispatch<SetStateAction<any>>,
    setCoords: Dispatch<SetStateAction<any>>,
    mode: "create" | "edit",
    setMode: Dispatch<SetStateAction<any>>,
    currentPoint: IPoint | null
}

const Form: FC<IForm> = ({coords, points, setPoints, setCoords, mode, setMode, currentPoint}) => {

    const name = useInput("")
    const street = useInput("")
    const entrance = useInput("")
    const countNewspaper = useInput("")

    useEffect(() => {
        if(mode === "edit" && currentPoint){
            console.log(currentPoint)
            const current = currentPoint.properties

            name.setValue(current.name)
            street.setValue(current.street)
            entrance.setValue(current.entrance)
            countNewspaper.setValue(current.countNewspaper)
            
        }
    }, [mode, points, currentPoint]);   

    const onSubmit = () => {
        if(mode === "edit"){
            const clonePoint = JSON.parse(JSON.stringify(currentPoint))
            // console.log(clonePoint)
            const prop = {
                name: name.value,
                street: street.value,
                entrance: entrance.value,
                countNewspaper: countNewspaper.value
            }
            clonePoint.properties = prop
            const clonePoints = JSON.parse(JSON.stringify(points))
            const newPoints = clonePoints.map((item: IPoint) => {
                if(item.id === clonePoint.id){
                    return clonePoint
                } else {
                    return item
                }
            })
            setPoints(newPoints)
            setCoords(null)
            setMode("create")
            alert(alertText.editPoint, "success")
            return
        }
        console.log("first")
        const point = {
            type: "Feature",
            id: (new Date()).getTime(), 
            geometry: {
                type: "Point", 
                coordinates: coords
            } ,
            properties:  {
                "name": name.value,
                "street": street.value,
                "entrance": entrance.value,
                "countNewspaper": countNewspaper.value,
            },
            options: {
                preset: 'islands#blueCircleDotIconWithCaption'
            }
            
        }
        
        console.log(point)
        setPoints([...points, point])
        setCoords(null)
        setMode("create")
        alert(alertText.addPoint, "success")
    }

    const onClose = () => {
        setCoords(null)
        setMode("create")
    }

    return (
        <div className='form'>
            <div className="row">
            <Typography variant="h4" gutterBottom>
                {(mode === "edit") ? "Редактирование метки" : "Создание метки"}      
            </Typography>
            </div>
            <div className="row">
                <TextField 
                    label="имя" 
                    variant="outlined" 
                    placeholder='имя'
                    value={name.value}
                    onChange={name.onChange}
                />
            </div>
            
            <div className="row">
                <TextField 
                    label="Улица, Дом" 
                    variant="outlined" 
                    placeholder='Улица, Дом'
                    value={street.value}
                    onChange={street.onChange}
                />
            </div>
            
            <div className="row">
                <TextField 
                    label="Номера подъездов" 
                    variant="outlined" 
                    placeholder='Номера подъездов'
                    value={entrance.value}
                    onChange={entrance.onChange}
                />
            </div>
            
            <div className="row">
                <TextField 
                    label="Количество газет" 
                    variant="outlined" 
                    placeholder='Количество газет'
                    value={countNewspaper.value}
                    onChange={countNewspaper.onChange}
                />
            </div>
            <div className="row">
                <Button 
                    variant="contained"
                    className='pr10'
                    onClick={onSubmit}
                >
                    {(mode === "edit") ? "Сохранить" : "Создать"}  
                </Button>
                <Button 
                    variant="outlined"
                    onClick={onClose}
                >
                    Отмена
                </Button>
            </div>
            
        </div>
    )
}

export default Form
