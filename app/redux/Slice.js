import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events : {},
};

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers : {
      toggleEvent: (state, action) => {
        const { eventId , userId } = action.payload;

        if (!state.events[eventId]) {
            state.events[eventId] = []; 
        }

        if (state.events[eventId].includes(userId)) {
            state.events[eventId] = state.events[eventId].filter((id) => id !== userId);
        } else {
         state.events[eventId].push(userId);
        }
      },
    }
});

export const { toggleEvent } = eventSlice.actions;
export default eventSlice.reducer;