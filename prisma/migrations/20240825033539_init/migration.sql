/*
  Warnings:

  - Added the required column `pokemonId` to the `PokemonHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PokemonHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    CONSTRAINT "PokemonHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonHistory_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PokemonHistory" ("id", "userId") SELECT "id", "userId" FROM "PokemonHistory";
DROP TABLE "PokemonHistory";
ALTER TABLE "new_PokemonHistory" RENAME TO "PokemonHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
