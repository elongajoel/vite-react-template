import { useKanban } from "./context/KanbanContext";
import { useState } from "react";

function App() {
  const {
    colonnes,
    ajouterColonne,
    supprimerColonne,
    ajouterCarte,
    supprimerCarte,
  } = useKanban();
  const [nouvelleColonne, setNouvelleColonne] = useState("");
  const [nouvelleCarte, setNouvelleCarte] = useState<{ [colId: string]: string }>({});

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-neutral-800 tracking-tight">Mon Trello</h1>
      <div className="flex gap-8 overflow-x-auto pb-4">
        {colonnes.map((colonne) => (
          <div
            key={colonne.id}
            className="bg-neutral-50 rounded-2xl shadow-lg p-0 min-w-[340px] flex flex-col border border-neutral-200"
          >
            <div className="flex items-center justify-between px-5 py-4 rounded-t-2xl bg-neutral-100 border-b border-neutral-200">
              <h2 className="font-bold text-lg text-neutral-700 tracking-wide">{colonne.titre}</h2>
              <button
                className="text-neutral-400 hover:text-red-500 text-xl ml-2 transition-colors"
                title="Supprimer la colonne"
                onClick={() => supprimerColonne(colonne.id)}
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4 px-4 py-4">
              {colonne.cartes.map((carte) => (
                <div
                  key={carte.id}
                  className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 shadow-sm flex items-center justify-between hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="truncate pr-2">{carte.titre}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-red-500 ml-2 text-lg transition-opacity"
                    title="Supprimer la carte"
                    onClick={() => supprimerCarte(colonne.id, carte.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 px-4 pb-4 mt-auto"
              onSubmit={e => {
                e.preventDefault();
                if (nouvelleCarte[colonne.id]?.trim()) {
                  ajouterCarte(colonne.id, nouvelleCarte[colonne.id]);
                  setNouvelleCarte((prev) => ({ ...prev, [colonne.id]: "" }));
                }
              }}
            >
              <input
                type="text"
                className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Nouvelle carte..."
                value={nouvelleCarte[colonne.id] || ""}
                onChange={e => setNouvelleCarte((prev) => ({ ...prev, [colonne.id]: e.target.value }))}
              />
              <button
                type="submit"
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 text-sm font-medium transition"
              >
                <span className="text-lg">＋</span> Ajouter
              </button>
            </form>
          </div>
        ))}
        {/* Ajout colonne */}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (nouvelleColonne.trim()) {
              ajouterColonne(nouvelleColonne);
              setNouvelleColonne("");
            }
          }}
          className="min-w-[260px] flex flex-col justify-start bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-300 p-6 h-fit shadow-sm"
        >
          <input
            type="text"
            className="border border-neutral-200 rounded-lg px-3 py-2 mb-3 text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Nouvelle colonne..."
            value={nouvelleColonne}
            onChange={e => setNouvelleColonne(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 text-sm font-medium transition"
          >
            <span className="text-lg">＋</span> Ajouter colonne
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
