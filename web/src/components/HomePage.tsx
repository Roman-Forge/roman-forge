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
          name: "Hosting & Deployment",
          description: "Reliable and secure hosting with automated deployments.",
          icon: "CloudIcon", // Heroicons: cloud
        },
      ];

    const blogPosts = [
        {
          id: 23432345,
          title: "The Power of Modern Web Design",
          description: "Explore how modern web design trends can elevate your business and engage your audience.",
          author: { 
            name: "Jane Doe",
            href: "/jane-doe",
            imageUrl: "/image.png",
            role: "boss",
          },
          category: {
            href: "/category",
            title: "Category",
          },
          date: "05/10/2024",
          datetime: "2024-05-10",
          href: '/link',
          image: "/images/blog/web-design.jpg"
        },
        {
          id: 34323245,
          title: "Why Every Business Needs a CMS",
          description: "Discover the benefits of using a Content Management System for your website.",
          author: {
            name: "John Smith",
            href: "/john-smith",
            imageUrl: "/image.png",
            role: "boss"
          },
          category: {
            href: '/category',
            title: "Category"
          },
          date: "04/28/2024",
          datetime: "2024-04-28",
          href: "/link",
          image: "/images/blog/cms-benefits.jpg"
        },
        {
          id: 34235,
          title: "Boost Your Online Store with E-Commerce Best Practices",
          description: "Learn essential tips to optimize your e-commerce site for conversions and customer satisfaction.",
          author: {
            name: "Emily Johnson",
            href: "/emily-johnson",
            imageUrl: "/image.png",
            role: "boss"
          },
          category: {
            href: '/category',
            title: "Category"
          },
          date: '03/15/2024',
          datetime: "2024-03-15",
          href: "/link",
          image: "/images/blog/ecommerce-tips.jpg"
        },
 {
          id: 34323245,
          title: "Why Every Business Needs a CMS",
          description: "Discover the benefits of using a Content Management System for your website.",
          author: {
            name: "John Smith",
            href: "/john-smith",
            imageUrl: "/image.png",
            role: "boss"
          },
          category: {
            href: '/category',
            title: "Category"
          },
          date: "04/28/2024",
          datetime: "2024-04-28",
          href: "/link",
          image: "/images/blog/cms-benefits.jpg"
        },
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
                {blogPosts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))} 
                </div>
            </section>
        </>
    )
}