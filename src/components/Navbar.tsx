export function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">EBSU Buy & Sell</h1>
        <div className="space-x-4">
          <a href="/" className="text-white hover:underline">Home</a>
          <a href="/marketplace" className="text-white hover:underline">Marketplace</a>
          <a href="/services" className="text-white hover:underline">Services</a>
          <a href="/jobs" className="text-white hover:underline">Jobs</a>
          <a href="/sell" className="text-white hover:underline">Sell</a>
          <a href="/contact" className="text-white hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}