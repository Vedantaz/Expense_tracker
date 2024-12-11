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
                {/* <h3>Filtered Expenses:</h3> */}
                <ul>
                    {/* {filteredExpenses.length > 0 ? (
                        searchQuery ? ( 
                            filteredExpenses.map((expense) => (
                                <li key={expense.name}>{expense.name} - ₹{expense.amount}</li>
                            ))
                        ) : (
                            <p>Search for expenses...</p> 
                        )
                    ) : (
                        <p>No expenses found</p> 
                    )} */}

                    {localQuery ? ( 
                        filteredExpenses.length > 0 ? (
                            filteredExpenses.map((expense) => (
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
