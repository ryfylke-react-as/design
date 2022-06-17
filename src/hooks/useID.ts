import { useState } from "react";
import { gid } from "../utils";

export function useID() {
  const [id] = useState(gid());
  return id;
}
