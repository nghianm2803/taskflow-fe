import Card from "./Card";

function customizeComponents(theme) {
  return { ...Card(theme) };
}

export default customizeComponents;
