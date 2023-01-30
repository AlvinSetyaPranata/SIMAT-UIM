import { createContext, useTransition, ReactElement, FC, TransitionStartFunction, Dispatch, useState } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'


interface ContextType {
    navigate: NavigateFunction 
    transition: TransitionStartFunction

}

export const Context = createContext<ContextType|null>(null)


export const Globals: FC<{ children: ReactElement | null }> = ({ children }) => {
    const navigate = useNavigate()
    const [isPending, startTransition] = useTransition()


    return (
        <Context.Provider value={{
            navigate: navigate,
            transition: startTransition,
        }}>
            {isPending ? <div>Loading</div>  : children}

        </Context.Provider>
    )
}