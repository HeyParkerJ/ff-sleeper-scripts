   export const getSeasonsToRetrieve = (
     startingSeason,
     endingSeason,
     seasonToLeagueIdKVP,
   ) => {
     const res = [];
     for (
       let currentSeason = startingSeason;
       currentSeason <= endingSeason;
       currentSeason++
     ) {
       if (!seasonToLeagueIdKVP[currentSeason]) {
         const supportedSeasons = Object.keys(seasonToLeagueIdKVP);
         const errorMsg = `Season: '${currentSeason}' is not supported. Supported seasons are: ${supportedSeasons}`;
         throw new Error(errorMsg);
       }
       res.push(seasonToLeagueIdKVP[currentSeason]);
     }
     return res;
   };
