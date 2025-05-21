import { Link } from "@tanstack/react-router";


export default function About() {

  const values = [
    {
      name: "Innovation",
      description: "We pioneer cutting-edge web technologies, leveraging tools like React, Node.js, and GraphQL to deliver forward-thinking solutions that keep your business ahead of the curve.",
      icon: "CodeBracketIcon",
    },
    {
      name: "Reliability",
      description: "We ensure your website is always secure, up-to-date, and performing optimally with 24/7 maintenance, advanced security monitoring, and robust hosting services tailored to your needs.",
      icon: "WrenchScrewdriverIcon",
    },
    {
      name: "Scalability",
      description: "Our solutions are built to grow with you, from startup websites to enterprise-grade applications, using scalable architectures and cloud deployment strategies for long-term success.",
      icon: "CloudIcon",
    },
    {
      name: "Performance",
      description: "We optimize every aspect of your site, reducing load times and enhancing user experience with techniques like Incremental Static Regeneration and performance tuning for maximum efficiency.",
      icon: "BoltIcon",
    },
    {
      name: "Creativity",
      description: "Our team brings fresh, creative perspectives to every project, designing custom branding, logos, and content that make your business stand out in a crowded digital landscape.",
      icon: "LightBulbIcon",
    },
    {
      name: "Collaboration",
      description: "We work closely with you, offering mentorship and team leadership to align our solutions with your vision, ensuring a partnership that drives mutual success.",
      icon: "UsersIcon",
    },
  ];

    return (
        <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
          </svg>
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    About Roman Forge
                  </h1>
                  <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                  At Roman Forge, we are your all-in-one web development partner, forging digital solutions that stand the test of time. Led by Jacob Roman, a seasoned Senior Digital Engineer, our mission is to empower businesses with stunning websites, robust e-commerce platforms, and seamless integrations—covering every aspect of your online presence.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src="/anvil.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src="/building.webp"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="/coffee.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src="/dev-computer.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="/forge.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
            <section className="flex justify-center bg-sand">
                <div className="flex flex-col justify-center container mx-60 py-20">
                    <h2 className="font-bold flex items-center mb-4 text-deepteal">
                        <svg className="mr-2" width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="40" y1="1" y2="1" stroke="black"/>
                        </svg>
                        OUR MISSION
                    </h2>
                    <p className="font-garamond text-xl mb-10">We believe every business deserves a digital edge. Whether you're a startup launching your first site or an established company enhancing your online store, Roman Forge delivers tailored, high-quality web solutions. With expertise in modern frameworks like React and Node.js, we tackle everything from design to deployment, ensuring your success in a competitive digital landscape.</p>
                    <h4 className="font-garamond text-3xl text-orange-900 font-semibold">Partner with us to forge a digital future that lasts!</h4>
                </div>
            </section>

        {/* Values section */}
        <div className="mx-auto mt-32 mb-20 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-deepteal sm:text-5xl">Our values</h2>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

    

        </main>
    );
}