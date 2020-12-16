const defaultImage = "https://images.unsplash.com/photo-1606772869385-901e6690c787?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1327&q=80";

export default function Hero({ children, image = defaultImage }) {
  return (
    <div
      className="flex hero w-full"
      style={{ "--hero-background": `url('${image}')` }}
    >
      {children}
    </div>
  );
}