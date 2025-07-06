import { useKanban } from "./context/KanbanContext";

function App() {
  const { colonnes } = useKanban();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Mon Trello</h1>
      <div className="flex gap-6 overflow-x-auto">
        {colonnes.map((colonne) => (
          <div
            key={colonne.id}
            className="bg-white rounded-lg shadow-md p-4 min-w-[280px] flex flex-col"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">{colonne.titre}</h2>
            <div className="flex flex-col gap-3">
              {colonne.cartes.map((carte) => (
                <div
                  key={carte.id}
                  className="bg-blue-50 border border-blue-200 rounded p-3 text-gray-800 shadow-sm hover:bg-blue-100 transition"
                >
                  {carte.titre}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
