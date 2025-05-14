import React from 'react';
import { 
    PaintBrushIcon, 
    CodeBracketIcon, 
    ShoppingCartIcon, 
    MagnifyingGlassIcon,
    DocumentTextIcon,
    SparklesIcon,
    WrenchScrewdriverIcon,
    BoltIcon,
    ChartBarIcon,
    CloudIcon
} from '@heroicons/react/24/outline';
import Footer from './Footer';

const iconMap = {
  PaintBrushIcon,
  CodeBracketIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  ChartBarIcon,
  CloudIcon,
};


export default function HomePage() {

    const services = [
        {
          name: "Website Design",
          description: "Custom, responsive designs tailored to your brand and audience.",
          icon: "PaintBrushIcon", // Heroicons: paint-brush
        },
        {
          name: "Web Development",
          description: "Modern, fast, and scalable websites built with the latest technologies.",
          icon: "CodeBracketIcon", // Heroicons: code-bracket
        },
        {
          name: "E-Commerce Solutions",
          description: "Online stores with secure payments and easy product management.",
          icon: "ShoppingCartIcon", // Heroicons: shopping-cart
        },
        {
          name: "SEO Optimization",
          description: "Improve your search engine ranking and online visibility.",
          icon: "MagnifyingGlassIcon", // Heroicons: magnifying-glass
        },
        {
          name: "Content Management",
          description: "Easy-to-use CMS for updating your site content anytime.",
          icon: "DocumentTextIcon", // Heroicons: document-text
        },
        {
          name: "Branding & Logo Design",
          description: "Professional branding and logo design to make your business stand out.",
          icon: "SparklesIcon", // Heroicons: sparkles
        },
        {
          name: "Website Maintenance",
          description: "Ongoing support, updates, and security monitoring.",
          icon: "WrenchScrewdriverIcon", // Heroicons: wrench-screwdriver
        },
        {
          name: "Performance Optimization",
          description: "Speed up your site for better user experience and SEO.",
          icon: "BoltIcon", // Heroicons: bolt
        },
        {
          name: "Analytics & Reporting",
          description: "Track your website’s performance and user behavior.",
          icon: "ChartBarIcon", // Heroicons: chart-bar
        },
        {
          name: "Hosting & Deployment",
          description: "Reliable and secure hosting with automated deployments.",
          icon: "CloudIcon", // Heroicons: cloud
        },
      ];

    const blogPosts = [
        {
          title: "The Power of Modern Web Design",
          description: "Explore how modern web design trends can elevate your business and engage your audience.",
          author: "Jane Doe",
          publishDate: "2024-05-10",
          image: "/images/blog/web-design.jpg"
        },
        {
          title: "Why Every Business Needs a CMS",
          description: "Discover the benefits of using a Content Management System for your website.",
          author: "John Smith",
          publishDate: "2024-04-28",
          image: "/images/blog/cms-benefits.jpg"
        },
        {
          title: "Boost Your Online Store with E-Commerce Best Practices",
          description: "Learn essential tips to optimize your e-commerce site for conversions and customer satisfaction.",
          author: "Emily Johnson",
          publishDate: "2024-03-15",
          image: "/images/blog/ecommerce-tips.jpg"
        },
        {
          title: "SEO Strategies for 2024: What You Need to Know",
          description: "Stay ahead of the curve with the latest SEO strategies and techniques for the coming year.",
          author: "Michael Lee",
          publishDate: "2024-02-20",
          image: "/images/blog/seo-2024.jpg"
        }
      ];

    return (
        <>
            <section className="flex container mx-auto py-8">
                <div className="w-1/2 mr-auto flex flex-col justify-center">
                    <h1 className="font-lexend text-6xl font-semibold mb-4">Let's forge a future together, thats last's</h1>
                    <p className="font-garamond text-3xl">Your one stop shop for all things web related. E-commerce, Headless CMS, AI Integration, and more.</p>
                </div>
                <div className="full lg:w-1/3 flex justify-center items-center">
                    <img className="h-[80%]" src="/roman-forge-r.png" alt="Roman Forge Hero Image"/>
                </div>
            </section>
            <section className="container mx-auto mb-32 py-6 bg-sand flex justify-center">
                <div className="mr-6 relative before:translate-y-16 before:rotate-3 before:content-[''] before:absolute before:bottom-0 before:right-0 before:bg-deepteal before:w-full before:h-full">
                    <img 
                        src="/roman-portrait.jpg" 
                        alt="AI image of Jacob Roman as a Roman Solider" 
                        className="w-96 translate-y-16"
                    />
                </div>
                <div className="translate-y-16 w-1/3 pl-10">
                    <h2 className="font-bold flex items-center mb-4">
                        <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="40" y1="1" y2="1" stroke="black"/>
                        </svg>
                        WHO WE ARE
                    </h2>
                    <h3 className="font-garamond text-5xl mb-6">Unveil art’s mysteries, embrace history, ignite imagination at Roman.</h3>
                    <p className="font-garamond text-md mb-10">Experience the captivating blend of art, history, and innovation at Roman museum.</p>
                    <h4 className="font-garamond text-3xl text-orange-900 font-semibold">Experience the captivating blend of art, history, and innovation at Roman museum.</h4>
                </div>
            </section>
            <section className="container mx-auto mb-20">
                <h2 className="font-bold flex items-center mb-4">
                    <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="40" y1="1" y2="1" stroke="black"/>
                    </svg>
                    WHAT WE DO
                </h2>
                <h3
                    className="font-garamond text-5xl mb-10"
                >
                    We are here for you
                </h3>
                <ul className="grid grid-cols-3 gap-4">
                    {services.map(service => (
                        <li key={service.name} className="bg-gray-100 group rounded p-5 border duration-300 ease-in-out overflow-hidden relative">
                            <div className="p-4 mb-8 bg-white rounded transform transition animate-fade-in inline-grid group-hover:opacity-10 group-hover:scale-[960%] group-hover:translate-x-48 relative group-hover:bg-deepteal">
                                {React.createElement(iconMap[service.icon as keyof typeof iconMap], { className: "w-6 h-6 group-hover:rotate-6 group-hover:scale-[100%] group-hover:stroke-white" })}
                            </div>
                            <h3 className="text-2xl group-hover:z-10 group-hover:relative">{service.name}</h3>
                            <h4 className="group-hover:z-10 group-hover:relative">{service.description}</h4>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="bg-deepteal">
                <div className="container mx-auto flex flex-row">
                    <div className="flex justify-center flex-col">
                        <h2 className="font-bold flex items-center mb-4 text-white">
                            <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="40" y1="1" y2="1" stroke="white"/>
                            </svg>
                            WHAT WE DO
                        </h2>
                        <h3 className="text-white font-lexend text-6xl font-semibold mb-8">Everything you need to deploy your app</h3>
                        <p className="text-sand font-garamond text-2xl font-semibold">Quis tellus eget adipiscing convallis sit sit eget aliquet quis.  Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In  mi viverra elit nunc.</p>   
                    </div>
                    <div className="px-24 py-20 w-2/3">
                        <img src="./roman-diagram.png" alt="Diagram of different tech that we use." />
                    </div>
                </div>
            </section>
            <section className="container mx-auto mt-36 mb-16">
                <h2 className="font-bold flex items-center mb-4">
                    <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="40" y1="1" y2="1" stroke="black"/>
                    </svg>
                    WHAT WE DO
                </h2>
                <h3
                    className="font-garamond text-5xl mb-10"
                >
                    We are here for you
                </h3>
                <div className="grid grid-cols-4 gap-6">
                    {blogPosts.map(blog => (
                       <a href="javascript:void(0)">
                       <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                         <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                           <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80" alt="card-image" />
                         </div>
                         <div className="p-4">
                           <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                             POPULAR
                           </div>
                           <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                             Website Review Check
                           </h6>
                           <p className="text-slate-600 leading-normal font-light">
                             The place is close to Barceloneta Beach and bus stop just 2 min by walk
                             and near to &quot;Naviglio&quot; where you can enjoy the main night life in
                             Barcelona.
                           </p>
                         </div>
                      
                         <div className="flex items-center justify-between p-4">
                           <div className="flex items-center">
                             <img
                               alt="Tania Andrew"
                               src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                               className="relative inline-block h-8 w-8 rounded-full"
                             />
                             <div className="flex flex-col ml-3 text-sm">
                               <span className="text-slate-800 font-semibold">Lewis Daniel</span>
                               <span className="text-slate-600">
                                 January 10, 2024
                               </span>
                             </div>
                           </div>
                         </div>
                       </div> 
                     </a> 
                    ))}
                </div>
            </section>
        </>
    )
}