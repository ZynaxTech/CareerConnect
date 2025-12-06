const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Zynax Tech</h1>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to Zynax Tech</h2>
        <p>
          This is the main content area. You can add as much content as you want
          here.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
          semper nulla, sit amet tincidunt justo. Integer ut lorem ac metus
          efficitur fermentum.
        </p>
        <p>
          Add more content here to test scrolling behavior. The footer will
          always stay at the bottom of the page.
        </p>
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
        <p className="text-center">
          &copy; 2025 Zynax Tech. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
