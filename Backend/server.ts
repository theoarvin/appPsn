import fs from "fs";
import type { Trophy } from "psn-api";
const express = require("express");
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
  TrophyRarity,
} from "psn-api";
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// Votre code API ici

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


app.get("/api/games", async ( res: any) => {
  try {
    const games = await main(); // La fonction que vous avez fournie
    res.json(games);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

async function main() {
  // 1. Authenticate and become authorized with PSN.
  // See the Authenticating Manually docs for how to get your NPSSO.
  const accessCode = await exchangeNpssoForCode("NPSSO");
  const authorization = await exchangeCodeForAccessToken(accessCode);

  // 2. Get the user's `accountId` from the username.
  const allAccountsSearchResults = await makeUniversalSearch(
    authorization,
    "xelnia",
    "SocialAllAccounts"
  );

  const targetAccountId =
    allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
      .accountId;

  // 3. Get the user's list of titles (games).
  const { trophyTitles } = await getUserTitles(authorization, targetAccountId);

  const games: any[] = [];
  for (const title of trophyTitles) {
    // 4. Get the list of trophies for each of the user's titles.
    const { trophies: titleTrophies } = await getTitleTrophies(
      authorization,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined,
      }
    );

    // 5. Get the list of _earned_ trophies for each of the user's titles.
    const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
      authorization,
      targetAccountId,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined,
      }
    );

    // 6. Merge the two trophy lists.
    const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

    games.push({
      gameName: title.trophyTitleName,
      platform: title.trophyTitlePlatform,
      trophyTypeCounts: title.definedTrophies,
      earnedCounts: title.earnedTrophies,
      trophyList: mergedTrophies,
    });
  }

  // 7. Write to a JSON file.
  fs.writeFileSync("./games.json", JSON.stringify(games));
}

const mergeTrophyLists = (
  titleTrophies: Trophy[],
  earnedTrophies: Trophy[]
) => {
  const mergedTrophies: any[] = [];

  for (const earnedTrophy of earnedTrophies) {
    const foundTitleTrophy = titleTrophies.find(
      (t) => t.trophyId === earnedTrophy.trophyId
    );

    mergedTrophies.push(
      normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy })
    );
  }

  return mergedTrophies;
};

const normalizeTrophy = (trophy: Trophy) => {
  return {
    isEarned: trophy.earned ?? false,
    earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
    type: trophy.trophyType,
    rarity: rarityMap[trophy.trophyRare ?? 0],
    earnedRate: Number(trophy.trophyEarnedRate),
    trophyName: trophy.trophyName,
    groupId: trophy.trophyGroupId,
  };
};

const rarityMap: Record<TrophyRarity, string> = {
  [TrophyRarity.VeryRare]: "Very Rare",
  [TrophyRarity.UltraRare]: "Ultra Rare",
  [TrophyRarity.Rare]: "Rare",
  [TrophyRarity.Common]: "Common",
};

main();

