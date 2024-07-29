import { hasJsonFile } from "commonality-checks-recommended";

export default hasJsonFile("package.json", {
  type: "module",
});
