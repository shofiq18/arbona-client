import AdminLogin from "@/Features/login/page";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl text-blue-300">Main Dashboard</h1>
      <AdminLogin />
    </div>
  );
}
