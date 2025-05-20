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
          name: "Website Design & Development",
          description: "Transform your vision into stunning, responsive websites tailored to your business needs with cutting-edge design and development.",
          icon: "PaintBrushIcon",
        },
        {
          name: "Web Development",
          description: "Build fast, scalable, and modern websites using advanced technologies like React, Node.js, and more to power your online presence.",
          icon: "CodeBracketIcon",
        },
        {
          name: "E-Commerce Solutions",
          description: "Launch a powerful online store with secure payment gateways, product management, and custom designs to boost your sales.",
          icon: "ShoppingCartIcon",
        },
        {
          name: "SEO & Optimization",
          description: "Skyrocket your search engine rankings and attract more customers with expert SEO and performance optimization services.",
          icon: "MagnifyingGlassIcon",
        },
        {
          name: "Content Management",
          description: "Take control of your website with intuitive CMS solutions, including content creation, logos, and social media graphics.",
          icon: "DocumentTextIcon",
        },
        {
          name: "Branding & Creative Services",
          description: "Stand out with professional branding, logo design, and creative content to elevate your brand identity.",
          icon: "SparklesIcon",
        },
        {
          name: "Ongoing Maintenance",
          description: "Ensure your site runs smoothly with 24/7 support, updates, and security monitoring tailored to your needs.",
          icon: "WrenchScrewdriverIcon",
        },
        {
          name: "Performance Boost",
          description: "Enhance user experience and SEO with lightning-fast load times and comprehensive performance tuning.",
          icon: "BoltIcon",
        },
        {
          name: "Hosting & Deployment",
          description: "Reliable, secure hosting and seamless deployment with top-tier platforms to keep your site online and accessible.",
          icon: "CloudIcon",
        },
    ];

    const blogPosts = [
        {
          id: 23432345,
          title: "Mastering Modern Web Design for Business Growth",
          description: "Unlock the secrets to captivating web designs that drive engagement and boost your brand’s success.",
          author: { 
            name: "Jacob Roman",
            href: "/jacob-roman",
            imageUrl: "/roman-portrait.jpg",
            role: "CEO & Senior Digital Engineer",
          },
          category: {
            href: "/web-design",
            title: "Web Design",
          },
          date: "05/15/2025",
          datetime: "2025-05-15",
          href: '/blog/mastering-modern-web-design',
          image: "/images/blog/modern-web-design.jpg"
        },
        {
          id: 34323245,
          title: "Why Your Business Needs a CMS Today",
          description: "Learn how a CMS can streamline your website updates and enhance your online presence with ease.",
          author: {
            name: "Jacob Roman",
            href: "/jacob-roman",
            imageUrl: "/roman-portrait.jpg",
            role: "CEO & Senior Digital Engineer"
          },
          category: {
            href: '/cms',
            title: "CMS"
          },
          date: "05/10/2025",
          datetime: "2025-05-10",
          href: "/blog/why-cms",
          image: "/images/blog/cms-benefits.jpg"
        },
        {
          id: 34235,
          title: "E-Commerce Success: Top Strategies for 2025",
          description: "Discover proven tactics to optimize your online store and maximize conversions this year.",
          author: {
            name: "Jacob Roman",
            href: "/jacob-roman",
            imageUrl: "/roman-portrait.jpg",
            role: "CEO & Senior Digital Engineer"
          },
          category: {
            href: '/ecommerce',
            title: "E-Commerce"
          },
          date: '05/01/2025',
          datetime: "2025-05-01",
          href: "/blog/ecommerce-strategies",
          image: "/images/blog/ecommerce-tips.jpg"
        },
        {
          id: 98765432,
          title: "Boost SEO with These Expert Tips",
          description: "Elevate your site’s visibility with actionable SEO strategies tailored for today’s market.",
          author: {
            name: "Jacob Roman",
            href: "/jacob-roman",
            imageUrl: "/roman-portrait.jpg",
            role: "CEO & Senior Digital Engineer"
          },
          category: {
            href: '/seo',
            title: "SEO"
          },
          date: "04/25/2025",
          datetime: "2025-04-25",
          href: "/blog/boost-seo",
          image: "/images/blog/seo-tips.jpg"
        },
    ];

    return (
        <>
            <section className="flex container mx-auto py-8">
                <div className="w-1/2 mr-auto flex flex-col justify-center">
                    <h1 className="font-lexend text-6xl font-semibold mb-4">Welcome to Roman Forge – Your Web Experts!</h1>
                    <p className="font-garamond text-3xl">The ultimate web development agency for all your digital needs – from stunning websites to e-commerce, SEO, and beyond. We’re your jack-of-all-trades web shop!</p>
                </div>
                <div className="full lg:w-1/3 flex justify-center items-center">
                    <img className="h-[80%]" src="/roman-forge-r.png" alt="Roman Forge High-Tech Header Image"/>
                </div>
            </section>
            <section className="container mx-auto mb-32 py-6 bg-sand flex justify-center">
                <div className="mr-6 relative before:translate-y-16 before:rotate-3 before:content-[''] before:absolute before:bottom-0 before:right-0 before:bg-deepteal before:w-full before:h-full">
                    <img 
                        src="/roman-portrait.jpg" 
                        alt="Jacob Roman, CEO of Roman Forge" 
                        className="w-96 translate-y-16"
                    />
                </div>
                <div className="translate-y-16 w-1/3 pl-10">
                    <h2 className="font-bold flex items-center mb-4">
                        <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="40" y1="1" y2="1" stroke="black"/>
                        </svg>
                        ABOUT US
                    </h2>
                    <h3 className="font-garamond text-5xl mb-6">Meet Roman Forge – Your Digital Architects</h3>
                    <p className="font-garamond text-md mb-10">Led by Jacob Roman, a seasoned Senior Digital Engineer with over 8 years of experience, Roman Forge blends innovation with expertise to deliver top-tier web solutions. From startups to established businesses, we’ve got you covered!</p>
                    <h4 className="font-garamond text-3xl text-orange-900 font-semibold">Partner with us to forge a digital future that lasts!</h4>
                </div>
            </section>
            <section className="container mx-auto mb-20">
                <h2 className="font-bold flex items-center mb-4">
                    <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="40" y1="1" y2="1" stroke="black"/>
                    </svg>
                    OUR SERVICES
                </h2>
                <h3
                    className="font-garamond text-5xl mb-10"
                >
                    Your One-Stop Web Solution
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
            <section>
            <section className="p-20">
              <div className="px-4 md:px-6 max-w-6xl mx-auto">
                <div>
                  <div x-data="{ activeTab: 1 }">
                    <div className="flex justify-center items-center h-[324px] relative">
                      <div className="-z-10 absolute">
                        <svg
                          className="fill-deepteal"
                          xmlns="http://www.w3.org/2000/svg"
                          width={164}
                          height={41}
                          viewBox="0 0 164 41"
                          fill="none"
                        >
                          <circle cx={1} cy={8} r={1} fillOpacity="0.24" />
                          <circle cx={1} cy={1} r={1} fillOpacity="0.16" />
                          <circle cx={1} cy={15} r={1} />
                          <circle cx={1} cy={26} r={1} fillOpacity="0.64" />
                          <circle cx={1} cy={33} r={1} fillOpacity="0.24" />
                          <circle cx={8} cy={8} r={1} />
                          <circle cx={8} cy={15} r={1} />
                          <circle cx={8} cy={26} r={1} fillOpacity="0.24" />
                          <circle cx={15} cy={15} r={1} fillOpacity="0.64" />
                          <circle cx={15} cy={26} r={1} fillOpacity="0.16" />
                          <circle cx={8} cy={33} r={1} />
                          <circle cx={1} cy={40} r={1} />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 164 7)"
                            fillOpacity="0.24"
                          />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 164 0)"
                            fillOpacity="0.16"
                          />
                          <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 14)" />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 164 25)"
                            fillOpacity="0.64"
                          />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 164 32)"
                            fillOpacity="0.24"
                          />
                          <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 7)" />
                          <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 14)" />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 157 25)"
                            fillOpacity="0.24"
                          />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 150 14)"
                            fillOpacity="0.64"
                          />
                          <circle
                            cx={1}
                            cy={1}
                            r={1}
                            transform="matrix(-1 0 0 1 150 25)"
                            fillOpacity="0.16"
                          />
                          <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 32)" />
                          <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 39)" />
                        </svg>
                      </div>
                      <div className="-z-10 absolute">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={432}
                          height={160}
                          viewBox="0 0 432 160"
                          fill="none"
                        >
                          <g opacity="0.6" filter="url(#filter0_f_2044_9)">
                            <path
                              className="fill-deepteal"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_f_2044_9"
                              x={0}
                              y={0}
                              width={432}
                              height={160}
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood floodOpacity={0} result="BackgroundImageFix" />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                              />
                              <feGaussianBlur
                                stdDeviation={32}
                                result="effect1_foregroundBlur_2044_9"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <div className="absolute left-0 right-0 top-0 -z-10 h-[1px] mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <div className="absolute left-0 right-0 bottom-0 -z-10 h-[1px] mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] -z-10 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <div className="absolute left-0 right-0 top-1/2 -z-10 h-[1px] mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent transform -translate-y-20" />
                      <div className="absolute left-0 right-0 top-1/2 -z-10 h-[1px] mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent transform translate-y-20" />
                      <div className="absolute left-0 right-0 top-1/2 -z-10 h-[1px] rotate-20 mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <div className="absolute left-0 right-0 top-1/2 -z-10 h-[1px] -rotate-20 mix-blend-multiply bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <div className="absolute top-0 bottom-0 left-1/2 -z-10 w-[1px] -translate-x-52 mix-blend-multiply bg-gradient-to-b from-slate-300 via-slate-300 to-transparent" />
                      <div className="absolute top-0 bottom-0 left-1/2 -z-10 w-[1px] translate-x-52 mix-blend-multiply bg-gradient-to-t from-slate-300 via-slate-300 to-transparent" />
                      <div className="absolute before:content-[''] before:absolute before:-inset-3 before:animate-spin-slow before:rounded-full before:border before:border-transparent center-logo">
                        <div className="animate-breath-6s-2s">
                          <div className="flex h-24 w-24 justify-center items-center rounded-full bg-white shadow-sm before:absolute before:content-[''] before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                            <img
                              className="relative"
                              src="./images/logo-01.svg"
                              width={78}
                              height={78}
                              alt="Logo 01"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full h-full justify-center items-center">
                        <div className="absolute -translate-x-32">
                          <div className="animate-breath-6s-1.5s">
                            <div className="flex w-16 h-16 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-02.svg"
                                width={23}
                                height={22}
                                alt="Logo 02"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute translate-x-32">
                          <div className="animate-breath-6s-1.5s">
                            <div className="flex w-16 h-16 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-03.svg"
                                width={22}
                                height={22}
                                alt="Logo 03"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute -translate-x-52 -translate-y-20">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-20 h-20 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-04.svg"
                                width={24}
                                height={22}
                                alt="Logo 04"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute translate-x-52 -translate-y-20">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-20 h-20 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-05.svg"
                                width={25}
                                height={25}
                                alt="Logo 05"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute translate-x-52 translate-y-20">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-20 h-20 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-06.svg"
                                width={20}
                                height={18}
                                alt="Logo 06"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute -translate-x-52 translate-y-20">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-20 h-20 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:m-[8.334%] before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-07.svg"
                                width={25}
                                height={25}
                                alt="Logo 07"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute opacity-40 -translate-x-72">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-12 h-12 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-08.svg"
                                width={20}
                                height={20}
                                alt="Logo 08"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute opacity-40 translate-x-72">
                          <div className="animate-breath-6s-2s">
                            <div className="flex w-12 h-12 justify-center items-center rounded-full bg-white shadow-sm before:content-[''] before:absolute before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:to-slate-50 before:border before:inset-0">
                              <img
                                className="relative"
                                src="./images/logo-09.svg"
                                width={21}
                                height={13}
                                alt="Logo 09"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            </section>
            <section className="bg-deepteal">
                <div className="container mx-auto flex flex-row">
                    <div className="flex justify-center flex-col">
                        <h2 className="font-bold flex items-center mb-4 text-white">
                            <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="40" y1="1" y2="1" stroke="white"/>
                            </svg>
                            OUR TECHNOLOGY
                        </h2>
                        <h3 className="text-white font-lexend text-6xl font-semibold mb-8">Cutting-Edge Tools for Your Success</h3>
                        <p className="text-sand font-garamond text-2xl font-semibold">Leverage the power of React, Node.js, GraphQL, and more to create a seamless digital experience tailored to your goals.</p>   
                    </div>
                    <div className="px-24 py-20 w-2/3">
                        <img src="./dev-computer.png" alt="icon of development computer" />
                    </div>
                </div>
            </section>
            <section className="container mx-auto mt-36 mb-16">
                <h2 className="font-bold flex items-center mb-4">
                    <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="40" y1="1" y2="1" stroke="black"/>
                    </svg>
                    LATEST INSIGHTS
                </h2>
                <h3
                    className="font-garamond text-5xl mb-10"
                >
                    Stay Ahead with Our Blog
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