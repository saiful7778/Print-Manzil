import DataTable from "@/components/Data-table";

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-4 bg-gray-950 text-gray-100 overflow-x-hidden">
      <main className="container mx-auto">
        <DataTable />
      </main>
    </div>
  );
};

export default App;
