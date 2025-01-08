import DataTable from "@/components/Data-table";
import TabSwitch from "@/components/TabSwitch";
import ImageEditor from "@/components/Image-editor";
import { useState } from "react";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"table" | "imageEditor">(
    "table"
  );
  return (
    <div className="w-full min-h-screen p-4 bg-gray-950 text-gray-100 overflow-x-hidden">
      <main className="container mx-auto">
        <TabSwitch select={currentTab} onSelect={setCurrentTab} />
        <div>
          {currentTab === "table" && <DataTable />}
          {currentTab === "imageEditor" && <ImageEditor />}
        </div>
      </main>
    </div>
  );
};

export default App;
