import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  PaintBrushIcon,
  ShoppingCartIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

const websiteDesignFeatures = [
  {
    name: "Responsive Design",
    description:
      "We create mobile-friendly websites using HTML, CSS, and JavaScript, ensuring a seamless experience across all devices.",
    icon: PaintBrushIcon,
  },
  {
    name: "Custom Styling",
    description:
      "Our team delivers tailored designs with frameworks like React, perfectly aligned with your brand identity.",
    icon: SparklesIcon,
  },
  {
    name: "Basic SEO Setup",
    description:
      "Every site includes foundational SEO to improve visibility, with options for advanced optimization.",
    icon: MagnifyingGlassIcon,
  },
];

const ecommerceFeatures = [
  {
    name: "Payment Gateways",
    description:
      "Securely integrate payment solutions to enable smooth transactions for your customers.",
    icon: ShoppingCartIcon,
  },
  {
    name: "Product Listings",
    description:
      "Easily manage and display your products with custom layouts and intuitive navigation.",
    icon: DocumentTextIcon,
  },
  {
    name: "Custom Admin Panel",
    description:
      "Take control with a tailored admin interface to manage your store efficiently.",
    icon: CodeBracketIcon,
  },
];

const webAppFeatures = [
  {
    name: "Scalable Architecture",
    description:
      "We build apps using Node.js and Python, designed to handle growth and complex functionalities.",
    icon: ServerIcon,
  },
  {
    name: "Database Integration",
    description:
      "Leverage MySQL, PostgreSQL, or MongoDB for robust data management and performance.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Custom Features",
    description:
      "Get bespoke functionalities tailored to your business needs, from APIs to user workflows.",
    icon: CodeBracketIcon,
  },
];

const maintenanceFeatures = [
  {
    name: "Tiered Support Plans",
    description:
      "Choose from Basic, Standard, or Premium plans, starting at $100/month, with priority support options.",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Regular Updates",
    description:
      "Keep your site secure with software and plugin updates, included in all maintenance tiers.",
    icon: LockClosedIcon,
  },
  {
    name: "Performance Monitoring",
    description:
      "Ensure uptime and speed with full monitoring, available in our Premium plan.",
    icon: ServerIcon,
  },
];

const seoFeatures = [
  {
    name: "Keyword Optimization",
    description:
      "We target relevant keywords to boost your site’s ranking on search engines like Google.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Site Speed Enhancements",
    description:
      "Improve load times for better user experience and higher search engine rankings.",
    icon: SparklesIcon,
  },
  {
    name: "Analytics Integration",
    description:
      "Track performance with tools like Google Analytics to refine your SEO strategy.",
    icon: DocumentTextIcon,
  },
];

const integrationsFeatures = [
  {
    name: "API Connections",
    description:
      "Seamlessly connect your site to third-party services for enhanced functionality.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "CMS Integration",
    description:
      "Integrate with platforms like Payload or Sanity for easy content management.",
    icon: DocumentTextIcon,
  },
  {
    name: "Custom Workflows",
    description:
      "Automate processes with integrations tailored to your business operations.",
    icon: CodeBracketIcon,
  },
];

const contentCreationFeatures = [
  {
    name: "Logo Design",
    description:
      "Get a professional logo that reflects your brand identity and vision.",
    icon: PaintBrushIcon,
  },
  {
    name: "Blog Posts",
    description:
      "Engage your audience with high-quality, SEO-optimized blog content.",
    icon: DocumentTextIcon,
  },
  {
    name: "Social Media Graphics",
    description:
      "Boost your social presence with custom graphics for platforms like Instagram and Facebook.",
    icon: SparklesIcon,
  },
];

export default function Services() {
  return (
    <>
      <section className="bg-deepteal">
        <div className="container mx-auto py-10">
          <h1 className="font-lexend text-5xl text-white font-semibold">
            Services
          </h1>
        </div>
      </section>
      <div className="bg-white container mx-auto">
        <section>
          <div className="bg-[url('https://images.unsplash.com/photo-1523652477945-07d1377e0e50?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover h-44"></div>
          <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Creative Web Solutions
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Website Design and Development
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      We craft custom, responsive websites for small businesses,
                      startups, and individuals using HTML, CSS, JavaScript, and
                      frameworks like React, tailored to your unique vision.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {websiteDesignFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="Website design screenshot"
                        src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4 order-2">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Online Selling Made Simple
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      E-commerce Solutions
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Build a thriving online store with product listings,
                      secure payment gateways, custom admin panels, and SEO,
                      designed to meet the needs of your business.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {ecommerceFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="E-commerce platform screenshot"
                        src="https://images.unsplash.com/photo-1742837581522-111d23b69a04?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Tailored Applications
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Web Application Development
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Develop complex, custom web applications with Node.js,
                      Python, and databases like MySQL or MongoDB, designed to
                      meet your unique business requirements.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {webAppFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="Web application screenshot"
                        src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4 order-2">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Ongoing Care
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Website Maintenance and Support
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Keep your site running smoothly with our tiered
                      maintenance plans, offering backups, updates, and priority
                      support from $100/month.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {maintenanceFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="Maintenance dashboard screenshot"
                        src="https://images.unsplash.com/photo-1699413209298-4e2abf5bd991?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Rank Higher
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Search Engine Optimization (SEO)
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Boost your online visibility with expert SEO services,
                      optimizing your site for search engines and improving
                      performance for better rankings.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {seoFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="SEO analytics screenshot"
                        src="https://images.unsplash.com/photo-1686061593213-98dad7c599b9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4 order-2">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Seamless Connections
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Website Integrations
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Enhance your website with seamless integrations using APIs
                      and tools, connecting your site to third-party services
                      for a unified experience.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {integrationsFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="Integration dashboard screenshot"
                        src="https://images.unsplash.com/photo-1644325349124-d1756b79dd42?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                      Creative Assets
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Content Creation
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Elevate your brand with professional content creation,
                      including logos, blog posts, and social media graphics
                      designed to engage your audience.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {contentCreationFeatures.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              aria-hidden="true"
                              className="absolute left-1 top-1 size-5 text-indigo-600"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                  <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-y-px -left-3 -z-10 w/full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <img
                        alt="Content creation portfolio screenshot"
                        src="https://images.unsplash.com/photo-1729710877242-6305c22c18b8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={2432}
                        height={1442}
                        className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
