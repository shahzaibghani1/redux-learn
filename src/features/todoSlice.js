import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",

    initialState,

    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
            };

            state.todos.push(newTodo);
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },

        updateTodo: (state, action) => {
            const { id, text } = action.payload;

            const todo = state.todos.find((todo) => todo.id === id);

            if (todo) {
                todo.text = text;
            }
        },
    },
});

export const {
    addTodo,
    deleteTodo,
    updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;