import { createContext, useContext, useState, ReactNode } from "react";

export type Carte = {
  id: string;
  titre: string;
};

export type Colonne = {
  id: string;
  titre: string;
  cartes: Carte[];
};

export type KanbanContextType = {
  colonnes: Colonne[];
  ajouterColonne: (titre: string) => void;
  supprimerColonne: (colonneId: string) => void;
  ajouterCarte: (colonneId: string, titre: string) => void;
  supprimerCarte: (colonneId: string, carteId: string) => void;
  // Pour extension future : déplacer carte, éditer, etc.
};

const colonnesInitiales: Colonne[] = [
  {
    id: "1",
    titre: "À faire",
    cartes: [
      { id: "1-1", titre: "Créer la structure du projet" },
      { id: "1-2", titre: "Configurer Tailwind CSS" },
    ],
  },
  {
    id: "2",
    titre: "En cours",
    cartes: [
      { id: "2-1", titre: "Développer le composant Kanban" },
    ],
  },
  {
    id: "3",
    titre: "Terminé",
    cartes: [
      { id: "3-1", titre: "Initialiser le repo" },
    ],
  },
];

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban doit être utilisé dans KanbanProvider");
  return context;
};

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [colonnes, setColonnes] = useState<Colonne[]>(colonnesInitiales);

  const ajouterColonne = (titre: string) => {
    setColonnes((prev) => [
      ...prev,
      { id: Date.now().toString(), titre, cartes: [] },
    ]);
  };

  const supprimerColonne = (colonneId: string) => {
    setColonnes((prev) => prev.filter((col) => col.id !== colonneId));
  };

  const ajouterCarte = (colonneId: string, titre: string) => {
    setColonnes((prev) =>
      prev.map((col) =>
        col.id === colonneId
          ? {
              ...col,
              cartes: [
                ...col.cartes,
                { id: Date.now().toString(), titre },
              ],
            }
          : col
      )
    );
  };

  const supprimerCarte = (colonneId: string, carteId: string) => {
    setColonnes((prev) =>
      prev.map((col) =>
        col.id === colonneId
          ? {
              ...col,
              cartes: col.cartes.filter((c) => c.id !== carteId),
            }
          : col
      )
    );
  };

  return (
    <KanbanContext.Provider
      value={{ colonnes, ajouterColonne, supprimerColonne, ajouterCarte, supprimerCarte }}
    >
      {children}
    </KanbanContext.Provider>
  );
}; 