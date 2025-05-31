// web/src/components/ServiceCard.tsx
import React from "react";

export default function ServiceCard({
  title,
  price,
  details,
  features,
  icon: Icon,
}: {
  title: string;
  price: string;
  details: string;
  features: { name: string; description: string; icon: any }[];
  icon: any;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition">
      <div className="flex items-center gap-3">
        <Icon className="h-8 w-8 text-deepteal" />
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="text-lg font-semibold text-deepteal">{price}</div>
      <div className="text-gray-600">{details}</div>
      <ul className="mt-2 space-y-2">
        {features.map((feature) => (
          <li key={feature.name} className="flex items-start gap-2">
            <feature.icon className="h-5 w-5 text-indigo-500 mt-1" />
            <span>
              <span className="font-semibold">{feature.name}:</span>{" "}
              {feature.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}