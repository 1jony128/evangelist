import { Button } from '@mui/material'
import React from 'react'

function Dialog({
    selectId,
    setSelectId,
    setPoints,
    points,
    setCoords
}) {
    const onDelete = () => {
        const obj = [...points]
        const filter = obj.filter(item => item.id !== selectId)
        setPoints(filter)
        setSelectId(null)
    }

    const onEdit = () => {
        const current = points.find(item => item.id === selectId)
        setCoords(current.geometry.coordinates)
        setSelectId(null)

    }
    return (
        <div className='dialog'>
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

export default Dialog
