"use client";
import { useState } from "react";

export default function CBMCalculator() {
  const [length, setLength] = useState<number | string>("");
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [qty, setQty] = useState<number | string>(1);

  const calculateCBM = () => {
    if (!length || !width || !height || !qty) return 0;

    const cbm =
      (Number(length) * Number(width) * Number(height) * Number(qty)) /
      1000000;

    return cbm.toFixed(3);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">📦 CBM Calculator</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-medium text-sm">Length (cm)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 50"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Width (cm)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 40"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 30"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Quantity</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="1"
            min={1}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-md text-center">
        <p className="text-lg font-semibold">
          Total CBM:{" "}
          <span className="text-blue-600">{calculateCBM()} m³</span>
        </p>
      </div>
    </div>
  );
}