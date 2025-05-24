export default function Process() {
  const steps = [
    {
      number: 1,
      title: "Discovery & Planning",
      description:
        "We start by understanding your goals, target audience, and business needs. Our team collaborates with you to define the project scope, select the right tools (e.g., React, Node.js, or Payload CMS), and create a tailored roadmap for success.",
    },
    {
      number: 2,
      title: "Design & Prototyping",
      description:
        "Our designers craft custom, responsive layouts using HTML, CSS, and JavaScript, delivering prototypes for your feedback. Whether it’s a website, e-commerce store, or application, we ensure it aligns with your brand.",
    },
    {
      number: 3,
      title: "Development & Integration",
      description:
        "We build your solution with cutting-edge technologies like MySQL, MongoDB, and APIs, integrating features such as payment gateways, SEO optimization, or CMS platforms to create a seamless experience.",
    },
    {
      number: 4,
      title: "Testing & Optimization",
      description:
        "Rigorous testing ensures your site is fast, secure, and bug-free. We optimize performance, implement security measures, and fine-tune SEO to maximize visibility and user satisfaction.",
    },
    {
      number: 5,
      title: "Launch & Maintenance",
      description:
        "Your project goes live with a smooth deployment on platforms like Netlify or Vercel. We offer ongoing support with tiered plans (starting at $100/month) for updates, backups, and priority assistance.",
    },
  ];

  return (
    <>
      <section className="bg-deepteal">
        <div className="container mx-auto py-10">
          <h1 className="font-lexend text-5xl text-white font-semibold">
            Process
          </h1>
        </div>
      </section>
      <section className="container mx-auto bg-white">
        <div className="bg-[url('https://images.unsplash.com/photo-1523652477945-07d1377e0e50?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover h-44"></div>
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Process at Roman Forge
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From concept to launch and beyond, we deliver a streamlined
                process tailored to your web development needs. As your
                jack-of-all-trades web shop, we handle everything—design,
                development, SEO, and maintenance—with expertise and care.
              </p>
            </div>
            <div className="mt-16 flex flex-col gap-12 sm:gap-16">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col gap-4 sm:flex-row sm:items-start"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white sm:shrink-0">
                    <span className="text-xl font-semibold">{step.number}</span>
                  </div>
                  <div className="sm:flex-1">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
