// Fonctions d'API pour le Kanban (exemple d'intégration backend Node.js)
// Remplacez l'URL par celle de votre backend
const API_URL = 'http://localhost:3000/kanban';

export async function getKanban() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors du chargement du Kanban');
  return res.json();
}

export async function addColumn(titre: string, couleur: string) {
  const res = await fetch(`${API_URL}/columns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titre, couleur }),
  });
  if (!res.ok) throw new Error('Erreur lors de l\'ajout de colonne');
  return res.json();
}

export async function deleteColumn(colonneId: string) {
  const res = await fetch(`${API_URL}/columns/${colonneId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression de colonne');
  return res.json();
}

export async function addCard(colonneId: string, titre: string, auteur: string, tag: string, date: string) {
  const res = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ colonneId, titre, auteur, tag, date }),
  });
  if (!res.ok) throw new Error('Erreur lors de l\'ajout de carte');
  return res.json();
}

export async function deleteCard(carteId: string) {
  const res = await fetch(`${API_URL}/cards/${carteId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression de carte');
  return res.json();
} 