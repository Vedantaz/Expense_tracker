import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    searchQuery :"",
};

// action for updating the search query
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
})

export const selectFilteredExpenses  = (state)=>{

    const expenses = state.expenses.expenses;
    const searchQuery = state.search.searchQuery;

    if(!searchQuery) return expenses;

    return expenses.filter((expense)=>{

        return (
            expense.name.toLowerCase().includes(searchQuery.toLowerCase())  
            || expense.amount.toString().includes(searchQuery)
        );
            
    });
    
}

export const selectFilteredUsers = (state)=>{
    const {userProjectData} = state.employeeAllocation;
    const {searchQuery} = state.search;

    if(!searchQuery) return userProjectData;

    return userProjectData.filter((user) =>  {
        user.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
}

export const {setSearchQuery} = searchSlice.actions;
export default searchSlice.reducer;
