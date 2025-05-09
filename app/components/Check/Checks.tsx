interface CheckProps {
    children: React.ReactNode
}

export default function Check({ children } : CheckProps) {
    return (

        <div className="flex items-center text-[#FF6600] border-b-1 border-orange-300/50 pb-[0.5em]">
            <img src="/img/check.png" alt="check" className="mr-[0.5em] h-[2em]" />
            <p>{children}</p>
        </div>
    )
}
