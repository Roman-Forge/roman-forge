import { useFeatureFlagEnabled } from "posthog-js/react"
import { Link, Outlet } from '@tanstack/react-router';
import HeaderLogo from './HeaderLogo';
import Footer from './Footer';

export default function Layout() {
    const flagEnabled = useFeatureFlagEnabled('test-flag');
    if ((flagEnabled && window.location.origin === 'https://forge-5v1.pages.dev') || import.meta.env.VITE_FEATURE_LAUNCH === 'true' ) {
        return (
            <div className="font-lexend bg-[url('/web-background.png')] bg-cover relative overflow-x-hidden">
                <header className="bg-white">
                    <div className="border-b">
                        <div className="container mx-auto py-4 flex justify-between items-center">
                            <span>Lets forge a future together</span>
                            <div className='flex font-bold items-center'>
                                <div className="mr-8">contact@romanforge.dev</div>
                                <div className="mr-8">(517) 258-2462</div>
                                <Link className="bg-deepteal text-sand py-2 px-3" to="/contact">GET QUOTE</Link>
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <div className="flex container mx-auto justify-between items-center border-r py-3">
                            <Link to="/">
                                <HeaderLogo />
                            </Link>
                            <nav className="flex font-semibold justify-evenly w-1/3">
                                <Link to="/about">ABOUT</Link>
                                <Link to="/process">PROCESS</Link>
                                <Link to="/services">SERVICES</Link>
                                <Link to="/contact">CONTACT</Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="absolute -z-10 -top-72 translate-x-[500px]">
                    <img 
                        src="./logo-circle.png"
                        alt="Animated Roman Forge Logo"
                        className="animate-[spin_2000000ms_linear_infinite]"
                    />
                </div>
                <Outlet />
                <Footer /> 
            </div>
        );
    }

    return <Outlet />
}