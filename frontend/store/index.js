import { createStore } from 'redux'

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    // Define actions as needed
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
