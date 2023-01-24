import { FC } from 'react'



interface Props {
    HeadItems: Array<string>
    BodyItems: Array<Array<string>>
    ShouldMarked?: Array<string>
}


const Table: FC<Props> = ({ HeadItems, BodyItems, ShouldMarked=["", ""] }) => {

    function checkIfMarked(word: string) {
        if (word === ShouldMarked[0]) {
            return "text-green-500"
        } else if (word === ShouldMarked[1]) {
            return  "text-red-500"
        } 

        return ""
    }

    return (
        <table className='w-full border-collapse'>
            <thead className='bg-primary '>
                <tr>
                    {HeadItems.map((items, index) => {
                        return <th className='font-bold text-white py-2 text-xl' key={index}>{items}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {BodyItems.map((items, index) => {
                    return (
                        <tr key={index} className="odd:bg-slate-200">
                            {items.map((item, index) => {
                                return <th key={index} className={`py-4 rounded-sm text-lg ${checkIfMarked(item)}`}>{item}</th>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


export default Table