import { Button, TextField } from '@mui/material'
import React from 'react'
import useInput from '../../hooks/useInput'

function Form({coords, points, setPoints, setCoords}) {

    const name = useInput()
    const street = useInput()
    const entrance = useInput()
    const countNewspaper = useInput()

    const onSubmit = () => {
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
                "balloonContent": `<div>Раздавал ${name.value},
                кол-во ${countNewspaper.value}  газет.
                Адрес: ${street.value} Подъезды: ${entrance.value}
                </div>`,
            }
        }

        console.log(point)
        setPoints([...points, point])
        setCoords(null)
    }

    const onClose = () => {
        setCoords(null)
    }

    return (
        <div className='form'>
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
                    Сохранить
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
