interface SolucoesProps {
    icone:string
    children: React.ReactNode
}

export default function Solucoes ({ icone, children } : SolucoesProps) {
    return (
        <div className="bg-[#F2EAE4] rounded-full flex py-[0.3em] px-[1em] items-center mb-[0.8em] w-full h-[2.8em]">
            <img src={`/img/${icone}.png`} alt={icone} className="h-[15px] mr-[0.5em]"/>
            <p className="text-[#FF6600] text-[0.8em]">{children}</p>
        </div>
    )
}
