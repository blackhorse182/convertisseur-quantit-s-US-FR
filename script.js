// Table de conversion entre différentes unités
const conversionTable = {
  cup: { gram: 240, ounce: 8.0, teaspoon: 48 },
  gram: { cup: 1 / 240, ounce: 0.0353, teaspoon: 0.2 },
  ounce: { cup: 0.125, gram: 28.35, teaspoon: 6 },
  teaspoon: { cup: 1 / 48, gram: 5, ounce: 0.167 },
};

// Correspondance des unités en anglais et en français
const unitTranslations = {
  cup: "Tasse",
  gram: "Gramme",
  ounce: "Once",
  teaspoon: "Cuillère à café",
};

// Fonction pour convertir une quantité d'une unité à une autre
const convertQuantity = (fromUnit) => (toUnit) => (quantity) => {
  const conversionRate = conversionTable[fromUnit]?.[toUnit]; // Récupère le taux de conversion
  if (!conversionRate) return null; // Retourne null si la conversion n'est pas possible
  return quantity * conversionRate; // Retourne la quantité convertie
};

// Fonction principale pour traiter une conversion
const processConversion = (baseQuantity, baseUnit, newUnit) => {
  const convertedQuantity = convertQuantity(baseUnit)(newUnit)(baseQuantity); // Convertit la quantité
  return convertedQuantity ? convertedQuantity.toFixed(2) : "Conversion impossible"; // Retourne la quantité convertie ou un message d'erreur
};

// Sélection des éléments HTML nécessaires
const ingredientQuantity = document.getElementById("quantity"); // Champ pour la quantité
const unitToConvert = document.getElementById("unit"); // Sélecteur pour l'unité
const recipeForm = document.getElementById("recipe-form"); // Formulaire principal
const resultList = document.getElementById("result-list"); // Liste pour afficher les résultats

// Liste des unités disponibles pour la conversion
const units = ["cup", "gram", "ounce", "teaspoon"];

// Fonction pour mettre à jour la liste des résultats
const updateResultsList = () => {
  resultList.innerHTML = ""; // Réinitialise la liste des résultats

  // Parcourt toutes les unités disponibles
  units.forEach((newUnit) => {
    if (newUnit !== unitToConvert.value) { // Ignore l'unité sélectionnée
      const convertedQuantity = processConversion(
        parseFloat(ingredientQuantity.value), // Quantité saisie
        unitToConvert.value, // Unité d'origine
        newUnit // Nouvelle unité
      );

      // Vérifie si la conversion est possible avant d'ajouter à la liste
      if (convertedQuantity !== "Conversion impossible") {
        resultList.innerHTML += `<li>${convertedQuantity} ${unitTranslations[newUnit]}</li>`;
      } else {
        resultList.innerHTML += `<li>Conversion impossible pour ${unitTranslations[newUnit]}</li>`;
      }
    }
  });
};

// Ajout d'un gestionnaire d'événements pour le formulaire
recipeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  if (isNaN(parseFloat(ingredientQuantity.value))) {
    alert("Veuillez entrer une quantité valide."); // Alerte si la quantité est invalide
    return;
  }
  updateResultsList(); // Met à jour la liste des résultats
});