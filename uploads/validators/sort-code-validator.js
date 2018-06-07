export default function(obj) {
  console.log(obj);
  return obj && obj.error ? "error" : undefined;
}
