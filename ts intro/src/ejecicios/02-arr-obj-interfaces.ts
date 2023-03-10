/*
    ===== Código de TypeScript =====
*/

// let habilidades: string[] = ["Bash", "Counter", "Healing"];
// TS infirere el tipo del arreglo si no se especifica

interface Personaje {
  nombre: string;
  hp: number;
  habilidades: string[];
  puebloNatal?: string;
}

const personaje: Personaje = {
  nombre: "String",
  hp: 100,
  habilidades: ["Bash", "Counter", "Healing"],
};

personaje.puebloNatal = "Pueblo Paleta";

console.table(personaje);
