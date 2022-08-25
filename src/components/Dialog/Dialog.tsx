import { Button } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { alert, alertText } from '../../helpers/alertText';
import { IPoint } from '../../models/point';


interface IDialog{
    currentPoint: IPoint | null
    selectId: string | undefined,
    setSelectId: Dispatch<SetStateAction<any>>,
    setPoints: Dispatch<SetStateAction<any>>,
    points: IPoint[],
    setCoords: Dispatch<SetStateAction<any>>,
    setMode: Dispatch<SetStateAction<any>>,
    setCurrentPoint: Dispatch<SetStateAction<any>>,
    
}

const Dialog:FC<IDialog> = ({
    selectId,
    setSelectId,
    setPoints,
    points,
    setCoords,
    setMode,
    setCurrentPoint,
    currentPoint
})=> {
    const onDelete = () => {
        const obj = [...points]
        const filter = obj.filter(item => item.id !== selectId)
        setPoints(filter)
        setSelectId(null)
        alert(alertText.removePoint, "info")
    }

    const onEdit = () => {
        const current = points.find(item => item.id === selectId)
        if(current){
            setCoords(current.geometry.coordinates)
            setSelectId(null)
            setMode("edit")
        }
    }

    const onClose = () => {

    }
    if(currentPoint){
        return (
            <div className='dialog'>
                <div className="header">
                    <CloseIcon onClick={onClose}/>
                </div>
                <div className="content">
                    <div><span>{currentPoint.properties.name}</span></div>
                    <div>{currentPoint.properties.countNewspaper}  газет.</div>
                    <div> Адрес: {currentPoint.properties.street}</div> 
                    <div>Подъезды: {currentPoint.properties.entrance}</div>
                </div>
                <Button
                    onClick={onDelete} 
                    variant="text"
                >
                    Удалить
                </Button>
                <Button
                    onClick={onEdit} 
                    variant="contained"
                >
                    Редактировать
                </Button>
            </div>
        )
    }

    return (
        <div className='dialog'>
                Загрузка...
            </div>
    )
    
}

export default Dialog
