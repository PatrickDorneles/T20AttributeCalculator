import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export const DescriptionLayout = () => {
    const [text, setText] = useState('')

    useEffect(() => {
        fetch('./md/description.en.md')
            .then(res => res.text())
            .then(setText)
    }, [setText])

    return <section className="bg-black py-10 px-4 text-white">
        <ReactMarkdown 
            components={{
                'h1': ({ children }) => <h1 className='text-3xl font-bold' >{children}</h1>,
                'table': ({ children }) => <table className='w-fit '>{children}</table>,
                'tr': ({ children }) => <tr className=''>{ children }</tr>,
                'td': ({ children }) => <td className='border-white border-solid border-2 py-1 px-2' >{ children }</td>,
                'th': ({ children }) => <th className='border-white border-solid border-2 py-1 px-2' >{ children }</th>,
                'a': ({ children, href }) => <a className='text-blue-500 cursor-pointer' href={href} >{ children }</a>,
                'img': (props) => <img className='inline' {...props} />,
            }}
            className="flex flex-col gap-4" 
            remarkPlugins={[remarkGfm]} >
            {text}
        </ReactMarkdown>
    </section>
}