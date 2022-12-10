import { Logo } from "../svg/Logo"

export const ApplicationLayout = () => {

    return <div className="h-screen flex flex-col justify-center items-center gap-4 bg-[#4b0e0e] bg-hero-topography">
        <Logo className="h-24 w-24" />
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl font-bold font-display">T20 Attribute Calculator</h1>
            <pre className="text-white font-normal">This calculator is for Game of The Year Edition only</pre>
        </div>
        <div className="flex items-center ">
            
        </div>
    </div>
}