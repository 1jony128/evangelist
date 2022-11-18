import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {Street} from 'entities/Street/model/street';
import {ValidateStreetError} from 'entities/Street/types/street';
import {getTouchCoords} from 'widgets/MainLayout/Map/models/selectors/map';
import {$api} from 'shared/api/api';
import {StreetData} from 'widgets/MainLayout/Map/models/types/Street';


export const getStreetData = createAsyncThunk<
    StreetData,
    void,
    ThunkConfig<ValidateStreetError[]>
    >(
    'map/getStreetData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const formData = getTouchCoords(getState());

        console.log(formData)

        if(!formData) throw new Error();

        try {
            const response = await  extra.api.post(
                'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
                {"lat": formData[0], "lon": formData[1], "radius_meters": 20}
            )

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data)
            if(response.data.suggestions.length > 1){
                console.log("succeess")
                console.log(response.data)
                return response.data;
            } else {
                throw new Error();
            }

        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateStreetError.SERVER_ERROR]);
        }
    },
);
