import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as api from '../api/kanban';

export type Carte = {
  id: string;
  titre: string;
  auteur: string;
  tag: string;
  date: string;
};

export type Colonne = {
  id: string;
  titre: string;
  couleur: string; // Couleur pastel pour l'en-tête
  cartes: Carte[];
};

export type KanbanContextType = {
  colonnes: Colonne[];
  ajouterColonne: (titre: string, couleur?: string) => void;
  supprimerColonne: (colonneId: string) => void;
  ajouterCarte: (colonneId: string, titre: string, auteur?: string, tag?: string, date?: string) => void;
  supprimerCarte: (colonneId: string, carteId: string) => void;
  // Pour extension future : déplacer carte, éditer, etc.
};

const colonnesInitiales: Colonne[] = [
  {
    id: "1",
    titre: "In development",
    couleur: "bg-blue-100 text-blue-700",
    cartes: [
      {
        id: "1-1",
        titre: "Finalize visuals for feature",
        auteur: "Nate Martins",
        tag: "Design",
        date: "December 24, 2022",
      },
      {
        id: "1-2",
        titre: "Create visuals for feature",
        auteur: "Ben Lang",
        tag: "Design",
        date: "December 24, 2022",
      },
      {
        id: "1-3",
        titre: "User feedback on feature",
        auteur: "Ben Lang",
        tag: "Design",
        date: "December 24, 2022",
      },
    ],
  },
  {
    id: "2",
    titre: "Testing",
    couleur: "bg-pink-100 text-pink-700",
    cartes: [
      // Vide pour l'exemple
    ],
  },
  {
    id: "3",
    titre: "Reviewing",
    couleur: "bg-violet-100 text-violet-700",
    cartes: [
      {
        id: "3-1",
        titre: "Create iconography for feature",
        auteur: "Sohrab Amin",
        tag: "Design",
        date: "December 22, 2022",
      },
      {
        id: "3-2",
        titre: "User testing of feature",
        auteur: "Sohrab Amin",
        tag: "Design",
        date: "December 22, 2022",
      },
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
  const [colonnes, setColonnes] = useState<Colonne[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial depuis le backend
  useEffect(() => {
    api.getKanban()
      .then((data) => setColonnes(data))
      .catch(() => setColonnes(colonnesInitiales)) // fallback local si erreur
      .finally(() => setLoading(false));
  }, []);

  const ajouterColonne = async (titre: string, couleur = "bg-gray-100 text-gray-700") => {
    try {
      const newCol = await api.addColumn(titre, couleur);
      setColonnes((prev) => [...prev, newCol]);
    } catch {
      // fallback local
      setColonnes((prev) => [...prev, { id: Date.now().toString(), titre, couleur, cartes: [] }]);
    }
  };

  const supprimerColonne = async (colonneId: string) => {
    try {
      await api.deleteColumn(colonneId);
      setColonnes((prev) => prev.filter((col) => col.id !== colonneId));
    } catch {
      setColonnes((prev) => prev.filter((col) => col.id !== colonneId));
    }
  };

  const ajouterCarte = async (
    colonneId: string,
    titre: string,
    auteur = "Auteur inconnu",
    tag = "Design",
    date = new Date().toLocaleDateString()
  ) => {
    try {
      const newCard = await api.addCard(colonneId, titre, auteur, tag, date);
      setColonnes((prev) =>
        prev.map((col) =>
          col.id === colonneId
            ? { ...col, cartes: [...col.cartes, newCard] }
            : col
        )
      );
    } catch {
      setColonnes((prev) =>
        prev.map((col) =>
          col.id === colonneId
            ? {
                ...col,
                cartes: [
                  ...col.cartes,
                  { id: Date.now().toString(), titre, auteur, tag, date },
                ],
              }
            : col
        )
      );
    }
  };

  const supprimerCarte = async (colonneId: string, carteId: string) => {
    try {
      await api.deleteCard(carteId);
      setColonnes((prev) =>
        prev.map((col) =>
          col.id === colonneId
            ? { ...col, cartes: col.cartes.filter((c) => c.id !== carteId) }
            : col
        )
      );
    } catch {
      setColonnes((prev) =>
        prev.map((col) =>
          col.id === colonneId
            ? { ...col, cartes: col.cartes.filter((c) => c.id !== carteId) }
            : col
        )
      );
    }
  };

  if (loading) return <div className="text-center p-8 text-lg">Chargement du Kanban...</div>;

  return (
    <KanbanContext.Provider
      value={{ colonnes, ajouterColonne, supprimerColonne, ajouterCarte, supprimerCarte }}
    >
      {children}
    </KanbanContext.Provider>
  );
}; 