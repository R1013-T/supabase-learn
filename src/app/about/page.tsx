import { getItems } from "@/server/data/items";
import React from "react";

export default async function AboutPage() {
  const items = await getItems();

  return (
    <div className="p-6">
      <h1>AboutPage</h1>
      <div className="">
        {items.map((item) => (
          <div key={item.id} className="p-2">
            <p>
              <span>name: </span>
              {item.name}
              <span> / </span>
              <span>amount: </span>
              {item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
