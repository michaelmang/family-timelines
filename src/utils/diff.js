export default function diff(setA, setB) {
  return [...setB].filter(x => !setA.has(x));
}