const GreenBackgroundSection = () => {
  return (
    <div 
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyMmM1NWUiLz48cGF0aCBkPSJNMCAxMDgwSDk2MEw5NjAgNTQwSDEwODBIMTA4MFYxMDgwSDE5MjBWMEg5NjBWNTQwSDkwMFY0MDBIMTMyMFY2MDBIMTkwMFYxMDgwWiIgZmlsbD0iIzE2YTM0YSIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Thousands of Homeowners Switching to Smarter, Safer Lawn Care
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Transform your lawn with BioGrowth Organics' science-backed, family-safe approach to lawn care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreenBackgroundSection;