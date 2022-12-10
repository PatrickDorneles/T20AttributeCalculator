import { Logo } from "../svg/Logo"

export const ApplicationLayout = () => {

    return <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-[#4b0e0e] bg-hero-topography ">
        <Logo className="h-24 w-24" />
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-4xl font-bold font-display text-center">T20AC</h1>
            <pre className="text-white font-normal whitespace-pre-line text-center">An attribute calculator for Tormenta20 - Game of The Year Edition</pre>
        </div>
        <div className="flex items-center ">
            
        </div>
    </div>
}