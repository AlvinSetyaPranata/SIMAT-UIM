import { createContext, useTransition, ReactElement, FC, TransitionStartFunction, Dispatch, useState } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'


interface ContextType {
    navigate: NavigateFunction 
    transition: TransitionStartFunction
    tokenStatus: boolean|string
    setTokenStatus: Dispatch<React.SetStateAction<boolean|string>>
}

export const Context = createContext<ContextType|null>(null)


export const Globals: FC<{ children: ReactElement | null }> = ({ children }) => {
    const navigate = useNavigate()
    const [isPending, startTransition] = useTransition()
    const [tokenStatus, setTokenStatus] = useState<boolean|string>("pending")


    return (
        <Context.Provider value={{
            navigate: navigate,
            transition: startTransition,
            setTokenStatus: setTokenStatus,
            tokenStatus: tokenStatus
        }}>
            {isPending ? <div>Loading</div>  : children}

        </Context.Provider>
    )
}