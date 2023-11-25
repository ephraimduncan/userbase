"use client";

import React, { useState } from "react";
import { Button } from "@userbase/ui/primitives/button";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button onClick={() => setCount(() => count + 1)}>Counter {count}</Button>
    </div>
  );
}
