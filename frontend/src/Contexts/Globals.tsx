import { createContext, useTransition, ReactElement, FC, TransitionStartFunction } from 'react'
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
            {children}
        </Context.Provider>
    )
}