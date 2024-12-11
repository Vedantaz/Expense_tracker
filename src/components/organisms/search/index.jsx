import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectFilteredExpenses, selectFilteredUsers } from '../../../store/features/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
    const filteredExpenses = useSelector(selectFilteredExpenses);

    const searchQuery = useSelector((state) => state.search.searchQuery);
    const filteredUsers = useSelector(selectFilteredUsers);

    const [localQuery, setLocalQuery] = useState("");

    const handleInputChange = (event) => {
        setLocalQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            dispatch(setSearchQuery(localQuery));
        }
    }
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={localQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div>
                <ul>

                    {localQuery ? ( 
                        filteredExpenses.length > 0 ? (

                            filteredExpenses.filter((expense)=>{
                                if(localQuery.trim().split(' ').length === 1){
                                    return expense.name.toLowerCase().startsWith(localQuery.trim().toLowerCase());
                                }
                                return expense.name.toLowerCase().includes(localQuery.trim().toLowerCase());
                            }).map((expense) => (
                                <li key={expense.name}>
                                    {expense.name} - ₹{expense.amount}
                                </li>
                            ))
                        ) : (
                            <p>No expenses found</p>
                        )
                    ) : (
                       
                        <p> Search for expenses... </p>
                    )}

                </ul>
            </div>
        </>
    );
};

export default Search;
