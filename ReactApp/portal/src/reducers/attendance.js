import { GET_TODAY_ATTENDANCE_TIME } from '../actions/actionTypes';
import update from 'immutability-helper';


const attendanceReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TODAY_ATTENDANCE_TIME:
            if (action.payload && action.payload.data) {
                return update(state, {
                    inTime: {
                        $set: (
                            action.payload.data && action.payload.data.length > 0 && action.payload.data[0].InTime ? action.payload.data[0].InTime : null
                        )
                    },
                    outTime: {
                        $set: (
                            action.payload.data && action.payload.data.length > 0 && action.payload.data[0].OutTime ? action.payload.data[0].OutTime : null
                        )
                    },
                    isLoading: { $set: false },
                });
            } else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}

export default attendanceReducer;
