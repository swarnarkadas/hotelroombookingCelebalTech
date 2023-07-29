import { createContext, useReducer } from "react";
import { useInRouterContext } from "react-router-dom";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state,action) =>{
    switch(action.type){  
        case "NEW_SEARCH":     //in the homepage of application,when we change the search information then we dispatch this action
        return action.payload      //payload contains 'destination,date range and options' and we're gonna update them
        case "RESET_SEARCH" :
            return INITIAL_STATE     //so, its gonna be again undefined and empty means bascially we're gonna reset
        default:
            return state;    
    }
}


export const SearchContextProvider = ({children}) => {     //basically 'children' is our data which we want to reach the above data
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);


  return(
   <SearchContext.Provider 
   value={{ 
    city: state.city, 
    dates:state.dates, 
    options:state.options,
    dispatch,
    }}
   >
    {children}
   </SearchContext.Provider>
  )
}   