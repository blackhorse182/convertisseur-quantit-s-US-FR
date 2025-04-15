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

// Exemple de conversion : 2 tasses en grammes
const gramsResult = convertQuantity("cup")("gram")(2);
console.log(gramsResult);

// Fonction pour ajuster une quantité en fonction du nombre de portions
const adjustForServings = (baseQuantity) => (newServings) =>
  baseQuantity * newServings; // Ajuste la quantité pour les nouvelles portions

// Exemple d'ajustement : 4 portions à 6 portions
const servingsResult = adjustForServings(4)(6);
console.log(servingsResult);

// Fonction principale pour traiter un ingrédient
const processIngredient = (baseQuantity, baseUnit, newUnit, newServings) => {
  const adjustedQuantity = adjustForServings(baseQuantity)(newServings); // Ajuste la quantité pour les portions
  const convertedQuantity = convertQuantity(baseUnit)(newUnit)(adjustedQuantity); // Convertit la quantité ajustée
  return convertedQuantity ? convertedQuantity.toFixed(2) : "Conversion impossible"; // Retourne la quantité convertie ou un message d'erreur
};

// Sélection des éléments HTML nécessaires
const ingredientName = document.getElementById("ingredient"); // Champ pour le nom de l'ingrédient
const ingredientQuantity = document.getElementById("quantity"); // Champ pour la quantité
const unitToConvert = document.getElementById("unit"); // Sélecteur pour l'unité
const numberOfServings = document.getElementById("servings"); // Champ pour le nombre de portions
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
      const convertedQuantity = processIngredient(
        parseFloat(ingredientQuantity.value), // Quantité saisie
        unitToConvert.value, // Unité d'origine
        newUnit, // Nouvelle unité
        parseFloat(numberOfServings.value) // Nombre de portions
      );

      // Ajoute le résultat converti à la liste avec les unités en français
      resultList.innerHTML += `<li>${ingredientName.value || "Ingrédient"}: ${convertedQuantity} ${unitTranslations[newUnit]}</li>`;
    }
  });
};

// Ajout d'un gestionnaire d'événements pour le formulaire
recipeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  if (
    ingredientName.value.trim() === "" ||
    isNaN(parseFloat(ingredientQuantity.value)) ||
    isNaN(parseFloat(numberOfServings.value))
  ) {
    alert("Veuillez remplir tous les champs correctement."); // Alerte si des champs sont invalides
    return;
  }
  updateResultsList(); // Met à jour la liste des résultats
});