
import { GET_ADMIN_USERS } from '../../actions/actionTypes'
import update from 'immutability-helper';

export const adminDataReducers = (state = [], action) => {
    switch (action.type) {
        case GET_ADMIN_USERS: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    adminUsers: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        default:
            return state;
    }

}