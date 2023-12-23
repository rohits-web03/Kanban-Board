import React, { createContext, useContext } from 'react';

const KanbanContext = createContext();

const KanbanProvider=KanbanContext.Provider;

const useKanban=()=>{
    return useContext(KanbanContext);
}

export { KanbanProvider, useKanban };
